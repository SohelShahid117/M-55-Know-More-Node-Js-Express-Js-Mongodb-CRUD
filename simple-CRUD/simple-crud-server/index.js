const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World! enJoy CRUD Application')
})


//this from mongoDB
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://sohelshahid09:5ClfhcQf1ilj5CLf@cluster0.hfhifix.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database = client.db("usersDB");
    const usersCollection = database.collection("users");

    app.post('/users',async(req,res)=>{
        const user = req.body
        console.log("new user",user)
        const result = await usersCollection.insertOne(user);
        res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
// run().catch(console.dir);
run().catch((err)=>{
    console.log(err)
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log(`Simple CRUD server is running at http://localhost:${port}`)
})