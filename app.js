const express = require('express');
const cors = require('cors'); 
const { APP } = require('./config')
const authRoutes = require('./routes/authRoutes')
const studenRoutes = require('./routes/studentRoutes')
const app = express();

app.use(express.json());
app.use(express.static('public')); 

const corsOptions = {
    origin: ['http://127.0.0.1:5500'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify methods allowed
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify headers allowed
    credentials: true, // Required if your front-end needs to send credentials such as cookies or authentication headers
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions)); 

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Welcome to campus residence portal');
});


app.use('/auth', authRoutes);  // Mounting auth routes
app.use('/students', studenRoutes)


app.listen(APP.PORT, () => console.log(`Server listen http://localhost:${APP.PORT}`));
