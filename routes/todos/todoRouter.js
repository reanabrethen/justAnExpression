const express = require('express')
const router = express.Router()
const uuidv4 = require("uuid").v4   //access to ID generator

let todos = [
    {
      id: "haf24jd",
      todo: "do laundry",
      done: "false"
    },
    {
      id: "jp2nkl2",
      todo: "wash dishes",
      done: "true"   //not a boolean b/c it is a string
    }
  ]

router.get('/get-all-todos', (req, res)=>{
    res.json(todos)   //feeds back whole array back
})

router.get('/get-todo-by-id/:id', (req, res)=>{  
   const {id} = req.params
   const foundId = todos.find(item =>{return item.id === id}) //can use .find() or loop through ; option2: do not use 'return' && curly brackets and on same line, works the same
   if(foundId){
    res.json(foundId)
    // {
    //     foundId: {
    //         {
    //             id: "haf24jd",
    //             todo: "do laundry",
    //             done: "false"
    //           }
    //     }

    // }
   }else{
    res.json({message: "The Todo ID you are looking for does not exist, please check the ID"})
   }
})

router.get('/get-todos-by-done/:done', (req, res)=>{
    const {done} = req.params
    const newDoneArray = todos.filter(item => item.done === done)
    res.json(newDoneArray)  //no checks, if it doesn't find any, will return empty arr
})

router.post('/create-new-todo', (req,res)=>{
    const {todo} = req.body
    const newTodo = {
        todo, //long way = todo: todo
        id: uuidv4(), //will give randomized id that will not repeat itself
        done: "false"
    }
    todos.push(newTodo)
    res.json(todos)
})

module.exports = router


//obj destructuring :
    // certain obj you can pinpoint certain keys in it, 
    //can pull them out & make certain variables of their own
    
    //helps avoid repeating code, more efficient

    // obj = {
    //     firstName: "Jane",
    //     lastName: "Doe",
    //     state: "FL"
    // }

    // const {firstName, lastName, state} = obj 
    //  //list keys you want to pull out of obj & will make accessible
    // console.log(lastName)

    //const firstName = obj.firstName --> original way to declare, destructuring --> more accessible code