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
import io.bitxor.sdk.api.TransactionRepository;
import io.bitxor.sdk.infrastructure.vertx.RepositoryFactoryVertxImpl;
import io.bitxor.sdk.model.account.Account;
import io.bitxor.sdk.model.account.Address;
import io.bitxor.sdk.model.account.UnresolvedAddress;
import io.bitxor.sdk.model.network.NetworkType;
import io.bitxor.sdk.model.message.PlainMessage;
import io.bitxor.sdk.model.token.Token;
import io.bitxor.sdk.model.token.TokenId;
import io.bitxor.sdk.model.transaction.SignedTransaction;
import io.bitxor.sdk.model.transaction.TransferTransaction;
import io.bitxor.sdk.model.transaction.TransferTransactionFactory;
import org.junit.jupiter.api.Test;

import java.math.BigInteger;
import java.util.Collections;
import java.util.concurrent.ExecutionException;

class SendingATransferTransaction {

    @Test
    void sendingATransferTransaction()
        throws ExecutionException, InterruptedException {
        /* start block 01 */
        // replace with node endpoint
        try (final RepositoryFactory repositoryFactory = new RepositoryFactoryVertxImpl(
                "NODE_URL")) {
            // replace with recipient address
            final String rawAddress = "BXRQ5E-YACWBP-CXKGIL-I6XWCH-DRFLTB-KUK34I-YJQ";
            final UnresolvedAddress recipientAddress = Address.createFromRawAddress(rawAddress);
            final NetworkType networkType = repositoryFactory.getNetworkType().toFuture().get();
            // replace with bitxor id
            final TokenId networkCurrencyTokenId = new TokenId("5E62990DCAC5BE8A");
            // replace with network currency divisibility
            final Integer networkCurrencyDivisibility = 6;
            // replace with relative amount of bitxor to send
            final BigInteger amount = BigInteger.valueOf(10);

            final Token token = new Token(networkCurrencyTokenId,
                    amount.multiply(BigInteger.valueOf(10).pow(networkCurrencyDivisibility)));
            final TransferTransaction transferTransaction = TransferTransactionFactory
                    .create(
                            networkType,
                            recipientAddress,
                            Collections.singletonList(token),
                            PlainMessage.create("This is a test message"))
                    .maxFee(BigInteger.valueOf(2000000)).build();
            /* end block 01 */

            /* start block 02 */
            // replace with private key
            final String privateKey = "1111111111111111111111111111111111111111111111111111111111111111";
            // replace with network generation hash
            final String generationHash = repositoryFactory.getGenerationHash().toFuture().get();

            final Account account = Account
                    .createFromPrivateKey(privateKey, networkType);
            final SignedTransaction signedTransaction = account
                    .sign(transferTransaction, generationHash);
            /* end block 02 */

            /* start block 03 */
            final TransactionRepository transactionRepository = repositoryFactory
                    .createTransactionRepository();
            transactionRepository.announce(signedTransaction).toFuture().get();
        }
        /* end block 03 */
    }
}

