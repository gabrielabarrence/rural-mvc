const crypto = require("crypto-js");

const encryptPassword = (password) => {
  const encrypt = crypto.AES.encrypt(password, "ruralzinho");
  const encrypted = encrypt.toString();
  return encrypted;
};

const decryptPassword = (password) => {
  let decrypted = crypto.AES.decrypt(password, "ruralzinho");
  let plaintext = decrypted.toString(crypto.enc.Utf8);
  return plaintext;
};

module.exports = { encryptPassword, decryptPassword };
