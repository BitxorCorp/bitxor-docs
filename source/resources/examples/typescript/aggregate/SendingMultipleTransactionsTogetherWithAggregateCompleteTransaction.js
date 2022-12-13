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
/* start block 01 */
// replace with network type
const networkType = bitxor_sdk_1.NetworkType.TEST_NET;
// replace with sender private key
const privateKey =
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
const account = bitxor_sdk_1.Account.createFromPrivateKey(
    privateKey,
    networkType,
);
// replace with address
const aliceAddress = 'BXRBDE-NCLKEB-ILBPWP-3JPB2X-NY64OE-7PYHHE-32I';
const aliceAccount = bitxor_sdk_1.Address.createFromRawAddress(aliceAddress);
// replace with address
const bobAddress = 'BXRQ5E-YACWBP-CXKGIL-I6XWCH-DRFLTB-KUK34I-YJQ';
const bobAccount = bitxor_sdk_1.Address.createFromRawAddress(bobAddress);
// replace with bitxor id
const networkCurrencyTokenId = new bitxor_sdk_1.TokenId('5E62990DCAC5BE8A');
// replace with network currency divisibility
const networkCurrencyDivisibility = 6;
const token = new bitxor_sdk_1.Token(
    networkCurrencyTokenId,
    bitxor_sdk_1.UInt64.fromUint(10 * Math.pow(10, networkCurrencyDivisibility)),
);
const aliceTransferTransaction = bitxor_sdk_1.TransferTransaction.create(
    bitxor_sdk_1.Deadline.create(123456789),
    aliceAccount, [token],
    bitxor_sdk_1.PlainMessage.create('payout'),
    networkType,
);
const bobTransferTransaction = bitxor_sdk_1.TransferTransaction.create(
    bitxor_sdk_1.Deadline.create(123456789),
    bobAccount, [token],
    bitxor_sdk_1.PlainMessage.create('payout'),
    networkType,
);
/* end block 01 */
/* start block 02 */
const aggregateTransaction = bitxor_sdk_1.AggregateTransaction.createComplete(
    bitxor_sdk_1.Deadline.create(123456789), [
        aliceTransferTransaction.toAggregate(account.publicAccount),
        bobTransferTransaction.toAggregate(account.publicAccount),
    ],
    networkType, [],
    bitxor_sdk_1.UInt64.fromUint(2000000),
);
/* end block 02 */
/* start block 03 */
// replace with meta.networkGenerationHash (nodeUrl + '/node/info')
const networkGenerationHash =
    '1DFB2FAA9E7F054168B0C5FCB84F4DEB62CC2B4D317D861F3168D161F54EA78B';
const signedTransaction = account.sign(
    aggregateTransaction,
    networkGenerationHash,
);
// replace with node endpoint
const nodeUrl = 'NODE_URL';
const repositoryFactory = new bitxor_sdk_1.RepositoryFactoryHttp(nodeUrl);
const transactionHttp = repositoryFactory.createTransactionRepository();
transactionHttp.announce(signedTransaction).subscribe(
    (x) => console.log(x),
    (err) => console.error(err),
);
/* end block 03 */