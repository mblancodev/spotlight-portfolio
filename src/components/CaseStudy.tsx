import { ArticleLayout } from '@/components/ArticleLayout'
import { MaybeTodo, hasContent } from '@/components/Todo'
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
  // In production, TODO-only entries drop out along with their empty sections.
  let decisions = study.decisions.filter(hasContent)
  let constraints = [study.constraints].flat().filter(hasContent)

  return (
    <ArticleLayout article={{ title: study.title }} aside={aside}>
      {study.draft && (
        <p>
          Draft. This page is hidden in production builds until the TODOs are
          removed.
        </p>
      )}
      {hasContent(study.problem) && (
        <Section title="The challenge">
          <p>
            <MaybeTodo text={study.problem} />
          </p>
        </Section>
      )}
      {hasContent(study.role) && (
        <Section title="My role">
          <p>
            <MaybeTodo text={study.role} />
          </p>
        </Section>
      )}
      {constraints.length > 0 && (
        <Section title="Constraints">
          {Array.isArray(study.constraints) ? (
            <ul>
              {constraints.map((constraint) => (
                <li key={constraint}>
                  <MaybeTodo text={constraint} />
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <MaybeTodo text={study.constraints} />
            </p>
          )}
        </Section>
      )}
      {decisions.length > 0 && (
        <Section title="Key decisions">
          <ul>
            {decisions.map((decision) => (
              <li key={decision}>
                <MaybeTodo text={decision} />
              </li>
            ))}
          </ul>
        </Section>
      )}
      {extra}
      {hasContent(study.outcome) && (
        <Section title="Results">
          <p>
            <MaybeTodo text={study.outcome} />
          </p>
        </Section>
      )}
      {hasContent(study.screenshots) && (
        <Section title="Screenshots">
          <p>
            <MaybeTodo text={study.screenshots} />
          </p>
        </Section>
      )}
      {hasContent(study.stack) && (
        <Section title="Tech stack">
          <p>
            <MaybeTodo text={study.stack} />
          </p>
        </Section>
      )}
    </ArticleLayout>
  )
}
