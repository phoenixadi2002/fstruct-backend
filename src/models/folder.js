const mongoose = require('mongoose');
const { Schema } = mongoose;

// Folder Schema
const FolderSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    parentId: {
        type: Schema.Types.ObjectId,
        ref: 'Folder',
        default: null  
    }
}, {
    timestamps: true  
});

const Folder = mongoose.model('Folder', FolderSchema);
module.exports = { Folder };