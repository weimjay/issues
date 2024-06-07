'use client';
import {useEffect, useState} from "react";
import Link from "next/link";

export default function IssuesPage() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetchIssues();
  }, []);

  function fetchIssues() {
    fetch('/api/issues').then(response => {
      response.json().then(data => {
        setIssues(data);
      })
    })
  }

  async function handleDelete(id) {
    await fetch('/api/issues?_id='+id, {
      'method': 'DELETE',
    })
    fetchIssues();
  }

  return (
    <section className="p-3">
      <div className="mb-4">
        <span className="text-2xl mr-8">Issues</span>
        <Link href={'/issues/create'} className="bg-blue-300 px-6 py-2 rounded-xl">Create</Link>
      </div>
      {issues?.length > 0 && issues.map(issue => (
        <div className="flex gap-4 m-2 items-center">
          <Link href={'/issues/' + issue._id} className="text-blue-500" key={issue._id}>{issue.title}</Link>
          <Link href={'/issues/edit/'+issue._id} className="bg-blue-300 px-3 py-1 rounded-xl">Edit</Link>
          <button onClick={() => handleDelete(issue._id)} className="bg-red-300 px-3 py-1 rounded-xl">Delete</button>
        </div>
      ))}
    </section>
  );


}