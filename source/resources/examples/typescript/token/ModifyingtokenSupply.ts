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

import {
  Account,
  Deadline,
  TokenId,
  TokenSupplyChangeAction,
  TokenSupplyChangeTransaction,
  NetworkType,
  RepositoryFactoryHttp,
  UInt64,
} from 'bitxor-sdk';

// Retrieve from node's /network/properties or RepositoryFactory
const epochAdjustment = 123456789;

/* start block 01 */
// replace with network type
const networkType = NetworkType.TEST_NET;
// replace with private key
const privateKey =
  '1111111111111111111111111111111111111111111111111111111111111111';
const account = Account.createFromPrivateKey(privateKey, networkType);
// replace with token id
const tokenIdHex = '7cdf3b117a3c40cc';
const tokenId = new TokenId(tokenIdHex);
// replace with token divisibility
const divisibility = 0;
// replace with token units to increase
const delta = 1000000;

const tokenSupplyChangeTransaction = TokenSupplyChangeTransaction.create(
  Deadline.create(epochAdjustment),
  tokenId,
  TokenSupplyChangeAction.Increase,
  UInt64.fromUint(delta * Math.pow(10, divisibility)),
  networkType,
  UInt64.fromUint(2000000),
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
const repositoryFactory = new RepositoryFactoryHttp(nodeUrl);
const transactionHttp = repositoryFactory.createTransactionRepository();

transactionHttp.announce(signedTransaction).subscribe(
  (x) => console.log(x),
  (err) => console.error(err),
);
/* end block 02 */
