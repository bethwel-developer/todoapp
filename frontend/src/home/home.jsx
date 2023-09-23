import {FcTodoList} from "react-icons/fc"
import {AiTwotoneDelete} from "react-icons/ai"
import {BiEdit} from "react-icons/bi"
import "./home.css"
import { useState, useEffect } from "react";
import axios from "axios"
import { todosRoute } from "../utilis/apiroutes";


function Home () {
 const [itemText, setitemText] = useState ('')
const [listItems, setlistItems]= useState([])
const [isUpdating, setIsUpdating] = useState('');
const [updateItemText, setUpdateItemText] = useState('');


 const addItem = async (e) => {
  e.preventDefault()
  try {
const res = await axios.post(todosRoute, {name:itemText})
setlistItems(prev=>[...prev, res.data])
setitemText()
} catch (error) {
    console.log(error)
  }}


  //function to get all todoitems from database
  useEffect(() => {
    const getItemsList = async () => {
       try {
        const res = await axios.get(todosRoute)
        setlistItems(res.data)
       } catch (error) {
        console.log(error)
       } 
    }
    getItemsList()
  }, [])
  

//delete task

const deleteitem = async (id) =>{
try {
   await axios.delete(todosRoute +`${id}`)
  const newlistItem = listItems.filter(item=> item._id !== id);
   setlistItems(newlistItem) 
} catch (error) {
  console.log(error)
}
}

//Update item
const updateItem = async (e) => {
  e.preventDefault()
  try{
    await axios.patch(todosRoute+`${isUpdating}`, {name: updateItemText})
    const updatedItemIndex = listItems.findIndex(item => item._id === isUpdating);
     listItems[updatedItemIndex].name = updateItemText;
    setUpdateItemText('');
    setIsUpdating('');
  }catch(err){
    console.log(err);
  }
}



 //before updating item we need to show input field where we will create our updated item
 const renderUpdateForm = () => (
  <div className="update-form">
  <form  onSubmit={(e)=>{updateItem(e)}} >
    <input className="update-new-input" type="text" placeholder="update Task" onChange={e=>{setUpdateItemText(e.target.value)}} value={updateItemText} />
    <button className="addtodo-button" type="submit">Update</button>
  </form>
  </div>
  
)



  return (
    <>
     <div className='logosection'>
      <div className='home-logo'><FcTodoList/></div>
     <div className='logo-header'>TodoApp</div> 
      </div>


    <div className='home-container'>
      
    <div className='home-components'>
      <div className='users-names'>Welcome Back!!</div>

      <div className='todo-input'>
      <form onSubmit={e => addItem(e)}>
      <input type="text" className='todoinput'  placeholder='Add Task'
      onChange={e=> {setitemText(e.target.value)}} value={itemText}
      ></input>
        <button type="submit"  className='addtodo-button'>Add Todo</button>
        </form>
      </div>
    </div>




<h2>Your todos</h2>





 {
 listItems.map(item => (
<div className='todo-content'> 
{
  isUpdating === item._id
  ? renderUpdateForm()
  :
<>
  <h5 className="task-name">{item.name}</h5>
  <h5 className="task-name">created:  {new Date(item.createdAt).toDateString()}</h5>
 <button onClick={()=>{deleteitem(item._id)}} className='task-button'><AiTwotoneDelete/></button>
 <button onClick={()=>{setIsUpdating(item._id)}} className='task-button'><BiEdit/></button>
 
 </>
}
</div>
 ))
 }





    </div>
    </>
  );
}

export default Home;
