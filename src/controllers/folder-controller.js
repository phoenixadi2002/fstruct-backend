const { Folder } = require("../models/folder");
const { File } = require("../models/file");

const createRootFolder = async (req, res) => {
  const rootFolder = new Folder({ name: "Root Folder" });
  await rootFolder.save();
  console.log("Root folder created:", rootFolder);
  console.log({rootFolder})
  return res
    .status(201)
    .json({ message: "Root folder created succeessfully", rootFolder });
};

const createSubfolder = async (req, res) => {
  const { name, parentId } = req.body;
  const subfolder = new Folder({ name, parentId });
  await subfolder.save();
  return res
    .status(201)
    .json({ message: "sub folder created succeessfully", subfolder });
};

const getFolderContents = async (req, res) => {
  const folderId = req.body.folderId;
  const folderDetails = await Folder.findById(folderId)
  const subfolders = await Folder.find({ parentId: folderId });
  const files = await File.find({ folderId });
  console.log({folderId, folderDetails, subfolders, files})
  return res.json({ message: "success",data: { subfolders, files, folderDetails} });
};
const moveFolder = async (req, res) => {
    try {
        const { folderId, newParentId } = req.body;

        const result = await Folder.updateOne(
            { _id: folderId },
            { $set: { folderId: newParentId } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: 'Folder not found or no change made' });
        }

        res.json({ message: 'Folder moved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error moving folder', error: error.message });
    }
};

const editFolder = async (req, res) => {
  try {
    const { folderId } = req.params;
    const { name } = req.body;
    console.log('name',name)
    const result = await Folder.updateOne(
      { _id: folderId },
      { $set: { name } }
    );
    console.log('result',result)
    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ message: "Folder not found or no change made" });
    }

    res.json({ message: "Folder updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating folder", error: error.message });
  }
};
const deleteFolder = async (req, res) => {
  const { folderId } = req.params;

  try {
    const folderToDelete = await Folder.findById(folderId);
    if (!folderToDelete) {
      return res.status(404).json({ message: "Folder not found" });
    }

    const result = await Folder.deleteOne({ _id: folderId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Folder not found" });
    }

    deleteSubFolders(folderId);

    res.json({ message: "Folder deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting folder", error: error.message });
  }
};

const deleteSubFolders = async (folderId) => {
  await File.deleteMany({ folderId: folderId });
  const subFolders = await Folder.find({ parentId: folderId });
  for (const subFolder of subFolders) {
    await deleteSubFolders(subFolder._id);
  }
  await Folder.deleteOne({ _id: folderId });
};

module.exports = {
  createRootFolder,
  createSubfolder,
  getFolderContents,
  moveFolder,
  editFolder,
  deleteFolder,
};
