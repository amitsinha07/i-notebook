import React, { useContext, useEffect } from "react";
import noteContext from "../context/NoteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";

function Notes() {
  const context = useContext(noteContext);
  const {notes, getNotes} = context;
  useEffect(()=>{
    getNotes();
    // eslint-disable-next-line
  }, []);

  const updateNote = () => {

  }


  return (
    <>
      <AddNote/>
      <div className="row my-5">
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return <NoteItem key={note._id} updateNote={updateNote} note={note} />;
        })}
      </div>
    </>
  );
}

export default Notes;
