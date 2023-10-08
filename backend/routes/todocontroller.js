const router = require("express").Router()
const Todos = require("../models/todo")


//create 
router.post("/", async (req, res)=>{
  try{
  const createdTask = await Todos.create(req.body)
  res.status(200).json(createdTask);
  }catch(err){
    res.status(500).json(err)
  }
})

//get all 

router.get("/", async (req, res)=>{
 try {
  const allToDos= await Todos.find()
  res.status(200).json(allToDos)
 } catch (error) {
  res.status(500).json(error)
 }
})


//get one specific task
router.get("/:id", async (req, res)=>{
 try {
  const getTask = await Todos.findById(req.params.id);
  res.status(200).json(getTask)
 } catch (error) {
  res.status(500).json(error)
 }
})

//update task
router.patch("/:id", async (req, res)=>{
  try {
    const updatedTask= await Todos.findOneAndUpdate(req.params._id,
      req.body,{
        new:true,
        runValidators:true,
        overWrite:true,
      })
  res.status(200).json(updatedTask)
  } catch (error) {
    res.status(500).json(error)
  }
})


//delete task
router.delete("/:id",  async (req,res)=>{
 try {
  const deletedTask= await Todos.findOneAndDelete(req.params._id)
  res.status(200).json(deletedTask)
 } catch (error) {
  res.status(500).json(error)
 }
})

module.exports = router;
