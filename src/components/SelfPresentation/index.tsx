import GlassSurface from '@/components/GlassSurface'

export const SelfPresentation = () => (
  <div>
    <h1 className="font-serif text-[2.5rem] leading-[1.05] font-medium tracking-tight text-foreground md:text-5xl">
      About
    </h1>
    {/* Negative margin matches the padding, so the text keeps its width and lines up with the heading. */}
    <GlassSurface
      borderRadius={24}
      width="auto"
      className="-mx-4 mt-6 sm:-mx-6"
    >
      <div className="space-y-6 p-4 text-[15px] leading-normal tracking-tight text-foreground/65 sm:p-6 sm:text-base">
        <p>
          I got hooked on software the first time I opened a website’s code and
          realized I could change it. That curiosity took me from building games
          as a teenager to engineering SaaS and ERP platforms, and it still
          shapes how I work.
        </p>
        <p>
          I started in frontend at Agrolevels in 2018, then owned the Mapbox GL
          frontend for Infrapedia, a global map of internet infrastructure used
          by network operators. At Edgeuno I moved from frontend into backend
          work in Python and Node.js. At Neostella I improved usability in
          production and, in my first two weeks, proposed code-maintenance rules
          for the team.
        </p>
        <p>
          Today I co-lead Astrolle, an operations platform that routes each task
          to a person, an AI agent, or a machine. I’m responsible for the web
          platform end to end: micro-frontend architecture, data structures, and
          deployment with GitHub Actions, Docker, and Azure. I also hired three
          of our engineers.
        </p>
        <p>
          A growing part of my work is building AI into how software gets made.
          At Astrolle, a requirement starts as a spoken description. A custom
          skill turns the transcript into a plan, an agent implements it with
          tests and verifies it with Playwright, and an engineer approves it
          before it becomes a pull request.
        </p>
        <p>
          Outside work I play piano as an amateur and I’m building a small 2D
          game in Lua and Love2D.
        </p>
      </div>
    </GlassSurface>
  </div>
)
