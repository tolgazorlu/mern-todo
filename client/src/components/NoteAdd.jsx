import React, {useState} from 'react'

export default function NoteAdd() {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault(e)
        const note = {title, description}

        const response = await fetch('/api/notes', {
            method: 'POST',
            body: JSON.stringify(note),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = response.json()

        if(!response.ok){
            setError(json.err)
            console.log(error)
        }

        if(response.ok){
            setError(null)
            setTitle('')
            setDescription('')
        }

    }

  return (
    <form onSubmit={handleSubmit}>
        <h3>Add new note</h3>
        <div>
            <label>Note Title: </label>
            <input type="text" onChange={(e)=>setTitle(e.target.value)} value={title} />
        </div>
        <div>
            <label>Note Description: </label>
            <input type="text" onChange={(e)=>setDescription(e.target.value)} value={description} />
        </div>
        <button type="submit">add note</button>
        {error && <div>{error}</div>}
    </form>
  )
}
