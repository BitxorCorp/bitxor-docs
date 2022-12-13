.. post:: 18 Aug, 2018
    :category: Account
    :tags: SDK
    :excerpt: 1
    :nocomments:

###############################################
Getting the amount of assets sent to an account
###############################################

Check the number of asset units you have sent to an account.

*************
Prerequisites
*************

- Complete the :doc:`getting started section <../../getting-started/setup-workstation>`.
- Create :ref:`a new account <setup-creating-a-test-account>`.
- Send :doc:`tokens <../transfer/sending-a-transfer-transaction>` from the account created to another account.

*************************
Method #01: Using the SDK
*************************

.. example-code::

    .. viewsource:: ../../resources/examples/typescript/account/GettingTheAmountOfAssetsSentToAnAccount.ts
        :language: typescript
        :start-after:  /* start block 01 */
        :end-before: /* end block 01 */

    .. viewsource:: ../../resources/examples/typescript/account/GettingTheAmountOfAssetsSentToAnAccount.js
        :language: javascript
        :start-after:  /* start block 01 */
        :end-before: /* end block 01 */

    .. viewsource:: ../../resources/examples/java/src/test/java/bitxor/guides/examples/account/GettingTheAmountOfAssetsSentToAnAccount.java
        :language: java
        :start-after:  /* start block 01 */
        :end-before: /* end block 01 */

If you want to check another :doc:`token <../../concepts/token>` different than the native currency, change ``tokenId`` and ``divisibility`` for the target token properties.

.. code-block:: typescript

    const tokenId = new TokenId('10293DE77C684F71');
    const divisibility = 2;
