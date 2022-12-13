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
/* start block 01 */
// replace with namespace name
const namespaceId = new bitxor_sdk_1.NamespaceId('bitxor');
// replace with node endpoint
const nodeUrl = 'NODE_URL';
const repositoryFactory = new bitxor_sdk_1.RepositoryFactoryHttp(nodeUrl);
const metadataHttp = repositoryFactory.createMetadataRepository();
const searchCriteria = {
  targetId: namespaceId,
  metadataType: bitxor_sdk_1.MetadataType.Namespace,
};
metadataHttp.search(searchCriteria).subscribe(
  (metadataEntries) => {
    if (metadataEntries.pageSize > 0) {
      console.log('Page', metadataEntries.pageNumber);
      metadataEntries.data.map((entry) => {
        const metadataEntry = entry.metadataEntry;
        console.log('\n \n Key:\t', metadataEntry.scopedMetadataKey);
        console.log('\n ---');
        console.log('\n Value:\t', metadataEntry.value);
        console.log(
          '\n Sender Address:\t',
          metadataEntry.sourceAddress.pretty(),
        );
        console.log(
          '\n Target address:\t',
          metadataEntry.targetAddress.pretty(),
        );
        console.log(
          '\n Scoped metadata key:\t',
          metadataEntry.scopedMetadataKey.toHex(),
        );
        console.log('\n TargetId:\t', metadataEntry.targetId);
      });
    } else {
      console.log('\n The namespace does not have metadata entries assigned.');
    }
  },
  (err) => console.log(err),
);
/* end block 01 */
