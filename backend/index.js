const express = require('express');
const sessions = require('express-session');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const cookieParser = require("cookie-parser");
const fs = require('fs');
const path = require('path');

if(!fs.existsSync(path.join(__dirname, '/data'))) fs.mkdirSync(path.join(__dirname, 'data/accounts-data'), {recursive: true});
else if(!fs.existsSync(path.join(__dirname, '/data/accounts-data'))) fs.mkdirSync(path.join(__dirname, 'data/accounts-data'));

require('./helpers/database.js');

const app = express();
const PORT = 8080;

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Passy API',
            version: '1.0.0',
            description: 'The backend of the Passy Application'
        },
        servers: [
            {
                url: 'http://localhost:' + PORT
            }
        ]
    },
    apis: ["./v1/*.js"]
};

const specs = swaggerJsDoc(options);

app.use(express.json());
app.use(cookieParser());
app.use(sessions({
    secret: 'NOT YET SECRET!!!',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } //Saving the cookie for 24 hours
}));
app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use('/', require('./api.js'));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});