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
  const SignatureA = {
    r: 14577910505676929926903948251972835869176658993134963041398650178609211102191n,
    s: 36022735392018251639246785440370807053944303459194084836880485298224814759428n,
    recovery: 0,
  }
  const SignatureB = {
    r: 96630564109171761486155863627084873075021487617020900238780338849003102166327n,
    s: 51507165226726329296088082906339298239772670823809262792884660626565563390127n,
    recovery: 1,
  }
  const SignatureC = {
    r: 8980617620088675527166497958905945738346341085382283711796382170554157318477n,
    s: 49812109871402060279054213554412517293956283094622263860074448898995030586389n,
    recovery: 1,
  }
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
