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

package bitxor.guides.examples.token;

import io.bitxor.sdk.api.RepositoryFactory;
import io.bitxor.sdk.api.TransactionRepository;
import io.bitxor.sdk.infrastructure.vertx.RepositoryFactoryVertxImpl;
import io.bitxor.sdk.model.account.Account;
import io.bitxor.sdk.model.blockchain.BlockDuration;
import io.bitxor.sdk.model.network.NetworkType;
import io.bitxor.sdk.model.token.TokenFlags;
import io.bitxor.sdk.model.token.TokenId;
import io.bitxor.sdk.model.token.TokenNonce;
import io.bitxor.sdk.model.token.TokenSupplyChangeActionType;
import io.bitxor.sdk.model.transaction.*;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Arrays;
import java.util.concurrent.ExecutionException;

class CreatingAToken {

    @Test
    void creatingAToken()
        throws ExecutionException, InterruptedException {
        /* start block 01 */
        // replace with node endpoint
        try (final RepositoryFactory repositoryFactory = new RepositoryFactoryVertxImpl(
                "NODE_URL")) {
            final NetworkType networkType = repositoryFactory.getNetworkType().toFuture().get();
            // replace with private key
            final String privateKey = "1111111111111111111111111111111111111111111111111111111111111111";
            final Account account = Account
                    .createFromPrivateKey(privateKey, networkType);
            // replace with duration (in blocks)
            final BlockDuration duration = new BlockDuration(10);
            // replace with custom token flags
            final boolean isSupplyMutable = true;
            final boolean isTransferable = true;
            final boolean isRestrictable = true;
            // replace with custom divisibility
            final int divisibility = 0;

            final TokenNonce nonce = TokenNonce.createRandom();

            final TokenDefinitionTransaction tokenDefinitionTransaction = TokenDefinitionTransactionFactory
                    .create(networkType,
                            nonce,
                            TokenId.createFromNonce(nonce, account.getPublicAccount()),
                            TokenFlags.create(isSupplyMutable, isTransferable, isRestrictable),
                            divisibility,
                            duration)
                    .build();
            /* end block 01 */

            /* start block 02 */
            // replace with token units to increase
            final int delta = 1000000;
            final TokenSupplyChangeTransaction tokenSupplyChangeTransaction = TokenSupplyChangeTransactionFactory
                    .create(
                            networkType,
                            tokenDefinitionTransaction.getTokenId(),
                            TokenSupplyChangeActionType.INCREASE,
                            BigDecimal.valueOf(delta * Math.pow(10, divisibility)).toBigInteger())
                    .build();

            /* end block 02 */

            /* start block 03 */
            final AggregateTransaction aggregateTransaction = AggregateTransactionFactory
                    .createComplete(
                            networkType,
                            Arrays.asList(
                                tokenDefinitionTransaction.toAggregate(account.getPublicAccount()),
                                tokenSupplyChangeTransaction.toAggregate(account.getPublicAccount())
                            ))
                    .maxFee(BigInteger.valueOf(2000000)).build();

            final String generationHash = repositoryFactory.getGenerationHash().toFuture().get();
            final SignedTransaction signedTransaction = account
                    .sign(aggregateTransaction, generationHash);


            final TransactionRepository transactionRepository = repositoryFactory
                    .createTransactionRepository();
            transactionRepository.announce(signedTransaction).toFuture().get();
        }
        /* end block 03 */
    }
}
