'use client';
import {useEffect, useState} from "react";
import {useParams} from "next/navigation";

export default function DetailPage() {

  const {id} = useParams();
  const [issue, setIssue] = useState({});

  useEffect(() => {
    fetch('/api/issues?_id='+id).then(response => {
      response.json().then(data => {
        setIssue(data);
      })
    })
  }, []);

  return (
    <section className="p-2">
      <div className="text-2xl">Issue detail</div>
      <div>{issue?.description}</div>
    </section>
  )
}