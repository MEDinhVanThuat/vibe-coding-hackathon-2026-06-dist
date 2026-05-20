'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { fetchMeetings, formatDate } from '@/lib/api'
import type { Meeting } from '@/lib/types'

export default function HomePage() {
  const [meetings, setMeetings] = useState<Meeting[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchMeetings()
      .then(setMeetings)
      .catch((e) => setError(e.message))
  }, [])

  if (error) return <div className="text-red-600">Error: {error}</div>
  if (!meetings) return <div>Loading...</div>

  if (meetings.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No meetings yet. Create one to get started.
      </div>
    )
  }

  return (
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
  )
}
