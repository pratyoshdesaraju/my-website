import { useState } from 'react';
import FLAGS from '../featureFlags';
import Deck from '../components/Deck';
import Pager from '../components/Pager';
import useMedia from '../hooks/useMedia';
import { PageHead, ExtLink } from '../components/ui';
import { experience, book } from '../data/profile';
import { ieeePapers, otherPapers, memberships, blog, paperHref } from '../data/highlights';

const current = experience.find((j) => j.company === 'Liberty Mutual Insurance' && /Present/.test(j.period));
const previous = experience.find((j) => j.company === 'The Home Depot');

// ─── Box contents ──────────────────────────────────────────────────────────────

function Job({ job, label }) {
  return (
    <div className="job">
      {label && <p className="x-label">{label}</p>}
      <p className="job-company">{job.company}</p>
      <p className="job-role">{job.role}</p>
      <p className="mono muted small">
        {job.period} · {job.location}
      </p>
    </div>
  );
}

// "2nd International Conference on ... (ICCAMS 2025), IEEE" -> "ICCAMS 2025, IEEE"
const shortVenue = (venue) => {
  const m = venue.match(/\(([^)]+)\)(.*)$/);
  return m ? `${m[1]}${m[2]}`.replace(/,\s*$/, '') : venue;
};

function Paper({ p }) {
  return (
    <article className="paper">
      <h3 className="paper-title">
        <ExtLink href={paperHref(p)}>{p.title}</ExtLink>
      </h3>
      <p className="mono muted small" title={p.venue}>
        {shortVenue(p.venue)} · {p.date}
      </p>
    </article>
  );
}

const experienceItems = [
  current && { key: 'current', node: <Job job={current} /> },
  previous && { key: 'previous', node: <Job job={previous} label="Previously" /> },
].filter(Boolean);

const bookItems = [
  {
    key: 'head',
    node: (
      <div className="x-field">
        <h3 className="box-title">{book.title}</h3>
        <p className="mono muted small">ISBN {book.isbn}</p>
      </div>
    ),
  },
  { key: 'summary', node: <p className="muted">{book.summary}</p> },
  {
    key: 'link',
    node: (
      <div className="x-field">
        <p className="muted small">{book.note}</p>
        <ExtLink href={book.href}>ISBN record</ExtLink>
      </div>
    ),
  },
];

const blogItems = blog
  ? [
      {
        key: 'blog',
        node: (
          <div className="x-field">
            <p className="muted">Articles on software engineering, modernization, and AI.</p>
            <ExtLink href={blog.href} className="blog-link">
              medium.com/<wbr />
              {blog.href.split('medium.com/')[1]}
            </ExtLink>
          </div>
        ),
      },
    ]
  : [];

const membershipItems = memberships.map((m) => ({
  key: m.title,
  node: (
    <div className="membership">
      <p className="job-company">
        {m.title} <span className="at">· {m.org}</span>
      </p>
      {m.detail && <p className="muted small">{m.detail}</p>}
      {m.href && <ExtLink href={m.href}>Record</ExtLink>}
    </div>
  ),
}));

const nodeList = (label, items, gap = 12) => (
  <Pager label={label} items={items} maxCols={1} minCol={160} gap={gap} itemKey={(it) => it.key} renderItem={(it) => it.node} />
);

const paperList = (label, papers) => (
  <Pager label={label} items={papers} maxCols={1} minCol={160} gap={0} itemKey={(p) => p.title} renderItem={(p) => <Paper p={p} />} />
);

const BOXES = [
  { id: 'experience', label: 'Experience', flag: 'SHOW_EXPERIENCE', body: () => nodeList('Experience', experienceItems, 16) },
  { id: 'ieee', label: 'IEEE papers', count: ieeePapers.length, flag: 'SHOW_IEEE_PAPERS', body: () => paperList('IEEE papers', ieeePapers) },
  { id: 'papers', label: 'Other papers', count: otherPapers.length, flag: 'SHOW_OTHER_PAPERS', body: () => paperList('Other papers', otherPapers) },
  { id: 'book', label: 'Book', flag: 'SHOW_BOOK', body: () => nodeList('Book', bookItems, 10) },
  { id: 'blog', label: 'Blog', flag: 'SHOW_BLOG', body: () => nodeList('Blog', blogItems) },
  { id: 'memberships', label: 'Memberships', count: memberships.length, flag: 'SHOW_MEMBERSHIPS', body: () => nodeList('Memberships', membershipItems, 16) },
].filter((b) => FLAGS[b.flag]);

function Box({ box }) {
  return (
    <section className="box" aria-labelledby={`box-${box.id}`}>
      <header className="box-head">
        <h2 id={`box-${box.id}`} className="eyebrow">
          {box.label}
        </h2>
        {box.count != null && <span className="mono muted small">{box.count}</span>}
      </header>
      <div className="box-body">{box.body()}</div>
    </section>
  );
}

export default function Work() {
  const roomy = useMedia('(min-width: 720px) and (min-height: 560px)');
  const [tab, setTab] = useState(BOXES[0]?.id);

  return (
    <div className="screen">
      <PageHead title="Work, research, and writing" />
      {roomy ? (
        <div className={`box-grid box-grid-${BOXES.length}`}>
          {BOXES.map((b) => (
            <Box key={b.id} box={b} />
          ))}
        </div>
      ) : (
        BOXES.length > 0 && (
          <Deck
            idPrefix="work"
            label="Work sections"
            active={tab}
            onChange={setTab}
            panels={BOXES.map((b) => ({ id: b.id, label: b.label, render: () => <Box box={b} /> }))}
          />
        )
      )}
    </div>
  );
}
