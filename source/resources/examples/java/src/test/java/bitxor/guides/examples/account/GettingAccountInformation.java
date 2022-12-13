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

package bitxor.guides.examples.account;

import io.bitxor.sdk.api.AccountRepository;
import io.bitxor.sdk.api.RepositoryFactory;
import io.bitxor.sdk.infrastructure.vertx.JsonHelperJackson2;
import io.bitxor.sdk.infrastructure.vertx.RepositoryFactoryVertxImpl;
import io.bitxor.sdk.model.account.AccountInfo;
import io.bitxor.sdk.model.account.Address;
import io.bitxor.sdk.model.transaction.JsonHelper;
import org.junit.jupiter.api.Test;

import java.util.concurrent.ExecutionException;

class GettingAccountInformation {

    @Test
    void gettingAccountInformation()
        throws ExecutionException, InterruptedException {

        /* start block 01 */
        // replace with node endpoint
        try (final RepositoryFactory repositoryFactory = new RepositoryFactoryVertxImpl(
            "NODE_URL")) {
            final AccountRepository accountRepository = repositoryFactory
                .createAccountRepository();

            // Replace with an address
            final String rawAddress = "BXRQ5E-YACWBP-CXKGIL-I6XWCH-DRFLTB-KUK34I-YJQ";
            final Address address = Address.createFromRawAddress(rawAddress);
            final AccountInfo accountInfo = accountRepository
                .getAccountInfo(address).toFuture().get();
            final JsonHelper helper = new JsonHelperJackson2();
            System.out.println(helper.prettyPrint(accountInfo));
        }
        /* end block 01 */
    }
}
