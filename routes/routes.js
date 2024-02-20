const express = require('express');
const Model = require('../models/model');
const router = express.Router();

//Post Method
router.post('/post', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        age: req.body.age
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Get all Method with  empty params find()
router.get('/getAll', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})


//Get by teens Method using query find $gte age>18
router.get('/getTeens', async (req, res) => {
    try {
        // await MyModel.find({ name: 'john', age: { $gte: 18 } }).exec();
        const data = await Model.find({age: { $gte: 18 } });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get by 2012 born Method using query.and
router.get('/getEleven', async (req, res) => {
    try {
    
        const data = await Model.find().and([{age: { $gte: 11 } }, {age: { $lte: 12 } }]);
     
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})
module.exports = router;