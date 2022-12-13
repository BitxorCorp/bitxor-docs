#############
Serialization
#############

The `catbuffer schemas <https://github.com/bitxorcorp/bitxor/tree/dev/catbuffer/schemas>`_ repository defines how the different Bitxor
entities type should be serialized (for example, Transactions). In combination with the catbuffer generators project, developers can
generate builder classes for a given set of programming languages.

.. raw:: html

   <style>.bs-sidenav ul ul ul > li {display: none;}</style>
   <div id="serialization">

Basic Types
***********

.. raw:: html

   <div class="big-table3">
   <div id="amount"><b>Amount</b></div>
   <div>8&nbsp;ubytes</div>
   <div class="description"><p>A quantity of tokens in <a href="/concepts/token.html#divisibility">absolute units</a>. <br/>It can only be positive or zero. Negative quantities must be indicated by other means (See for example <a href="/serialization#tokensupplychangetransaction" title="Change the total supply of a token.">TokenSupplyChangeTransaction</a> and <a href="/serialization#tokensupplychangeaction" title="Enumeration of token supply change actions.">TokenSupplyChangeAction</a>). </p></div>
   <div id="blockduration"><b>BlockDuration</b></div>
   <div>8&nbsp;ubytes</div>
   <div class="description"><p>A time lapse, expressed in number of blocks. </p></div>
   <div id="blockfeemultiplier"><b>BlockFeeMultiplier</b></div>
   <div>4&nbsp;ubytes</div>
   <div class="description"><p>Multiplier applied to the size of a transaction to obtain its fee, in <a href="/concepts/token.html#divisibility">absolute units</a>. <br/>See the <a href="/concepts/fees.html">fees documentation</a>. </p></div>
   <div id="difficulty"><b>Difficulty</b></div>
   <div>8&nbsp;ubytes</div>
   <div class="description"><p>How hard it was to harvest this block. <br/>The initial value is 1e14 and it will remain like this as long as blocks are generated every <code class="docutils literal">blockGenerationTargetTime</code> seconds (<a href="/guides/network/configuring-network-properties.html">network property</a>). <br/>If blocks start taking more or less time than the configured value, the difficulty will be adjusted (in the range of 1e13 to 1e15) to try to hit the target time. <br/>See the <a href="/bitxor-technicalref/main.pdf">Technical Reference</a> section 8.1. </p></div>
   <div id="finalizationepoch"><b>FinalizationEpoch</b></div>
   <div>4&nbsp;ubytes</div>
   <div class="description"><p>Index of a <a href="/concepts/block.html#finalization">finalization</a> epoch. <br/>The first epoch is number 1 and contains only the first block (the <a href="/concepts/block.html#block-creation">Genesis</a> block). Epoch duration (in blocks) is defined by the <code class="docutils literal">votingSetGrouping</code> network property. </p></div>
   <div id="finalizationpoint"><b>FinalizationPoint</b></div>
   <div>4&nbsp;ubytes</div>
   <div class="description"><p>A particular point in time inside a <a href="/concepts/block.html#finalization">finalization</a> epoch. <br/>See the <a href="/bitxor-technicalref/main.pdf">Technical Reference</a> section 15.2. </p></div>
   <div id="height"><b>Height</b></div>
   <div>8&nbsp;ubytes</div>
   <div class="description"><p>Index of a block in the blockchain. <br/>The first block (the <a href="/concepts/block.html#block-creation">Genesis</a> block) has height 1 and each subsequent block increases height by 1. </p></div>
   <div id="importance"><b>Importance</b></div>
   <div>8&nbsp;ubytes</div>
   <div class="description"><p><a href="/concepts/consensus-algorithm.html#importance-score">Importance score</a> for an account. <br/>See also <a href="/serialization#importanceheight" title="Block height at which an Importance was calculated.">ImportanceHeight</a> and <a href="/serialization#importancesnapshot" title="temporal importance information">ImportanceSnapshot</a>. </p></div>
   <div id="importanceheight"><b>ImportanceHeight</b></div>
   <div>8&nbsp;ubytes</div>
   <div class="description"><p>Block height at which an <a href="/serialization#importance" title="Importance score for an account.">Importance</a> was calculated. </p></div>
   <div id="unresolvedtokenid"><b>UnresolvedTokenId</b></div>
   <div>8&nbsp;ubytes</div>
   <div class="description"><p>Either a <a href="/serialization#tokenid" title="A Token identifier.">TokenId</a> or a <a href="/serialization#namespaceid" title="">NamespaceId</a>. <br/>The <strong>most</strong>-significant bit of the first byte is 0 for <a href="/serialization#tokenid" title="A Token identifier.">TokenId</a>'s and 1 for <a href="/serialization#namespaceid" title="">NamespaceId</a>'s. </p></div>
   <div id="tokenid"><b>TokenId</b></div>
   <div>8&nbsp;ubytes</div>
   <div class="description"><p>A <a href="/concepts/token.html">Token</a> identifier. </p></div>
   <div id="timestamp"><b>Timestamp</b></div>
   <div>8&nbsp;ubytes</div>
   <div class="description"><p>Number of milliseconds elapsed since the creation of the <a href="/concepts/block.html#block-creation">Genesis</a> block. <br/>The Genesis block creation time can be found in the <code class="docutils literal">epochAdjustment</code> field returned by the <a href="/bitxor-openapi/v1.0.1/#operation/getNetworkProperties">/network/properties</a> REST endpoint. This is the number of seconds elapsed since the <a href="https://en.wikipedia.org/wiki/Unix_time">UNIX epoch</a> and it is always 1615853185 for Bitxor's MAINNET. </p></div>
   <div id="unresolvedaddress"><b>UnresolvedAddress</b></div>
   <div>24&nbsp;ubytes</div>
   <div class="description"><p>Either an <a href="/serialization#address" title="An address identifies an account and is derived from its PublicKey.">Address</a> or a <a href="/serialization#namespaceid" title="">NamespaceId</a>. <br/>The <strong>least</strong>-significant bit of the first byte is 0 for Addresses and 1 for <a href="/serialization#namespaceid" title="">NamespaceId</a>'s. </p></div>
   <div id="address"><b>Address</b></div>
   <div>24&nbsp;ubytes</div>
   <div class="description"><p>An <a href="/concepts/cryptography.html#address">address</a> identifies an account and is derived from its <a href="/serialization#publickey" title="A 32-byte (256 bit) integer derived from a private key.">PublicKey</a>. </p></div>
   <div id="hash256"><b>Hash256</b></div>
   <div>32&nbsp;ubytes</div>
   <div class="description"><p>A 32-byte (256 bit) hash. <br/>The exact algorithm is unspecified as it can change depending on where it is used. </p></div>
   <div id="hash512"><b>Hash512</b></div>
   <div>64&nbsp;ubytes</div>
   <div class="description"><p>A 64-byte (512 bit) hash. <br/>The exact algorithm is unspecified as it can change depending on where it is used. </p></div>
   <div id="publickey"><b>PublicKey</b></div>
   <div>32&nbsp;ubytes</div>
   <div class="description"><p>A 32-byte (256 bit) integer derived from a private key. <br/>It serves as the public identifier of the <a href="/concepts/cryptography.html#key-pair">key pair</a> and can be disseminated widely. It is used to prove that an entity was signed with the paired private key. </p></div>
   <div id="votingpublickey"><b>VotingPublicKey</b></div>
   <div>32&nbsp;ubytes</div>
   <div class="description"><p>A <a href="/serialization#publickey" title="A 32-byte (256 bit) integer derived from a private key.">PublicKey</a> used for voting during the <a href="/concepts/block.html#finalization">finalization process</a>. </p></div>
   <div id="signature"><b>Signature</b></div>
   <div>64&nbsp;ubytes</div>
   <div class="description"><p>A 64-byte (512 bit) array certifying that the signed data has not been modified. <br/>Bitxor currently uses <a href="https://ed25519.cr.yp.to/">Ed25519</a> signatures. </p></div>
   <div id="proofgamma"><b>ProofGamma</b></div>
   <div>32&nbsp;ubytes</div>
   <div class="description"></div>
   <div id="proofverificationhash"><b>ProofVerificationHash</b></div>
   <div>16&nbsp;ubytes</div>
   <div class="description"></div>
   <div id="proofscalar"><b>ProofScalar</b></div>
   <div>32&nbsp;ubytes</div>
   <div class="description"></div>
   <div id="namespaceid"><b>NamespaceId</b></div>
   <div>8&nbsp;ubytes</div>
   <div class="description"></div>
   <div id="scopedmetadatakey"><b>ScopedMetadataKey</b></div>
   <div>8&nbsp;ubytes</div>
   <div class="description"></div>
   <div id="tokennonce"><b>TokenNonce</b></div>
   <div>4&nbsp;ubytes</div>
   <div class="description"></div>
   <div id="tokenrestrictionkey"><b>TokenRestrictionKey</b></div>
   <div>8&nbsp;ubytes</div>
   <div class="description"></div>
   </div>

Enumerations
************

.. _linkaction:

LinkAction
==========

.. raw:: html
   :file: LinkAction.html

.. _networktype:

NetworkType
===========

.. raw:: html
   :file: NetworkType.html

.. _blocktype:

BlockType
=========

.. raw:: html
   :file: BlockType.html

.. _receipttype:

ReceiptType
===========

.. raw:: html
   :file: ReceiptType.html

.. _namespaceregistrationtype:

NamespaceRegistrationType
=========================

.. raw:: html
   :file: NamespaceRegistrationType.html

.. _aliasaction:

AliasAction
===========

.. raw:: html
   :file: AliasAction.html

.. _accounttype:

AccountType
===========

.. raw:: html
   :file: AccountType.html

.. _accountkeytypeflags:

AccountKeyTypeFlags
===================

.. raw:: html
   :file: AccountKeyTypeFlags.html

.. _accountstateformat:

AccountStateFormat
==================

.. raw:: html
   :file: AccountStateFormat.html

.. _lockstatus:

LockStatus
==========

.. raw:: html
   :file: LockStatus.html

.. _metadatatype:

MetadataType
============

.. raw:: html
   :file: MetadataType.html

.. _tokenflags:

TokenFlags
===========

.. raw:: html
   :file: TokenFlags.html

.. _tokensupplychangeaction:

TokenSupplyChangeAction
========================

.. raw:: html
   :file: TokenSupplyChangeAction.html

.. _namespacealiastype:

NamespaceAliasType
==================

.. raw:: html
   :file: NamespaceAliasType.html

.. _accountrestrictionflags:

AccountRestrictionFlags
=======================

.. raw:: html
   :file: AccountRestrictionFlags.html

.. _transactiontype:

TransactionType
===============

.. raw:: html
   :file: TransactionType.html

.. _tokenrestrictiontype:

TokenRestrictionType
=====================

.. raw:: html
   :file: TokenRestrictionType.html

.. _tokenrestrictionentrytype:

TokenRestrictionEntryType
==========================

.. raw:: html
   :file: TokenRestrictionEntryType.html

.. _lockhashalgorithm:

LockHashAlgorithm
=================

.. raw:: html
   :file: LockHashAlgorithm.html

Structures
**********

.. _token:

Token
======

.. raw:: html
   :file: Token.html

.. _unresolvedtoken:

UnresolvedToken
================

.. raw:: html
   :file: UnresolvedToken.html

.. _vrfproof:

VrfProof
========

.. raw:: html
   :file: VrfProof.html

.. _genesisblockheader:

GenesisBlockHeader
==================

.. raw:: html
   :file: GenesisBlockHeader.html

.. _normalblockheader:

NormalBlockHeader
=================

.. raw:: html
   :file: NormalBlockHeader.html

.. _importanceblockheader:

ImportanceBlockHeader
=====================

.. raw:: html
   :file: ImportanceBlockHeader.html

.. _finalizationround:

FinalizationRound
=================

.. raw:: html
   :file: FinalizationRound.html

.. _finalizedblockheader:

FinalizedBlockHeader
====================

.. raw:: html
   :file: FinalizedBlockHeader.html

.. _balancetransferreceipt:

BalanceTransferReceipt
======================

.. raw:: html
   :file: BalanceTransferReceipt.html

.. _balancechangereceipt:

BalanceChangeReceipt
====================

.. raw:: html
   :file: BalanceChangeReceipt.html

.. _inflationreceipt:

InflationReceipt
================

.. raw:: html
   :file: InflationReceipt.html

.. _tokenexpiryreceipt:

TokenExpiryReceipt
===================

.. raw:: html
   :file: TokenExpiryReceipt.html

.. _namespaceexpiryreceipt:

NamespaceExpiryReceipt
======================

.. raw:: html
   :file: NamespaceExpiryReceipt.html

.. _receiptsource:

ReceiptSource
=============

.. raw:: html
   :file: ReceiptSource.html

.. _addressresolutionentry:

AddressResolutionEntry
======================

.. raw:: html
   :file: AddressResolutionEntry.html

.. _tokenresolutionentry:

TokenResolutionEntry
=====================

.. raw:: html
   :file: TokenResolutionEntry.html

.. _tokenresolutionstatement:

TokenResolutionStatement
=========================

.. raw:: html
   :file: TokenResolutionStatement.html

.. _addressresolutionstatement:

AddressResolutionStatement
==========================

.. raw:: html
   :file: AddressResolutionStatement.html

.. _pinnedvotingkey:

PinnedVotingKey
===============

.. raw:: html
   :file: PinnedVotingKey.html

.. _importancesnapshot:

ImportanceSnapshot
==================

.. raw:: html
   :file: ImportanceSnapshot.html

.. _heightactivitybucket:

HeightActivityBucket
====================

.. raw:: html
   :file: HeightActivityBucket.html

.. _heightactivitybuckets:

HeightActivityBuckets
=====================

.. raw:: html
   :file: HeightActivityBuckets.html

.. _accountstate:

AccountState
============

.. raw:: html
   :file: AccountState.html

.. _hashlockinfo:

HashLockInfo
============

.. raw:: html
   :file: HashLockInfo.html

.. _metadatavalue:

MetadataValue
=============

.. raw:: html
   :file: MetadataValue.html

.. _metadataentry:

MetadataEntry
=============

.. raw:: html
   :file: MetadataEntry.html

.. _tokenproperties:

TokenProperties
================

.. raw:: html
   :file: TokenProperties.html

.. _tokendefinition:

TokenDefinition
================

.. raw:: html
   :file: TokenDefinition.html

.. _tokenentry:

TokenEntry
===========

.. raw:: html
   :file: TokenEntry.html

.. _multisigentry:

MultisigEntry
=============

.. raw:: html
   :file: MultisigEntry.html

.. _namespacelifetime:

NamespaceLifetime
=================

.. raw:: html
   :file: NamespaceLifetime.html

.. _namespacealias:

NamespaceAlias
==============

.. raw:: html
   :file: NamespaceAlias.html

.. _namespacepath:

NamespacePath
=============

.. raw:: html
   :file: NamespacePath.html

.. _rootnamespacehistory:

RootNamespaceHistory
====================

.. raw:: html
   :file: RootNamespaceHistory.html

.. _accountrestrictionaddressvalue:

AccountRestrictionAddressValue
==============================

.. raw:: html
   :file: AccountRestrictionAddressValue.html

.. _accountrestrictiontokenvalue:

AccountRestrictionTokenValue
=============================

.. raw:: html
   :file: AccountRestrictionTokenValue.html

.. _accountrestrictiontransactiontypevalue:

AccountRestrictionTransactionTypeValue
======================================

.. raw:: html
   :file: AccountRestrictionTransactionTypeValue.html

.. _accountrestrictionsinfo:

AccountRestrictionsInfo
=======================

.. raw:: html
   :file: AccountRestrictionsInfo.html

.. _accountrestrictions:

AccountRestrictions
===================

.. raw:: html
   :file: AccountRestrictions.html

.. _addresskeyvalue:

AddressKeyValue
===============

.. raw:: html
   :file: AddressKeyValue.html

.. _addresskeyvalueset:

AddressKeyValueSet
==================

.. raw:: html
   :file: AddressKeyValueSet.html

.. _restrictionrule:

RestrictionRule
===============

.. raw:: html
   :file: RestrictionRule.html

.. _globalkeyvalue:

GlobalKeyValue
==============

.. raw:: html
   :file: GlobalKeyValue.html

.. _globalkeyvalueset:

GlobalKeyValueSet
=================

.. raw:: html
   :file: GlobalKeyValueSet.html

.. _tokenaddressrestrictionentry:

TokenAddressRestrictionEntry
=============================

.. raw:: html
   :file: TokenAddressRestrictionEntry.html

.. _tokenglobalrestrictionentry:

TokenGlobalRestrictionEntry
============================

.. raw:: html
   :file: TokenGlobalRestrictionEntry.html

.. _tokenrestrictionentry:

TokenRestrictionEntry
======================

.. raw:: html
   :file: TokenRestrictionEntry.html

.. _secretlockinfo:

SecretLockInfo
==============

.. raw:: html
   :file: SecretLockInfo.html

.. _accountkeylinktransaction:

AccountKeyLinkTransaction
=========================

.. raw:: html
   :file: AccountKeyLinkTransaction.html

.. _embeddedaccountkeylinktransaction:

EmbeddedAccountKeyLinkTransaction
=================================

.. raw:: html
   :file: EmbeddedAccountKeyLinkTransaction.html

.. _nodekeylinktransaction:

NodeKeyLinkTransaction
======================

.. raw:: html
   :file: NodeKeyLinkTransaction.html

.. _embeddednodekeylinktransaction:

EmbeddedNodeKeyLinkTransaction
==============================

.. raw:: html
   :file: EmbeddedNodeKeyLinkTransaction.html

.. _detachedcosignature:

DetachedCosignature
===================

.. raw:: html
   :file: DetachedCosignature.html

.. _aggregatecompletetransaction:

AggregateCompleteTransaction
============================

.. raw:: html
   :file: AggregateCompleteTransaction.html

.. _aggregatebondedtransaction:

AggregateBondedTransaction
==========================

.. raw:: html
   :file: AggregateBondedTransaction.html

.. _votingkeylinktransaction:

VotingKeyLinkTransaction
========================

.. raw:: html
   :file: VotingKeyLinkTransaction.html

.. _embeddedvotingkeylinktransaction:

EmbeddedVotingKeyLinkTransaction
================================

.. raw:: html
   :file: EmbeddedVotingKeyLinkTransaction.html

.. _vrfkeylinktransaction:

VrfKeyLinkTransaction
=====================

.. raw:: html
   :file: VrfKeyLinkTransaction.html

.. _embeddedvrfkeylinktransaction:

EmbeddedVrfKeyLinkTransaction
=============================

.. raw:: html
   :file: EmbeddedVrfKeyLinkTransaction.html

.. _hashlocktransaction:

HashLockTransaction
===================

.. raw:: html
   :file: HashLockTransaction.html

.. _embeddedhashlocktransaction:

EmbeddedHashLockTransaction
===========================

.. raw:: html
   :file: EmbeddedHashLockTransaction.html

.. _secretlocktransaction:

SecretLockTransaction
=====================

.. raw:: html
   :file: SecretLockTransaction.html

.. _embeddedsecretlocktransaction:

EmbeddedSecretLockTransaction
=============================

.. raw:: html
   :file: EmbeddedSecretLockTransaction.html

.. _secretprooftransaction:

SecretProofTransaction
======================

.. raw:: html
   :file: SecretProofTransaction.html

.. _embeddedsecretprooftransaction:

EmbeddedSecretProofTransaction
==============================

.. raw:: html
   :file: EmbeddedSecretProofTransaction.html

.. _accountmetadatatransaction:

AccountMetadataTransaction
==========================

.. raw:: html
   :file: AccountMetadataTransaction.html

.. _embeddedaccountmetadatatransaction:

EmbeddedAccountMetadataTransaction
==================================

.. raw:: html
   :file: EmbeddedAccountMetadataTransaction.html

.. _tokenmetadatatransaction:

TokenMetadataTransaction
=========================

.. raw:: html
   :file: TokenMetadataTransaction.html

.. _embeddedtokenmetadatatransaction:

EmbeddedTokenMetadataTransaction
=================================

.. raw:: html
   :file: EmbeddedTokenMetadataTransaction.html

.. _namespacemetadatatransaction:

NamespaceMetadataTransaction
============================

.. raw:: html
   :file: NamespaceMetadataTransaction.html

.. _embeddednamespacemetadatatransaction:

EmbeddedNamespaceMetadataTransaction
====================================

.. raw:: html
   :file: EmbeddedNamespaceMetadataTransaction.html

.. _tokendefinitiontransaction:

TokenDefinitionTransaction
===========================

.. raw:: html
   :file: TokenDefinitionTransaction.html

.. _embeddedtokendefinitiontransaction:

EmbeddedTokenDefinitionTransaction
===================================

.. raw:: html
   :file: EmbeddedTokenDefinitionTransaction.html

.. _tokensupplychangetransaction:

TokenSupplyChangeTransaction
=============================

.. raw:: html
   :file: TokenSupplyChangeTransaction.html

.. _embeddedtokensupplychangetransaction:

EmbeddedTokenSupplyChangeTransaction
=====================================

.. raw:: html
   :file: EmbeddedTokenSupplyChangeTransaction.html

.. _tokensupplyrevocationtransaction:

TokenSupplyRevocationTransaction
=================================

.. raw:: html
   :file: TokenSupplyRevocationTransaction.html

.. _embeddedtokensupplyrevocationtransaction:

EmbeddedTokenSupplyRevocationTransaction
=========================================

.. raw:: html
   :file: EmbeddedTokenSupplyRevocationTransaction.html

.. _multisigaccountmodificationtransaction:

MultisigAccountModificationTransaction
======================================

.. raw:: html
   :file: MultisigAccountModificationTransaction.html

.. _embeddedmultisigaccountmodificationtransaction:

EmbeddedMultisigAccountModificationTransaction
==============================================

.. raw:: html
   :file: EmbeddedMultisigAccountModificationTransaction.html

.. _addressaliastransaction:

AddressAliasTransaction
=======================

.. raw:: html
   :file: AddressAliasTransaction.html

.. _embeddedaddressaliastransaction:

EmbeddedAddressAliasTransaction
===============================

.. raw:: html
   :file: EmbeddedAddressAliasTransaction.html

.. _tokenaliastransaction:

TokenAliasTransaction
======================

.. raw:: html
   :file: TokenAliasTransaction.html

.. _embeddedtokenaliastransaction:

EmbeddedTokenAliasTransaction
==============================

.. raw:: html
   :file: EmbeddedTokenAliasTransaction.html

.. _namespaceregistrationtransaction:

NamespaceRegistrationTransaction
================================

.. raw:: html
   :file: NamespaceRegistrationTransaction.html

.. _embeddednamespaceregistrationtransaction:

EmbeddedNamespaceRegistrationTransaction
========================================

.. raw:: html
   :file: EmbeddedNamespaceRegistrationTransaction.html

.. _accountaddressrestrictiontransaction:

AccountAddressRestrictionTransaction
====================================

.. raw:: html
   :file: AccountAddressRestrictionTransaction.html

.. _embeddedaccountaddressrestrictiontransaction:

EmbeddedAccountAddressRestrictionTransaction
============================================

.. raw:: html
   :file: EmbeddedAccountAddressRestrictionTransaction.html

.. _accounttokenrestrictiontransaction:

AccountTokenRestrictionTransaction
===================================

.. raw:: html
   :file: AccountTokenRestrictionTransaction.html

.. _embeddedaccounttokenrestrictiontransaction:

EmbeddedAccountTokenRestrictionTransaction
===========================================

.. raw:: html
   :file: EmbeddedAccountTokenRestrictionTransaction.html

.. _accountoperationrestrictiontransaction:

AccountOperationRestrictionTransaction
======================================

.. raw:: html
   :file: AccountOperationRestrictionTransaction.html

.. _embeddedaccountoperationrestrictiontransaction:

EmbeddedAccountOperationRestrictionTransaction
==============================================

.. raw:: html
   :file: EmbeddedAccountOperationRestrictionTransaction.html

.. _tokenaddressrestrictiontransaction:

TokenAddressRestrictionTransaction
===================================

.. raw:: html
   :file: TokenAddressRestrictionTransaction.html

.. _embeddedtokenaddressrestrictiontransaction:

EmbeddedTokenAddressRestrictionTransaction
===========================================

.. raw:: html
   :file: EmbeddedTokenAddressRestrictionTransaction.html

.. _tokenglobalrestrictiontransaction:

TokenGlobalRestrictionTransaction
==================================

.. raw:: html
   :file: TokenGlobalRestrictionTransaction.html

.. _embeddedtokenglobalrestrictiontransaction:

EmbeddedTokenGlobalRestrictionTransaction
==========================================

.. raw:: html
   :file: EmbeddedTokenGlobalRestrictionTransaction.html

.. _transfertransaction:

TransferTransaction
===================

.. raw:: html
   :file: TransferTransaction.html

.. _embeddedtransfertransaction:

EmbeddedTransferTransaction
===========================

.. raw:: html
   :file: EmbeddedTransferTransaction.html

Inner Structures
****************

These are structures only meant to be included inside other structures.
Their description is already present in the containing structures above and is only repeated here for completeness.

.. _sizeprefixedentity:

SizePrefixedEntity
==================

.. raw:: html
   :file: SizePrefixedEntity.html

.. _verifiableentity:

VerifiableEntity
================

.. raw:: html
   :file: VerifiableEntity.html

.. _entitybody:

EntityBody
==========

.. raw:: html
   :file: EntityBody.html

.. _blockheader:

BlockHeader
===========

.. raw:: html
   :file: BlockHeader.html

.. _importanceblockfooter:

ImportanceBlockFooter
=====================

.. raw:: html
   :file: ImportanceBlockFooter.html

.. _receipt:

Receipt
=======

.. raw:: html
   :file: Receipt.html

.. _stateheader:

StateHeader
===========

.. raw:: html
   :file: StateHeader.html

.. _transaction:

Transaction
===========

.. raw:: html
   :file: Transaction.html

.. _embeddedtransactionheader:

EmbeddedTransactionHeader
=========================

.. raw:: html
   :file: EmbeddedTransactionHeader.html

.. _embeddedtransaction:

EmbeddedTransaction
===================

.. raw:: html
   :file: EmbeddedTransaction.html

.. _accountkeylinktransactionbody:

AccountKeyLinkTransactionBody
=============================

.. raw:: html
   :file: AccountKeyLinkTransactionBody.html

.. _nodekeylinktransactionbody:

NodeKeyLinkTransactionBody
==========================

.. raw:: html
   :file: NodeKeyLinkTransactionBody.html

.. _cosignature:

Cosignature
===========

.. raw:: html
   :file: Cosignature.html

.. _aggregatetransactionbody:

AggregateTransactionBody
========================

.. raw:: html
   :file: AggregateTransactionBody.html

.. _votingkeylinktransactionbody:

VotingKeyLinkTransactionBody
============================

.. raw:: html
   :file: VotingKeyLinkTransactionBody.html

.. _vrfkeylinktransactionbody:

VrfKeyLinkTransactionBody
=========================

.. raw:: html
   :file: VrfKeyLinkTransactionBody.html

.. _hashlocktransactionbody:

HashLockTransactionBody
=======================

.. raw:: html
   :file: HashLockTransactionBody.html

.. _secretlocktransactionbody:

SecretLockTransactionBody
=========================

.. raw:: html
   :file: SecretLockTransactionBody.html

.. _secretprooftransactionbody:

SecretProofTransactionBody
==========================

.. raw:: html
   :file: SecretProofTransactionBody.html

.. _accountmetadatatransactionbody:

AccountMetadataTransactionBody
==============================

.. raw:: html
   :file: AccountMetadataTransactionBody.html

.. _tokenmetadatatransactionbody:

TokenMetadataTransactionBody
=============================

.. raw:: html
   :file: TokenMetadataTransactionBody.html

.. _namespacemetadatatransactionbody:

NamespaceMetadataTransactionBody
================================

.. raw:: html
   :file: NamespaceMetadataTransactionBody.html

.. _tokendefinitiontransactionbody:

TokenDefinitionTransactionBody
===============================

.. raw:: html
   :file: TokenDefinitionTransactionBody.html

.. _tokensupplychangetransactionbody:

TokenSupplyChangeTransactionBody
=================================

.. raw:: html
   :file: TokenSupplyChangeTransactionBody.html

.. _tokensupplyrevocationtransactionbody:

TokenSupplyRevocationTransactionBody
=====================================

.. raw:: html
   :file: TokenSupplyRevocationTransactionBody.html

.. _multisigaccountmodificationtransactionbody:

MultisigAccountModificationTransactionBody
==========================================

.. raw:: html
   :file: MultisigAccountModificationTransactionBody.html

.. _addressaliastransactionbody:

AddressAliasTransactionBody
===========================

.. raw:: html
   :file: AddressAliasTransactionBody.html

.. _tokenaliastransactionbody:

TokenAliasTransactionBody
==========================

.. raw:: html
   :file: TokenAliasTransactionBody.html

.. _namespaceregistrationtransactionbody:

NamespaceRegistrationTransactionBody
====================================

.. raw:: html
   :file: NamespaceRegistrationTransactionBody.html

.. _accountaddressrestrictiontransactionbody:

AccountAddressRestrictionTransactionBody
========================================

.. raw:: html
   :file: AccountAddressRestrictionTransactionBody.html

.. _accounttokenrestrictiontransactionbody:

AccountTokenRestrictionTransactionBody
=======================================

.. raw:: html
   :file: AccountTokenRestrictionTransactionBody.html

.. _accountoperationrestrictiontransactionbody:

AccountOperationRestrictionTransactionBody
==========================================

.. raw:: html
   :file: AccountOperationRestrictionTransactionBody.html

.. _tokenaddressrestrictiontransactionbody:

TokenAddressRestrictionTransactionBody
=======================================

.. raw:: html
   :file: TokenAddressRestrictionTransactionBody.html

.. _tokenglobalrestrictiontransactionbody:

TokenGlobalRestrictionTransactionBody
======================================

.. raw:: html
   :file: TokenGlobalRestrictionTransactionBody.html

.. _transfertransactionbody:

TransferTransactionBody
=======================

.. raw:: html
   :file: TransferTransactionBody.html

.. raw:: html

   </div>
