'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { fetchMeetings, formatDate } from '@/lib/api'
import type { Meeting } from '@/lib/types'

export default function HomePage() {
  const [meetings, setMeetings] = useState<Meeting[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [tagFilter, setTagFilter] = useState('')

  useEffect(() => {
    setMeetings(null)
    setError(null)
    const timer = setTimeout(() => {
      fetchMeetings(query || undefined, tagFilter || undefined)
        .then(setMeetings)
        .catch((e) => setError(e.message))
    }, 300)
    return () => clearTimeout(timer)
  }, [query, tagFilter])

  if (error) return <div className="text-red-600">Error: {error}</div>

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="search"
          placeholder="Search meetings…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border rounded px-3 py-2 text-sm"
        />
        <input
          type="search"
          placeholder="Filter by tag…"
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
          className="w-40 border rounded px-3 py-2 text-sm"
        />
      </div>
      {!meetings ? (
        <div>Loading...</div>
      ) : meetings.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          {query || tagFilter ? 'No meetings match your filters.' : 'No meetings yet. Create one to get started.'}
        </div>
      ) : (
        <div className="bg-white rounded shadow divide-y">
          {meetings.map((m) => (
            <Link
              key={m.id}
              href={`/meetings/${m.id}`}
              className="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-medium truncate">{m.title}</span>
                {m.tags.map((tag) => (
                  <span
                    key={tag}
                    onClick={(e) => { e.preventDefault(); setTagFilter(tag) }}
                    className="shrink-0 text-xs bg-blue-100 text-blue-700 rounded px-1.5 py-0.5 cursor-pointer hover:bg-blue-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="text-sm text-gray-500 ml-4 shrink-0">
                {formatDate(m.meetingDate)}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
