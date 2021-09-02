const express = require(`express`);
const dotenv = require(`dotenv`);
const color = require(`colors`);
const morgan = require(`morgan`);
const cors = require(`cors`);

dotenv.config({path: `./config.env`});

//Middleware Setups
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan(`dev`));

//Setting up routes here
const room = require(`./api/routes/rooms`);
app.use(`/api/v1/room`, room);


//Service start on PORT
const server = app.listen(process.env.PORT, () => {
    console.log(`Service is running on port: ${process.env.PORT}`.yellow.inverse);
});