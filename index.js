const NodeCrypto = require('./node_crypto');
const CryptojsCrypto = require('./cryptojs_crypto');

const key = 'superSecretKey';
const plainText = JSON.stringify({
  message: 'attack at dawn',
  extraContent: {
    _this: 'object',
    has: 'extra',
    keys: 'that',
    need: 'to',
    provide: 'extra',
    data: 'to',
    wrap: 'padding'
  }
});

console.log('plain text', plainText);

const nodeEncrypted = NodeCrypto.encrypt(plainText, key);
console.log('nodeEncrypted', nodeEncrypted);

const cryptojsEncrypted = CryptojsCrypto.encrypt(plainText, key);
console.log('cryptojsEncrypted', cryptojsEncrypted);

// cross decrypt
const cryptojsDecrypted = CryptojsCrypto.decrypt(
  nodeEncrypted.cipherText,
  key,
  nodeEncrypted.iv
);
console.log('cryptojsDecrypted', cryptojsDecrypted);

const nodeDecrypt = NodeCrypto.decrypt(
  cryptojsEncrypted.cipherText,
  key,
  cryptojsEncrypted.iv
);
console.log('nodeDecrypt', nodeDecrypt);

console.log(
  'equivalent?',
  cryptojsDecrypted.plainText === nodeDecrypt.plainText
);
