const { secp256k1 } = require("ethereum-cryptography/secp256k1")
const { toHex } = require("ethereum-cryptography/utils")
const { keccak256 } = require("ethereum-cryptography/keccak")
const { utf8ToBytes } = require("ethereum-cryptography/utils")

// create a random private key
const randomPrivateKey = secp256k1.utils.randomPrivateKey()
// convert the unint8array private key into a 32 byte hash value
const privateKeyBytes = keccak256(randomPrivateKey)
// convert the 32 byte hash value into a hexadecimal
const privateKey = toHex(privateKeyBytes)

// generate a public key using the private key
const privateToPublicKey = secp256k1.getPublicKey(privateKey)
// // convert the unint8array public key into a 32 byte hash value
// const publicKeyBytes = keccak256(privateToPublicKey)
// convert the 32 byte hash value into a hexidecimal
const publicKey = toHex(privateToPublicKey)

// create the hash message function
function hashMessage(message) {
  const arrayBytes = utf8ToBytes(message)
  return keccak256(arrayBytes)
}

function Message() {
  return hashMessage(
    JSON.stringify({
      sender: address.toLowerCase(),
      amount: parseInt(amount),
      receipient: receipient.toLowerCase(),
    })
  )
}

// create a signature
function signMessage(msg) {
  return secp256k1.sign(hashMessage(msg), privateKey)
}

console.log("Private Key:", privateKey)
console.log("Public Key:", publicKey)
console.log(signMessage("message"))
