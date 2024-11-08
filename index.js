const express = require('express');
const cors = require('cors')
require('dotenv').config
require('./src/db');
const router = require('./src/routes/index')
const app = express();
app.use(cors())
app.use(express.json());
app.use(router)

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
