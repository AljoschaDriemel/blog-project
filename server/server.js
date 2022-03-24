const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require('cookie-parser')

app.use(cookieParser());

app.use(express.json());

app.use("/users", require("./controllers/userController"))

app.get('/', (req, res) => {
    res.send('HELLO FROM SERVER')
})

const connectToMongoDB = require("./config/db");
connectToMongoDB();

const port = process.env.PORT || 8080
app.listen(port, ()=> console.log('server is up and running at port', port))