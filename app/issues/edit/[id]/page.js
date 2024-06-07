'use client';
import {useEffect, useState} from "react";
import {redirect, useParams} from "next/navigation";

export default function EditIssuePage() {
  const {id} = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetch('/api/issues?_id='+id).then(response => {
      response.json().then(data => {
        setTitle(data?.title);
        setDescription(data?.description);
      })
    })
  }, []);

  async function handleSubmit(ev) {
    ev.preventDefault();
    if (title.length < 1 || description.length < 1) {
      alert('title or description can not be empty!');
      return;
    }
    const updatePromise = new Promise(async (resolve, reject) => {
      const data = {_id: id, title, description};
      const res = await fetch('/api/issues', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
      })
      if (res.ok) {
        resolve();
      } else {
        reject();
      }
    })
    updatePromise.then(() => {
      window.location.href = '/issues';
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
          <button type="submit" className="bg-red-300 px-6 py-3 rounded-xl">Update</button>
        </div>
      </div>
    </form>
  );
}