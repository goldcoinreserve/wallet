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

export const defaultTestnetNetworkConfig: NetworkConfig = {
    explorerUrl: 'http://explorer-testnet.gcr.superhow.net/',
    faucetUrl: 'http://faucet.gcr.superhow.net/',
    defaultNetworkType: 152,
    networkConfigurationDefaults: {
        maxMosaicDivisibility: 9,
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
        maxMosaicAtomicUnits: 300000000000000000,
        currencyMosaicId: '7259669BB7EB6A61',
        harvestingMosaicId: '7259669BB7EB6A61',
        defaultDynamicFeeMultiplier: 100,
        epochAdjustment: 1638265052,
        totalChainImportance: 3000000000000000,
        generationHash: 'AF4C3D9A0219EE1D8B048A52029A58B89C345653AF3A56CF985C95E40530ADD3',
    },
    nodes: [
        { friendlyName: 'GCR-testnet-dual1', roles: 7, url: 'http://testnet-dual-1.gcr.superhow.net:3000' },
        { friendlyName: 'GCR-testnet-dual2', roles: 7, url: 'http://testnet-dual-2.gcr.superhow.net:3000' },

    ],
};

export const defaultMainnetNetworkConfig: NetworkConfig = {
    explorerUrl: 'http://explorer.gcr.superhow.net/',
    faucetUrl: 'http://faucet.gcr.superhow.net/',
    defaultNetworkType: 104,
    networkConfigurationDefaults: {
        maxMosaicDivisibility: 9,
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
        maxMosaicAtomicUnits: 300000000000000000,
        currencyMosaicId: '004C07E33772FDF2',
        harvestingMosaicId: '004C07E33772FDF2',
        defaultDynamicFeeMultiplier: 100,
        epochAdjustment: 1638265052,
        totalChainImportance: 3000000000000000,
        generationHash: 'F3F3B13355484976A3216D703D9CE17AF7CDE05913302766F0BBA7278D6CD166',
    },
    nodes: [
        { friendlyName: 'GCR-mainnet-dual1', roles: 7, url: 'http://mainnet-dual-1.gcr.superhow.net:3000' },
        { friendlyName: 'GCR-mainnet-dual2', roles: 7, url: 'http://mainnet-dual-2.gcr.superhow.net:3000' },
        { friendlyName: 'GCR-mainnet-dual3', roles: 7, url: 'http://mainnet-dual-3.gcr.superhow.net:3000' },
    ],
};

const defaultNetworkConfig: Record<number, NetworkConfig> = {
    104: defaultMainnetNetworkConfig,
    152: defaultTestnetNetworkConfig
};

const resolvedNetworkConfig: NetworkConfig = window['networkConfig'] || defaultNetworkConfig;
console.log('networkConfig resolved!', resolvedNetworkConfig);
export const networkConfig = resolvedNetworkConfig;
