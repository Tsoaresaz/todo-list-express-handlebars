const express = require('express');
const dotenv = require('dotenv');
const providerRouter = require('../app/router');

const handlebars_wrapper = require('./config/handlebars_wrapper');

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

handlebars_wrapper(app);
app.use(express.static('src/assets/css'));
app.use(express.static('src/assets/js'));
app.disable('x-powered-by');

app.use(providerRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`\nServidor sendo executado na porta: ${port} \n\nEndereço local: http://localhost:${port}`);
})

module.exports = app;