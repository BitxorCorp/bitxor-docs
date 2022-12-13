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

class FirstApplication {

    @Test
    void firstApplication()
            throws ExecutionException, InterruptedException {
        /* start block 01 */
        // replace with node endpoint
        try (final RepositoryFactory repositoryFactory = new RepositoryFactoryVertxImpl(
                "NODE_URL")) {
            // replace with token id
            final String tokenIdHex = "7cdf3b117a3c40cc";
            final TokenId tokenId = new TokenId(tokenIdHex);

            // replace with customer address
            final String rawAddress = "BXRBDE-NCLKEB-ILBPWP-3JPB2X-NY64OE-7PYHHE-32I";
            final UnresolvedAddress recipientAddress = Address.createFromRawAddress(rawAddress);
            final NetworkType networkType = repositoryFactory.getNetworkType().toFuture().get();

            final Token token = new Token(tokenId, BigInteger.valueOf(1));
            final TransferTransaction transferTransaction = TransferTransactionFactory
                    .create(
                            networkType,
                            recipientAddress,
                            Collections.singletonList(token),
                            PlainMessage.create("Enjoy your ticket"))
                    .maxFee(BigInteger.valueOf(2000000)).build();
            /* end block 01 */

            /* start block 02 */
            // replace with ticket vendor private key
            final String privateKey = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
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

