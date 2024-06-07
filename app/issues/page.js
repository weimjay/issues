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

  return (
    <section className="p-3">
      <div className="text-2xl mb-4">Issues</div>
      {issues?.length > 0 && issues.map(issue => (
        <div className="flex">
          <Link href={'/issues/'+issue.id} className="text-blue-500 " key={issue.id}>{issue.id} {issue.title}</Link>
        </div>
      ))}
    </section>
  );


}