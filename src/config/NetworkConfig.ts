/*
 * Copyright 2020 NEM (https://nem.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and limitations under the License.
 *
 */

export interface NodeConfig {
    roles: number;
    friendlyName: string;
    url: string;
}

export interface NetworkConfigurationDefaults {
    maxTransactionsPerAggregate: number;
    maxMosaicDuration: number;
    lockedFundsPerAggregate: string;
    maxNamespaceDuration: number;
    maxCosignatoriesPerAccount: number;
    maxMosaicAtomicUnits: number;
    blockGenerationTargetTime: number;
    currencyMosaicId: string;
    namespaceGracePeriodDuration: number;
    harvestingMosaicId: string;
    minNamespaceDuration: number;
    maxCosignedAccountsPerAccount: number;
    maxNamespaceDepth: number;
    defaultDynamicFeeMultiplier: number;
    maxMosaicDivisibility: number;
    maxMessageSize: number;
    epochAdjustment: number;
    totalChainImportance: number;
    generationHash: string;
}

export interface NetworkConfig {
    faucetUrl: string;
    nodes: NodeConfig[];
    defaultNetworkType: number;
    explorerUrl: string;
    networkConfigurationDefaults: NetworkConfigurationDefaults;
}

export const defaultMainnetNetworkConfig: NetworkConfig = {
    explorerUrl: 'http://explorer.gcr.superhow.net/',
    faucetUrl: 'http://faucet.gcr.superhow.net/',
    defaultNetworkType: 104,
    networkConfigurationDefaults: {
        maxMosaicDivisibility: 6,
        namespaceGracePeriodDuration: 2592000,
        lockedFundsPerAggregate: '10000000',
        maxCosignatoriesPerAccount: 1000,
        blockGenerationTargetTime: 15,
        maxNamespaceDepth: 3,
        maxMosaicDuration: 3153600000,
        minNamespaceDuration: 60,
        maxNamespaceDuration: 315360000,
        maxTransactionsPerAggregate: 1000,
        maxCosignedAccountsPerAccount: 1000,
        maxMessageSize: 4096,
        maxMosaicAtomicUnits: 120000000000000,
        currencyMosaicId: '686DA369E3F357C6',
        harvestingMosaicId: '686DA369E3F357C6',
        defaultDynamicFeeMultiplier: 1000000,
        epochAdjustment: 1620136098,
        totalChainImportance: 3000000000000,
        generationHash: 'FC32A39EB545DE567343C02E9A2E46C603137AAD9C70FC7DB7A379F25B63D32C',
    },
    nodes: [
        { friendlyName: 'gcr-dual1', roles: 7, url: 'http://20.79.16.203:3000' },
        { friendlyName: 'gcr-dual2', roles: 7, url: 'http://20.79.16.206:3000' },
        { friendlyName: 'gcr-dual3', roles: 7, url: 'http://20.79.16.207:3000' },

    ],
};

const defaultNetworkConfig: Record<number, NetworkConfig> = {
    104: defaultMainnetNetworkConfig
};

const resolvedNetworkConfig: NetworkConfig = window['networkConfig'] || defaultNetworkConfig;
console.log('networkConfig resolved!', resolvedNetworkConfig);
export const networkConfig = resolvedNetworkConfig;
