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
}) {
  async function onChange(evt) {
    const privateKey = evt.target.value
    setPrivateKey(privateKey)

    const address = toHex(secp256k1.getPublicKey(privateKey))
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
        Private Key
        <input
          type="password"
          placeholder="Enter Address..."
          value={privateKey}
          onChange={onChange}
        ></input>
      </label>

      <label>Address: {address}</label>
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
