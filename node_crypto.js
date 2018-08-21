const Crypto = require('crypto');

module.exports.encrypt = function(plainText, key) {
  const iv = Crypto.randomBytes(16);

  const derivedKey = Crypto.createHash('sha256')
    .update(key)
    .digest();

  const cipher = Crypto.createCipheriv('aes-256-ctr', derivedKey, iv);

  let cipherText = cipher.update(plainText, 'utf8');
  cipher.final().copy(cipherText);

  return {
    iv: iv.toString('hex'),
    cipherText: cipherText.toString('hex')
  };
};

module.exports.decrypt = function(cipherText, key, iv) {
  const decodedIv = Buffer.from(iv, 'hex');
  const derivedKey = Crypto.createHash('sha256')
    .update(key)
    .digest();

  const decipher = Crypto.createDecipheriv(
    'aes-256-ctr',
    derivedKey,
    decodedIv
  );
  let plainText = decipher.update(cipherText, 'hex');
  decipher.final().copy(plainText);

  return {
    plainText: plainText.toString('utf8')
  };
};
