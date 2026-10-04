import { useState } from 'react';
import FLAGS from '../featureFlags';
import portrait from '../assets/pratyosh_desaraju.png';
import Deck from '../components/Deck';
import Pager from '../components/Pager';
import { PageHead, PanelHead } from '../components/ui';
import { person, bio, milestones, education, skills, mentoring } from '../data/profile';

const aboutItems = [
  { kind: 'intro' },
  ...bio.map((text) => ({ kind: 'para', text })),
  { kind: 'para', text: mentoring, muted: true },
];

const backgroundItems = [
  ...education.map((e) => ({ kind: 'edu', e })),
  ...skills.map((s) => ({ kind: 'skill', s })),
];

function AboutItem({ item }) {
  if (item.kind === 'intro') {
    return (
      <div className="x-intro">
        <img src={portrait} alt={`Portrait of ${person.name}`} width="96" height="96" />
        <div>
          <p className="row-title">{person.name}</p>
          <p className="muted small">
            {person.title}, {person.employer}
          </p>
          <p className="muted small">{person.location}</p>
        </div>
      </div>
    );
  }
  return <p className={`x-para${item.muted ? ' muted' : ''}`}>{item.text}</p>;
}

function BackgroundItem({ item }) {
  if (item.kind === 'edu') {
    return (
      <article className="card">
        <span className="mono muted small">{item.e.year}</span>
        <h3>{item.e.degree}</h3>
        <p className="muted">{item.e.school}</p>
      </article>
    );
  }
  return (
    <div className="x-field">
      <p className="x-label">{item.s.group}</p>
      <ul className="tags">
        {item.s.items.map((t) => (
          <li key={t} className="tag">
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

const ALL_PANELS = [
  {
    id: 'about',
    flag: 'SHOW_BIO_ABOUT',
    label: 'About',
    render: () => (
      <Pager
        label="About"
        items={aboutItems}
        minCol={360}
        maxCols={2}
        gap={16}
        itemKey={(it, i) => `${it.kind}-${i}`}
        renderItem={(it) => <AboutItem item={it} />}
      />
    ),
  },
  {
    id: 'timeline',
    flag: 'SHOW_BIO_TIMELINE',
    label: 'Timeline',
    render: () => (
      <>
        <PanelHead title="Milestones" />
        <Pager
          label="Milestones"
          items={milestones}
          minCol={340}
          maxCols={2}
          gap={0}
          itemKey={(m) => m.year + m.text.slice(0, 12)}
          renderItem={(m) => (
            <div className="x-row">
              <span className="mono accent">{m.year}</span>
              <p>{m.text}</p>
            </div>
          )}
        />
      </>
    ),
  },
  {
    id: 'background',
    flag: 'SHOW_BIO_BACKGROUND',
    label: 'Education and skills',
    render: () => (
      <>
        <PanelHead title="Education and skills" />
        <Pager
          label="Education and skills"
          items={backgroundItems}
          minCol={320}
          gap={14}
          itemKey={(it, i) => `${it.kind}-${i}`}
          renderItem={(it) => <BackgroundItem item={it} />}
        />
      </>
    ),
  },
];

const PANELS = ALL_PANELS.filter((p) => FLAGS[p.flag]);

export default function Bio() {
  const [tab, setTab] = useState(PANELS[0]?.id);

  return (
    <div className="screen">
      <PageHead eyebrow="Bio" title={person.name} lead={`${person.title}, ${person.employer} · ${person.location}`} />
      {PANELS.length > 0 && (
        <Deck idPrefix="bio" label="Bio sections" panels={PANELS} active={tab} onChange={setTab} />
      )}
    </div>
  );
}
