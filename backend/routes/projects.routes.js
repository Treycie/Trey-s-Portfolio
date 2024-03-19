import { Router } from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = Router();
const PROJECTS_COLLECTION = db.collection("skills");

//Endpoint for getting list of projects
router.get('/', async (req, res) => {
    let collection = db.collection("projects");
    let results = await collection.find({}).toArray()
    res.send(results).status(200);
})

//Endpoint for adding a single project
router.get('/:id', async (req, res) => {
    // let collection=db.collection("proficiency");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await PROJECTS_COLLECTION.findOne(query);

    !result ? res.send("Not found!").status(404) :
        res.send(result).status(200);
});

router.post('/', async (req, res) => {
    try {
        let newPROJECT = {
            live_demo: req.body.live_demo,
            image: req.body.image,
            title:req.body.title,
            description:req.body.description,
        }
        let result = await PROJECTS_COLLECTION.insertOne(newproject);
        res.send(result).status(201);

    }
    catch (error) {
        console.log(error);

    }
});
//Endpoint for updating a skill by an id
router.patch('/:id', async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const updates = {
            $set: {
                live_demo: req.body.live_demo,
                image: req.body.image,
                title:req.body.title,
                description:req.body.description, 
                
            },
        };
        let result = await SKILLS_COLLECTION.updateOne(query, updates);
        res.send(result).status(200);
    } catch (error) {
        console.error(error);

    }
});

//Endpoint for deleting a skill
router.delete('/id', async (req, res) => {
    try {
        const query ={ _id: new ObjectId(req.params.id) };
        let result = await SKILLS_COLLECTION.deleteOne(query);
        res.send(result).status(200);
    } catch (error) {
        console.error(error)
    }
});

export default router;