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
// replace with aliased tokenId
const tokenId = new bitxor_sdk_1.NamespaceId('foo');
bitxor_sdk_1.TransferTransaction.create(
  bitxor_sdk_1.Deadline.create(epochAdjustment),
  bitxor_sdk_1.Account.generateNewAccount(networkType).address,
  [new bitxor_sdk_1.Token(tokenId, bitxor_sdk_1.UInt64.fromUint(10000000))],
  bitxor_sdk_1.EmptyMessage,
  networkType,
  bitxor_sdk_1.UInt64.fromUint(2000000),
);
/* end block 01 */
