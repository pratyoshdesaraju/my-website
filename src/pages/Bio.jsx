import portrait from '../assets/pratyosh_desaraju.png';
import { Section } from '../components/ui';
import { person, bio, milestones, education, skills, mentoring } from '../data/profile';

export default function Bio() {
  return (
    <div className="container page">
      <header className="page-head">
        <p className="eyebrow">Bio</p>
        <h1>{person.name}</h1>
        <p className="page-lead">
          {person.title}, {person.employer} · {person.location}
        </p>
      </header>

      <div className="bio-grid">
        <figure className="bio-portrait">
          <img src={portrait} alt={`Portrait of ${person.name}`} width="280" height="280" />
        </figure>
        <div className="prose">
          {bio.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
          <p className="muted">{mentoring}</p>
        </div>
      </div>

      <Section id="milestones" eyebrow="Timeline" title="Milestones">
        <ol className="milestones">
          {milestones.map((m) => (
            <li key={m.year} className="milestone">
              <span className="mono accent">{m.year}</span>
              <p>{m.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="education" eyebrow="Education" title="Degrees">
        <div className="grid grid-2">
          {education.map((e) => (
            <article key={e.degree} className="card">
              <span className="mono muted">{e.year}</span>
              <h3>{e.degree}</h3>
              <p className="muted">{e.school}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="skills" eyebrow="Toolbox" title="Technologies I work with">
        <dl className="skills">
          {skills.map((s) => (
            <div key={s.group} className="skill-group">
              <dt>{s.group}</dt>
              <dd>
                <ul className="tags">
                  {s.items.map((item) => (
                    <li key={item} className="tag">
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </Section>
    </div>
  );
}
