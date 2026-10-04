import { useState } from 'react';
import { FiArrowUpRight, FiCheck, FiCopy } from 'react-icons/fi';
import FLAGS from '../featureFlags';
import { PageHead } from '../components/ui';
import { person, links } from '../data/profile';

const FORM_ENDPOINT = 'https://contact-form-handler.pratyosh-desaraju.workers.dev';
const EMPTY_FORM = { name: '', email: '', message: '' };

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const sending = status.state === 'sending';

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'sending', message: 'Sending…' });
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`Request failed with ${res.status}`);
      setForm(EMPTY_FORM);
      setStatus({ state: 'success', message: 'Thanks, your message was sent.' });
    } catch {
      setStatus({ state: 'error', message: `Something went wrong. Please email ${person.email} instead.` });
    }
  };

  return (
    <div className="screen">
      <PageHead
        eyebrow="Contact"
        title="Get in touch"
        lead="For speaking, peer review, research collaboration, or engineering conversations, email is the fastest way to reach me."
      />

      {(FLAGS.SHOW_CONTACT_EMAIL || FLAGS.SHOW_CONTACT_PROFILES || FLAGS.SHOW_CONTACT_FORM) && (
        <div className="contact">
          {(FLAGS.SHOW_CONTACT_EMAIL || FLAGS.SHOW_CONTACT_PROFILES) && (
            <section className="card contact-aside" aria-label="Email and profiles">
              {FLAGS.SHOW_CONTACT_EMAIL && (
                <>
                  <h2 id="email-title" className="eyebrow">
                    Email
                  </h2>
                  <div className="email-row">
                    <a className="email-link" href={`mailto:${person.email}`}>
                      {person.email}
                    </a>
                    <button
                      type="button"
                      className="icon-btn"
                      onClick={copyEmail}
                      aria-label={copied ? 'Email address copied' : 'Copy email address'}
                    >
                      {copied ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />}
                    </button>
                    <span className="muted small" role="status" aria-live="polite">
                      {copied ? 'Copied' : ''}
                    </span>
                  </div>
                </>
              )}
              {FLAGS.SHOW_CONTACT_PROFILES && (
                <>
                  <h2 className="eyebrow contact-profiles-title">Profiles</h2>
                  <ul className="profile-chips">
                    {links.map((l) => (
                      <li key={l.href}>
                        <a className="chip chip-link" href={l.href} target="_blank" rel="noopener noreferrer">
                          {l.label}
                          <FiArrowUpRight aria-hidden="true" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </section>
          )}

          {FLAGS.SHOW_CONTACT_FORM && (
            <section className="card contact-form-card" aria-labelledby="form-title">
              <h2 id="form-title" className="eyebrow">
                Send a message
              </h2>
              <form className="contact-form" onSubmit={onSubmit}>
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" autoComplete="name" required value={form.name} onChange={onChange} />
                  </div>
                  <div className="field">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={form.email}
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div className="field field-grow">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" required value={form.message} onChange={onChange} />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary" disabled={sending}>
                    {sending ? 'Sending…' : 'Send message'}
                  </button>
                  <p className={`form-status is-${status.state}`} role="status" aria-live="polite">
                    {status.message}
                  </p>
                </div>
              </form>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
