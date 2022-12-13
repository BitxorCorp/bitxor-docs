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
const networkType = bitxor_sdk_1.NetworkType.TEST_NET;
// replace with kyc provider private key
const kycProviderPrivateKey =
  'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB';
const kycProviderAccount = bitxor_sdk_1.Account.createFromPrivateKey(
  kycProviderPrivateKey,
  networkType,
);
// Define KYC Token Id
const tokenNonce = bitxor_sdk_1.TokenNonce.createRandom();
const tokenDefinitionTransaction = bitxor_sdk_1.TokenDefinitionTransaction.create(
  bitxor_sdk_1.Deadline.create(epochAdjustment),
  tokenNonce,
  bitxor_sdk_1.TokenId.createFromNonce(
    tokenNonce,
    kycProviderAccount.publicAccount.address,
  ),
  bitxor_sdk_1.TokenFlags.create(true, true, true),
  0,
  bitxor_sdk_1.UInt64.fromUint(0),
  networkType,
);
console.log('KYC TokenId:', tokenDefinitionTransaction.tokenId.toHex());
// Define Token global restriction Is_Verified = 1
const key = bitxor_sdk_1.KeyGenerator.generateUInt64Key(
  'IsVerified'.toLowerCase(),
);
const tokenGlobalRestrictionTransaction = bitxor_sdk_1.TokenGlobalRestrictionTransaction.create(
  bitxor_sdk_1.Deadline.create(epochAdjustment),
  tokenDefinitionTransaction.tokenId, // tokenId
  key, // restictionKey
  bitxor_sdk_1.UInt64.fromUint(0), // previousRestrictionValue
  bitxor_sdk_1.TokenRestrictionType.NONE, // previousRestrictionType
  bitxor_sdk_1.UInt64.fromUint(1), // newRestrictionValue
  bitxor_sdk_1.TokenRestrictionType.EQ, // newRestrictionType
  networkType,
);
const aggregateTransaction = bitxor_sdk_1.AggregateTransaction.createComplete(
  bitxor_sdk_1.Deadline.create(epochAdjustment),
  [
    tokenDefinitionTransaction.toAggregate(kycProviderAccount.publicAccount),
    tokenGlobalRestrictionTransaction.toAggregate(
      kycProviderAccount.publicAccount,
    ),
  ],
  networkType,
  [],
  bitxor_sdk_1.UInt64.fromUint(2000000),
);
// replace with meta.networkGenerationHash (nodeUrl + '/node/info')
const networkGenerationHash =
  '1DFB2FAA9E7F054168B0C5FCB84F4DEB62CC2B4D317D861F3168D161F54EA78B';
const signedTransaction = kycProviderAccount.sign(
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
/* end block 01 */
