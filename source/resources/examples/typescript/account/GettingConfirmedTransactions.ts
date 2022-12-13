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

import { Address, RepositoryFactoryHttp, TransactionGroup } from 'bitxor-sdk';

/* start block 01 */
// replace with account address
const rawAddress = 'BXRBDE-NCLKEB-ILBPWP-3JPB2X-NY64OE-7PYHHE-32I';
const address = Address.createFromRawAddress(rawAddress);
/* end block 01 */

/* start block 02 */
// replace with node endpoint
const nodeUrl = 'NODE_URL';
const repositoryFactory = new RepositoryFactoryHttp(nodeUrl);
const transactionHttp = repositoryFactory.createTransactionRepository();

const searchCriteria = {
  group: TransactionGroup.Confirmed,
  address,
  pageNumber: 1,
  pageSize: 100,
};
transactionHttp.search(searchCriteria).subscribe(
  (page) => console.log(page.data),
  (err) => console.error(err),
);
/* end block 02 */
