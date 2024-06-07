'use client';
import {useEffect, useState} from "react";
import Link from "next/link";

export default function IssuesPage() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetch('/api/issues').then(response => {
      response.json().then(data => {
        setIssues(data);
      })
    })
  }, []);

  function handleDelete(id) {
    fetch('/api/issues?_id='+id, {
      'method': 'DELETE',
      headers: {'Content-Type': 'application/json'},
    })
  }

  return (
    <section className="p-3">
      <div className="text-2xl mb-4">Issues</div>
      {issues?.length > 0 && issues.map(issue => (
        <div className="flex gap-4 m-2">
          <Link href={'/issues/'+issue._id} className="text-blue-500" key={issue._id}>{issue.title}</Link>

          <button onClick={() => handleDelete(issue._id)} className="bg-red-300 px-3 py-1 rounded-xl">Delete</button>
        </div>
      ))}
    </section>
  );


}