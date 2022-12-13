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

import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import {
  Account,
  AccountMetadataTransaction,
  Convert,
  Deadline,
  KeyGenerator,
  NetworkType,
  PublicAccount,
  RepositoryFactoryHttp,
} from 'bitxor-sdk';

// Retrieve from node's /network/properties or RepositoryFactory
const epochAdjustment = 123456789;

/* start block 01 */
// replace with network type
const networkType = NetworkType.TEST_NET;
// replace with bob private key
const bobPrivateKey =
  '0000000000000000000000000000000000000000000000000000000000000000';
const bobAccount = Account.createFromPrivateKey(bobPrivateKey, networkType);
// replace with alice public key
const alicePublicKey =
  'D04AB232742BB4AB3A1368BD4615E4E6D0224AB71A016BAF8520A332C9778737';
const alicePublicAccount = PublicAccount.createFromPublicKey(
  alicePublicKey,
  networkType,
);
// replace with node endpoint
const nodeUrl = 'NODE_URL';
const repositoryFactory = new RepositoryFactoryHttp(nodeUrl);
const metadataHttp = repositoryFactory.createMetadataRepository();

// replace with key and new value
const key = KeyGenerator.generateUInt64Key('CERT');
const newValue = '000000';
const newValueBytes = Convert.utf8ToUint8(newValue);

const searchCriteria = {
  targetAddress: alicePublicAccount.address,
  scopedMetadataKey: key.toString(),
  sourceAddress: bobAccount.address,
};
const accountMetadataTransaction = metadataHttp.search(searchCriteria).pipe(
  mergeMap((metadata) => {
    const currentValueBytes = Convert.utf8ToUint8(
      metadata.data[0].metadataEntry.value,
    );
    return of(
      AccountMetadataTransaction.create(
        Deadline.create(epochAdjustment),
        alicePublicAccount.address,
        key,
        newValueBytes.length - currentValueBytes.length,
        Convert.decodeHex(Convert.xor(currentValueBytes, newValueBytes)),
        networkType,
      ),
    );
  }),
);
/* end block 01 */
console.log(accountMetadataTransaction);
