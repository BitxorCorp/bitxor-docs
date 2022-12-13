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
// replace with recipient address
const rawRecipientAddress = 'BXRQ5E-YACWBP-CXKGIL-I6XWCH-DRFLTB-KUK34I-YJQ';
const recipientAddress = bitxor_sdk_1.Address.createFromRawAddress(
    rawRecipientAddress,
);
// replace with network type
const networkType = bitxor_sdk_1.NetworkType.TEST_NET;
// replace with bitxor id
const networkCurrencyTokenId = new bitxor_sdk_1.TokenId('5E62990DCAC5BE8A');
// replace with network currency divisibility
const networkCurrencyDivisibility = 6;
const transferTransaction = bitxor_sdk_1.TransferTransaction.create(
    bitxor_sdk_1.Deadline.create(epochAdjustment),
    recipientAddress, [
        new bitxor_sdk_1.Token(
            networkCurrencyTokenId,
            bitxor_sdk_1.UInt64.fromUint(
                10 * Math.pow(10, networkCurrencyDivisibility),
            ),
        ),
    ],
    bitxor_sdk_1.EmptyMessage,
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
/* end block 01 */
/* start block 02 */
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
    rxjs_1
        .merge(
            transactionService.announce(signedTransaction, listener),
            listener.status(account.address).pipe(
                operators_1.filter((error) => error.hash === signedTransaction.hash),
                operators_1.tap((error) => {
                    throw new Error(error.code);
                }),
            ),
        )
        .subscribe(
            (transaction) => {
                console.log(transaction);
                // TODO: send email to recipient
                listener.close();
            },
            (err) => console.error(err),
        );
});
/* end block 02 */