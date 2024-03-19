import { Router } from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = Router();
const EXPERIENCE_COLLECTION = db.collection("experience");

//Endpoint for getting list of experience
router.get('/', async (req, res) => {
    let collection = db.collection("experience");
    let results = await collection.find({}).toArray()
    res.send(results).status(200);
})

//Endpoint for adding a single experience
router.get('/:id', async (req, res) => {
    // let collection=db.collection("experience");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await EXPERIENCE_COLLECTION.findOne(query);

    !result ? res.send("Not found!").status(404) :
        res.send(result).status(200);
});

router.post('/', async (req, res) => {
    try {
        let newEXPERIENCE = {
            experience: req.body.experience,
           organization : req.body.organization,
           duration : req.body.duration,
           location : req.body.location,
           role : req.body.role,
        }
        let result = await EXPERIENCE_COLLECTION.insertOne(newEXPERIENCE);
        res.send(result).status(201);

    }
    catch (error) {
        console.log(error);

    }
});
//Endpoint for updating an experience by an id
router.patch('/:id', async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const updates = {
            $set: {
                skill: req.body.skill,
                proficiency: req.body.proficiency,
            },
        };
        let result = await EXPERIENCE_COLLECTION.updateOne(query, updates);
        res.send(result).status(200);
    } catch (error) {
        console.error(error);

    }
});

//Endpoint for deleting an experience
router.delete('/id', async (req, res) => {
    try {
        const query ={ _id: new ObjectId(req.params.id) };
        let result = await EXPERIENCE_COLLECTION.deleteOne(query);
        res.send(result).status(200);
    } catch (error) {
        console.error(error)
    }
});

export default router;