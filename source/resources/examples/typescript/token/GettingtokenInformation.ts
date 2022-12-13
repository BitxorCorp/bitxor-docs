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

import { TokenId, RepositoryFactoryHttp } from 'bitxor-sdk';

/* start block 01 */
// replace with token id
const tokenIdHex = '71415AC19C818709';
const tokenId = new TokenId(tokenIdHex);

// replace with node endpoint
const nodeUrl = 'NODE_URL';
const repositoryFactory = new RepositoryFactoryHttp(nodeUrl);
const tokenHttp = repositoryFactory.createTokenRepository();

tokenHttp.getToken(tokenId).subscribe(
  (tokenInfo) => console.log(tokenInfo),
  (err) => console.error(err),
);
/* end block 01 */
