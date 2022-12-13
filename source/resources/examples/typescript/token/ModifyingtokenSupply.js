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
// replace with private key
const privateKey =
  '1111111111111111111111111111111111111111111111111111111111111111';
const account = bitxor_sdk_1.Account.createFromPrivateKey(
  privateKey,
  networkType,
);
// replace with token id
const tokenIdHex = '7cdf3b117a3c40cc';
const tokenId = new bitxor_sdk_1.TokenId(tokenIdHex);
// replace with token divisibility
const divisibility = 0;
// replace with token units to increase
const delta = 1000000;
const tokenSupplyChangeTransaction = bitxor_sdk_1.TokenSupplyChangeTransaction.create(
  bitxor_sdk_1.Deadline.create(epochAdjustment),
  tokenId,
  bitxor_sdk_1.TokenSupplyChangeAction.Increase,
  bitxor_sdk_1.UInt64.fromUint(delta * Math.pow(10, divisibility)),
  networkType,
  bitxor_sdk_1.UInt64.fromUint(2000000),
);
/* end block 01 */
/* start block 02 */
// replace with meta.networkGenerationHash (nodeUrl + '/node/info')
const networkGenerationHash =
  '1DFB2FAA9E7F054168B0C5FCB84F4DEB62CC2B4D317D861F3168D161F54EA78B';
const signedTransaction = account.sign(
  tokenSupplyChangeTransaction,
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
/* end block 02 */
