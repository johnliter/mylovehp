# Our Story — John + Christina

This repository is a living digital archive created by John Liter for Christina.

It began as a collection of birthday pages, poems, anniversary creations, holiday surprises, and things made simply because I love her. The goal is bigger now: preserve those creations, the words around them, and the milestones between them for the rest of our lives.

## What the archive contains

The homepage now has four durable data layers:

- `data/memories.json` — birthday, anniversary, holiday, poem, and special-creation entries.
- `data/milestones.json` — major dates in the relationship timeline.
- `data/letters.json` — letters and personal notes written for Christina.
- Static HTML/CSS/JavaScript experiences — the original one-of-a-kind pages remain independent and preserved.

## Why this archive exists

Creating things is one of the ways I show love. Christina has always understood how much I enjoy coding and building, and she appreciates the little things I make for her. This archive gives those moments a permanent home instead of letting them disappear over time.

## Preservation philosophy

The project is intentionally static-first:

- Plain HTML
- Plain CSS
- Plain JavaScript
- JSON for archive metadata
- Standard image and media formats
- No database
- No server-side runtime
- No framework build process
- No required third-party CSS or JavaScript CDN

The homepage can be hosted nearly anywhere, and the core site can still be opened from ordinary files if hosting changes in the future.

## Adding a new memory

1. Create the new experience in its own folder.
2. Add its images and other assets locally to this repository.
3. Add one entry to `data/memories.json`.
4. Use an ISO date in `YYYY-MM-DD` format.
5. Keep the original creation self-contained whenever possible.

## Adding a milestone

Add a new object to `data/milestones.json`:

```json
{
  "id": "example-milestone",
  "date": "2030-01-01",
  "label": "A chapter heading",
  "title": "The milestone title.",
  "description": "Why this date mattered."
}
```

Only add dates and details that are known. The point of the timeline is preservation, not filling every year.

## Adding a letter

Add a new object to `data/letters.json`:

```json
{
  "id": "letter-example",
  "label": "For Christina",
  "title": "A title for the letter",
  "paragraphs": [
    "First paragraph.",
    "Second paragraph."
  ],
  "signature": "Love, John"
}
```

## Important date

Married: **December 27, 2017**

The archive includes automatic marriage counters, date-aware “Today in our story” messages, and a Next Chapter counter that automatically looks toward Christina's birthday or the next anniversary.

## Photo preservation

The homepage hero uses a web-optimized copy of the wedding photo provided for the archive. Keep the full-resolution original separately with the family's original photo backups. Web copies are for display; originals are for preservation.

For irreplaceable media, keep:

1. Original full-resolution file.
2. Web-optimized copy used by the site.
3. At least one external-drive backup.
4. At least one separate cloud backup.

## Long-term preservation

Keep multiple copies of this repository:

1. GitHub
2. Production web host
3. Local computer
4. External drive
5. Separate cloud backup

Create periodic ZIP snapshots rather than relying on a single live copy.

Recommended naming:

`Our-Story-Archive-2026.zip`

`Our-Story-Archive-2027.zip`

`Our-Story-Archive-2028.zip`

## For our family

If this repository is being read many years from now, the important part is not the code.

The code only holds the memories.

Keep the photos. Keep the words. Keep the dates and stories that explain why each creation existed. Technology will change, but those things are the reason this archive was made.

Built by John for Christina.
