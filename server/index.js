const express = require("express")
const app = express()
const cors = require("cors")
const port = 3042

app.use(cors())
app.use(express.json())

const balances = {
  "03c27b58ee548c5c39a9f0c90a934fa0e9adc37ea9b37a9f665904a111ced53b0d": 100, // privatekey f8b5c9f2fb38cff7e4fbe1cb12684aaf43b37a42c363e968e688212d9c3b9dd8
  "039fedda7c1f571f68954e7bf6cc2588608d1661f1b1f035170fbfc51576e1496b": 50, // privatekey aa1202353ac63e3880b0af4fb8d30c7b9e2409da972a1806467c5316c4c57d9c
  "02117230b7a9f2d96d285e2ca1674416ee858c52cc235f9b0690c0986c9d7d154e": 75, // privatekey 6712539680f8536e160f272d67061140ea78c0235699b9f63e3c6589eb95842e
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
