const express = require('express');
const { createFile , deleteFile, editFile, moveFile} = require('../controllers/file-controller');
const folderRoute = express.Router();


folderRoute.post('/create',createFile);
folderRoute.post('/move',moveFile);
folderRoute.post('/update',editFile);
folderRoute.post('/delete/:folderId',deleteFile);

module.exports = folderRoute;