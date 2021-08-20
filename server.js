const express = require("express");
const stripe = require("stripe")("sk_test_LoZgvtbMdru5r5Lx5UAMjcaV00YsNeCEJM")

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type', 'Authorization')

    if(req.method === "OPTIONS"){
        return res.sendStatus(200);
    }
    next()
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.status(200).send('hello world');
})

app.post('/payments/create', async(req, res) => {
    const total = req.query.total;
    console.log('Payment Received!!', total);

    const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd"
  });
  res.send({
    clientSecret: paymentIntent.client_secret
  });
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})