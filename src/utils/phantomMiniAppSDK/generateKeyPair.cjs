import nacl from 'tweetnacl';
import naclUtil from 'tweetnacl-util';

const keyPair = nacl.sign.keyPair();

const publicKey = keyPair.publicKey;
const privateKey = keyPair.secretKey;

const publicKeyBase64 = naclUtil.encodeBase64(publicKey);
const privateKeyBase64 = naclUtil.encodeBase64(privateKey);

console.log('Public Key (Base64):', publicKeyBase64);
console.log('Private Key (Base64):', privateKeyBase64);
