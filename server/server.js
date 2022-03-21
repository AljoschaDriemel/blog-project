import { config } from "dotenv";
import express from "express";


const app = express();
const dotenv = config()




app.get('/', (req, res) => {
    res.send('HELLO FROM SERVER')
})

const port = process.env.PORT || 8080
app.listen(port, ()=> console.log('server is up and running at port', port))