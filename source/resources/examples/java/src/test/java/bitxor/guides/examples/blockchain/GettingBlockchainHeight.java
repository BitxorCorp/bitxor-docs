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

import io.bitxor.sdk.api.ChainRepository;
import io.bitxor.sdk.api.RepositoryFactory;
import io.bitxor.sdk.infrastructure.vertx.RepositoryFactoryVertxImpl;
import java.math.BigInteger;
import java.util.concurrent.ExecutionException;
import org.junit.jupiter.api.Test;

class GettingBlockchainHeight {

    @Test
    void gettingBlockchainHeight()
        throws ExecutionException, InterruptedException {
        /* start block 01 */
        // replace with node endpoint
        try (final RepositoryFactory repositoryFactory = new RepositoryFactoryVertxImpl(
            "NODE_URL")) {
            final ChainRepository chainRepository = repositoryFactory.createChainRepository();

            final BigInteger blockchainHeight = chainRepository.getBlockchainHeight()
                    .toFuture().get();

            System.out.print(blockchainHeight);
        }
        /* end block 01 */
    }
}
