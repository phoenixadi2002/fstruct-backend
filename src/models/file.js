const mongoose = require('mongoose');
const { Schema } = mongoose;

const fileSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    folderId: {
        type: Schema.Types.ObjectId,
        ref: 'Folder',
        required: true
    },
    fileType: {
        type: String,
        trim: true
    }
},{timestamps:true});

const File = mongoose.model('File', fileSchema);

module.exports = {  File };