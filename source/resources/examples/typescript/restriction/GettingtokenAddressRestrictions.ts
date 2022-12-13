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
  Address,
  TokenAddressRestrictionItem,
  TokenId,
  RepositoryFactoryHttp,
} from 'bitxor-sdk';

/* start block 01 */
// replace with address
const rawAddress = 'BXRBDE-NCLKEB-ILBPWP-3JPB2X-NY64OE-7PYHHE-32I';
const address = Address.createFromRawAddress(rawAddress);
// replace with token id
const tokenIdHex = '634a8ac3fc2b65b3';
const tokenId = new TokenId(tokenIdHex);
// replace with node endpoint
const nodeUrl = 'NODE_URL';
const repositoryFactory = new RepositoryFactoryHttp(nodeUrl);
const restrictionHttp = repositoryFactory.createRestrictionTokenRepository();

const criteria = { tokenId, targetAddress: address };
restrictionHttp.search(criteria).subscribe(
  (tokenAddressRestrictions) => {
    if (tokenAddressRestrictions.data.length > 0) {
      tokenAddressRestrictions.data.forEach((tokenRestriction) => {
        tokenRestriction.restrictions.forEach(
          (value: TokenAddressRestrictionItem) => {
            console.log('\n', value.key, value.restrictionValue);
          },
        );
      });
    } else {
      console.log(
        '\n The address does not have token address restrictions assigned.',
      );
    }
  },
  (err) => console.log(err),
);
/* end block 01 */
