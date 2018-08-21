const CryptoJS = require('crypto-js');

const Hex = CryptoJS.enc.Hex;

module.exports.encrypt = function(plainText, key) {
  const iv = CryptoJS.lib.WordArray.random(16);
  const derivedKey = CryptoJS.SHA256(key);

  const cipherText = CryptoJS.AES.encrypt(plainText, derivedKey, {
    iv: iv,
    mode: CryptoJS.mode.CTR,
    padding: CryptoJS.pad.NoPadding
  });

  return {
    iv: iv.toString(),
    cipherText: cipherText.ciphertext.toString(Hex)
  };
};

module.exports.decrypt = function(cipherText, key, iv) {
  const decodedIv = Hex.parse(iv);
  const derivedKey = CryptoJS.SHA256(key);
  const decodedCipherText = Hex.parse(cipherText);

  const plainText = CryptoJS.AES.decrypt(
    { ciphertext: decodedCipherText },
    derivedKey,
    {
      iv: decodedIv,
      mode: CryptoJS.mode.CTR,
      padding: CryptoJS.pad.NoPadding
    }
  );

  return {
    plainText: plainText.toString(CryptoJS.enc.Utf8)
  };
};
