const { Folder } = require("../models/folder");
const { File } = require("../models/file");

const createFile = async (req, res) => {
    try{

        const { folderId, name, fileType } = req.body;
        const file = new File({ name, folderId });
        await file.save();
        console.log("File added:", file);
        res.json({ message: "File created successfully", file });
    }catch(e){
        console.log('error',e)
        res.status(500).json({message:e.message||'internal server error',error:e});
    }
};

const moveFile = async (req, res) => {
    try {
        const { fileId, newParentId } = req.body;

        const result = await File.updateOne(
            { _id: fileId },
            { $set: { parentId: newParentId } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: 'Folder not found or no change made' });
        }

        res.json({ message: 'Folder moved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error moving folder', error: error.message });
    }
};

const editFile = async (req, res) => {
  try {
    const { folderId } = req.params;
    const { name } = req.body;

    const result = await Folder.updateOne(
      { _id: folderId },
      { $set: { name } }
    );

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
const deleteFile = async (req, res) => {
  try {
    const { folderId } = req.params;
    const result = await File.deleteOne({ _id: folderId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Folder not found" });
    }
    res.json({ message: "File deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting folder", error: error.message });
  }
};

module.exports = {
  createFile,
  moveFile,
  editFile,
  deleteFile,
};
