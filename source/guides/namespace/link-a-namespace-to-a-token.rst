.. post:: 04 March, 2019
    :category: Namespace
    :tags: wallet, SDK, CLI
    :excerpt: 1
    :nocomments:

###############################
Linking a namespace to a token
###############################

Alias an token with a namespace so that others can reference it in a more friendly way when issuing transactions.

*************
Prerequisites
*************

- Complete the :doc:`getting started section <../../getting-started/setup-workstation>`.
- Create a new :ref:`account <setup-creating-a-test-account>`.
- Load the account with enough |networkcurrency| to pay for transaction fees.
- Create a :doc:`token <../../concepts/token>` with the account.
- Register a :doc:`namespace <../../concepts/namespace>` with the account.

************************************
Method #01: Using the Desktop Wallet
************************************

1. Click on "**Namespace**" on the left-side menu.

.. figure:: ../../resources/images/screenshots/desktop-link-token-1.gif
    :align: center
    :width: 800px

2. Click on the edit icon of the namespace you desire to link to a token. Click "**Link**".

3. Select "**Link a token**" as the alias type. Select the ID of the token you desire to connect to the namespace. Click "**Send**". Verify the information on the next page and enter your wallet password. Click "**Confirm**".

.. figure:: ../../resources/images/screenshots/desktop-link-token-2.gif
    :align: center
    :width: 800px

4. You can check that the token has been linked by going to the "**Token**" page. The name displayed for the token should be the linked namespace.

.. figure:: ../../resources/images/screenshots/desktop-link-token-3.gif
    :align: center
    :width: 800px

*************************
Method #02: Using the SDK
*************************

1. Open a new file and define the namespace identifier and the token identifier you want to alias.

.. note:: The account signing the transaction must own the namespace and token being aliased.

.. example-code::

    .. viewsource:: ../../resources/examples/typescript/namespace/LinkingANamespaceToAToken.ts
        :language: typescript
        :start-after:  /* start block 01 */
        :end-before: /* end block 01 */

    .. viewsource:: ../../resources/examples/typescript/namespace/LinkingANamespaceToAToken.js
        :language: javascript
        :start-after:  /* start block 01 */
        :end-before: /* end block 01 */

2. Then, announce the **AliasTransaction** that links the namespace and the token.

.. example-code::

    .. viewsource:: ../../resources/examples/typescript/namespace/LinkingANamespaceToAToken.ts
        :language: typescript
        :start-after:  /* start block 02 */
        :end-before: /* end block 02 */

    .. viewsource:: ../../resources/examples/typescript/namespace/LinkingANamespaceToAToken.js
        :language: javascript
        :start-after:  /* start block 02 */
        :end-before: /* end block 02 */

.. note:: If you want to unlink the alias, change alias action type to ``AliasActionType.Unlink``.

.. _sending-a-transfer-transaction-with-an-aliased-token:

3. Now you can send transactions using the namespace linked to the token instead of defining the complete TokenId.

.. example-code::

    .. viewsource:: ../../resources/examples/typescript/transfer/SendingATransferTransactionTokenAlias.ts
        :language: typescript
        :start-after:  /* start block 01 */
        :end-before: /* end block 01 */

    .. viewsource:: ../../resources/examples/typescript/transfer/SendingATransferTransactionTokenAlias.js
        :language: javascript
        :start-after:  /* start block 01 */
        :end-before: /* end block 01 */

    .. viewsource:: ../../resources/examples/java/src/test/java/bitxor/guides/examples/transfer/SendingATransferTransactionTokenAlias.java
        :language: java
        :start-after:  /* start block 01 */
        :end-before: /* end block 01 */

*************************
Method #03: Using the CLI
*************************

To link a namespace and a token, open a terminal window and run the following command.
Replace ``7cdf3b117a3c40cc`` with the token identifier and ``foo`` with the namespace name to be linked.

.. viewsource:: ../../resources/examples/bash/namespace/LinkNamespaceToken.sh
    :language: bash
    :start-after: #!/bin/sh


