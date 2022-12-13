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
// replace network type
const networkType = bitxor_sdk_1.NetworkType.TEST_NET;
// replace with cosignatory private key
const cosignatoryPrivateKey =
    '0000000000000000000000000000000000000000000000000000000000000000';
const cosignatoryAccount = bitxor_sdk_1.Account.createFromPrivateKey(
    cosignatoryPrivateKey,
    networkType,
);
// replace with multisig account public key
const multisigAccountPublicKey =
    '3A537D5A1AF51158C42F80A199BB58351DBF3253C4A6A1B7BD1014682FB595EA';
const multisigAccount = bitxor_sdk_1.PublicAccount.createFromPublicKey(
    multisigAccountPublicKey,
    networkType,
);
// replace with recipient address
const recipientRawAddress = 'BXRYXK-VYBMO4-NBCUF3-AXKJMX-CGVSYQ-OS7ZG2-TLI';
const recipientAddress = bitxor_sdk_1.Address.createFromRawAddress(
    recipientRawAddress,
);
// replace with bitxor id
const networkCurrencyTokenId = new bitxor_sdk_1.TokenId('5E62990DCAC5BE8A');
// replace with network currency divisibility
const networkCurrencyDivisibility = 6;
/* end block 01 */
/* start block 02 */
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
    bitxor_sdk_1.PlainMessage.create('sending 10 bitxor'),
    networkType,
);
/* end block 02 */
/* start block 03 */
const aggregateTransaction = bitxor_sdk_1.AggregateTransaction.createComplete(
    bitxor_sdk_1.Deadline.create(epochAdjustment), [transferTransaction.toAggregate(multisigAccount)],
    networkType, [],
    bitxor_sdk_1.UInt64.fromUint(2000000),
);
/* end block 03 */
/* start block 04 */
// replace with meta.networkGenerationHash (nodeUrl + '/node/info')
const networkGenerationHash =
    '1DFB2FAA9E7F054168B0C5FCB84F4DEB62CC2B4D317D861F3168D161F54EA78B';
const signedTransaction = cosignatoryAccount.sign(
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
/* end block 04 */