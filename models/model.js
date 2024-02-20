const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    age: {
        required: true,
        type: Number,
        max: 60
    }
})
//middle ware pre post will fire on save like post request
dataSchema.pre('save', () => console.log('Hello from pre save'));
dataSchema.post('save', function(doc) {
    console.log('%s has been saved', doc._id);
  });// Compile a model from the schema
  
module.exports = mongoose.model('Data', dataSchema)