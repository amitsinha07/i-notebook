import NoteContext from "./NoteContext";
import { useState } from "react";

export const NoteState = (props) => {
  const host = "http://localhost:4000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // fetch Notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM4NGE1MjBkNDM1MjNiOTY5NWZiNWJhIn0sImlhdCI6MTY3MDU5MTU2Mn0.Do9Zk-urk47Oe-dJ-O6GVEKiJkCVr7BGBcRxPeRPiD4",
      },
    });
    const json = await response.json();
    //console.log(json);
    setNotes(json);
  };

  // Add a Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote}`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM4NGE1MjBkNDM1MjNiOTY5NWZiNWJhIn0sImlhdCI6MTY3MDU5MTU2Mn0.Do9Zk-urk47Oe-dJ-O6GVEKiJkCVr7BGBcRxPeRPiD4",
      },

      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    })
    const json = response.json();
    // console.log(json);
    // setNotes(notes.concat(json));
  };

  // Delete a Note
  const deleteNote = async (id) => {
    // API
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM4NGE1MjBkNDM1MjNiOTY5NWZiNWJhIn0sImlhdCI6MTY3MDU5MTU2Mn0.Do9Zk-urk47Oe-dJ-O6GVEKiJkCVr7BGBcRxPeRPiD4",
      },
    });
    const json = await response.json();

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM4NGE1MjBkNDM1MjNiOTY5NWZiNWJhIn0sImlhdCI6MTY3MDU5MTU2Mn0.Do9Zk-urk47Oe-dJ-O6GVEKiJkCVr7BGBcRxPeRPiD4",
      },

      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const json = response.json();

    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
