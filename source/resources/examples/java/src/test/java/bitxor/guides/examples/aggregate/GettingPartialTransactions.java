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

import io.bitxor.sdk.api.RepositoryFactory;
import io.bitxor.sdk.api.TransactionPaginationStreamer;
import io.bitxor.sdk.api.TransactionRepository;
import io.bitxor.sdk.api.TransactionSearchCriteria;
import io.bitxor.sdk.infrastructure.vertx.RepositoryFactoryVertxImpl;
import io.bitxor.sdk.model.transaction.Transaction;
import io.bitxor.sdk.model.transaction.TransactionGroup;
import java.util.List;
import org.junit.jupiter.api.Test;


class GettingPartialTransactions {

    @Test
    void example() throws Exception {

        try (final RepositoryFactory repositoryFactory = new RepositoryFactoryVertxImpl(
            "NODE_URL")) {
            // replace with recipient address

            /* start block 01 */
            TransactionRepository transactionHttp = repositoryFactory.createTransactionRepository();
            TransactionPaginationStreamer streamer = new TransactionPaginationStreamer(transactionHttp);
            List<Transaction> transactions = streamer.search(new TransactionSearchCriteria(TransactionGroup.PARTIAL))
                .toList().toFuture().get();
            System.out.println(transactions);
            /* end block 01 */

        }

    }
}

