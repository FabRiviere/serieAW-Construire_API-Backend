const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');
require('dotenv').config();


const userRoutes = require('./routes/users');
const beerRoutes = require('./routes/beers');

const app = express();

mongoose.set('strictQuery', true);
mongoose.connect( process.env.MONGODB_PATH,
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
   res.setHeader('Access-Control-Allow-Credentials', true);
   next();
}); 

app.use(helmet({
    crossOriginResourcePolicy: false,
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true}));


app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/beers', beerRoutes); 
 

module.exports = app;
