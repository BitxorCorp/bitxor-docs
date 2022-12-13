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
const operators_1 = require('rxjs/operators');
const bitxor_sdk_1 = require('bitxor-sdk');
/* start block 01 */
const validTransaction = (transaction, publicAccount) => {
    return (
        transaction instanceof bitxor_sdk_1.TransferTransaction &&
        transaction.signer.equals(publicAccount) &&
        transaction.tokens.length === 1 &&
        transaction.tokens[0].id.equals(
            new bitxor_sdk_1.TokenId('5E62990DCAC5BE8A') ||
            transaction.tokens[0].id.equals(
                new bitxor_sdk_1.NamespaceId('bitxor'),
            ),
        ) &&
        transaction.tokens[0].amount.compare(
            bitxor_sdk_1.UInt64.fromUint(100 * Math.pow(10, 6)),
        ) < 0
    );
};
const cosignAggregateBondedTransaction = (transaction, account) => {
    const cosignatureTransaction = bitxor_sdk_1.CosignatureTransaction.create(
        transaction,
    );
    return account.signCosignatureTransaction(cosignatureTransaction);
};
// replace with network type
const networkType = bitxor_sdk_1.NetworkType.TEST_NET;
// replace with private key
const privateKey =
    '0000000000000000000000000000000000000000000000000000000000000000';
const account = bitxor_sdk_1.Account.createFromPrivateKey(
    privateKey,
    networkType,
);
// replace with node endpoint
const nodeUrl = 'NODE_URL';
const repositoryFactory = new bitxor_sdk_1.RepositoryFactoryHttp(nodeUrl);
const transactionHttp = repositoryFactory.createTransactionRepository();
const listener = repositoryFactory.createListener();
listener.open().then(() => {
    listener
        .aggregateBondedAdded(account.address)
        .pipe(
            operators_1.filter((_) => _.innerTransactions.length === 2),
            operators_1.filter((_) => !_.signedByAccount(account.publicAccount)),
            operators_1.filter(
                (_) =>
                validTransaction(_.innerTransactions[0], account.publicAccount) ||
                validTransaction(_.innerTransactions[1], account.publicAccount),
            ),
            operators_1.map((transaction) =>
                cosignAggregateBondedTransaction(transaction, account),
            ),
            operators_1.mergeMap((signedCosignatureTransaction) =>
                transactionHttp.announceAggregateBondedCosignature(
                    signedCosignatureTransaction,
                ),
            ),
        )
        .subscribe(
            (announcedTransaction) => {
                console.log(announcedTransaction);
                listener.close();
            },
            (err) => console.error(err),
        );
});
/* end block 01 */