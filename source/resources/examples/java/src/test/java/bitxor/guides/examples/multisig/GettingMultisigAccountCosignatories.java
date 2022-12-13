package bitxor.guides.examples.multisig;

import io.bitxor.sdk.api.MultisigRepository;
import io.bitxor.sdk.api.RepositoryFactory;
import io.bitxor.sdk.infrastructure.vertx.JsonHelperJackson2;
import io.bitxor.sdk.infrastructure.vertx.RepositoryFactoryVertxImpl;
import io.bitxor.sdk.model.account.Address;
import io.bitxor.sdk.model.account.MultisigAccountInfo;
import io.bitxor.sdk.model.transaction.JsonHelper;
import org.junit.jupiter.api.Test;

import java.util.concurrent.ExecutionException;

public class GettingMultisigAccountCosignatories {


    @Test
    void gettingMultisigAccountCosignatories()
        throws ExecutionException, InterruptedException {

        /* start block 01 */
        // replace with node endpoint
        try (final RepositoryFactory repositoryFactory = new RepositoryFactoryVertxImpl(
            "NODE_URL")) {

            final MultisigRepository multisigRepository = repositoryFactory
                .createMultisigRepository();

            // replace with multisig address
            final String rawAddress = "BXRG6L-KWXRA7-PSWUEE-ILQPG4-3V5CYZ-S5652T-JTUU";
            final Address address = Address.createFromRawAddress(rawAddress);

            final MultisigAccountInfo multisigAccountInfo = multisigRepository
                .getMultisigAccountInfo(address).toFuture().get();

            final JsonHelper helper = new JsonHelperJackson2();
            System.out.println(helper.prettyPrint(multisigAccountInfo));
            /* end block 01 */
        }

    }
}
