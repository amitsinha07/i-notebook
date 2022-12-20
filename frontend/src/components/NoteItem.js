import React,{useContext} from 'react'
import noteContext from '../context/NoteContext';

function NoteItem(props) {
  const context = useContext(noteContext);
  const {deleteNote} = context;
  const {note} = props;
  return (
    <div className='col-md-3'>
        <div className='card'>
        <div className='card-body'>
          <div className='d-flex'>
            <h5 className='card-title mx-2'>{note.title} </h5>
            <i className='fa fa-thin fa-pen-to-square mx-2'></i>
            <i className="fa fa-thin fa-trash-can" onClick={()=>{deleteNote(note._id)}}></i>
          </div>
            <p className='card-text'>{note.description}</p>
        </div>
    </div>
    </div>
  )
}

export default NoteItem;