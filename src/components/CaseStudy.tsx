import { ArticleLayout } from '@/components/ArticleLayout'
import { MaybeTodo } from '@/components/Todo'
import { type CaseStudy as CaseStudyType } from '@/lib/caseStudies'

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  )
}

export function CaseStudy({ study }: { study: CaseStudyType }) {
  return (
    <ArticleLayout article={{ title: study.title }}>
      {study.draft && (
        <p>
          Draft. This page is hidden in production builds until the TODOs are
          removed.
        </p>
      )}
      <Section title="Problem">
        <p>
          <MaybeTodo text={study.problem} />
        </p>
      </Section>
      <Section title="My role">
        <p>
          <MaybeTodo text={study.role} />
        </p>
      </Section>
      <Section title="Constraints">
        <p>
          <MaybeTodo text={study.constraints} />
        </p>
      </Section>
      <Section title="Key technical decisions">
        <ul>
          {study.decisions.map((decision) => (
            <li key={decision}>
              <MaybeTodo text={decision} />
            </li>
          ))}
        </ul>
      </Section>
      <Section title="Outcome">
        <p>
          <MaybeTodo text={study.outcome} />
        </p>
      </Section>
      <Section title="Screenshots">
        <p>
          <MaybeTodo text={study.screenshots} />
        </p>
      </Section>
      <Section title="Stack">
        <p>
          <MaybeTodo text={study.stack} />
        </p>
      </Section>
    </ArticleLayout>
  )
}
