import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';
import {useNavigate} from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(NoteContext);
    const { notes, getNotes, editNote } = context;
    const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""});

    const ref = useRef(null);
    const refClose = useRef(null);
    let history = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
            // eslint-disable-next-line
        }
        else{
            history("/login");
            props.showAlert("Login to continue to iNotebook", "warning");
        }
    }, []);

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id , etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
    }
    
    const handleClick = ()=>{
        // console.log("Updating the note ", note);
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        props.showAlert("Updated Successfully", 'success');
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value});
    }

    return (
        <>
            <AddNote showAlert={props.showAlert}/>

            <button type="button" ref={ref} className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Edit Note
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" name="etitle" value={note.etitle} id="etitle" onChange={onChange} aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<3 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className="conatiner">
                {notes.length === 0 && 'No Notes to display'}
                </div>
                {notes.map((Note) => {
                    console.log("Note id: " + Note._id);
                    return <NoteItem key={Note._id} updateNote={updateNote} showAlert={props.showAlert} note={Note} />;
                })}
            </div>
        </>
    );
}

export default Notes;