import react from 'react'

export default function NoteTimeLine(props){

    const displayNotes = (props) => {
        const {menu, notes} = props;

        if(notes.length > 0){
            return(
                notes.map((note, index) => {
                    console.log(note);
                    return(
                        <div className='note' key={note.id}>
                            <h3 className="note__title">{note.title}</h3>
                            <p className="note__body">{note.original_title}</p>
                            <span className="note__fadeOut"></span>
                        </div>
                    )
                })
            )
        }else{
            return (<h3>no ngentot</h3>)
        }
    }
    return(
        <>
        {displayNotes(props)}
        </>
    )
}