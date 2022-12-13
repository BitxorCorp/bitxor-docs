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

package bitxor.guides.examples.metadata;

import io.bitxor.sdk.api.MetadataPaginationStreamer;
import io.bitxor.sdk.api.MetadataRepository;
import io.bitxor.sdk.api.MetadataSearchCriteria;
import io.bitxor.sdk.api.RepositoryFactory;
import io.bitxor.sdk.infrastructure.vertx.JsonHelperJackson2;
import io.bitxor.sdk.infrastructure.vertx.RepositoryFactoryVertxImpl;
import io.bitxor.sdk.model.metadata.Metadata;
import io.bitxor.sdk.model.token.TokenId;
import io.bitxor.sdk.model.transaction.JsonHelper;
import java.util.List;
import java.util.concurrent.ExecutionException;
import org.junit.jupiter.api.Test;

class GettingMetadataEntriesToken {

    @Test
    void gettingMetadataEntriesToken()
        throws ExecutionException, InterruptedException {
        /* start block 01 */
        // replace with node endpoint
        try (final RepositoryFactory repositoryFactory = new RepositoryFactoryVertxImpl(
            "NODE_URL")) {
            final MetadataRepository metadataRepository = repositoryFactory
                .createMetadataRepository();

            // replace with token id
            final String tokenIdHex = "0DC67FBE1CAD29E3";
            final TokenId tokenId = new TokenId(tokenIdHex);

            MetadataPaginationStreamer streamer = new MetadataPaginationStreamer(
                metadataRepository);
            MetadataSearchCriteria criteria = new MetadataSearchCriteria().targetId(tokenId);
            final List<Metadata> metadata = streamer
                .search(criteria).toList().toFuture().get();
            final JsonHelper helper = new JsonHelperJackson2();
            System.out.println(helper.prettyPrint(metadata));
        }
        /* end block 01 */
    }
}
