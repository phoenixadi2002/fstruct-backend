const express = require('express');
const folderRoute = express.Router();
const {createRootFolder,createSubfolder, getFolderContents, moveFolder, editFolder, deleteFolder} = require('../controllers/folder-controller');


folderRoute.get("/rootFolder",createRootFolder );
folderRoute.post('/create',createSubfolder);
folderRoute.post('/show',getFolderContents);
folderRoute.post('/move',moveFolder);
folderRoute.post('/update/:folderId',editFolder);
folderRoute.post('/delete/:folderId',deleteFolder);

module.exports = folderRoute;