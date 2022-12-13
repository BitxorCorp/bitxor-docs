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
  Deadline,
  PlainMessage,
  RepositoryFactoryHttp,
  TransferTransaction,
  UInt64,
} from 'bitxor-sdk';

const example = async (): Promise<void> => {
  // Network information
  const nodeUrl = 'NODE_URL';
  const repositoryFactory = new RepositoryFactoryHttp(nodeUrl);
  const epochAdjustment = await repositoryFactory
    .getEpochAdjustment()
    .toPromise();
  const networkType = await repositoryFactory.getNetworkType().toPromise();
  const networkGenerationHash = await repositoryFactory
    .getGenerationHash()
    .toPromise();
  // Returns the network main currency, bitxor
  const { currency } = await repositoryFactory.getCurrencies().toPromise();

  /* start block 01 */
  // replace with recipient address
  const rawAddress = 'BXRQ5E-YACWBP-CXKGIL-I6XWCH-DRFLTB-KUK34I-YJQ';
  const recipientAddress = Address.createFromRawAddress(rawAddress);

  const transferTransaction = TransferTransaction.create(
    Deadline.create(epochAdjustment),
    recipientAddress,
    [currency.createRelative(10)],
    PlainMessage.create('This is a test message'),
    networkType,
    UInt64.fromUint(2000000),
  );
  /* end block 01 */

  /* start block 02 */
  // replace with sender private key
  const privateKey =
    '1111111111111111111111111111111111111111111111111111111111111111';
  const account = Account.createFromPrivateKey(privateKey, networkType);
  const signedTransaction = account.sign(
    transferTransaction,
    networkGenerationHash,
  );
  console.log('Payload:', signedTransaction.payload);
  console.log('Transaction Hash:', signedTransaction.hash);
  /* end block 02 */

  /* start block 03 */
  const transactionRepository = repositoryFactory.createTransactionRepository();
  const response = await transactionRepository
    .announce(signedTransaction)
    .toPromise();
  console.log(response);
  /* end block 03 */
};
example().then();
