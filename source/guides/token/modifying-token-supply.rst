.. post:: 18 Aug, 2018
    :category: Token
    :tags: wallet, SDK, CLI
    :excerpt: 1
    :nocomments:

###########################
Modifying the token supply
###########################

If a token was created with the "**Supply Mutable**" property, you can make more tokens or reduce the total supply.

*************
Prerequisites
*************

- Complete :doc:`creating a token guide <creating-a-token>`.
- Have registered a supply mutable token.

************************************
Method #01: Using the Desktop Wallet
************************************

1. Click on the "**Token**" tab on the left-side menu.

.. figure:: ../../resources/images/screenshots/modify-token-supply-1.gif
    :align: center
    :width: 800px

2. Click on the edit icon (represented by a pen) on the right side of the token that you desire to edit. Click "**modify supply**".
Note:

.. figure:: ../../resources/images/screenshots/modify-token-supply-2.gif
    :align: center
    :width: 800px

3. Select the "**Supply Change Direction**" to indicate whether you desire to increase or decrease the supply. Then enter the amount by you wish to edit the relative supply. Click "**Send**". Verify the information on the next page and enter your wallet password. Click "**Confirm**".

In our example, the relative supply is increased by 1,000,000. Since the divisibility property of the token is 0, the change in absolute supply is identical.

.. note:: If you enter a negative number, it will do the inverse of the indicated "**Supply Change Direction**". For example, if you choose to increase by -100, the relative supply will decrease by 100. To decrease the supply, the token owner must have at least the number of units to be removed.

.. figure:: ../../resources/images/screenshots/modify-token-supply-3.gif
    :align: center
    :width: 800px

4. You can verify the change in supply on the "**Tokens**" page. If you still see the old supply, try clicking on the update icon on the top right.

.. figure:: ../../resources/images/screenshots/modify-token-supply-4.gif
    :align: center
    :width: 800px

*************************
Method #02: Using the SDK
*************************

1. Define a :ref:`tokensupplychangetransaction` as in the next code snippet.
Then, replace the ``tokenId`` and ``divisibility`` with the current token properties.
Edit ``delta`` with the relative amount of tokens you want to increase.

.. example-code::

    .. viewsource:: ../../resources/examples/typescript/token/ModifyingTokenSupply.ts
        :language: typescript
        :start-after:  /* start block 01 */
        :end-before: /* end block 01 */

    .. viewsource:: ../../resources/examples/typescript/token/ModifyingTokenSupply.js
        :language: javascript
        :start-after:  /* start block 01 */
        :end-before: /* end block 01 */

    .. viewsource:: ../../resources/examples/java/src/test/java/bitxor/guides/examples/token/ModifyingTokenSupply.java
        :language: java
        :start-after:  /* start block 01 */
        :end-before: /* end block 01 */

.. note:: |codename| works with **absolute amounts**. To get an absolute amount, multiply the number of assets you want to increase/decrease by 10\ :sup:`divisibility`. For example, if the token has **divisibility** 2, to increase 10 units (relative) you should define 1000 (absolute) instead.

2. Sign the transaction with the token creator account and announce it to the network.

.. example-code::

    .. viewsource:: ../../resources/examples/typescript/token/ModifyingTokenSupply.ts
        :language: typescript
        :start-after:  /* start block 02 */
        :end-before: /* end block 02 */

    .. viewsource:: ../../resources/examples/typescript/token/ModifyingTokenSupply.js
        :language: javascript
        :start-after:  /* start block 02 */
        :end-before: /* end block 02 */

    .. viewsource:: ../../resources/examples/java/src/test/java/bitxor/guides/examples/token/ModifyingTokenSupply.java
        :language: java
        :start-after:  /* start block 02 */
        :end-before: /* end block 02 */

Otherwise, you can decrease a token supply by changing ``TokenSupplyChangeAction.Increase`` to ``TokenSupplyChangeAction.Decrease``.
In this second case, the token creator account must own at least ``delta`` units to decrease the token supply.

*************************
Method #03: Using the CLI
*************************

Open a terminal window and run the following command.

Replace ``7cdf3b117a3c40cc`` with the token identifier and ``1000000`` with the absolute units to be increased.

.. viewsource:: ../../resources/examples/bash/token/ModifyingTokenSupply.sh
    :language: bash
    :start-after: #!/bin/sh
