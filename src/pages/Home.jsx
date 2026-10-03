import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import FLAGS from '../featureFlags';
import portrait from '../assets/pratyosh_desaraju.png';
import { ExtLink } from '../components/ui';
import Badge from '../components/Badge';
import './Home.css';
import { person, focusAreas, utilityModels } from '../data/profile';
import { adplist, memberships } from '../data/highlights';

const niche = person.field.charAt(0).toUpperCase() + person.field.slice(1);

export default function Home() {
  const showCallouts = FLAGS.SHOW_HOME_ADPLIST || FLAGS.SHOW_HOME_MEMBERSHIPS || FLAGS.SHOW_HOME_PATENTS;

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
          <p className="home-niche">{niche}</p>
          {FLAGS.SHOW_HOME_FOCUS && (
            <ul className="home-focus" aria-label="Areas of expertise">
              {focusAreas.map((f) => (
                <li key={f.title} className="tag">
                  {f.title}
                </li>
              ))}
            </ul>
          )}
          <div className="home-actions">
            <Link to="/work" className="home-cta">
              <span className="home-cta-text">
                <span>View my work</span>
                <span className="home-cta-sub">Papers, patents, book</span>
              </span>
              <span className="home-cta-arrow" aria-hidden="true">
                <FiArrowRight />
              </span>
            </Link>
            <Link to="/contact" className="home-secondary">
              Get in touch
            </Link>
          </div>
        </div>
        <div className="home-portrait">
          <Badge photo={portrait} name={person.name} title={person.title} mark="PD" />
        </div>
      </section>

      {showCallouts && (
        <ul className="home-callouts" aria-label="Recognition">
          {FLAGS.SHOW_HOME_ADPLIST && adplist && (
            <li className="callout-cell">
              <p className="eyebrow">
                Recognition<span className="wide-only"> · {adplist.year}</span>
              </p>
              <p className="callout-title">
                <a href={adplist.href} target="_blank" rel="noopener noreferrer">
                  ADPList Top 100 mentors
                </a>
              </p>
              <p className="callout-text">One of 100 mentors recognized globally.</p>
              <ExtLink href={adplist.href}>ADPList profile</ExtLink>
            </li>
          )}
          {FLAGS.SHOW_HOME_MEMBERSHIPS && memberships.length > 0 && (
            <li className="callout-cell">
              <p className="eyebrow">Memberships</p>
              <ul className="callout-list">
                {memberships.map((m) => (
                  <li key={m.title}>
                    <ExtLink href={m.href}>
                      {m.org === 'IEEE' ? 'IEEE' : 'SCRS'} {m.title}
                    </ExtLink>
                  </li>
                ))}
              </ul>
            </li>
          )}
          {FLAGS.SHOW_HOME_PATENTS && utilityModels.length > 0 && (
            <li className="callout-cell">
              <p className="eyebrow">
                Patents<span className="wide-only"> · German utility models</span>
              </p>
              <ul className="callout-list">
                {utilityModels.map((m) => (
                  <li key={m.number}>
                    <ExtLink href={m.href}>
                      <span className="patent-title">{m.title}</span>
                      <span className="patent-number">{m.number}</span>
                    </ExtLink>
                  </li>
                ))}
              </ul>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
