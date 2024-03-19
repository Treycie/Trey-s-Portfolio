import { Router } from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = Router();
const BLOGS_COLLECTION = db.collection("blogs");

//Endpoint for getting list of blogs
router.get('/', async (req, res) => {
    let collection = db.collection("blogs");
    let results = await collection.find({}).toArray()
    res.send(results).status(200);
})

//Endpoint for adding a single blog
router.get('/:id', async (req, res) => {
    // let collection=db.collection("blogs");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await BLOGS_COLLECTION.findOne(query);

    !result ? res.send("Not found!").status(404) :
        res.send(result).status(200);
});

router.post('/', async (req, res) => {
    try {
        let newBlogs = {
            title: req.body.title,
            content: req.body.content,
        }
        let result = await BLOGS_COLLECTION.insertOne(newBlogs);
        res.send(result).status(201);

    }
    catch (error) {
        console.log(error);

    }
});
//Endpoint for updating a blog by an id
router.patch('/:id', async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const updates = {
            $set: {
                tittle: req.body.tittle,
                content: req.body.content,
            },
        };
        let result = await BLOGS_COLLECTION.updateOne(query, updates);
        res.send(result).status(200);
    } catch (error) {
        console.error(error);

    }
});

//Endpoint for deleting a blog
router.delete('/id', async (req, res) => {
    try {
        const query ={ _id: new ObjectId(req.params.id) };
        let result = await BLOGS_COLLECTION.deleteOne(query);
        res.send(result).status(200);
    } catch (error) {
        console.error(error)
    }
});

export default router;