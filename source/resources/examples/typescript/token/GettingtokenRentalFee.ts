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

import { RepositoryFactoryHttp } from 'bitxor-sdk';

/* start block 01 */
const nodeUrl = 'NODE_URL';
const repositoryHttp = new RepositoryFactoryHttp(nodeUrl);

const networkHttp = repositoryHttp.createNetworkRepository();
networkHttp.getRentalFees().subscribe((rentalFees) => {
  console.log(rentalFees.effectiveTokenRentalFee.compact());
});
/* end block 01 */
