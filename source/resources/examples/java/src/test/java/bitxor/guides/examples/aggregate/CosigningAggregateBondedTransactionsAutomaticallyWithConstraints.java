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

package bitxor.guides.examples.aggregate;

import io.bitxor.sdk.api.Listener;
import io.bitxor.sdk.api.RepositoryFactory;
import io.bitxor.sdk.api.TransactionRepository;
import io.bitxor.sdk.infrastructure.vertx.RepositoryFactoryVertxImpl;
import io.bitxor.sdk.model.account.Account;
import io.bitxor.sdk.model.account.PublicAccount;
import io.bitxor.sdk.model.token.NetworkCurrency;
import io.bitxor.sdk.model.network.NetworkType;
import io.bitxor.sdk.model.transaction.AggregateTransaction;
import io.bitxor.sdk.model.transaction.CosignatureSignedTransaction;
import io.bitxor.sdk.model.transaction.CosignatureTransaction;
import io.bitxor.sdk.model.transaction.Transaction;
import io.bitxor.sdk.model.transaction.TransferTransaction;
import java.math.BigInteger;
import java.util.function.BiFunction;
import org.junit.jupiter.api.Test;

class CosigningAggregateBondedTransactionsAutomaticallyWithConstraints {

    @Test
    void example() throws Exception {

        try (final RepositoryFactory repositoryFactory = new RepositoryFactoryVertxImpl(
            "NODE_URL")) {
            // replace with recipient address

            /* start block 01 */

            NetworkCurrency networkCurrency = repositoryFactory.getNetworkCurrency().toFuture().get();

            BiFunction<Transaction, PublicAccount, Boolean> validTransaction = ((transaction, account) -> {
                if (transaction instanceof TransferTransaction) {
                    return false;
                }
                if (transaction.getSigner().map(s -> !s.equals(account)).orElse(true)) {
                    return false;
                }

                TransferTransaction transferTransaction = (TransferTransaction) transaction;
                return transferTransaction.getTokens().size() == 1 && transferTransaction.getTokens().stream()
                    .allMatch(m -> {
                        BigInteger maxBalance = networkCurrency.createAbsolute(BigInteger.valueOf(100)).getAmount();
                        if (m.getAmount().compareTo(maxBalance) > 0) {
                            return false;
                        }
                        return networkCurrency.getTokenId().map(tokenId -> tokenId.equals(m.getId())).orElse(false)
                            || networkCurrency.getNamespaceId().map(namespaceId -> namespaceId.equals(m.getId()))
                            .orElse(false);
                    });

            });

            BiFunction<AggregateTransaction, Account, CosignatureSignedTransaction> cosignAggregateBondedTransaction = ((transaction, account) -> CosignatureTransaction
                .create(transaction).signWith(account));

            NetworkType networkType = repositoryFactory.getNetworkType().toFuture().get();
            // replace with cosigner private key
            String privateKey = "";
            Account account = Account.createFromPrivateKey(privateKey, networkType);

            TransactionRepository transactionRepository = repositoryFactory.createTransactionRepository();

            try (Listener listener = repositoryFactory.createListener()) {
                listener.open().get();
                listener.aggregateBondedAdded(account.getAddress())
                    .filter(a -> a.signedByAccount(account.getPublicAccount())).filter(
                    a -> a.getInnerTransactions().stream()
                        .anyMatch(t -> validTransaction.apply(t, account.getPublicAccount())))
                    .map(a -> cosignAggregateBondedTransaction.apply(a, account))
                    .flatMap(transactionRepository::announceAggregateBondedCosignature).toFuture().get();
            }

            /* end block 01 */

        }

    }
}
