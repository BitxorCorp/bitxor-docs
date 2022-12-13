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
import io.bitxor.sdk.model.account.Address;
import io.bitxor.sdk.model.account.UnresolvedAddress;
import io.bitxor.sdk.model.network.NetworkType;
import io.bitxor.sdk.model.message.PlainMessage;
import io.bitxor.sdk.model.token.Token;
import io.bitxor.sdk.model.token.TokenId;
import io.bitxor.sdk.model.transaction.TransferTransactionFactory;
import org.junit.jupiter.api.Test;

import java.math.BigInteger;
import java.util.Arrays;
import java.util.concurrent.ExecutionException;

class SendingATransferTransactionWithMultipleTokens {

    @Test
    void sendingATransferTransactionWithMultipleTokens()
            throws ExecutionException, InterruptedException {
        // replace with node endpoint
        try (final RepositoryFactory repositoryFactory = new RepositoryFactoryVertxImpl(
                "NODE_URL")) {
            // replace with recipient address
            final String rawAddress = "BXRQ5E-YACWBP-CXKGIL-I6XWCH-DRFLTB-KUK34I-YJQ";
            final UnresolvedAddress recipientAddress = Address.createFromRawAddress(rawAddress);
            final NetworkType networkType = repositoryFactory.getNetworkType().toFuture().get();

            TransferTransactionFactory
                    .create(
                            networkType,
                            recipientAddress,
                            /* start block 01 */
                            Arrays.asList(new Token(new TokenId("7CDF3B117A3C40CC"),
                                            BigInteger.valueOf(1000)),
                                    new Token(new TokenId("5E62990DCAC5BE8A"),
                                            BigInteger.valueOf(10000000))),
                            /* end block 01 */
                            PlainMessage.create("This is a test message"))
                    .maxFee(BigInteger.valueOf(2000000)).build();
        }
    }
}

