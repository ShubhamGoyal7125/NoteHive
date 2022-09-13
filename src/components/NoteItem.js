import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className="col-md-4 my-3">
            <div className="card">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa fa-solid fa-trash mx-3 ms-4 mt-1" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted Successfully", 'success');}}></i>
                        <i className="fa fa-solid fa-pen mx-3 mt-1" onClick={()=>{updateNote(note)}} ></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                    {/* <p className="card-text">#{note.tag}</p> */}
                </div>
            </div>
        </div>
    );
};

export default NoteItem;
