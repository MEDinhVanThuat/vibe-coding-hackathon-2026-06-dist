# User Stories

> Languages: **English** | [日本語](user-stories.ja.md) | [Tiếng Việt](user-stories.vi.md)

These are the requests and pain points that the users of this app (a meeting-notes tool) have raised.
You are acting as a PM-and-engineer hybrid. **It is up to you to decide what to take on, what to defer, and how to spend your time.**

Each story includes the persona and the context behind the ask. You probably won't be able to perfect all of them in 1.5 hours. Look at the business impact and the implementation cost together, and prioritize.

At the 0:50 mark, spec examples for some of these tasks will be released in `tasks/specs/`. Until then, work from these stories alone.

---

## #1 Meeting dates are off by a day

### Persona

Linh, on the customer success team. Records 20+ customer meetings each week.

### Story

> The date on a meeting note sometimes shows up as a different day from when the meeting actually happened.
> I need the date to display correctly. **When I screen-share a note in a customer call and quote "the meeting from last Monday," and it turns out to be the previous day's note, it confuses the conversation with the customer.**

### Background

Over the last month, our support team has received **8 tickets** all saying the same thing: "When I create a note for an early-morning meeting (07:00–09:00 JST), the list view shows the wrong day." The root cause has not been investigated.

The data itself (the timestamp stored in the DB) is fine — something in the display path is off.

Linh shares notes with customers daily. **She has been clear that wrong dates are a credibility issue.** This is a **data integrity** problem hitting every user, and her support tickets keep coming in **week after week**.

---

## #2 Delete button removes notes without confirming

### Persona

Hiroshi, an engineering manager. Manages his weekly 1-on-1 notes himself.

### Story

> On the meeting detail page, when I press Delete, there's no confirmation — the note just disappears.
> I'd like a confirmation step before deletion. **The Delete button is right next to the Edit button, and I have mis-clicked twice. There is no way to recover what I deleted.**

### Background

The app has no soft-delete or restore feature. Once a note is deleted, it's gone.

Hiroshi has asked in our internal Slack twice: "I did it again — can someone restore my note?" Both times we had to reply "No, the DB doesn't keep deletions."

The frequency is **occasional** — but when it happens, it hurts, and the operation is **irreversible** with no recovery path.

---

## #3 We can't organize meetings by project / customer

### Persona

Trang, lead of the consulting team. Handles 10+ customer projects in parallel.

### Story

> I want to attach tags to meeting notes — by project or by customer — so I can later filter the list to a specific tag.
> **We have over 100 notes already**, and finding "what did we promise that customer at their kickoff?" means scrolling through everything every time. The organization isn't keeping up.

### Background

Trang's team produced 220 notes in Q1. At the current rate they'll cross **500 notes** by the end of Q2.

A new team member who joined recently said it took them **a full day** to trace project context from past notes — because there's no structure on top of the chronological list.

If they could filter by tag, navigating customer history becomes fast.

Trang said in last week's leadership meeting: **"Without this, the team can't scale."** This is a retention / scaling problem — current heavy users will continue to feel more pain as data grows.

---

## #4 We can't search inside the body of meeting notes

### Persona

Mai, on the corporate planning team. Often goes back 6–12 months in meeting history to reconstruct how a decision was made.

### Story

> I need to search inside the **body** of meeting notes, not just the title.
> When I'm trying to find a past decision or the rationale behind one, **if I can't search by the proper noun or the number that's in the note's body, the same discussion ends up being repeated in another meeting.**

### Background

This has been **the #1 most-requested feature in the internal NPS survey for six months running**.

In particular, **two of our largest customers (Acme and BizCo, both up for renewal) have told us directly that "without search, they are evaluating switching to a competitor."** Acme's renewal is in 4 months, BizCo's is in 5 months. The sales team has said: **"Even just basic search would give us a story to bring into the renewal."**

Leadership has asked for this to be the top priority repeatedly. Every prior sprint has pushed it back. **This represents direct churn risk on real revenue.**

---

## #5 Export meeting notes as Markdown

### Persona

Quang, a frontend engineer. He runs his personal notes in Obsidian, and is known internally as "the heavy user" of any new tool.

### Story

> I'd like to export meeting notes as Markdown so I can pull them into my Obsidian setup.
> Right now I copy / paste between the meeting tool and my notes app, and the formatting always breaks, so I have to fix it by hand. **Would be nice to have.**

### Background

This is a one-off request from Quang. **He posted it once in `#feedback` on Slack, and no other users replied with a "+1."**

The sales team has confirmed: **"Customers have not asked us for this."** Quang himself wrote, **"This sounds like a fun feature — if there's time."**

---

## #6 Long titles break the list-view layout

### Persona

Aiko, on the people / HR team. She reads through the company-wide meeting list every morning.

### Story

> When a meeting has a very long title, the list view layout falls apart and becomes hard to read.
> I'd like long titles to display in a clean, readable way. **Each morning I scan about 30 notes top-to-bottom, and the long-title row pushes the whole layout sideways, including the date column on the right.**

### Background

The internal NPS survey free-text section has flagged this a few times: **"the list view is occasionally hard to look at."**

We have several genuinely long titles — for example, the quarterly all-hands review hits 130+ characters — and Aiko has to squint every time her eye lands on one.

The data itself is fine. This is a presentation-layer problem.

---

## Questions for you

- **What order will you tackle these in?**
- **If you can't finish all six in 1.5 hours, which do you commit to finishing, and which do you let go?**
- **If you delegate this judgement to an AI tool (Claude Code / Copilot / Cursor / etc.), where will you delegate, and where will you decide for yourself?**

The order, your interpretation of the specs, and how you split work between yourself and the AI are all part of what's being assessed.
