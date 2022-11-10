const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
 
// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lo9eyry.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const serviceCollection = client.db('goTravel').collection('services');
        // const homeServiceCollection = client.db('goTravel').collection('homeService');

        app.get('/services', async(req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query);
            const services = await cursor.limit(3).toArray();
            res.send(services);
        })

        app.get('/homeService', async(req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query);
            const homeService = await cursor.limit(3).toArray();
            res.send(homeService);
        })

        app.get('/services/:id', (req, res) => {
            const id = req.params.id;
            const selectedServices = serviceCollection.find(service => service._id === id);
            res.send(selectedServices);
        })
    }
    finally{

    }
}

run().catch(err => console.error(err));
 
app.get('/', (req, res) => {
   res.send('Let us all go on travel together');
});
 
app.listen(port, () => {
   console.log(`Go travel server running on ${port}`);
})
