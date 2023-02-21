// const express = require('express') //regular
import express from "express"; //did type=module in package.json 
import cors from 'cors'
import morgan from 'morgan'
import connect from "./databse/conn.js";
import router from "./router/route.js";

const app = express();

/**middlewares*/
app.use(express.json())
app.use(cors())
app.use(morgan('tiny')) //all http request inside the console
app.disable('x-powered-by') //less hackers know about our stack


const port = 8080;

/** HTTP GET Request */
app.get('/', (req, res) => {
    res.status(201).json("Home GET Request")
});

/**api routes */
app.use('/api', router)

/** start server only when we have valid connection */
connect().then(() => {
    try{
        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`);
        })
    } catch(error){
        console.log('Cannot connect to the server')
    }
}).catch(error => {
    console.log("Invalid database connection...!")
})


/** start server */


