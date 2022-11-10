const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();

//middleware
app.use(cors());
app.use(express.json());

// mondgoDB

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h5qu391.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

//crud function

async function run() {
  try {
    const tripCollections = client
      .db("travel-services")
      .collection("trip-name");
    const reviewCollections = client
      .db("travel-services")
      .collection("allReviews");

    //get all trips

    app.get("/trips", async (req, res) => {
      const query = {};
      const cursor = tripCollections.find(query);
      const result = await cursor.toArray();
      res.send(result);
      console.log(result);
    });

    //post trips

    app.post('/trips' , async (req, res)=>{

      const trip = req.body
      const result = await tripCollections.insertOne(trip)
      res.send(result)
      console.log(result);

    })

    // get 3 trips information

    app.get("/trips/upcoming", async (req, res) => {
      const query = {};
      const cursor = tripCollections.find(query);
      const result = await cursor.limit(3).toArray();
      res.send(result);
      console.log(cursor);
    });

    // get single trips details

    app.get("/trips/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const singleTrip = await tripCollections.findOne(query);
      res.send(singleTrip);
    });

    // post reviews

    app.post("/reviews", async (req, res) => {
      const review = req.body;
      const result = await reviewCollections.insertOne(review);
      res.send(result);
    });
    

    //get trip review by specific trip name

    app.get("/reviews", async (req, res) => {
      console.log(req.query.id);
      let query = {};

      if (req.query.id) {
        query = {
          id: req.query.id,
        };
      }
      const cursor = reviewCollections.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });



    //get trip review by specific email

    app.get("/emailBase", async (req, res) => {
        console.log(req.query);
        let query = {};
  
        if (req.query.email) {
          query = {
            email: req.query.email,
          };
        }
        const cursor = reviewCollections.find(query);
        const result = await cursor.toArray();
        res.send(result);
      });


      app.get('/review/:id' , async (req, res,)=>{

        const {id} = req.params
        const result = await reviewCollections.findOne({_id : ObjectId(id)})    
        res.send(result)
    })

      //delete trip review

      app.delete('/emailBase/:id' , async (req, res) => {

        const id = req.params.id
        console.log(id);
        const query ={_id : ObjectId(id)}
        const result = await reviewCollections.deleteOne(query)
        res.send(result)

    })

    //update trip review
    app.patch('/emailBase/:id' , async (req, res) =>{

        const {id} = req.params
        const result = await reviewCollections.updateOne({_id : ObjectId(id)} , {$set : req.body})
        res.send(result)

    })



  } finally {
  }
}
run().catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Nice Server is runing on port");
});

app.listen(port, () => {
  console.log("server is up and runing", port);
});
