"use client"
import React, {useEffect, useState} from 'react'
import Link from 'next/link'

export default function page() {
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAttractions() {
      const res = await fetch(`/api/attractions`);
      const data = await res.json();
      setAttractions(data);
      setLoading(false);
    }
    fetchAttractions();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Attractions</h1>
      <div>
        <Link href="/attractions/new">Create New Attraction</Link>
      </div>
      <ul>
        {attractions.map((item) => (
          <li key={item.id}>
            <h2>{item.name}</h2>
            <img src={item.coverimage} height={200}/>
            <p>{item.detail}</p>
            <a href={`/attractions/${item.id}`}>View Details</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
