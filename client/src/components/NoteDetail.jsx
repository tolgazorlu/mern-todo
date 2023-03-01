import React from 'react'

export default function NoteDetail({note}) {
  return (
    <div>
        <h3>{note.title}</h3>
        <h4>{note.description}</h4>
        <p>{note.createdAt}</p>
    </div>
  )
}
