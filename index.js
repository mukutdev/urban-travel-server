const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000
require('dotenv').config()


//middleware
app.use(cors())
app.use(express.json())


// mondgoDB

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h5qu391.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


//crud function

async function run(){

    try{
        await client.connect();
    console.log('db connection established');


    }
    finally{

    }

}
run().catch(err => console.log(err))


















app.get('/' , (req , res) => {

    res.send('Nice Server is runing on port')
})

app.listen(port , ()=>{
    console.log('server is up and runing' , port);
})