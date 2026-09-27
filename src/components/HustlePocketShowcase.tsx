import fs from 'fs'
import path from 'path'

import { Section } from '@/components/CaseStudy'
import { HustleAgent } from '@/components/HustleAgent'

// The mascot is inlined (not an <img>) so its eyes can blink.
const agentMarkup = fs
  .readFileSync(
    path.join(process.cwd(), 'public/projects/hustlepocket-agent.svg'),
    'utf8',
  )
  .replace(/^<\?xml[^>]*>\s*/u, '')

/** HustlePocket-only sections for its case study: the Companion extension and the agent. */
export function HustlePocketShowcase() {
  return (
    <>
      <Section title="The Companion extension">
        <p>
          Found a job on your own? HustlePocket Companion is a Chrome extension
          that saves the posting to your board in one click. No copying and
          pasting into a spreadsheet.
        </p>
        <ul>
          <li>
            Reads the page for you. On LinkedIn, Indeed, and Lever, it pulls out
            the job details automatically. On any other site, it opens a quick
            form to fill in, plus a “Request site support” button that tells me
            which sites to add next.
          </li>
          <li>
            Works right on the page. On LinkedIn, Indeed, Lever, Glassdoor, and
            Greenhouse, a floating button opens a side panel without leaving the
            listing.
          </li>
          <li>
            Gets past site restrictions. Job sites block extensions from sending
            data directly, so saves are passed to a background process that
            delivers them safely.
          </li>
          <li>
            Consistent results. Every save goes through the same path as the
            rest of the board, so a job looks the same whether you saved it or
            the assistant found it.
          </li>
        </ul>
      </Section>
      <Section title="The assistant">
        <div className="not-prose my-6 flex justify-center">
          <HustleAgent
            markup={agentMarkup}
            className="h-40 w-40 sm:h-48 sm:w-48"
          />
        </div>
        <p>
          The assistant sits in a floating button on the board. Ask it to find
          jobs that match your CV, or paste links you’ve found. It works in the
          background and lets you know when new jobs are on your Applications
          board.
        </p>
      </Section>
    </>
  )
}
