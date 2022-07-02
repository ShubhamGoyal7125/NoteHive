import React, {useState} from 'react';
import NoteContext from './NoteContext';

const NoteState = (props)=>{
    const initialNotes = [
        {
          "_id": "62be9689fef3295aa69e3ea8",
          "user": "62bc9caf91bf255933b66bf5",
          "title": "Daily Routine",
          "description": "Wake up early",
          "tag": "personal",
          "date": "2022-07-01T06:39:05.407Z",
          "__v": 0
        },
        {
          "_id": "62c064c2334a696f2aab8999",
          "user": "62bc9caf91bf255933b66bf5",
          "title": "Daily Routine 2",
          "description": "Exercise",
          "tag": "personal",
          "date": "2022-07-02T15:31:14.153Z",
          "__v": 0
        },
        {
          "_id": "62c064d2334a696f2aab899b",
          "user": "62bc9caf91bf255933b66bf5",
          "title": "Daily Routine 3",
          "description": "Read Books",
          "tag": "personal",
          "date": "2022-07-02T15:31:30.358Z",
          "__v": 0
        },
        {
          "_id": "62be9689fef3295aa69e3ea8",
          "user": "62bc9caf91bf255933b66bf5",
          "title": "Daily Routine",
          "description": "Wake up early",
          "tag": "personal",
          "date": "2022-07-01T06:39:05.407Z",
          "__v": 0
        },
        {
          "_id": "62c064c2334a696f2aab8999",
          "user": "62bc9caf91bf255933b66bf5",
          "title": "Daily Routine 2",
          "description": "Exercise",
          "tag": "personal",
          "date": "2022-07-02T15:31:14.153Z",
          "__v": 0
        },
        {
          "_id": "62c064d2334a696f2aab899b",
          "user": "62bc9caf91bf255933b66bf5",
          "title": "Daily Routine 3",
          "description": "Read Books",
          "tag": "personal",
          "date": "2022-07-02T15:31:30.358Z",
          "__v": 0
        }
      ]

      const [notes, setNotes] = useState(initialNotes);
    
    return(
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;