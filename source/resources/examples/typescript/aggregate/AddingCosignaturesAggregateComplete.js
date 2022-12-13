'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
// tslint:disable-next-line: max-line-length
const bitxor_sdk_1 = require('bitxor-sdk');
// Retrieve from node's /network/properties or RepositoryFactory
const epochAdjustment = 123456789;
/* start block 01 */
const networkType = bitxor_sdk_1.NetworkType.TEST_NET;
// replace with alice private key
const alicePrivatekey = '';
const aliceAccount = bitxor_sdk_1.Account.createFromPrivateKey(
  alicePrivatekey,
  networkType,
);
// replace with bob public key
const bobPublicKey = '';
const bobPublicAccount = bitxor_sdk_1.PublicAccount.createFromPublicKey(
  bobPublicKey,
  networkType,
);
const aliceTransferTransaction = bitxor_sdk_1.TransferTransaction.create(
  bitxor_sdk_1.Deadline.create(epochAdjustment),
  bobPublicAccount.address,
  [bitxor_sdk_1.NetworkCurrencies.PUBLIC.currency.createRelative(1000)],
  bitxor_sdk_1.PlainMessage.create('payout'),
  networkType,
);
const bobTransferTransaction = bitxor_sdk_1.TransferTransaction.create(
  bitxor_sdk_1.Deadline.create(epochAdjustment),
  aliceAccount.address,
  [
    new bitxor_sdk_1.Token(
      new bitxor_sdk_1.NamespaceId('collectible'),
      bitxor_sdk_1.UInt64.fromUint(1),
    ),
  ],
  bitxor_sdk_1.PlainMessage.create('payout'),
  networkType,
);
const aggregateTransaction = bitxor_sdk_1.AggregateTransaction.createComplete(
  bitxor_sdk_1.Deadline.create(epochAdjustment),
  [
    aliceTransferTransaction.toAggregate(aliceAccount.publicAccount),
    bobTransferTransaction.toAggregate(bobPublicAccount),
  ],
  networkType,
  [],
  bitxor_sdk_1.UInt64.fromUint(2000000),
);
/* end block 01 */
/* start block 02 */
// replace with meta.networkGenerationHash (nodeUrl + '/node/info')
const generationHash =
  '1DFB2FAA9E7F054168B0C5FCB84F4DEB62CC2B4D317D861F3168D161F54EA78B';
const signedTransactionNotComplete = aliceAccount.sign(
  aggregateTransaction,
  generationHash,
);
console.log(signedTransactionNotComplete.payload);
/* end block 02 */
/* start block 03 */
// replace with bob private key
const bobPrivateKey = '';
const bobAccount = bitxor_sdk_1.Account.createFromPrivateKey(
  bobPrivateKey,
  networkType,
);
const cosignedTransactionBob = bitxor_sdk_1.CosignatureTransaction.signTransactionPayload(
  bobAccount,
  signedTransactionNotComplete.payload,
  generationHash,
);
console.log(cosignedTransactionBob.signature);
console.log(cosignedTransactionBob.parentHash);
/* end block 03 */
/* start block 04 */
const cosignatureSignedTransactions = [
  new bitxor_sdk_1.CosignatureSignedTransaction(
    cosignedTransactionBob.parentHash,
    cosignedTransactionBob.signature,
    cosignedTransactionBob.signerPublicKey,
  ),
];
const rectreatedAggregateTransactionFromPayload = bitxor_sdk_1.TransactionMapping.createFromPayload(
  signedTransactionNotComplete.payload,
);
const signedTransactionComplete = aliceAccount.signTransactionGivenSignatures(
  rectreatedAggregateTransactionFromPayload,
  cosignatureSignedTransactions,
  generationHash,
);
console.log(signedTransactionComplete.hash);
// replace with node endpoint
const nodeUrl = 'NODE_URL';
const repositoryFactory = new bitxor_sdk_1.RepositoryFactoryHttp(nodeUrl);
const transactionHttp = repositoryFactory.createTransactionRepository();
transactionHttp.announce(signedTransactionComplete).subscribe(
  (x) => console.log(x),
  (err) => console.error(err),
);
/* end block 04 */
