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

package bitxor.guides.examples.restriction;

import io.bitxor.sdk.api.TokenRestrictionPaginationStreamer;
import io.bitxor.sdk.api.TokenRestrictionSearchCriteria;
import io.bitxor.sdk.api.RepositoryFactory;
import io.bitxor.sdk.api.RestrictionTokenRepository;
import io.bitxor.sdk.infrastructure.vertx.JsonHelperJackson2;
import io.bitxor.sdk.infrastructure.vertx.RepositoryFactoryVertxImpl;
import io.bitxor.sdk.model.token.TokenId;
import io.bitxor.sdk.model.restriction.TokenAddressRestriction;
import io.bitxor.sdk.model.restriction.TokenGlobalRestriction;
import io.bitxor.sdk.model.transaction.JsonHelper;
import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.List;
import java.util.concurrent.ExecutionException;

class GettingTokenGlobalRestrictions {

    @Test
    void gettingTokenGlobalRestrictions()
            throws ExecutionException, InterruptedException {
        /* start block 01 */
        // replace with node endpoint
        try (final RepositoryFactory repositoryFactory = new RepositoryFactoryVertxImpl(
                "NODE_URL")) {
            final RestrictionTokenRepository restrictionRepository = repositoryFactory
                    .createRestrictionTokenRepository();

            // replace with tokenId
            final String tokenIdHex = "634a8ac3fc2b65b3";
            final TokenId tokenId = new TokenId(tokenIdHex);

            TokenRestrictionSearchCriteria criteria = new TokenRestrictionSearchCriteria()
                .tokenId(tokenId);

            List<TokenGlobalRestriction> restrictions = TokenRestrictionPaginationStreamer
                .global(restrictionRepository, criteria).toList().toFuture().get();

            final JsonHelper helper = new JsonHelperJackson2();
            System.out.println(helper.prettyPrint(restrictions));
        }
        /* end block 01 */
    }
}
