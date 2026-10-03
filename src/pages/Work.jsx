import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FLAGS from '../featureFlags';
import { Section, ExtLink, Metrics } from '../components/ui';
import {
  experience,
  contributions,
  utilityModels,
  book,
  publications,
  talks,
  review,
  honors,
  media,
} from '../data/profile';

const SECTIONS = [
  { id: 'experience', label: 'Experience', flag: 'SHOW_EXPERIENCE' },
  { id: 'contributions', label: 'Contributions', flag: 'SHOW_CONTRIBUTIONS' },
  { id: 'utility-models', label: 'Registered designs', flag: 'SHOW_UTILITY_MODELS' },
  { id: 'publications', label: 'Publications', flag: 'SHOW_PUBLICATIONS' },
  { id: 'talks', label: 'Talks', flag: 'SHOW_TALKS' },
  { id: 'review', label: 'Peer review', flag: 'SHOW_REVIEW' },
  { id: 'honors', label: 'Honors', flag: 'SHOW_HONORS' },
  { id: 'media', label: 'Media', flag: 'SHOW_MEDIA' },
].filter((s) => FLAGS[s.flag]);

const SECTION_IDS = SECTIONS.map((s) => s.id);
const num = (id) => String(SECTION_IDS.indexOf(id) + 1).padStart(2, '0');

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  el.focus({ preventScroll: true });
};

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-140px 0px -55% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

export default function Work() {
  const location = useLocation();
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const target = location.state?.section;
    if (!target) return undefined;
    // Wait a frame so the route's scroll-to-top runs first.
    const frame = requestAnimationFrame(() => scrollToSection(target));
    return () => cancelAnimationFrame(frame);
  }, [location.state]);

  return (
    <div className="container page">
      <header className="page-head">
        <p className="eyebrow">Work</p>
        <h1>Engineering, research, and recognition</h1>
        <p className="page-lead">
          Production systems I have designed and improved, the research and registered designs behind my
          approach, and how other organizations have engaged with that work. Items link to their public
          records where one exists.
        </p>
      </header>

      <nav className="subnav" aria-label="Work sections">
        <ul>
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                className={`subnav-link${active === s.id ? ' is-active' : ''}`}
                aria-current={active === s.id ? 'true' : undefined}
                onClick={() => scrollToSection(s.id)}
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {FLAGS.SHOW_EXPERIENCE && <ExperienceSection />}
      {FLAGS.SHOW_CONTRIBUTIONS && <ContributionsSection />}
      {FLAGS.SHOW_UTILITY_MODELS && <UtilityModelsSection />}
      {FLAGS.SHOW_PUBLICATIONS && <PublicationsSection />}
      {FLAGS.SHOW_TALKS && <TalksSection />}
      {FLAGS.SHOW_REVIEW && <ReviewSection />}
      {FLAGS.SHOW_HONORS && <HonorsSection />}
      {FLAGS.SHOW_MEDIA && <MediaSection />}
    </div>
  );
}

function ExperienceSection() {
  return (
    <Section
      id="experience"
      eyebrow={num('experience')}
      title="Experience"
      intro="About eleven years building and modernizing enterprise systems in insurance and retail."
    >
      <ol className="timeline">
        {experience.map((job) => (
          <li key={`${job.company}-${job.period}`} className="timeline-item">
            <div className="timeline-meta">
              <span className="mono">{job.period}</span>
              <span className="muted small">{job.location}</span>
            </div>
            <div className="timeline-body">
              <h3>
                {job.role}
                <span className="at"> · {job.company}</span>
              </h3>
              {job.summary && <p className="muted">{job.summary}</p>}
              <ul className="bullets">
                {job.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              {job.stack && (
                <ul className="tags" aria-label="Technologies">
                  {job.stack.map((t) => (
                    <li key={t} className="tag">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function ContributionsSection() {
  return (
    <Section
      id="contributions"
      eyebrow={num('contributions')}
      title="Selected contributions"
      intro="The problem, what I personally contributed, and what changed as a result."
    >
      <div className="stack">
        {contributions.map((c) => (
          <ContributionCard key={c.id} item={c} />
        ))}
      </div>
    </Section>
  );
}

function ContributionCard({ item }) {
  const showMetrics = item.metrics && (!item.metricsFlag || FLAGS[item.metricsFlag]);
  const showExternal = item.external && FLAGS[item.external.flag];

  return (
    <article className="card case">
      <header className="case-head">
        <p className="eyebrow">
          {item.org} · {item.year}
        </p>
        <h3>{item.title}</h3>
      </header>
      <dl className="case-grid">
        <div>
          <dt>Problem</dt>
          <dd>{item.problem}</dd>
        </div>
        <div>
          <dt>My contribution</dt>
          <dd>{item.approach}</dd>
        </div>
        {item.outcome && (
          <div>
            <dt>Outcome</dt>
            <dd>{item.outcome}</dd>
          </div>
        )}
      </dl>
      {showMetrics && <Metrics items={item.metrics} note={item.metricsNote} />}
      {showExternal && (
        <aside className="callout">
          <h4>{item.external.title}</h4>
          <p>{item.external.body}</p>
          <Metrics items={item.external.metrics} note={item.external.note} />
        </aside>
      )}
    </article>
  );
}

function UtilityModelsSection() {
  return (
    <Section
      id="utility-models"
      eyebrow={num('utility-models')}
      title="Registered designs"
      intro="German registered utility models (Gebrauchsmuster) recorded with the German Patent and Trade Mark Office (DPMA)."
    >
      <div className="grid grid-2">
        {utilityModels.map((m) => (
          <article key={m.number} className="card">
            <p className="mono accent">{m.number}</p>
            <h3>{m.title}</h3>
            <p className="muted">{m.summary}</p>
            <dl className="meta-row">
              <div>
                <dt>Filed</dt>
                <dd>{m.filed}</dd>
              </div>
              <div>
                <dt>Published</dt>
                <dd>{m.published}</dd>
              </div>
              <div>
                <dt>Role</dt>
                <dd>{m.role}</dd>
              </div>
            </dl>
            <ExtLink href={m.href}>DPMA register entry</ExtLink>
          </article>
        ))}
      </div>
    </Section>
  );
}

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'ieee', label: 'IEEE proceedings' },
  { id: 'journal', label: 'Journal articles' },
];

function PublicationsSection() {
  const [filter, setFilter] = useState('all');
  const list = filter === 'all' ? publications : publications.filter((p) => p.type === filter);
  const countFor = (id) => (id === 'all' ? publications.length : publications.filter((p) => p.type === id).length);

  return (
    <Section
      id="publications"
      eyebrow={num('publications')}
      title="Publications"
      intro={`A book and ${publications.length} papers on AI-assisted modernization, reliability, and insurance and retail technology.`}
    >
      <article className="card book">
        <p className="eyebrow">Book</p>
        <h3>{book.title}</h3>
        <p className="muted">{book.summary}</p>
        <p className="small muted">
          {book.note} ISBN {book.isbn}.
        </p>
        <ExtLink href={book.href}>ISBN record</ExtLink>
      </article>

      <div className="filter" role="group" aria-label="Filter publications">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            className={`chip${filter === f.id ? ' is-active' : ''}`}
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
            <span className="chip-count">{countFor(f.id)}</span>
          </button>
        ))}
      </div>

      <ol className="pub-list">
        {list.map((p) => (
          <li key={p.title} className="pub">
            <div className="pub-main">
              <h3 className="pub-title">
                <ExtLink href={p.href || `https://doi.org/${p.doi}`}>{p.title}</ExtLink>
              </h3>
              <p className="muted small">{p.venue}</p>
              {p.note && <p className="muted small">{p.note}</p>}
            </div>
            <div className="pub-meta">
              <span className="mono">{p.date}</span>
              <span className={`tag${p.authorship === 'Sole author' ? ' tag-accent' : ''}`}>{p.authorship}</span>
              {p.doi && <span className="mono small muted doi">doi:{p.doi}</span>}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function TalksSection() {
  return (
    <Section
      id="talks"
      eyebrow={num('talks')}
      title="Talks"
      intro="Invited talks, keynotes, and conference presentations."
    >
      <div className="grid grid-2">
        {talks.map((t) => (
          <article key={t.title} className="card">
            <div className="card-top">
              <span className="tag tag-accent">{t.kind}</span>
              <span className="mono muted">{t.date}</span>
            </div>
            <h3>{t.title}</h3>
            <p className="muted small">{t.event}</p>
            {t.links.length > 0 && (
              <div className="talk-links">
                {t.links.map((l) => (
                  <ExtLink key={l.href} href={l.href}>
                    {l.label}
                  </ExtLink>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}

function ReviewSection() {
  return (
    <Section
      id="review"
      eyebrow={num('review')}
      title="Peer review and judging"
      intro="Invited to evaluate research manuscripts, technology projects, and award submissions."
    >
      <div className="grid grid-4">
        {review.map((r) => (
          <article key={r.org} className="card">
            {r.count ? <p className="count">{r.count}</p> : <p className="count count-text">{r.role}</p>}
            <p className="small muted">{r.count ? `${r.role}, ${r.detail}` : r.detail}</p>
            <h3 className="review-org">{r.org}</h3>
          </article>
        ))}
      </div>
    </Section>
  );
}

function HonorsSection() {
  return (
    <Section
      id="honors"
      eyebrow={num('honors')}
      title="Honors and memberships"
      intro="Selective memberships and recognition from professional organizations."
    >
      <ul className="rows">
        {honors.map((h) => (
          <li key={h.title} className="row">
            <span className="mono muted">{h.year}</span>
            <div className="row-body">
              <p className="row-title">
                {h.title} <span className="at">· {h.org}</span>
              </p>
              {h.detail && <p className="muted small">{h.detail}</p>}
            </div>
            {h.href ? <ExtLink href={h.href}>Record</ExtLink> : <span />}
          </li>
        ))}
      </ul>
    </Section>
  );
}

function MediaSection() {
  return (
    <Section id="media" eyebrow={num('media')} title="Media coverage" intro="Articles about my work.">
      <ul className="rows">
        {media.map((m) => (
          <li key={m.href} className="row">
            <span className="row-outlet">{m.outlet}</span>
            <p className="row-body">{m.title}</p>
            <ExtLink href={m.href}>Read</ExtLink>
          </li>
        ))}
      </ul>
    </Section>
  );
}
