const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000

//this are my middleware
app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
  res.send('Simple CRUD is running')
})


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

    const usersCollection = client.db("usersDB").collection("users");
    // const database = client.db("usersDB").collection("users");
    // const haiku = database.collection("haiku");
    // const haiku = database.collection("haiku");

    
    //read
    app.get('/users',async(req,res)=>{
        const cursor = usersCollection.find();
        const result = await cursor.toArray()
        res.send(result)
    })

    //create
    app.post('/users',async(req,res)=>{
        const user = req.body
        console.log('new user',user)
        const result = await usersCollection.insertOne(user);
        res.send(result)
    })

    //delete
    app.delete('/users/:id',async(req,res)=>{
        const id = req.params.id
        console.log('delete id from database-->',id)
        const query = { _id : new ObjectId(id)}
        const result = await usersCollection.deleteOne(query);
        res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch((err)=>{
    console.log(err)
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log(`server is running at http://localhost:${port}`)
})




/*
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://sohelshahid09:5ClfhcQf1ilj5CLf@cluster0.hfhifix.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

async function run(){
    try{
        await client.connect()
        await client.db('admin').command({ping:1})
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    finally{
        await client.close()
    }
}
run().catch((err)=>{
    console.log(err)
})
*/