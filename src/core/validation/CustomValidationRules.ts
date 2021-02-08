// external dependencies
import { extend } from 'vee-validate';
import i18n from '@/language';
import { Account, Address, NetworkType, Password, NamespaceId } from 'symbol-sdk';
// internal dependencies
import { ProfileService } from '@/services/ProfileService';
import { NotificationType } from '@/core/utils/NotificationType';
import { AppStore } from '@/app/AppStore';
// configuration
import { networkConfig } from '@/config';
import { appConfig } from '@/config';
import { AddressValidator, AliasValidator, MaxDecimalsValidator, PublicKeyValidator, UrlValidator } from './validators';
import { ProfileModel } from '@/core/database/entities/ProfileModel';
import { AccountService } from '@/services/AccountService';
import { NetworkConfigurationModel } from '@/core/database/entities/NetworkConfigurationModel';
import { Values } from 'vue-i18n';

// TODO CustomValidationRules needs to be created when the network configuration is resolved, UI
// needs to use the resolved CustomValidationRules
// ATM rules are using the hardcoded file
const currentNetwork: NetworkConfigurationModel = networkConfig.networkConfigurationDefaults;
const { MIN_PASSWORD_LENGTH } = appConfig.constants;

export class CustomValidationRules {
    /**
     * Registers custom validation rules
     * @static
     */
    public static register(): void {
        extend('address', {
            validate: (value) => {
                return AddressValidator.validate(value);
            },
            message: (fieldName: string, values: Values) => `${i18n.t(NotificationType.ADDRESS_INVALID, values)}`,
        });

        extend('maxDecimals', {
            validate: (value, args: any) => {
                const { maxDecimalNumber } = args;
                return MaxDecimalsValidator.validate(value, maxDecimalNumber);
            },
            message: (fieldName: string, values: Values) => `${i18n.t('max_decimal_number_error', values)}`,
            params: ['maxDecimalNumber'],
        });

        extend('addressOrAlias', {
            validate: (value) => {
                const isValidAddress = AddressValidator.validate(value);
                const isValidAlias = AliasValidator.validate(value);
                if (isValidAddress) {
                    return true;
                }
                if (isValidAlias) {
                    AppStore.dispatch('namespace/GET_LINKED_ADDRESS', new NamespaceId(value))
                        .then((val) => {
                            val ? true : false;
                        })
                        .catch(() => {
                            return false;
                        });
                }
                return false;
            },
            message: (fieldName: string, values: Values) => `${i18n.t('error_incorrect_field', values)}`,
        });

        extend('addressOrAliasNetworkType', {
            validate: (value, args: any) => {
                const { networkType } = args;
                if (!AddressValidator.validate(value)) {
                    return true;
                }
                return Address.createFromRawAddress(value).networkType == networkType;
            },
            message: (fieldName: string, values: Values) => `${i18n.t(NotificationType.NETWORK_TYPE_INVALID, values)}`,
            params: ['networkType'],
        });

        extend('url', {
            validate: (value) => {
                return UrlValidator.validate(value);
            },
            message: (fieldName: string, values: Values) => `${i18n.t('error_incorrect_url', values)}`,
        });

        extend('confirmPassword', {
            validate(value, args: any) {
                const { target } = args;
                return value === target;
            },
            message: (fieldName: string, values: Values) => `${i18n.t(NotificationType.PASSWORDS_NOT_MATCHING, values)}`,
            params: ['target'],
        });

        extend('newAccountName', {
            validate(value) {
                const currentProfile = new ProfileService().getProfileByName(value);
                return !(currentProfile && currentProfile.accounts.length > 0);
            },
            message: (fieldName: string, values: Values) => `${i18n.t(NotificationType.PROFILE_NAME_EXISTS_ERROR, values)}`,
        });

        extend('profilePassword', {
            validate(value) {
                if (!value || value.length < 8) {
                    return false;
                }

                const currentProfile: ProfileModel = AppStore.getters['profile/currentProfile'];
                const currentHash = currentProfile.password;
                const inputHash = ProfileService.getPasswordHash(new Password(value));
                return inputHash === currentHash;
            },
            message: (fieldName: string, values: Values) => `${i18n.t(NotificationType.WRONG_PASSWORD_ERROR, values)}`,
        });

        extend('profileAccountName', {
            validate(value) {
                const accountService = new AccountService();

                // - fetch current profile accounts
                const currentProfile: ProfileModel = AppStore.getters['profile/currentProfile'];
                const knownAccounts = Object.values(accountService.getKnownAccounts(currentProfile.accounts));
                return undefined === knownAccounts.find((w) => value === w.name);
            },
            message: (fieldName: string, values: Values) => `${i18n.t(NotificationType.ERROR_ACCOUNT_NAME_ALREADY_EXISTS, values)}`,
        });

        extend('privateKey', {
            validate(value) {
                try {
                    Account.createFromPrivateKey(value, NetworkType.MIJIN_TEST);
                    return true;
                } catch (e) {
                    return false;
                }
            },
            message: (fieldName: string, values: Values) => `${i18n.t(NotificationType.PROFILE_NAME_EXISTS_ERROR, values)}`,
        });

        extend('addressOrPublicKey', {
            validate: (value) => {
                const isValidAddress = AddressValidator.validate(value);
                const isValidPublicKey = PublicKeyValidator.validate(value);
                if (isValidAddress || isValidPublicKey) {
                    return true;
                }
                return false;
            },
            message: (fieldName: string, values: Values) => `${i18n.t('error_incorrect_field', values)}`,
        });

        extend('maxNamespaceDuration', {
            validate: (value) => {
                return value <= currentNetwork.maxNamespaceDuration;
            },
            message: (fieldName: string, values: Values) => {
                return `${i18n.t('error_incorrect_field', { ...values, maxValue: currentNetwork.maxNamespaceDuration })}`;
            },
        });

        extend('passwordRegex', {
            validate: (value) => {
                return new RegExp(`(?=.*[0-9])(?=.*[a-zA-Z])(.{${MIN_PASSWORD_LENGTH},})$`).test(value);
            },
            message: `${i18n.t('error_new_password_format')}`,
        }),
            extend('in', {
                validate: (value, array: string[]) => {
                    if (!array) {
                        return false;
                    }
                    return array.includes(value);
                },
                message: (fieldName: string, values: Values) => `${i18n.t('error_not_exist', values)}`,
            });
    }
}
