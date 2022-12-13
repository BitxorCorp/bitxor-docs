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

package bitxor.guides.examples.restriction;

import io.bitxor.sdk.api.RepositoryFactory;
import io.bitxor.sdk.api.RestrictionAccountRepository;
import io.bitxor.sdk.infrastructure.vertx.JsonHelperJackson2;
import io.bitxor.sdk.infrastructure.vertx.RepositoryFactoryVertxImpl;
import io.bitxor.sdk.model.account.AccountRestrictions;
import io.bitxor.sdk.model.account.Address;
import io.bitxor.sdk.model.transaction.JsonHelper;
import org.junit.jupiter.api.Test;

import java.util.concurrent.ExecutionException;

class GettingAccountRestrictions {

    @Test
    void gettingAccountRestrictions()
            throws ExecutionException, InterruptedException {
        /* start block 01 */
        // replace with node endpoint
        try (final RepositoryFactory repositoryFactory = new RepositoryFactoryVertxImpl(
                "NODE_URL")) {
            final RestrictionAccountRepository restrictionRepository = repositoryFactory
                    .createRestrictionAccountRepository();

            // replace with address
            final String rawAddress = "BXRG6L-KWXRA7-PSWUEE-ILQPG4-3V5CYZ-S5652T-JTUU";
            final Address address = Address.createFromRawAddress(rawAddress);

            final AccountRestrictions restrictions = restrictionRepository
                    .getAccountRestrictions(address)
                    .toFuture().get();
            final JsonHelper helper = new JsonHelperJackson2();
            System.out.println(helper.prettyPrint(restrictions));
        }
        /* end block 01 */
    }
}
