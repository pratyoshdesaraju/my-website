import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import FLAGS from '../featureFlags';
import portrait from '../assets/pratyosh_desaraju.png';
import { ExtLink } from '../components/ui';
import { person, publications, utilityModels, review, media } from '../data/profile';

const ieeeCount = publications.filter((p) => p.type === 'ieee').length;
const reviewCount = review.reduce((sum, r) => sum + (r.count || 0), 0);

const STATS = [
  { value: String(person.yearsExperience), label: 'years building enterprise systems', short: 'years in industry' },
  {
    value: String(publications.length + 1),
    label: `publications, including a book and ${ieeeCount} IEEE papers`,
    short: 'publications',
  },
  { value: String(utilityModels.length), label: 'registered utility models in Germany', short: 'German utility models' },
  { value: String(reviewCount), label: 'journal manuscripts peer-reviewed', short: 'manuscripts reviewed' },
];

export default function Home() {
  return (
    <div className="screen home">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-copy">
          <p className="eyebrow">
            {person.title} · {person.employer}
          </p>
          <h1 id="home-title" className="home-title">
            {person.name}
          </h1>
          <p className="home-lead">{person.headline}</p>
          <div className="home-actions">
            <Link to="/work" className="btn btn-primary">
              View work <FiArrowRight aria-hidden="true" />
            </Link>
            <Link to="/bio" className="btn btn-ghost">
              Read bio
            </Link>
          </div>
        </div>
        <figure className="home-portrait">
          <img src={portrait} alt={`Portrait of ${person.name}`} width="320" height="320" />
        </figure>
      </section>

      {FLAGS.SHOW_HOME_STATS && (
        <dl className="home-stats" aria-label="At a glance">
          {STATS.map((s) => (
            <div key={s.label} className="home-stat">
              <dt>
                <span className="stat-long">{s.label}</span>
                <span className="stat-short">{s.short}</span>
              </dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {FLAGS.SHOW_HOME_MEDIA && (
        <section className="home-outlets" aria-labelledby="featured-title">
          <h2 id="featured-title" className="eyebrow">
            Featured in
          </h2>
          <ul>
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
