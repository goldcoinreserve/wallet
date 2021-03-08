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

const defaultTestnetNetworkConfig: NetworkConfig = {
    explorerUrl: 'http://explorer.lared.superhow.net/',
    faucetUrl: 'http://faucet.lared.superhow.net/',
    defaultNetworkType: 152,
    networkConfigurationDefaults: {
        maxMosaicDivisibility: 6,
        namespaceGracePeriodDuration: 7776000,
        lockedFundsPerAggregate: '10000000',
        maxCosignatoriesPerAccount: 25,
        blockGenerationTargetTime: 15,
        maxNamespaceDepth: 3,
        maxMosaicDuration: 315360000,
        minNamespaceDuration: 2592000,
        maxNamespaceDuration: 63072000,
        maxTransactionsPerAggregate: 250,
        maxCosignedAccountsPerAccount: 25,
        maxMessageSize: 1024,
        maxMosaicAtomicUnits: 5000000000000000,
        currencyMosaicId: '4131C5FD69F7A75C',
        harvestingMosaicId: '6D601F79F46AF3D3',
        defaultDynamicFeeMultiplier: 1000,
        epochAdjustment: 1573430400,
        totalChainImportance: undefined,
        generationHash: '9F5D58B772A55C1393ACE5802E4633C1FF3C04EA85195B0EBA4249F6E09ACB7A',
    },
    nodes: [
        { friendlyName: 'lared-dual-1', roles: 2, url: 'http://51.116.236.138:3000' },
        { friendlyName: 'lared-dual-2', roles: 2, url: 'http://20.52.149.171:3000' },
    ],
};


const defaultNetworkConfig: Record<number, NetworkConfig> = {
    152: defaultTestnetNetworkConfig,
};

const resolvedNetworkConfig: NetworkConfig = window['networkConfig'] || defaultNetworkConfig;
console.log('networkConfig resolved!', resolvedNetworkConfig);
export const networkConfig = resolvedNetworkConfig;
