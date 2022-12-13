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
const bitxor_sdk_1 = require('bitxor-sdk');
// Retrieve from node's /network/properties or RepositoryFactory
const epochAdjustment = 123456789;
/* start block 01 */
// replace with network type
const networkType = bitxor_sdk_1.NetworkType.TEST_NET;
// replace with candidate multisig private key
const privateKey =
    'FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF';
const account = bitxor_sdk_1.Account.createFromPrivateKey(
    privateKey,
    networkType,
);
// replace with cosignatory 1 public key
const cosignatory1PublicKey =
    'D04AB232742BB4AB3A1368BD4615E4E6D0224AB71A016BAF8520A332C9778737';
const cosignatory1 = bitxor_sdk_1.PublicAccount.createFromPublicKey(
    cosignatory1PublicKey,
    networkType,
);
// replace with cosignatory 2 public key
const cosignatory2PublicKey =
    '462EE976890916E54FA825D26BDD0235F5EB5B6A143C199AB0AE5EE9328E08CE';
const cosignatory2 = bitxor_sdk_1.PublicAccount.createFromPublicKey(
    cosignatory2PublicKey,
    networkType,
);
/* end block 01 */
/* start block 02 */
const multisigAccountModificationTransaction = bitxor_sdk_1.MultisigAccountModificationTransaction.create(
    bitxor_sdk_1.Deadline.create(epochAdjustment),
    1,
    1, [cosignatory1.address, cosignatory2.address], [],
    networkType,
);
/* end block 02 */
/* start block 03 */
const aggregateTransaction = bitxor_sdk_1.AggregateTransaction.createBonded(
    bitxor_sdk_1.Deadline.create(epochAdjustment), [multisigAccountModificationTransaction.toAggregate(account.publicAccount)],
    networkType, [],
    bitxor_sdk_1.UInt64.fromUint(2000000),
);
/* end block 03 */
/* start block 04 */
// replace with meta.networkGenerationHash (nodeUrl + '/node/info')
const networkGenerationHash =
    '1DFB2FAA9E7F054168B0C5FCB84F4DEB62CC2B4D317D861F3168D161F54EA78B';
const signedTransaction = account.sign(
    aggregateTransaction,
    networkGenerationHash,
);
console.log(signedTransaction.hash);
/* end block 04 */
/* start block 05 */
// replace with bitxor id
const networkCurrencyTokenId = new bitxor_sdk_1.TokenId('5E62990DCAC5BE8A');
// replace with network currency divisibility
const networkCurrencyDivisibility = 6;
const hashLockTransaction = bitxor_sdk_1.HashLockTransaction.create(
    bitxor_sdk_1.Deadline.create(epochAdjustment),
    new bitxor_sdk_1.Token(
        networkCurrencyTokenId,
        bitxor_sdk_1.UInt64.fromUint(
            10 * Math.pow(10, networkCurrencyDivisibility),
        ),
    ),
    bitxor_sdk_1.UInt64.fromUint(480),
    signedTransaction,
    networkType,
    bitxor_sdk_1.UInt64.fromUint(2000000),
);
const signedHashLockTransaction = account.sign(
    hashLockTransaction,
    networkGenerationHash,
);
// replace with node endpoint
const nodeUrl = 'NODE_URL';
const repositoryFactory = new bitxor_sdk_1.RepositoryFactoryHttp(nodeUrl);
const listener = repositoryFactory.createListener();
const receiptHttp = repositoryFactory.createReceiptRepository();
const transactionHttp = repositoryFactory.createTransactionRepository();
const transactionService = new bitxor_sdk_1.TransactionService(
    transactionHttp,
    receiptHttp,
);
listener.open().then(() => {
    transactionService
        .announceHashLockAggregateBonded(
            signedHashLockTransaction,
            signedTransaction,
            listener,
        )
        .subscribe(
            (x) => console.log(x),
            (err) => console.log(err),
            () => listener.close(),
        );
});
/* end block 05 */