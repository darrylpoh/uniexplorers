require('dotenv').config();
const { PORT, ORIGIN } = process.env;

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors({credentials: true, origin: ORIGIN}));
app.use(express.urlencoded({ extended: true }));

require('./routes')(app);
app.listen(PORT, console.log(`Server is running on port ${PORT}`));