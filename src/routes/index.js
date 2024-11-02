const express = require('express');
const route = express.Router();
require('../routes/folder-route');
const folderRoute = require('./folder-route');
const fileRoute = require('./file-route');
route.use('/folder', folderRoute);
route.use('/file', fileRoute);

route.get("/", function(req,res){
    res.send("Hello from fsrtuct-backend");
})

module.exports = route