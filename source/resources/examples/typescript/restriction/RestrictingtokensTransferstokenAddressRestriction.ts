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
  Address,
  AggregateTransaction,
  Deadline,
  KeyGenerator,
  TokenAddressRestrictionTransaction,
  TokenId,
  NetworkType,
  RepositoryFactoryHttp,
  UInt64,
} from 'bitxor-sdk';

// Retrieve from node's /network/properties or RepositoryFactory
const epochAdjustment = 123456789;

/* start block 01 */
// replace with network type
const networkType = NetworkType.TEST_NET;
// replace with token id
const tokenIdHex = '634a8ac3fc2b65b3';
const tokenId = new TokenId(tokenIdHex);
// replace with address
const aliceRawAddress = 'BXRBDE-NCLKEB-ILBPWP-3JPB2X-NY64OE-7PYHHE-32I';
const aliceAddress = Address.createFromRawAddress(aliceRawAddress);
// replace with address
const bobRawAddress = 'BXRQ5E-YACWBP-CXKGIL-I6XWCH-DRFLTB-KUK34I-YJQ';
const bobAddress = Address.createFromRawAddress(bobRawAddress);

const key = KeyGenerator.generateUInt64Key('KYC'.toLowerCase());

const aliceTokenAddressRestrictionTransaction = TokenAddressRestrictionTransaction.create(
  Deadline.create(epochAdjustment),
  tokenId, // tokenId
  key, // restrictionKey
  aliceAddress, // address
  UInt64.fromUint(1), // newRestrictionValue
  networkType,
);

const bobTokenAddressRestrictionTransaction = TokenAddressRestrictionTransaction.create(
  Deadline.create(epochAdjustment),
  tokenId, // tokenId
  key, // restictionKey
  bobAddress, // address
  UInt64.fromUint(0), // newRestrictionValue
  networkType,
);
/* end block 01 */

/* start block 02 */
// replace with company private key
const privateKey =
  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
const account = Account.createFromPrivateKey(privateKey, networkType);

const aggregateTransaction = AggregateTransaction.createComplete(
  Deadline.create(epochAdjustment),
  [
    aliceTokenAddressRestrictionTransaction.toAggregate(account.publicAccount),
    bobTokenAddressRestrictionTransaction.toAggregate(account.publicAccount),
  ],
  networkType,
  [],
  UInt64.fromUint(2000000),
);

// replace with meta.networkGenerationHash (nodeUrl + '/node/info')
const networkGenerationHash =
  '1DFB2FAA9E7F054168B0C5FCB84F4DEB62CC2B4D317D861F3168D161F54EA78B';
const signedTransaction = account.sign(
  aggregateTransaction,
  networkGenerationHash,
);
console.log(signedTransaction.hash);
// replace with node endpoint
const nodeUrl = 'NODE_URL';
const repositoryFactory = new RepositoryFactoryHttp(nodeUrl);
const transactionHttp = repositoryFactory.createTransactionRepository();

transactionHttp.announce(signedTransaction).subscribe(
  (x) => console.log(x),
  (err) => console.error(err),
);
/* end block 02 */
