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
    explorerUrl: 'http://explorer.gcr-testnet.superhow.net/',
    faucetUrl: 'http://faucet.gcr-testnet.superhow.net/',
    defaultNetworkType: 104,
    networkConfigurationDefaults: {
        maxMosaicDivisibility: 6,
        namespaceGracePeriodDuration: 7776000,
        lockedFundsPerAggregate: '10000000',
        maxCosignatoriesPerAccount: 1000,
        blockGenerationTargetTime: 15,
        maxNamespaceDepth: 3,
        maxMosaicDuration: 315360000,
        minNamespaceDuration: 2592000,
        maxNamespaceDuration: 63072000,
        maxTransactionsPerAggregate: 1000,
        maxCosignedAccountsPerAccount: 25,
        maxMessageSize: 1024,
        maxMosaicAtomicUnits: 5000000000000000,
        currencyMosaicId: '6CAF5BAFEBF0256C',
        harvestingMosaicId: '6CAF5BAFEBF0256C',
        defaultDynamicFeeMultiplier: 1000,
        epochAdjustment: 1573430400,
        totalChainImportance: 3000000000000,
        generationHash: 'F64D22C245CACB978A570E18127460A085D89AEA67D20F2259CD23BDB0649F0D',
    },
    nodes: [
        { friendlyName: 'GCR-DEVNET-dual0', roles: 2, url: 'http://20.79.16.203:3000' },
        { friendlyName: 'GCR-DEVNET-dual1', roles: 2, url: 'http://20.79.16.206:3000' },
        { friendlyName: 'GCR-DEVNET-dual2', roles: 2, url: 'http://20.79.16.207:3000' },

    ],
};

const defaultNetworkConfig: Record<number, NetworkConfig> = {
    104: defaultMainnetNetworkConfig
};

const resolvedNetworkConfig: NetworkConfig = window['networkConfig'] || defaultNetworkConfig;
console.log('networkConfig resolved!', resolvedNetworkConfig);
export const networkConfig = resolvedNetworkConfig;
