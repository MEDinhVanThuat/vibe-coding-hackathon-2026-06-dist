'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { fetchMeetings, formatDate } from '@/lib/api'
import type { Meeting } from '@/lib/types'

export default function HomePage() {
  const [meetings, setMeetings] = useState<Meeting[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    setMeetings(null)
    setError(null)
    const timer = setTimeout(() => {
      fetchMeetings(query || undefined)
        .then(setMeetings)
        .catch((e) => setError(e.message))
    }, 300)
    return () => clearTimeout(timer)
  }, [query])

  if (error) return <div className="text-red-600">Error: {error}</div>

  return (
    <div className="space-y-4">
      <input
        type="search"
        placeholder="Search meetings…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border rounded px-3 py-2 text-sm"
      />
      {!meetings ? (
        <div>Loading...</div>
      ) : meetings.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          {query ? 'No meetings match your search.' : 'No meetings yet. Create one to get started.'}
        </div>
      ) : (
        <div className="bg-white rounded shadow divide-y">
          {meetings.map((m) => (
            <Link
              key={m.id}
              href={`/meetings/${m.id}`}
              className="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
            >
              <span className="font-medium">{m.title}</span>
              <span className="text-sm text-gray-500 ml-4">
                {formatDate(m.meetingDate)}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
