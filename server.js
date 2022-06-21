const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

// tells mongoose database what to connect to
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-network-api', {
    userNewUrlParser: true,
    useUnifiedTopology: true
})

// logs mongo queries that are being executed
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`You did it! Connected on localhost:${PORT}`));