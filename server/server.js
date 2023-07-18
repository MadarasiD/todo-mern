require('dotenv').config();


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());



// Express konfiguráció
app.use(express.json());

const apiRoutes = require('./routes/api');

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

  const appUrl = process.env.APP_URL || 'http://localhost:5000';


// MongoDB adatbázis csatlakozás
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('Sikeres adatbázis csatlakozás');
    })
    .catch((error) => {
      console.error('Hiba történt az adatbázis csatlakozásakor:', error);
    });

    app.listen(process.env.PORT, () => {
      console.log(`Server is running at ${appUrl}`);
    });

process.env