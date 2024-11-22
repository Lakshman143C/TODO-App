import { useEffect, useState } from 'react'
import classess from './styles.module.css';
import TodoItem from './components/todo-item';
import TodoDetails from './components/todo-details';
import { Skeleton } from '@mui/material';

function App() {
  const [loading, setLoading] = useState(false);
  const [todos,setTodos]= useState([]);
  const [error,setErrors]=useState(null);
  const [todoDetails,setTodoDetails] =useState(null);
  const [isModelOpen,setModelOpen]= useState(false);

  async function showTodoDetails(id){
    try {
      const response=await fetch('https://dummyjson.com/todos/'+id);
      const result=await response.json();
      if(result){
        setTodoDetails(result);
        setModelOpen(true);
        console.log(todoDetails);
      }
      else{
        setModelOpen(false);
        setTodoDetails(null);
      }
    } catch (error) {
    }
  }

  async function fetchTodoList(){
    try {
      setLoading(true);
      const response=await fetch('https://dummyjson.com/todos');
      const result=await response.json();
      if(result?.todos && result?.todos?.length>0){
        setTodos(result.todos);
        console.log('setting todos',todos)
        setLoading(false);
      }else{
        setTodos([]);
        setLoading(false);
      }
    } catch (error) {
      console.log('something error occured while fetching the todos ',error);
      setErrors(error);
    }
  }

  useEffect(()=>{
    fetchTodoList();
  },[]);

  if(loading){
    return <Skeleton variant='rectangular' height={650} width={1400}></Skeleton>
  }
  return (
    <div className={classess.mainWrapper}>
      <h1 className={classess.headerTitle}>Simple TODO app</h1>
      <div className={classess.todoListWrapper}>
      {
        todos && todos.length > 0 ?
        todos.map(todoItem=><TodoItem todo={todoItem} todoDetails={showTodoDetails}/>):null
      }
      </div>
      <TodoDetails details={todoDetails} isOpen={isModelOpen} close={setModelOpen} setTodos={setTodos}></TodoDetails>
    </div>
  )
}

export default App;
