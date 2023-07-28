import express from 'express';
import cors from 'cors';
import generate from './generate.js';

const app = express();

app.use(express.json());
app.use(cors(
    "http:localhost:5173"
));

const port = process.env.PORT || 3000;

app.get('/', (req,res) => {
    res.send('Hello World!');
})

app.post('/generate', async (req,res) => {
    const queryDescription = req.body.queryDescription

    try {
        const sqlQuery = await generate(queryDescription);
        res.json({Response: sqlQuery})

    } catch (error){
        console.error(error);
        res.status(500).send("Internal server error");
    }
})
   
app.listen(port, () => {
    console.log('Server started');
})