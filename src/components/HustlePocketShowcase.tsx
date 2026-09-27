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
          Found a job by hand? HustlePocket Companion is a Chrome extension that
          saves the posting to your board in one click, with no copying into a
          spreadsheet.
        </p>
        <ul>
          <li>
            The toolbar popup reads the posting on the current tab. LinkedIn,
            Indeed, and Lever get field-by-field extraction. Any other site gets
            an editable form and a “Request site support” button that tells me
            which site to support next.
          </li>
          <li>
            On LinkedIn, Indeed, Lever, Glassdoor, and Greenhouse, a floating
            button expands into a side panel right on the page.
          </li>
          <li>
            Job sites’ content security policies block requests from injected
            scripts, so the panel hands each save to a background service worker
            that calls the API.
          </li>
          <li>
            Saves go through the same import service as the rest of the board,
            so a posting lands the same way whether you saved it or the agent
            found it.
          </li>
        </ul>
      </Section>
      <Section title="Meet your companion">
        <div className="not-prose my-6 flex justify-center">
          <HustleAgent
            markup={agentMarkup}
            className="h-40 w-40 sm:h-48 sm:w-48"
          />
        </div>
        <p>
          The agent lives in a floating button on the board. Chat with it to
          search for jobs that match your CV, or paste links. It works in the
          background and lets you know once the new jobs are on your
          Applications board.
        </p>
      </Section>
    </>
  )
}
