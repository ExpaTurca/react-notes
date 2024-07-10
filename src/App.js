import React, {useState, useEffect} from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import { response } from 'express';

function App() {
const [notes, setNotes] = useState([]);
const [newNote, setNewNote]= useState({title:'',content:''});
const [editing, setEditing]=useState(null);

useEffect(()=>{
  axios.get('http://localhost:3001/notes')
  .then((response)=>{ 
    setNotes(response.data);
  }).catch((error)=>{
    console.error(error);
});
}, []);

const handleCreateNote=()=>{
  axios.post('http://localhost:3001/notes',newNote)
  .then((response)=>{
    setNotes([...notes,response.data]);
    setNewNote({title:'', content:''});
  })
  .catch((error)=>{
    console.error(error);
  });
};

const handleUpdateNote=(id)=>{
  axios.put('http://localhost:3001/notes/${id}', newNote)
  .then((response)=>{
    const updatedNotes = notes.map((note)=>{
      if(note.id===id){
        return response.data
      }
      return note;
    });
    setNotes(updatedNotes);
    setEditing(null);
  })
  .catch((error)=>{
    console.error(error);
  });
  
  const handleDeleteNote = (id)=>{
    axios.delete('http://localhost:3001/notes/${id}')
    .then((response)=>{
      setNotes(notes.filter((note)=>note.id!==id));
    }).catch((error)=>{
      console.error(error);
  });
  }
}


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
