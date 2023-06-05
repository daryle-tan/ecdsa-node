const express = require("express")
const app = express()
const cors = require("cors")
const port = 3042
const { secp256k1 } = require("ethereum-cryptography/secp256k1")
const { keccak256 } = require("ethereum-cryptography/keccak")
const { utf8ToBytes } = require("ethereum-cryptography/utils")
const { toHex } = require("ethereum-cryptography/utils")
const { privateKey, verify } = require("./scripts/generate.js")
app.use(cors())
app.use(express.json())

const Signatures = [
  {
    r: 94364742712474410657721364005829535895884533462490868884322574407822871934478n,
    s: 56937489658167472067286214571138782148154088119713360249695979378959973644202n,
    recovery: 0,
  },
  {
    r: 62802852249173954293691868759369674227841824747631886107818116297700431327834n,
    s: 26766775288116130759995070973755479039680101090897479559088731761803624066527n,
    recovery: 0,
  },
  {
    r: 40538391346557833411387913541892596605600878528944142789642431270805052917780n,
    s: 18665304577317768524769574753215531839598001990793581771199225682245072693057n,
    recovery: 0,
  },
]
console.log(Signatures[0].r)

const balances = {
  "02977f05f99c95b596571bf02cb7ba5ada4b35dfb5ed8717bf0c1744d8d4b130d8": 100, // privatekey 090f21927f33f2c4562123725473ccb403f5f9395617ac5c018cbb04057c85a6
  "02b34ab87f19f51db897012fea9c558da46a3bd143b2e05714c48be863a9f76218": 50, // privatekey e567c775d80ef7748e91a56e27a0622c16780a2b6af8aed8327bdb7507552a62
  "023f44afdfc118fbd9f93823516cbd3bdc89d9f5ec369b6a1dce131d26de9bbeba": 75, // privatekey e0b63cc159a015753dc40aac9cfd587f1df49d4a30ed65710b79a4d911ac0632
}

app.get("/balance/:address", (req, res) => {
  const { address } = req.params
  const balance = balances[address] || 0
  res.send({ balance })
})

app.post("/send", (req, res) => {
  // TODO: get a signature from the client side application
  // recover the public address from the signature
  const { sender, recipient, amount, r, s, recovery, publicKey } = req.body
  const message = "Send amount!"
  const hashedMessage = keccak256(utf8ToBytes(message))

  if (verify) {
    setInitialBalance(sender)
    setInitialBalance(recipient)
    console.log(r)
    console.log("verified!", verify(Signatures[0], hashedMessage, publicKey))
    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" })
    } else {
      balances[sender] -= amount
      balances[recipient] += amount
      res.send({ balance: balances[sender] })
    }
  }
})


app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
})

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0
  }
}
