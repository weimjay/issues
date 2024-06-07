'use client';
import {useState} from "react";

export default function NewIssuePage() {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  async function handleSubmit(ev) {
    ev.preventDefault();
    const data = {title, description};
    const res = await fetch('/api/issues', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex">
        <label>Title</label>
        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} />
        <label>Description</label>
        <input type="text" value={description} onChange={ev => setDescription(ev.target.value)} />
        <div>
          <button type="submit" className="bg-red-300 p-3">Create</button>
        </div>
      </div>
    </form>
  );
}