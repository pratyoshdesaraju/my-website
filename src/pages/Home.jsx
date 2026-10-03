import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import FLAGS from '../featureFlags';
import portrait from '../assets/pratyosh_desaraju.png';
import { ExtLink } from '../components/ui';
import {
  person,
  focusAreas,
  contributions,
  publications,
  utilityModels,
  talks,
  review,
  honors,
  media,
} from '../data/profile';

const ieeeCount = publications.filter((p) => p.type === 'ieee').length;
const reviewCount = review.reduce((sum, r) => sum + (r.count || 0), 0);

const STATS = [
  { value: String(person.yearsExperience), label: 'years building enterprise systems' },
  { value: String(publications.length + 1), label: `publications, including a book and ${ieeeCount} IEEE papers` },
  { value: String(utilityModels.length), label: 'registered utility models in Germany' },
  { value: String(reviewCount), label: 'journal manuscripts peer-reviewed' },
];

const RECOGNITION = [
  ...honors.slice(0, 4).map((h) => ({ title: h.title, meta: `${h.org} · ${h.year}` })),
  { title: talks[0].kind, meta: talks[0].short },
];

export default function Home() {
  const selected = contributions.filter((c) => !c.metricsFlag || FLAGS[c.metricsFlag]).slice(0, 3);

  return (
    <div className="home">
      <section className="container hero">
        <div className="hero-copy">
          <p className="eyebrow">
            {person.title} · {person.employer}
          </p>
          <h1 className="hero-title">{person.name}</h1>
          <p className="hero-lead">{person.headline}</p>
          <div className="hero-actions">
            <Link to="/work" className="btn btn-primary">
              View work <FiArrowRight aria-hidden="true" />
            </Link>
            <Link to="/bio" className="btn btn-ghost">
              Read bio
            </Link>
          </div>
        </div>
        <figure className="hero-portrait">
          <img src={portrait} alt={`Portrait of ${person.name}`} width="320" height="320" />
        </figure>
      </section>

      {FLAGS.SHOW_HOME_STATS && (
        <section className="container" aria-label="At a glance">
          <dl className="stats-grid">
            {STATS.map((s) => (
              <div key={s.label} className="stat">
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <section className="container home-section" aria-labelledby="focus-title">
        <header className="section-head">
          <p className="eyebrow">Focus</p>
          <h2 id="focus-title">{person.field.charAt(0).toUpperCase() + person.field.slice(1)}</h2>
        </header>
        <div className="grid grid-4">
          {focusAreas.map((f, i) => (
            <article key={f.title} className="card">
              <span className="mono muted">{String(i + 1).padStart(2, '0')}</span>
              <h3>{f.title}</h3>
              <p className="muted">{f.body}</p>
            </article>
          ))}
        </div>
      </section>

      {FLAGS.SHOW_HOME_SELECTED && FLAGS.SHOW_CONTRIBUTIONS && (
        <section className="container home-section" aria-labelledby="selected-title">
          <header className="section-head">
            <p className="eyebrow">Selected work</p>
            <h2 id="selected-title">Problems I have taken on</h2>
          </header>
          <div className="grid grid-3">
            {selected.map((c) => (
              <Link
                key={c.id}
                to="/work"
                state={{ section: 'contributions' }}
                className="card card-link"
              >
                <span className="eyebrow">{c.org}</span>
                <h3>{c.title}</h3>
                <p className="muted">{c.teaser}</p>
                <span className="more">
                  Read the details <FiArrowRight aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {FLAGS.SHOW_HOME_RECOGNITION && (
        <section className="container home-section" aria-labelledby="recognition-title">
          <header className="section-head">
            <p className="eyebrow">Recognition</p>
            <h2 id="recognition-title">Selected by peers and professional bodies</h2>
          </header>
          <ul className="recognition">
            {RECOGNITION.map((r) => (
              <li key={r.title + r.meta}>
                <span className="recognition-title">{r.title}</span>
                <span className="muted small">{r.meta}</span>
              </li>
            ))}
          </ul>
          <p className="section-foot">
            <Link to="/work" state={{ section: 'honors' }} className="ext-link">
              Full record of honors, talks, and peer review <FiArrowRight aria-hidden="true" />
            </Link>
          </p>
        </section>
      )}

      {FLAGS.SHOW_HOME_MEDIA && (
        <section className="container home-section" aria-labelledby="media-title">
          <header className="section-head">
            <p className="eyebrow">Featured in</p>
            <h2 id="media-title" className="visually-hidden">
              Featured in
            </h2>
          </header>
          <ul className="outlets">
            {media.map((m) => (
              <li key={m.href}>
                <ExtLink href={m.href}>{m.outlet}</ExtLink>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
