const express = require('express');
const cors = require('cors'); 
const { APP } = require('./config')
const authRoutes = require('./routes/authRoutes')
const studenRoutes = require('./routes/studentRoutes')
const app = express();

app.use(express.json());
app.use(express.static('public')); 
app.use(cors()); 
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Welcome to campus residence portal');
});


app.use('/auth', authRoutes);  // Mounting auth routes
app.use('/students', studenRoutes)

app.listen(APP.PORT, () => console.log(`Server listen http://localhost:${APP.PORT}`));
