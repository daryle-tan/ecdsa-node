const express = require("express")
const app = express()
const cors = require("cors")
const port = 3042

app.use(cors())
app.use(express.json())

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

const balances = {
  "02e4b3e61a46f118a9b91226cf0bc6c2ab073a89339604611e057857d864745a29": 100, // privatekey f09a45a70c827e6846ee3f75b6d3bfe3c8e4531e08a9d183c3ca112ff0e152a8
  "034bc72012b03f2bcb07d6a047646d6782a20a9d850baf095cd058d92080f52b4d": 50, // privatekey 5eb08cc82ccb44688214cc917d30afe52af600d1af0aac8e1f8a7f71c4561a85
  "03733f061877698966a3be8afc850866551e7bf5cbbc81b8065697c6441732f948": 75, // privatekey 4047278fac59eff4ab9b7564498b37f28ef1371e6e22c8a1538c686de4dce847
}

app.get("/balance/:address", (req, res) => {
  const { address } = req.params
  const balance = balances[address] || 0
  res.send({ balance })
})

app.post("/send", (req, res) => {
  // TODO: get a signature from the client side application
  // recover the public address from the signature
  const { sender, recipient, amount } = req.body

  // const message = {
  //   sender: sender,
  //   recipient: recipient,
  //   amount: amount,
  // }
  // console.log("hi")

  setInitialBalance(sender)
  setInitialBalance(recipient)

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" })
  } else {
    balances[sender] -= amount
    balances[recipient] += amount
    res.send({ balance: balances[sender] })
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
