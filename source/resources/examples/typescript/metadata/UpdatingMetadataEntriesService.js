'use strict';
/*
 *
 * Copyright 2018-present BITXOR
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
Object.defineProperty(exports, '__esModule', { value: true });
const rxjs_1 = require('rxjs');
const operators_1 = require('rxjs/operators');
const bitxor_sdk_1 = require('bitxor-sdk');
// Retrieve from node's /network/properties or RepositoryFactory
const epochAdjustment = 123456789;
/* start block 01 */
// replace with network type
const networkType = bitxor_sdk_1.NetworkType.TEST_NET;
// replace with bob private key
const bobPrivateKey =
    '0000000000000000000000000000000000000000000000000000000000000000';
const bobAccount = bitxor_sdk_1.Account.createFromPrivateKey(
    bobPrivateKey,
    networkType,
);
// replace with alice public key
const alicePublicKey =
    'D04AB232742BB4AB3A1368BD4615E4E6D0224AB71A016BAF8520A332C9778737';
const alicePublicAccount = bitxor_sdk_1.PublicAccount.createFromPublicKey(
    alicePublicKey,
    networkType,
);
// replace with node endpoint
const nodeUrl = 'NODE_URL';
const metadataHttp = new bitxor_sdk_1.MetadataHttp(nodeUrl);
const metadataService = new bitxor_sdk_1.MetadataTransactionService(
    metadataHttp,
);
// replace with key and new value
const key = bitxor_sdk_1.KeyGenerator.generateUInt64Key('CERT');
const newValue = '000000';
const accountMetadataTransaction = metadataService.createAccountMetadataTransaction(
    bitxor_sdk_1.Deadline.create(epochAdjustment),
    networkType,
    alicePublicAccount.address,
    key,
    newValue,
    bobAccount.publicAccount.address,
    bitxor_sdk_1.UInt64.fromUint(0),
);
/* end block 01 */
/* start block 02 */
// replace with meta.networkGenerationHash (nodeUrl + '/node/info')
const networkGenerationHash =
    '1DFB2FAA9E7F054168B0C5FCB84F4DEB62CC2B4D317D861F3168D161F54EA78B';
const signedAggregateTransaction = accountMetadataTransaction.pipe(
    operators_1.mergeMap((transaction) => {
        const aggregateTransaction = bitxor_sdk_1.AggregateTransaction.createBonded(
            bitxor_sdk_1.Deadline.create(epochAdjustment), [transaction.toAggregate(bobAccount.publicAccount)],
            networkType, [],
            bitxor_sdk_1.UInt64.fromUint(2000000),
        );
        const signedTransaction = bobAccount.sign(
            aggregateTransaction,
            networkGenerationHash,
        );
        return rxjs_1.of(signedTransaction);
    }),
);
// replace with bitxor id
const networkCurrencyTokenId = new bitxor_sdk_1.TokenId('5E62990DCAC5BE8A');
// replace with network currency divisibility
const networkCurrencyDivisibility = 6;
const signedAggregateHashLock = signedAggregateTransaction.pipe(
    operators_1.mergeMap((signedAggregateTransaction) => {
        const hashLockTransaction = bitxor_sdk_1.HashLockTransaction.create(
            bitxor_sdk_1.Deadline.create(epochAdjustment),
            new bitxor_sdk_1.Token(
                networkCurrencyTokenId,
                bitxor_sdk_1.UInt64.fromUint(
                    10 * Math.pow(10, networkCurrencyDivisibility),
                ),
            ),
            bitxor_sdk_1.UInt64.fromUint(480),
            signedAggregateTransaction,
            networkType,
            bitxor_sdk_1.UInt64.fromUint(2000000),
        );
        const signedTransaction = bobAccount.sign(
            hashLockTransaction,
            networkGenerationHash,
        );
        const signedAggregateHashLock = {
            aggregate: signedAggregateTransaction,
            hashLock: signedTransaction,
        };
        console.log(
            'Aggregate Transaction Hash:',
            signedAggregateTransaction.hash + '\n',
        );
        console.log('HashLock Transaction Hash:', signedTransaction.hash + '\n');
        return rxjs_1.of(signedAggregateHashLock);
    }),
);
/* end block 03 */
/* start block 04 */
const repositoryFactory = new bitxor_sdk_1.RepositoryFactoryHttp(nodeUrl);
const listener = repositoryFactory.createListener();
const receiptHttp = repositoryFactory.createReceiptRepository();
const transactionHttp = repositoryFactory.createTransactionRepository();
const transactionService = new bitxor_sdk_1.TransactionService(
    transactionHttp,
    receiptHttp,
);
listener.open().then(() => {
    signedAggregateHashLock
        .pipe(
            operators_1.mergeMap((signedAggregateHashLock) =>
                transactionService.announceHashLockAggregateBonded(
                    signedAggregateHashLock.hashLock,
                    signedAggregateHashLock.aggregate,
                    listener,
                ),
            ),
        )
        .subscribe(
            () => console.log('Transaction confirmed'),
            (err) => console.log(err),
            () => listener.close(),
        );
});
/* end block 04 */