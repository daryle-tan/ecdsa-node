const express = require("express")
const app = express()
const cors = require("cors")
const port = 3042

app.use(cors())
app.use(express.json())

const balances = {
  "a0cf6341592b3621932522f9ffea98811331b434687fc892d1d6c5668ae94fc9": 100, // privatekey a0cf6341592b3621932522f9ffea98811331b434687fc892d1d6c5668ae94fc9
  "5ca20079874f9ef0d991807ad1c08bb5d07dc2624a9cfd2a2e23743b87e3d55e": 50, // privatekey ab9a428ee07f0100354460f539633c3b3badf7e964fd94dc51fc0eb0493a2292
  "7598730976014905c926fc7d50d154f765e9f805dd5e3147e052f73e42d1e874": 75, // 6f5a72b93ebc8bdd587872ce29c876c2005d165efcaff76e18a01c9499e7cffe
}

app.get("/balance/:address", (req, res) => {
  const { address } = req.params
  const balance = balances[address] || 0
  res.send({ balance })
})

app.post("/send", (req, res) => {
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
