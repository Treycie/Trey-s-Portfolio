import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import skills from './routes/skills.routes.js';
import experience from "./routes/experience.routes.js";
import achievements from "./routes/achievements.routes.js";
import projects from "./routes/projects.routes.js";
import blogs from "./routes/projects.routes.js";

const PORT = process.env.PORT || 4000

const app = express()

//add middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

//load routes
app.use("/skills",skills);
app.use("/experience",experience)
app.use("/achievements",achievements)
app.use("/projects",projects)
app.use("/blogs",blogs)

//start the server
app.listen(PORT,() =>{
    console.log(`Server is running on port:${PORT}`)
});