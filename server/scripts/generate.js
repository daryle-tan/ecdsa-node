const { secp256k1 } = require("ethereum-cryptography/secp256k1")
const { toHex } = require("ethereum-cryptography/utils")

// create a random private key
const randomPrivateKey = secp256k1.utils.randomPrivateKey()
// convert the unint8array private key into a hexadecimal
const privateKey = toHex(randomPrivateKey)
// generate a public key using the private key
const privateToPublicKey = secp256k1.getPublicKey(privateKey)
// convert the uint8array public key into a hexidecimal
const publicKey = toHex(privateToPublicKey)

console.log("randomPrivateKey", randomPrivateKey)
console.log("Private Key:", privateKey)
console.log("Public Key:", publicKey)
