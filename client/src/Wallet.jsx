import server from "./server";
import { secp256k1 } from "ethereum-cryptography"

function Wallet({ address, setAddress, balance, setBalance }) {
    const privateKey = "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e"
    const messageHash = "a33321f98e4ff1c283c76998f14f57447545d339b3db534c6d886decb4209f28"

    async function onChange(evt) {
        const address = evt.target.value
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
                Wallet Address
                <input
                    placeholder="Type an address, for example: 0x1"
                    value={address}
                    onChange={onChange}
                ></input>
            </label>
            <label>
                Signature
                <input
                    placeholder="Enter your signature which represents your private key"
                    // value={signature}
                    // onChange={onChange}
                ></input>
            </label>
            <div className="balance">Balance: {balance}</div>
        </div>
    )
}

export default Wallet;
