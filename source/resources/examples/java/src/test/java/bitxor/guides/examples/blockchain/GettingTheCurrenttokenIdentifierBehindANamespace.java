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

package bitxor.guides.examples.blockchain;

import io.bitxor.sdk.api.NamespaceRepository;
import io.bitxor.sdk.api.RepositoryFactory;
import io.bitxor.sdk.infrastructure.vertx.RepositoryFactoryVertxImpl;
import io.bitxor.sdk.model.token.TokenId;
import io.bitxor.sdk.model.namespace.NamespaceId;
import org.junit.jupiter.api.Test;

import java.util.concurrent.ExecutionException;

class GettingTheCurrentTokenIdentifierBehindANamespace {

    @Test
    void gettingTheCurrentTokenIdentifierBehindANamespace()
        throws ExecutionException, InterruptedException {

        /* start block 01 */
        // replace with node endpoint
        try (final RepositoryFactory repositoryFactory = new RepositoryFactoryVertxImpl(
                "NODE_URL")) {
            final NamespaceRepository namespaceRepository = repositoryFactory.createNamespaceRepository();
            final NamespaceId namespaceId = NamespaceId.createFromName("bitxor");
            final TokenId tokenId = namespaceRepository.getLinkedTokenId(namespaceId)
                    .toFuture().get();
            System.out.print(tokenId.getIdAsHex());
        }
        /* end block 01 */
    }
}
