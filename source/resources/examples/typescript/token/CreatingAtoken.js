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
// replace with duration (in blocks)
const duration = bitxor_sdk_1.UInt64.fromUint(0);
// replace with custom token flags
const isSupplyMutable = true;
const isTransferable = true;
const isRestrictable = true;
// replace with custom divisibility
const divisibility = 0;
const nonce = bitxor_sdk_1.TokenNonce.createRandom();
const tokenDefinitionTransaction = bitxor_sdk_1.TokenDefinitionTransaction.create(
  bitxor_sdk_1.Deadline.create(epochAdjustment),
  nonce,
  bitxor_sdk_1.TokenId.createFromNonce(nonce, account.address),
  bitxor_sdk_1.TokenFlags.create(
    isSupplyMutable,
    isTransferable,
    isRestrictable,
  ),
  divisibility,
  duration,
  networkType,
);
/* end block 01 */
/* start block 02 */
// replace with token units to increase
const delta = 1000000;
const tokenSupplyChangeTransaction = bitxor_sdk_1.TokenSupplyChangeTransaction.create(
  bitxor_sdk_1.Deadline.create(epochAdjustment),
  tokenDefinitionTransaction.tokenId,
  bitxor_sdk_1.TokenSupplyChangeAction.Increase,
  bitxor_sdk_1.UInt64.fromUint(delta * Math.pow(10, divisibility)),
  networkType,
);
/* end block 02 */
/* start block 03 */
const aggregateTransaction = bitxor_sdk_1.AggregateTransaction.createComplete(
  bitxor_sdk_1.Deadline.create(epochAdjustment),
  [
    tokenDefinitionTransaction.toAggregate(account.publicAccount),
    tokenSupplyChangeTransaction.toAggregate(account.publicAccount),
  ],
  networkType,
  [],
  bitxor_sdk_1.UInt64.fromUint(2000000),
);
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
