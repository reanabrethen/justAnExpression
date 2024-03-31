const express = require('express')
const logger = require('morgan')

const app = express()

const indexRouter = require('./routes/index/indexRouter')
const todoRouter = require('./routes/todos/todoRouter')

app.use(logger('dev'))
app.use(express.json())

//router
app.use("/", indexRouter)
app.use("/api/todo/", todoRouter)

app.listen(3002, ()=>{
    console.log("Server started on port 3002")
})



module.exports = app