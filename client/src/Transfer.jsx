import { useState } from "react";
import server from "./server";
import { secp256k1 } from "ethereum-cryptography/secp256k1"
import { toHex } from "ethereum-cryptography/utils"
import { keccak256 } from "ethereum-cryptography/keccak"
import { utf8ToBytes } from "ethereum-cryptography/utils"

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [r, setR] = useState()
  const [s, setS] = useState()
  const [recovery, setRecover] = useState()
  const [publicKey, setPublicKey] = useState()
  const [message, setMessage] = useState()

  const setValue = (setter) => (evt) => setter(evt.target.value)

  async function transfer(evt) {
    evt.preventDefault()

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
        r,
        s,
        recovery,
        publicKey,
      })
      setBalance(balance)
      window.alert("Transaction Successful!")
    } catch (ex) {
      alert(ex.response.data.message)
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      {/* <label>
        Message
        <input
          placeholder="Type a message"
          value={message}
          onChange={setValue(setMessage)}
        ></input>
      </label> */}

      <label>
        Signed Message
        <input placeholder="r" value={r} onChange={setValue(setR)}></input>
        <input placeholder="s" value={s} onChange={setValue(setS)}></input>
        <input
          placeholder="Recovery"
          value={recovery}
          onChange={setValue(setRecover)}
        ></input>
        <input
          placeholder="Public Key"
          value={publicKey}
          onChange={setValue(setPublicKey)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  )
}

export default Transfer;
