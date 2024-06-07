'use client';
import {useState} from "react";

export default function NewIssuePage() {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  async function handleSubmit(ev) {
    ev.preventDefault();
    if (title.length < 1 || description.length < 1) {
      alert('title or description can not be empty!');
      return;
    }
    const createPromise = new Promise(async (resolve, reject) => {
      const data = {title, description};
      const res = await fetch('/api/issues', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
      })
      if (res.ok) {
        resolve();
        setTitle('');
        setDescription('');
      } else {
        reject();
      }
    })

  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="">
        <label>Title</label>
        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} />
        <label>Description</label>
        <input type="text" value={description} onChange={ev => setDescription(ev.target.value)} />
        <div>
          <button type="submit" className="bg-red-300 px-6 py-3 rounded-xl">Create</button>
        </div>
      </div>
    </form>
  );
}