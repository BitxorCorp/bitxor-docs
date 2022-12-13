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

import { Address, RepositoryFactoryHttp } from 'bitxor-sdk';

/* start block 01 */
// replace with address
const rawAddress = 'BXRQ5E-YACWBP-CXKGIL-I6XWCH-DRFLTB-KUK34I-YJQ';
const address = Address.createFromRawAddress(rawAddress);
// replace with node endpoint
const nodeUrl = 'NODE_URL';
const repositoryFactory = new RepositoryFactoryHttp(nodeUrl);
const accountHttp = repositoryFactory.createAccountRepository();

accountHttp.getAccountInfo(address).subscribe(
  (accountInfo) => console.log(accountInfo),
  (err) => console.error(err),
);
/* end block 01 */
