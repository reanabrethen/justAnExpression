const express = require('express')
const router = express.Router()

router.get("/", (req, res)=>{
    res.json({message: "Welcome to my App"})  //res.end will function the same way
})

module.exports = router