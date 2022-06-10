const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());




const uri = "mongodb+srv://my-portfolio:oaOt7W0UzuWoOF14@cluster0.hugt6.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        console.log('db is connected');

        const projectCollection = client.db('portfolio').collection('projects');

        app.get('/projects', async (req, res) => {
            const result = await projectCollection.find({}).toArray();
            res.send(result);
        });

        app.get('/projects/:id', async(req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result=await projectCollection.findOne(query);
            res.send(result);
        })
    }
    finally {

    }
}


app.get('/', (req, res) => {
    res.send('Hello');
});

app.listen(port, () => {
    console.log('listenint to port', 5000)
});

run().catch(console.dir);