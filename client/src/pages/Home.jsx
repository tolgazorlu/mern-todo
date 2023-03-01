import React, {useState, useEffect} from 'react'
import NoteAdd from '../components/NoteAdd'
import NoteDetail from '../components/NoteDetail'

export default function Home() {

  const [notes, setNotes] = useState(null)

  useEffect(()=>{
    const fetchNotes = async () => {
      const response = await fetch("/api/notes")
      const json = await response.json()

      if(response.ok){
        setNotes(json)
      }
    }

    fetchNotes()
  }, [])

  return (
    <div>
      <div>
        <NoteAdd  />
      </div>
      <div>
      {notes && notes.map((note)=>(
        <NoteDetail key={note._id} note={note} />
      ))}
      </div>
      
    </div>
  )
}
