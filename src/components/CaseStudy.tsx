import { ArticleLayout } from '@/components/ArticleLayout'
import { MaybeTodo } from '@/components/Todo'
import { type CaseStudy as CaseStudyType } from '@/lib/caseStudies'

export function Section({
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

export function CaseStudy({
  study,
  aside,
  extra,
}: {
  study: CaseStudyType
  aside?: React.ReactNode
  /** Project-specific sections, shown after Key decisions. */
  extra?: React.ReactNode
}) {
  return (
    <ArticleLayout article={{ title: study.title }} aside={aside}>
      {study.draft && (
        <p>
          Draft. This page is hidden in production builds until the TODOs are
          removed.
        </p>
      )}
      <Section title="The challenge">
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
      <Section title="Key decisions">
        <ul>
          {study.decisions.map((decision) => (
            <li key={decision}>
              <MaybeTodo text={decision} />
            </li>
          ))}
        </ul>
      </Section>
      {extra}
      <Section title="Results">
        <p>
          <MaybeTodo text={study.outcome} />
        </p>
      </Section>
      {study.screenshots && (
        <Section title="Screenshots">
          <p>
            <MaybeTodo text={study.screenshots} />
          </p>
        </Section>
      )}
      <Section title="Tech stack">
        <p>
          <MaybeTodo text={study.stack} />
        </p>
      </Section>
    </ArticleLayout>
  )
}
