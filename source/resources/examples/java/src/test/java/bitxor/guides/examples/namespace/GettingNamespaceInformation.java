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

package bitxor.guides.examples.namespace;

import io.bitxor.sdk.api.NamespaceRepository;
import io.bitxor.sdk.api.RepositoryFactory;
import io.bitxor.sdk.infrastructure.vertx.JsonHelperJackson2;
import io.bitxor.sdk.infrastructure.vertx.RepositoryFactoryVertxImpl;
import io.bitxor.sdk.model.namespace.NamespaceId;
import io.bitxor.sdk.model.namespace.NamespaceInfo;
import io.bitxor.sdk.model.transaction.JsonHelper;
import org.junit.jupiter.api.Test;

import java.net.MalformedURLException;
import java.util.concurrent.ExecutionException;

class GettingNamespaceInformation {

    @Test
    void gettingNamespaceInformation()
        throws ExecutionException, InterruptedException, MalformedURLException {

        /* start block 01 */
        try (final RepositoryFactory repositoryFactory = new RepositoryFactoryVertxImpl(
            "NODE_URL")) {
            // replace with namespace name
            final NamespaceId namespaceId = NamespaceId.createFromName("foo");

            final NamespaceRepository namespaceRepository = repositoryFactory
                .createNamespaceRepository();

            final NamespaceInfo namespaceInfo = namespaceRepository.getNamespace(namespaceId)
                .toFuture()
                .get();
            final JsonHelper helper = new JsonHelperJackson2();
            System.out.println(helper.prettyPrint(namespaceInfo));
        }
    }
    /* end block 01 */
}
