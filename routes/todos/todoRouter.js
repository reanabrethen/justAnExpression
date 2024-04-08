//links router and random id generator === uuidv4
const express = require('express')
const router = express.Router()
const uuidv4 = require("uuid").v4   //access to ID generator

//array of todo objects
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

//route for grabbing all todos
router.get('/get-all-todos', (req, res)=>{
    res.json(todos)   //feeds back whole array back
})

//router for grabbing a specific todo by id
router.get('/get-todo-by-id/:id', (req, res)=>{  
   const {id} = req.params
   const foundId = todos.find(item =>{return item.id === id}) //can use .find() or loop through ; option2: do not use 'return' && curly brackets and on same line, works the same
   if(foundId){
    res.json(foundId)
   
   //how we want it to look but can use the above & below code for 'cleaner' code
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
    //create an error message if ID's do not match any current todos within array
    res.json({message: "The Todo ID you are looking for does not exist, please check the ID"})
   }
})

//route to specifically grab todo by the 'done' key ; "/:done" is either true or false
router.get('/get-todos-by-done/:done', (req, res)=>{
    const {done} = req.params  //pulling out key from object to use in route call; also known as destructuring
    
    const newDoneArray = todos.filter(item => item.done === done)
    res.json(newDoneArray)  //no checks, if it doesn't find any, will return empty array
})


//route to create new id; body requires a "todo": "value" to create a new "todo"
router.post('/create-new-todo', (req,res)=>{
    const {todo} = req.body
    const checkTodoList = todos.find(item=>item.todo === todo)
    if(checkTodoList){
      //checks to make sure that "todo" doesn't already exsist by checking the "todo" key 
      res.json({message: "Todo already exsists"})   
    }else{
      //model for what newTodo will look like within the 'raw' body on the server
          const newTodo = {
              todo, //long way --> todo: todo
              id: uuidv4(), //will give randomized id that will not repeat itself
              done: "false"
        }
        //pushes newTodo into current array of "todos"
      todos.push(newTodo)
      res.json(todos)
    }
})


//route to update todo by id
router.put('/update-todo/:id', (req, res)=>{
  const {id} = req.params
  const {todo, done} = req.body
  const todoUpdated = todos.find(item => item.id === id)
    if(todoUpdated){
      //within the body, if you write "todo", it will update the todo of the todo based on the id of the todo
            if(todo){
                todoUpdated.todo = todo
            //will update the "done" to a "true" or "false"
              }if(done){
                todoUpdated.done = done
            }
            res.json(todos)
            
          }else{
            //if no body is given, will return an error message
              res.json({message: "Unable to update"})
          }
          
  })
    
//route to mark todo "complete" or "incomplete" within the message back to user
router.put('/mark-done/:id', (req, res)=>{
  const {id} = req.params
  const {done} = req.body
  const todoCompleted = todos.find(todo => todo.id === id)
  if(todoCompleted && done === "false"){ //if both are still 'false' will return this message in line 107
    res.json({message: "The todo is incomplete"})
  }
  if(todoCompleted && done === "true"){ //if both are 'true', will return the message in line 110
    res.json({message: "Todo is complete"})
  }else{//if body is empty, will return message in line 112
    res.json({message: "Todo has not been marked complete or incomplete"})
  }
})

//route to delete todo by the id
router.delete("/delete-todo/:id", (req, res)=>{
  const {id} = req.params
  const eraseTodo = todos.filter(item => item.id !== id)
  if(eraseTodo.length === todos.length){
    res.json({message: "Unable to delete"})
  }else{
    todos = eraseTodo
    res.json({message: "Successfully deleted todo"})
  }

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