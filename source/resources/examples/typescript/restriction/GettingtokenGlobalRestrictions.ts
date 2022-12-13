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
  TokenGlobalRestriction,
  TokenGlobalRestrictionItem,
  TokenId,
  TokenRestrictionType,
  RepositoryFactoryHttp,
} from 'bitxor-sdk';

/* start block 01 */
// replace with token id
const tokenIdHex = '634a8ac3fc2b65b3';
const tokenId = new TokenId(tokenIdHex);
// replace with node endpoint
const nodeUrl = 'NODE_URL';
const repositoryFactory = new RepositoryFactoryHttp(nodeUrl);
const restrictionHttp = repositoryFactory.createRestrictionTokenRepository();

const criteria = { tokenId };
restrictionHttp.search(criteria).subscribe(
  (tokenGlobalRestrictions) => {
    if (tokenGlobalRestrictions.data.length > 0) {
      console.log(
        'Key\t',
        'Reference TokenId\t',
        'Restriction Type\t',
        'Restriction Value',
      );
      tokenGlobalRestrictions.data.forEach((tokenRestriction) => {
        if (tokenRestriction instanceof TokenGlobalRestriction) {
          tokenRestriction.restrictions.forEach(
            (value: TokenGlobalRestrictionItem) => {
              console.log(
                '\n',
                value.key,
                value.referenceTokenId.toHex(),
                TokenRestrictionType[value.restrictionType],
                value.restrictionValue,
              );
            },
          );
        }
      });
    } else {
      console.log(
        '\n The token does not have token global restrictions assigned.',
      );
    }
  },
  (err) => console.log(err),
);
/* end block 01 */
