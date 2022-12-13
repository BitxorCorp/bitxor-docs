.. post:: 16 Aug, 2018
    :category: Token
    :tags: wallet, SDK, CLI
    :excerpt: 1
    :nocomments:

#################
Creating a token
#################

Tokenize an asset using tokens.

*************
Prerequisites
*************

- Complete the :doc:`getting started section <../../getting-started/setup-workstation>`.
- Create a new :ref:`account <setup-creating-a-test-account>`.
- Load the account with enough |networkcurrency| to pay for transaction fees.

************************************
Method #01: Using the Desktop Wallet
************************************

1. Click on the "**Tokens**" tab from the left side menu.

2. Click on the "**Create new tokens**" tab on the top of the page.

.. figure:: ../../resources/images/screenshots/desktop-create-token-1.gif
    :align: center
    :width: 800px

3. Determine the properties of the token you desire to create.
You can read :doc:`"Token Properties" <../../concepts/token>` to decide how do you want to configure your token.
Click "**Send**".

.. figure:: ../../resources/images/screenshots/desktop-create-token-2.gif
    :align: center
    :width: 800px

4. Verify the information on the popup and enter your wallet password. Click "**Confirm**". This should send the transaction to the network.

.. figure:: ../../resources/images/screenshots/desktop-create-token-3.gif
    :align: center
    :width: 800px

5. When the transaction becomes confirmed, you can check to see that the token has been created by going back to the "**Owned tokens**" tab.

*************************
Method #02: Using the SDK
*************************

1. Open a new file and define a :ref:`tokendefinitiontransaction`.
This transaction defines the token properties your token will have.
You can read :ref:`Token Properties <configurable-token-properties>` to decide how do you want to configure your token.

.. example-code::

    .. viewsource:: ../../resources/examples/typescript/token/CreatingAToken.ts
        :language: typescript
        :start-after:  /* start block 01 */
        :end-before: /* end block 01 */

    .. viewsource:: ../../resources/examples/typescript/token/CreatingAToken.js
        :language: javascript
        :start-after:  /* start block 01 */
        :end-before: /* end block 01 */

    .. viewsource:: ../../resources/examples/java/src/test/java/bitxor/guides/examples/token/CreatingAToken.java
        :language: java
        :start-after:  /* start block 01 */
        :end-before: /* end block 01 */

2. Define a :ref:`tokensupplychangetransaction` to set the **initial supply**.
For instance, we can set it to **1,000,000** token units.

.. example-code::

    .. viewsource:: ../../resources/examples/typescript/token/CreatingAToken.ts
        :language: typescript
        :start-after:  /* start block 02 */
        :end-before: /* end block 02 */

    .. viewsource:: ../../resources/examples/typescript/token/CreatingAToken.js
        :language: javascript
        :start-after:  /* start block 02 */
        :end-before: /* end block 02 */

    .. viewsource:: ../../resources/examples/java/src/test/java/bitxor/guides/examples/token/CreatingAToken.java
        :language: java
        :start-after:  /* start block 02 */
        :end-before: /* end block 02 */

.. note:: |codename| works with **absolute amounts**. To get an absolute amount, multiply the number of assets you want to create by 10\ :sup:`divisibility`.  For example, if the token has **divisibility** 2, to create 10 units (relative) you should define 1000 (absolute) instead.

3. Announce both transactions together using an :ref:`aggregate-transaction`.
Include the network generation hash to make the transaction only valid for your network.
Open :term:`NODE_URL` ``/node/info`` in a new browser tab and copy the ``meta.networkGenerationHash`` value.

.. example-code::

    .. viewsource:: ../../resources/examples/typescript/token/CreatingAToken.ts
        :language: typescript
        :start-after:  /* start block 03 */
        :end-before: /* end block 03 */

    .. viewsource:: ../../resources/examples/typescript/token/CreatingAToken.js
        :language: javascript
        :start-after:  /* start block 03 */
        :end-before: /* end block 03 */

    .. viewsource:: ../../resources/examples/java/src/test/java/bitxor/guides/examples/token/CreatingAToken.java
        :language: java
        :start-after:  /* start block 03 */
        :end-before: /* end block 03 */

Once the transaction gets confirmed, you can try to :doc:`transfer <../transfer/sending-a-transfer-transaction>` one unit of the created token to another account, :doc:`modify the token properties <modifying-token-supply>` or :doc:`link a namespace to the token <creating-a-token>`.

*************************
Method #03: Using the CLI
*************************

Open a terminal window and run the following command.

.. viewsource:: ../../resources/examples/bash/token/CreatingAToken.sh
    :language: bash
    :start-after: #!/bin/sh
