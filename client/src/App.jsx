import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";
import { secp256k1 } from "ethereum-cryptography/secp256k1"
import { toHex } from "ethereum-cryptography/utils"
import { keccak256 } from "ethereum-cryptography/keccak"
import { utf8ToBytes } from "ethereum-cryptography/utils"

function App() {
  const [balance, setBalance] = useState(0)
  const [address, setAddress] = useState("")
  const [privateKey, setPrivateKey] = useState("")
  const [signature, setSignature] = useState("")
  const [recoveryBit, setRecoveryBit] = useState("")

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

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
        signature={signature}
        setSignature={setSignature}
        address={address}
        setAddress={setAddress}
      />
      <Transfer
        setBalance={setBalance}
        address={address}
        recoveryBit={recoveryBit}
        setRecoveryBit={setRecoveryBit}
        signature={signature}
      />
    </div>
  )
}

export default App;
