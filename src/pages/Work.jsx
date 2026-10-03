import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FLAGS from '../featureFlags';
import Deck from '../components/Deck';
import Pager from '../components/Pager';
import { PageHead, PanelHead, ExtLink, Metrics } from '../components/ui';
import {
  focusAreas,
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

// ─── Item lists ────────────────────────────────────────────────────────────────
// Long entries are split into smaller items so each page can be filled evenly.

const experienceItems = experience.flatMap((job) => {
  const group = `${job.company}-${job.period}`;
  return [
    { kind: 'job', group, job },
    ...job.highlights.map((text) => ({ kind: 'point', group, job, text })),
  ];
});

const contributionItems = contributions.flatMap((c) => {
  const group = c.id;
  const items = [{ kind: 'head', group, c }];
  items.push({ kind: 'field', group, c, label: 'Problem', text: c.problem });
  items.push({ kind: 'field', group, c, label: 'My contribution', text: c.approach });
  if (c.outcome) items.push({ kind: 'field', group, c, label: 'Outcome', text: c.outcome });
  if (c.metrics && (!c.metricsFlag || FLAGS[c.metricsFlag])) {
    items.push({ kind: 'metrics', group, c, metrics: c.metrics, note: c.metricsNote });
  }
  if (c.external && FLAGS[c.external.flag]) {
    items.push({ kind: 'callout', group, c, title: c.external.title, text: c.external.body });
    items.push({ kind: 'metrics', group, c, metrics: c.external.metrics, note: c.external.note, callout: true });
  }
  return items;
});

const PUB_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'ieee', label: 'IEEE' },
  { id: 'journal', label: 'Journals' },
];

// ─── Item renderers ────────────────────────────────────────────────────────────

function FocusCard({ item, i }) {
  return (
    <article className="card">
      <span className="mono muted small">{String(i + 1).padStart(2, '0')}</span>
      <h3>{item.title}</h3>
      <p className="muted">{item.body}</p>
    </article>
  );
}

function ExperienceItem({ item }) {
  const { job } = item;
  if (item.kind === 'job') {
    return (
      <article className="x-head">
        <p className="x-meta">
          <span>{job.period}</span>
          <span>{job.location}</span>
        </p>
        <h3>
          {job.role} <span className="at">· {job.company}</span>
        </h3>
        {job.summary && <p className="muted">{job.summary}</p>}
        {job.stack && (
          <ul className="tags" aria-label="Technologies">
            {job.stack.map((t) => (
              <li key={t} className="tag">
                {t}
              </li>
            ))}
          </ul>
        )}
      </article>
    );
  }
  return <p className="x-point">{item.text}</p>;
}

function ContributionItem({ item }) {
  if (item.kind === 'head') {
    return (
      <header className="x-head">
        <p className="eyebrow">
          {item.c.org} · {item.c.year}
        </p>
        <h3>{item.c.title}</h3>
      </header>
    );
  }
  if (item.kind === 'field') {
    return (
      <div className="x-field">
        <p className="x-label">{item.label}</p>
        <p>{item.text}</p>
      </div>
    );
  }
  if (item.kind === 'callout') {
    return (
      <aside className="callout">
        <h4>{item.title}</h4>
        <p>{item.text}</p>
      </aside>
    );
  }
  return (
    <div className={item.callout ? 'x-callout-metrics' : undefined}>
      <Metrics items={item.metrics} note={item.note} />
    </div>
  );
}

function UtilityModelCard({ item }) {
  return (
    <article className="card">
      <p className="mono accent small">{item.number}</p>
      <h3>{item.title}</h3>
      <p className="muted">{item.summary}</p>
      <dl className="meta-row">
        <div>
          <dt>Filed</dt>
          <dd>{item.filed}</dd>
        </div>
        <div>
          <dt>Published</dt>
          <dd>{item.published}</dd>
        </div>
        <div>
          <dt>Role</dt>
          <dd>{item.role}</dd>
        </div>
      </dl>
      <ExtLink href={item.href}>DPMA register entry</ExtLink>
    </article>
  );
}

function PublicationItem({ item }) {
  if (item.kind === 'book') {
    return (
      <article className="card book">
        <p className="eyebrow">Book · ISBN {book.isbn}</p>
        <h3>{book.title}</h3>
        <p className="muted">{book.summary}</p>
        <p className="small muted">{book.note}</p>
        <ExtLink href={book.href}>ISBN record</ExtLink>
      </article>
    );
  }
  const p = item.pub;
  return (
    <article className="x-pub">
      <h3 className="pub-title">
        <ExtLink href={p.href || `https://doi.org/${p.doi}`}>{p.title}</ExtLink>
      </h3>
      <p className="muted small">{p.venue}</p>
      {p.note && <p className="muted small">{p.note}</p>}
      <p className="x-pub-meta">
        <span className="mono small">{p.date}</span>
        <span className={`tag${p.authorship === 'Sole author' ? ' tag-accent' : ''}`}>{p.authorship}</span>
        {p.doi && <span className="mono small muted doi">doi:{p.doi}</span>}
      </p>
    </article>
  );
}

function TalkCard({ item }) {
  return (
    <article className="card">
      <div className="card-top">
        <span className="tag tag-accent">{item.kind}</span>
        <span className="mono muted small">{item.date}</span>
      </div>
      <h3>{item.title}</h3>
      <p className="muted small">{item.event}</p>
      {item.links.length > 0 && (
        <div className="talk-links">
          {item.links.map((l) => (
            <ExtLink key={l.href} href={l.href}>
              {l.label}
            </ExtLink>
          ))}
        </div>
      )}
    </article>
  );
}

function ReviewCard({ item }) {
  return (
    <article className="card">
      {item.count ? <p className="count">{item.count}</p> : <p className="count count-text">{item.role}</p>}
      <p className="small muted">{item.count ? `${item.role}, ${item.detail}` : item.detail}</p>
      <h3 className="review-org">{item.org}</h3>
    </article>
  );
}

function HonorRow({ item }) {
  return (
    <article className="x-row">
      <span className="mono muted small">{item.year}</span>
      <div className="x-row-body">
        <p className="row-title">
          {item.title} <span className="at">· {item.org}</span>
        </p>
        {item.detail && <p className="muted small">{item.detail}</p>}
        {item.href && <ExtLink href={item.href}>Record</ExtLink>}
      </div>
    </article>
  );
}

function MediaRow({ item }) {
  return (
    <article className="x-row">
      <span className="row-outlet small">{item.outlet}</span>
      <div className="x-row-body">
        <p>{item.title}</p>
        <ExtLink href={item.href}>Read the article</ExtLink>
      </div>
    </article>
  );
}

// ─── Panels ────────────────────────────────────────────────────────────────────

function PublicationsPanel() {
  const [filter, setFilter] = useState('all');
  const items = useMemo(() => {
    const list = filter === 'all' ? publications : publications.filter((p) => p.type === filter);
    const pubs = list.map((pub) => ({ kind: 'pub', pub }));
    return filter === 'all' ? [{ kind: 'book' }, ...pubs] : pubs;
  }, [filter]);
  const countFor = (id) => (id === 'all' ? publications.length + 1 : publications.filter((p) => p.type === id).length);

  return (
    <>
      <div className="panel-bar">
        <PanelHead
          title="Publications"
          intro={`A book and ${publications.length} papers on AI-assisted modernization and reliability.`}
        />
        <div className="filter" role="group" aria-label="Filter publications">
          {PUB_FILTERS.map((f) => (
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
      </div>
      <Pager
        label="Publications"
        items={items}
        resetKey={filter}
        minCol={340}
        itemKey={(it) => (it.kind === 'book' ? 'book' : it.pub.title)}
        renderItem={(it) => <PublicationItem item={it} />}
      />
    </>
  );
}

const PANELS = [
  {
    id: 'focus',
    label: 'Focus',
    flag: 'SHOW_FOCUS',
    render: () => (
      <>
        <PanelHead title="Focus areas" intro="AI-enabled enterprise software modernization and reliability engineering." />
        <Pager
          label="Focus areas"
          items={focusAreas}
          minCol={230}
          maxCols={4}
          itemKey={(f) => f.title}
          renderItem={(f, i) => <FocusCard item={f} i={i} />}
        />
      </>
    ),
  },
  {
    id: 'experience',
    label: 'Experience',
    flag: 'SHOW_EXPERIENCE',
    render: () => (
      <>
        <PanelHead title="Experience" intro="About eleven years building and modernizing enterprise systems in insurance and retail." />
        <Pager
          label="Experience"
          items={experienceItems}
          minCol={320}
          gap={12}
          groupOf={(it) => it.group}
          groupLabel={(it) => it.job.company}
          itemKey={(it, i) => `${it.group}-${i}`}
          renderItem={(it) => <ExperienceItem item={it} />}
        />
      </>
    ),
  },
  {
    id: 'contributions',
    label: 'Contributions',
    flag: 'SHOW_CONTRIBUTIONS',
    render: () => (
      <>
        <PanelHead title="Selected contributions" intro="The problem, what I personally contributed, and what changed as a result." />
        <Pager
          label="Selected contributions"
          items={contributionItems}
          minCol={320}
          gap={12}
          groupOf={(it) => it.group}
          groupLabel={(it) => it.c.title}
          itemKey={(it, i) => `${it.group}-${i}`}
          renderItem={(it) => <ContributionItem item={it} />}
        />
      </>
    ),
  },
  {
    id: 'utility-models',
    label: 'Registered designs',
    flag: 'SHOW_UTILITY_MODELS',
    render: () => (
      <>
        <PanelHead
          title="Registered designs"
          intro="German utility models (Gebrauchsmuster) recorded with the German Patent and Trade Mark Office (DPMA)."
        />
        <Pager
          label="Registered designs"
          items={utilityModels}
          minCol={360}
          maxCols={2}
          itemKey={(m) => m.number}
          renderItem={(m) => <UtilityModelCard item={m} />}
        />
      </>
    ),
  },
  { id: 'publications', label: 'Publications', flag: 'SHOW_PUBLICATIONS', render: () => <PublicationsPanel /> },
  {
    id: 'talks',
    label: 'Talks',
    flag: 'SHOW_TALKS',
    render: () => (
      <>
        <PanelHead title="Talks" intro="Invited talks, keynotes, and conference presentations." />
        <Pager
          label="Talks"
          items={talks}
          minCol={300}
          maxCols={2}
          itemKey={(t) => t.title}
          renderItem={(t) => <TalkCard item={t} />}
        />
      </>
    ),
  },
  {
    id: 'review',
    label: 'Peer review',
    flag: 'SHOW_REVIEW',
    render: () => (
      <>
        <PanelHead title="Peer review and judging" intro="Invited to evaluate manuscripts, technology projects, and award submissions." />
        <Pager
          label="Peer review"
          items={review}
          minCol={210}
          maxCols={4}
          itemKey={(r) => r.org}
          renderItem={(r) => <ReviewCard item={r} />}
        />
      </>
    ),
  },
  {
    id: 'honors',
    label: 'Honors',
    flag: 'SHOW_HONORS',
    render: () => (
      <>
        <PanelHead title="Honors and memberships" intro="Selective memberships and recognition from professional organizations." />
        <Pager
          label="Honors"
          items={honors}
          minCol={340}
          maxCols={2}
          gap={0}
          itemKey={(h) => h.title}
          renderItem={(h) => <HonorRow item={h} />}
        />
      </>
    ),
  },
  {
    id: 'media',
    label: 'Media',
    flag: 'SHOW_MEDIA',
    render: () => (
      <>
        <PanelHead title="Media coverage" intro="Articles about my work." />
        <Pager
          label="Media coverage"
          items={media}
          minCol={340}
          maxCols={2}
          gap={0}
          itemKey={(m) => m.href}
          renderItem={(m) => <MediaRow item={m} />}
        />
      </>
    ),
  },
].filter((p) => FLAGS[p.flag]);

export default function Work() {
  const location = useLocation();
  const [tab, setTab] = useState(location.state?.section || PANELS[0]?.id);

  useEffect(() => {
    if (location.state?.section) setTab(location.state.section);
  }, [location.state]);

  return (
    <div className="screen">
      <PageHead
        eyebrow="Work"
        title="Engineering, research, and recognition"
        lead="Production systems I have designed and improved, the research and registered designs behind my approach, and how other organizations have engaged with that work."
      />
      {PANELS.length > 0 && <Deck idPrefix="work" label="Work sections" panels={PANELS} active={tab} onChange={setTab} />}
    </div>
  );
}
