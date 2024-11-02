const express = require('express');
const { createFile , deleteFile, editFile, moveFile} = require('../controllers/file-controller');
const fileRoute = express.Router();


fileRoute.post('/create',createFile);
fileRoute.post('/move',moveFile);
fileRoute.post('/update',editFile);
fileRoute.post('/delete/:folderId',deleteFile);

module.exports = fileRoute;