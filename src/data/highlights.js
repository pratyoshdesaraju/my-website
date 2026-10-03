// Shared selections from profile.js used by more than one page.
import { honors, links, publications } from './profile';

export const adplist = honors.find((h) => h.org === 'ADPList');
export const memberships = honors.filter((h) => /Member|Fellow/.test(h.title));
export const ieeePapers = publications.filter((p) => p.type === 'ieee');
export const otherPapers = publications.filter((p) => p.type !== 'ieee');
export const blog = links.find((l) => l.label === 'Medium');
export const paperHref = (p) => p.href || `https://doi.org/${p.doi}`;
