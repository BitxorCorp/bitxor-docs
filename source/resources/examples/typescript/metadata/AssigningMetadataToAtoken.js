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
// replace with company private key
const companyPrivateKey =
  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
const companyAccount = bitxor_sdk_1.Account.createFromPrivateKey(
  companyPrivateKey,
  networkType,
);
// replace with token id
const tokenId = new bitxor_sdk_1.NamespaceId('cc.shares');
const isin = 'US00000000';
const isinMetadataTransaction = bitxor_sdk_1.TokenMetadataTransaction.create(
  bitxor_sdk_1.Deadline.create(epochAdjustment),
  companyAccount.address,
  bitxor_sdk_1.KeyGenerator.generateUInt64Key('ISIN'),
  tokenId,
  isin.length,
  isin,
  networkType,
);
/* end block 01 */
/* start block 02 */
const name = 'ComfyClothingCompany';
const nameMetadataTransaction = bitxor_sdk_1.TokenMetadataTransaction.create(
  bitxor_sdk_1.Deadline.create(epochAdjustment),
  companyAccount.address,
  bitxor_sdk_1.KeyGenerator.generateUInt64Key('NAME'),
  tokenId,
  name.length,
  name,
  networkType,
);
/* end block 02 */
/* start block 03 */
const aggregateTransaction = bitxor_sdk_1.AggregateTransaction.createComplete(
  bitxor_sdk_1.Deadline.create(epochAdjustment),
  [
    isinMetadataTransaction.toAggregate(companyAccount.publicAccount),
    nameMetadataTransaction.toAggregate(companyAccount.publicAccount),
  ],
  networkType,
  [],
  bitxor_sdk_1.UInt64.fromUint(2000000),
);
/* end block 03 */
/* start block 04 */
// replace with meta.networkGenerationHash (nodeUrl + '/node/info')
const networkGenerationHash =
  '1DFB2FAA9E7F054168B0C5FCB84F4DEB62CC2B4D317D861F3168D161F54EA78B';
const signedTransaction = companyAccount.sign(
  aggregateTransaction,
  networkGenerationHash,
);
console.log(signedTransaction.hash);
// replace with node endpoint
const nodeUrl = 'NODE_URL';
const repositoryFactory = new bitxor_sdk_1.RepositoryFactoryHttp(nodeUrl);
const transactionHttp = repositoryFactory.createTransactionRepository();
transactionHttp.announce(signedTransaction).subscribe(
  (x) => console.log(x),
  (err) => console.error(err),
);
/* end block 04 */
