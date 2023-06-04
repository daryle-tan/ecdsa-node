import server from "./server";
import { secp256k1 } from "ethereum-cryptography/secp256k1"
import { toHex } from "ethereum-cryptography/utils"
import { keccak256 } from "ethereum-cryptography/keccak"

function Wallet({
  address,
  setAddress,
  balance,
  setBalance,
  privateKey,
  setPrivateKey,
  signature,
  setSignature,
}) {
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
  async function onChange(evt) {
    const signature = evt.target.value
    // setPrivateKey(privateKey)
    setSignature(signature)

    const publicKey = secp256k1.getPublicKey(privateKey)
    const address = toHex(publicKey)
    setAddress(address)
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`)
      setBalance(balance)
    } else {
      setBalance(0)
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Signature
        <input
          placeholder="Enter Signature..."
          value={signature}
          onChange={onChange}
        ></input>
      </label>

      <label>Address {address}</label>
      {/* <label>
        Signature
        <input
          placeholder="Enter your signature which represents your private key"
          // value={signature}
          onChange={onChange}
        ></input>
      </label> */}
      <div className="balance">Balance: {balance}</div>
    </div>
  )
}

export default Wallet;
