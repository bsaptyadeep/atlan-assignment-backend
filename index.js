const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const pool = require('./dbConfig');
const cors = require('cors');
const app = express();
app.use(cors())
app.use(express.json());

app.get('/', async (req, res) => {
    res.json({message: "Server is Up"})
})

app.post('/', async (req, res) => {
    try {
        const response = await pool.query(
            req.body.query
        );
        res.json({
            message: response
         });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
})

app.listen(8080, () => {
    console.log("Server running on port 8080");
})