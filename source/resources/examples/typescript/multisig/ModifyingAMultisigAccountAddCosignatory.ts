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
  AggregateTransaction,
  Deadline,
  HashLockTransaction,
  Token,
  TokenId,
  MultisigAccountModificationTransaction,
  NetworkType,
  PublicAccount,
  RepositoryFactoryHttp,
  TransactionService,
  UInt64,
} from 'bitxor-sdk';

// Retrieve from node's /network/properties or RepositoryFactory
const epochAdjustment = 123456789;

/* start block 01 */
// replace with network type
const networkType = NetworkType.TEST_NET;
// replace with multisig public key
const multisigAccountPublicKey =
  '3A537D5A1AF51158C42F80A199BB58351DBF3253C4A6A1B7BD1014682FB595EA';
const multisigAccount = PublicAccount.createFromPublicKey(
  multisigAccountPublicKey,
  networkType,
);
// replace with new cosignatory public key
const newCosignatoryPublicKey =
  '17E42BDF5B7FF5001DC96A262A1141FFBE3F09A3A45DE7C095AAEA14F45C0DA0';
const newCosignatoryAccount = PublicAccount.createFromPublicKey(
  newCosignatoryPublicKey,
  networkType,
);
/* end block 01 */

/* start block 02 */
const multisigAccountModificationTransaction = MultisigAccountModificationTransaction.create(
  Deadline.create(epochAdjustment),
  0,
  0,
  [newCosignatoryAccount.address],
  [],
  networkType,
);
/* end block 02 */

/* start block 03 */
const aggregateTransaction = AggregateTransaction.createBonded(
  Deadline.create(epochAdjustment),
  [multisigAccountModificationTransaction.toAggregate(multisigAccount)],
  networkType,
  [],
  UInt64.fromUint(2000000),
);

// replace with cosignatory private key
const cosignatoryPrivateKey =
  '1111111111111111111111111111111111111111111111111111111111111111';
const cosignatoryAccount = Account.createFromPrivateKey(
  cosignatoryPrivateKey,
  networkType,
);
// replace with meta.networkGenerationHash (nodeUrl + '/node/info')
const networkGenerationHash =
  '1DFB2FAA9E7F054168B0C5FCB84F4DEB62CC2B4D317D861F3168D161F54EA78B';
const signedTransaction = cosignatoryAccount.sign(
  aggregateTransaction,
  networkGenerationHash,
);
console.log(signedTransaction.hash);
/* end block 03 */

/* start block 04 */
// replace with bitxor id
const networkCurrencyTokenId = new TokenId('5E62990DCAC5BE8A');
// replace with network currency divisibility
const networkCurrencyDivisibility = 6;

const hashLockTransaction = HashLockTransaction.create(
  Deadline.create(epochAdjustment),
  new Token(
    networkCurrencyTokenId,
    UInt64.fromUint(10 * Math.pow(10, networkCurrencyDivisibility)),
  ),
  UInt64.fromUint(480),
  signedTransaction,
  networkType,
  UInt64.fromUint(2000000),
);

const signedHashLockTransaction = cosignatoryAccount.sign(
  hashLockTransaction,
  networkGenerationHash,
);

// replace with node endpoint
const nodeUrl = 'NODE_URL';
const repositoryFactory = new RepositoryFactoryHttp(nodeUrl);
const listener = repositoryFactory.createListener();
const receiptHttp = repositoryFactory.createReceiptRepository();
const transactionHttp = repositoryFactory.createTransactionRepository();
const transactionService = new TransactionService(transactionHttp, receiptHttp);

listener.open().then(() => {
  transactionService
    .announceHashLockAggregateBonded(
      signedHashLockTransaction,
      signedTransaction,
      listener,
    )
    .subscribe(
      (x) => console.log(x),
      (err) => console.log(err),
      () => listener.close(),
    );
});
/* end block 04 */
