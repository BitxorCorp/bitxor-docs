package bitxor.guides.examples.account;

import io.bitxor.sdk.api.AccountRepository;
import io.bitxor.sdk.api.RepositoryFactory;
import io.bitxor.sdk.api.TransactionPaginationStreamer;
import io.bitxor.sdk.api.TransactionRepository;
import io.bitxor.sdk.api.TransactionSearchCriteria;
import io.bitxor.sdk.infrastructure.vertx.RepositoryFactoryVertxImpl;
import io.bitxor.sdk.model.account.PublicAccount;
import io.bitxor.sdk.model.network.NetworkType;
import io.bitxor.sdk.model.transaction.Transaction;
import io.bitxor.sdk.model.transaction.TransactionGroup;
import io.reactivex.Observable;
import java.util.concurrent.ExecutionException;
import org.junit.jupiter.api.Test;

class GettingConfirmedTransactions {

    @Test
    void gettingAccountInformation()
        throws ExecutionException, InterruptedException {


        // replace with node endpoint
        try (final RepositoryFactory repositoryFactory = new RepositoryFactoryVertxImpl(
            "NODE_URL")) {

            /* start block 01 */
            // replace with signer public key
            NetworkType networkType = repositoryFactory.getNetworkType().toFuture().get();
            PublicAccount signer = PublicAccount.createFromPublicKey(
                "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
                networkType);
            /* end block 01 */

            /* start block 02 */
            final TransactionRepository transactionRepository = repositoryFactory
                .createTransactionRepository();

            TransactionPaginationStreamer streamer = new TransactionPaginationStreamer(
                transactionRepository);

            Observable<Transaction> transactions = streamer
                .search(new TransactionSearchCriteria(TransactionGroup.CONFIRMED)
                    .address(signer.getAddress()));

            System.out.println(transactions.toList().toFuture().get());
            /* end block 02 */
        }

    }
}
