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
// Retrieve from node's /network/properties or RepositoryFactory
const epochAdjustment = 123456789;
/* start block 01 */
const aliasedToken = new bitxor_sdk_1.Token(
    new bitxor_sdk_1.NamespaceId('bitxor'),
    bitxor_sdk_1.UInt64.fromUint(1000000),
);
/* end block 01 */
/* start block 02 */
// replace with network type
const networkType = bitxor_sdk_1.NetworkType.TEST_NET;
const transferTransaction = bitxor_sdk_1.TransferTransaction.create(
    bitxor_sdk_1.Deadline.create(epochAdjustment),
    bitxor_sdk_1.Address.createFromRawAddress(
        'BXRBDE-NCLKEB-ILBPWP-3JPB2X-NY64OE-7PYHHE-32I',
    ), [aliasedToken],
    bitxor_sdk_1.PlainMessage.create('Test aliased token'),
    networkType,
    bitxor_sdk_1.UInt64.fromUint(2000000),
);
// replace with sender private key
const privateKey =
    '1111111111111111111111111111111111111111111111111111111111111111';
const account = bitxor_sdk_1.Account.createFromPrivateKey(
    privateKey,
    networkType,
);
// replace with meta.networkGenerationHash (nodeUrl + '/node/info')
const networkGenerationHash =
    '1DFB2FAA9E7F054168B0C5FCB84F4DEB62CC2B4D317D861F3168D161F54EA78B';
const signedTransaction = account.sign(
    transferTransaction,
    networkGenerationHash,
);
console.log(signedTransaction.hash);
/* end block 02 */
/* start block 03 */
// replace with node endpoint
const nodeUrl = 'NODE_URL';
const repositoryFactory = new bitxor_sdk_1.RepositoryFactoryHttp(nodeUrl);
const receiptHttp = repositoryFactory.createReceiptRepository();
const transactionHttp = repositoryFactory.createTransactionRepository();
const listener = repositoryFactory.createListener();
const transactionService = new bitxor_sdk_1.TransactionService(
    transactionHttp,
    receiptHttp,
);
listener.open().then(() => {
    transactionService
        .announce(signedTransaction, listener)
        .pipe(
            operators_1.mergeMap((transaction) =>
                transactionService.resolveAliases([transaction.transactionInfo.hash]),
            ),
            operators_1.map((transactions) => transactions[0]),
        )
        .subscribe(
            (transaction) => {
                console.log('Resolved TokenId: ', transaction.tokens[0].id.toHex());
                listener.close();
            },
            (err) => console.log(err),
        );
});
/* end block 03 */