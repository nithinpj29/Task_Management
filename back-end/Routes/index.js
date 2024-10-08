const express=require("express")

const router = express.Router();
const userAuthRoute=require("./userRoutes");
//const taskRoutes = require("./taskRoutes");

router.use("/user",userAuthRoute)
router.use("/task",taskRoutes)

    

module.exports=router;