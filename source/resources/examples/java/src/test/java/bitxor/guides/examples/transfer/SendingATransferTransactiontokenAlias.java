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

package bitxor.guides.examples.transfer;

import io.bitxor.sdk.api.RepositoryFactory;
import io.bitxor.sdk.infrastructure.vertx.RepositoryFactoryVertxImpl;
import io.bitxor.sdk.model.account.Account;
import io.bitxor.sdk.model.network.NetworkType;
import io.bitxor.sdk.model.message.PlainMessage;
import io.bitxor.sdk.model.token.Token;
import io.bitxor.sdk.model.namespace.NamespaceId;
import io.bitxor.sdk.model.transaction.TransferTransactionFactory;
import org.junit.jupiter.api.Test;

import java.math.BigInteger;
import java.util.Collections;
import java.util.concurrent.ExecutionException;

class SendingATransferTransactionTokenAlias {

    @Test
    void sendingATransferTransactionTokenAlias()
            throws ExecutionException, InterruptedException {
        // replace with node endpoint
        try (final RepositoryFactory repositoryFactory = new RepositoryFactoryVertxImpl(
                "NODE_URL")) {
            /* start block 01 */
            final NetworkType networkType = repositoryFactory.getNetworkType().toFuture().get();
            // replace with aliased token
            final String namespaceName = "foo";
            final NamespaceId tokenId = NamespaceId.createFromName(namespaceName);

            TransferTransactionFactory
                    .create(
                            networkType,
                            Account.generateNewAccount(networkType).getAddress(),
                            Collections.singletonList(
                                    new Token(tokenId, BigInteger.valueOf(10000000))),
                            PlainMessage.Empty)
                    .maxFee(BigInteger.valueOf(2000000)).build();
            /* end block 01 */
        }
    }
}

