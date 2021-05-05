import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import NoteTimeLine from './NoteTimeLine';

export default function Getdatatest() {
    //get data from API
    const [notes, getNotes] = useState('');

    const url = 'https://localhost:3000/';

    useEffect(() => {
        getAllNotes();
    }, []);

    const getAllNotes = () => {
        axios.get('https://ghibliapi.herokuapp.com/films')
        .then((response) => {
            const allNotes = response.data.notes.allNotes;
            //Add data to state
            getNotes(allNotes);
        })
        .catch(error => console.error(`Error : ${error}`));
    }

    return (
        <div>
            {/* <Card>
                <CardContent>
                    
                </CardContent>
            </Card> */}
            <NoteTimeLine notes={notes}></NoteTimeLine>
        </div>
    )
}


