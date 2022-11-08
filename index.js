const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        
        const tripCollections = client.db('travel-services').collection('trip-name')
       

        //get all trips

        app.get('/trips' , async(req , res)=>{

            const query = {}
            const cursor = tripCollections.find(query)
            const result = await cursor.toArray()
            res.send(result)
            console.log(result);
        })

        // get single trips details

        app.get('/trips/:id' , async(req , res)=>{

            const id = req.params.id
            const query = {_id : ObjectId(id)}
            const singleTrip = await tripCollections.findOne(query)
            res.send(singleTrip)
            console.log(singleTrip);


        })

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