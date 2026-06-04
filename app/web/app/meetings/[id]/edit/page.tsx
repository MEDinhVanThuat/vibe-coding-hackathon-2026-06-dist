'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { fetchMeeting, updateMeeting } from '@/lib/api'

export default function EditMeetingPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [meetingDate, setMeetingDate] = useState('')
  const [tagsInput, setTagsInput] = useState('')
  const [loaded, setLoaded] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchMeeting(id).then((m) => {
      setTitle(m.title)
      setBody(m.body)
      setMeetingDate(m.meetingDate.slice(0, 10))
      setTagsInput(m.tags.join(', '))
      setLoaded(true)
    })
  }, [id])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    try {
      await updateMeeting(id, {
        title,
        body,
        meetingDate: new Date(meetingDate).toISOString(),
        tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
      })
      router.push(`/meetings/${id}`)
    } catch (err) {
      alert('Error updating meeting')
      setSubmitting(false)
    }
  }

  if (!loaded) return <div>Loading...</div>

  return (
    <div className="space-y-4">
    <Link href={`/meetings/${id}`} className="text-sm text-gray-500 hover:text-gray-700">← Back</Link>
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded shadow p-6 space-y-4"
    >
      <h1 className="text-2xl font-semibold">Edit Meeting</h1>
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Date</label>
        <input
          type="date"
          value={meetingDate}
          onChange={(e) => setMeetingDate(e.target.value)}
          className="border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Tags <span className="text-gray-400 font-normal">(comma-separated)</span></label>
        <input
          type="text"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="e.g. planning, q2, engineering"
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Notes</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={10}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {submitting ? 'Updating...' : 'Update'}
      </button>
    </form>
    </div>
  )
}
