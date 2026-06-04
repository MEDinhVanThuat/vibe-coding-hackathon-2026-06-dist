import { Router } from 'express'
import { prisma } from '../lib/db'

const router = Router()

router.get('/', async (req, res) => {
  const q = req.query.q as string | undefined
  const tag = req.query.tag as string | undefined
  const where: Record<string, unknown> = {}
  if (q) {
    where.OR = [
      { title: { contains: q, mode: 'insensitive' as const } },
      { body: { contains: q, mode: 'insensitive' as const } },
    ]
  }
  if (tag) {
    where.tags = { has: tag }
  }
  const meetings = await prisma.meeting.findMany({
    where,
    orderBy: { meetingDate: 'desc' },
  })
  res.json(meetings)
})

router.get('/:id', async (req, res) => {
  const meeting = await prisma.meeting.findUnique({
    where: { id: req.params.id },
  })
  if (!meeting) {
    return res.status(404).json({ error: 'Not found' })
  }
  res.json(meeting)
})

router.post('/', async (req, res) => {
  const { title, body, meetingDate, tags } = req.body
  const meeting = await prisma.meeting.create({
    data: {
      title,
      body,
      meetingDate: new Date(meetingDate),
      tags: tags ?? [],
    },
  })
  res.status(201).json(meeting)
})

router.put('/:id', async (req, res) => {
  const { title, body, meetingDate, tags } = req.body
  const meeting = await prisma.meeting.update({
    where: { id: req.params.id },
    data: {
      title,
      body,
      meetingDate: meetingDate ? new Date(meetingDate) : undefined,
      ...(tags !== undefined && { tags }),
    },
  })
  res.json(meeting)
})

router.delete('/:id', async (req, res) => {
  await prisma.meeting.delete({
    where: { id: req.params.id },
  })
  res.status(204).end()
})

export default router
