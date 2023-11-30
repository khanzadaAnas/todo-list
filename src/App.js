import React, { useEffect, useState } from 'react';
import './App.css';
import { db } from './firebase.utils';
// import firebase from 'firebase';
// import firebase from 'firebase/app';
import firebase from "firebase/compat/app";
import 'firebase/firestore';

function App() {
 const [input,setInput] = useState('');
 const [todos,setTodos] = useState([]);

 //fucnction lena ha ab deta firebase se
 //snapshot data mhi leta snap lyleta hai
 useEffect(() => {
  db.collection('todos').orderBy('timestamp','desc').onSnapshot(
    snapshot => {
setTodos(snapshot.docs.map(
  doc => ({
    id:doc.id,
    todo:doc.data().todo,
    timestamp:doc.data().timestamp
  })
))

    }
  )
 },[])
 console.log(todos);

//creating function for sending data to firebase
const addTodo = (e) => {
  e.preventDefault();
  db.collection('todos').add({
    todo:input,
    timestamp:firebase.firestore.FieldValue.serverTimestamp()
  })
  setInput('')
}


  return (
    <div className="App">
      <div className='card'>
        <h1>TODOLIST</h1>
        <form className='input-group mb-3'>
        <input type='text' className='form-control' onChange={e => setInput(e.target.value)} value={input} />
        <button type='submit' className='btn btn-primary' onClick={addTodo} disabled={!input}>ADD TODO</button>

        </form>
      </div>   
      <div className='card'>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>ID</th>
              <th scope='col'>TODO</th>
              <th scope='col'></th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
           {
            todos.map(todo => {
              return <tr key={todo.id}>
                <th>{todo.id}</th>
                <th>{todo.todo}</th>
                <th>
                <button className='btn btn-success' disabled={!input}
                onClick={() => { db.collection('todos').doc(todo.id).update(
                  {
                    todo:input,
                    timestamp:firebase.firestore.FieldValue.serverTimestamp()
                  }
                 
                );
                setInput('');
                }}>
                  Update
                </button>
              </th>
              <th><button onClick={
                (e) => db.collection('todos').doc(todo.id).delete()
              } className='btn btn-danger'>
                  Delete
                </button></th> 
              </tr>
            })
           }
          </tbody>

        </table>
        </div>   
    </div>
  );
}

export default App;

