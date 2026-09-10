# Our Story — John + Christina

This repository is a living digital archive created by John Liter for Christina.

It began as a collection of birthday pages, poems, anniversary creations, holiday surprises, and things made simply because I love her. The goal now is bigger: preserve those creations and continue adding to them for the rest of our lives.

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

Example:

```json
{
  "id": "anniversary-20",
  "title": "Twenty Years Together",
  "date": "2037-12-27",
  "type": "anniversary",
  "reason": "Anniversary",
  "image": "images/20-years.jpg",
  "path": "anniversaries/twenty-years/index.html",
  "description": "Twenty years of marriage."
}
```

The homepage automatically groups memories by year and supports search and filtering.

## Important date

Married: **December 27, 2017**

The archive includes automatic marriage counters and date-aware “Today in our story” messages.

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
