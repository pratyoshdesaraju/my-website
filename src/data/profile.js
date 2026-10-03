// All site content lives here so facts stay consistent across pages.
// Each item links to its public record (DOI, IEEE Xplore, DPMA, event page) where one exists.

export const person = {
  name: 'Pratyosh Desaraju',
  title: 'Senior Software Engineer',
  employer: 'Liberty Mutual Insurance',
  location: 'Austin, Texas',
  email: 'contact@pratyoshdesaraju.com',
  yearsExperience: 11,
  field: 'AI-enabled enterprise software modernization and reliability engineering',
  headline:
    'I modernize business-critical software in insurance and retail, making legacy systems faster and more reliable without taking them offline, and I research AI-assisted methods for doing that safely at scale.',
};

export const links = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/pratyosh' },
  { label: 'Medium', href: 'https://medium.com/@pratyosh.desaraju' },
  { label: 'ADPList', href: 'https://adplist.org/mentors/pratyosh-d' },
  { label: 'IEEE Collabratec', href: 'https://ieee-collabratec.ieee.org/app/p/pratyoshdesaraju' },
];

export const focusAreas = [
  {
    title: 'Legacy system modernization',
    body: 'Improving established, business-critical systems incrementally, so they gain modern capabilities without the risk of a disruptive replacement.',
  },
  {
    title: 'Production reliability and performance',
    body: 'Finding infrastructure bottlenecks, removing unnecessary database and service load, and keeping business rules correct under high transaction volume.',
  },
  {
    title: 'Distributed systems and data consistency',
    body: 'Keeping operational data accurate as events move across services, including events that arrive late, twice, or out of order.',
  },
  {
    title: 'AI/ML for modernization',
    body: 'Research and registered designs on AI-assisted code optimization, adaptive monitoring, and deep-learning-based performance anomaly detection.',
  },
];

export const experience = [
  {
    company: 'Liberty Mutual Insurance',
    role: 'Senior Software Engineer',
    period: 'Jul 2023 – Present',
    location: 'Remote',
    summary: 'Production insurance systems behind underwriting and risk-assessment operations.',
    highlights: [
      'Originated and led the technical design of a production caching architecture for an underwriting-related weather-moratorium application: cache topology, key design, coherence, and invalidation, while preserving ZIP-code, county, and statewide underwriting rules.',
      'Developed a map-based tool for applying weather-related underwriting restrictions during severe weather and natural disasters.',
      'Led the design of a risk assessment scoring system processing millions of requests per month, replacing a legacy ETL pipeline.',
      'Built services for a usage-based insurance initiative that ingest, validate, clean, and transform high-frequency vehicle-telematics data for policy and billing operations.',
      'Introduced Kafka-based asynchronous processing that decouples upstream policy flows from downstream risk engines.',
      'Mentor engineers through code reviews, system design discussions, and test-driven practices.',
    ],
    stack: ['Java 21', 'Spring Boot', 'Kafka', 'Redis', 'AWS', 'Docker', 'Python', 'MySQL'],
  },
  {
    company: 'The Home Depot',
    role: 'Senior Software Engineer',
    period: 'Apr 2022 – Jul 2023',
    location: 'Remote',
    summary:
      'Available-to-Sell inventory systems in the Customer Order Management organization, supporting inventory visibility across about 2,000 stores and 150 warehouses.',
    highlights: [
      'Relied on for failure-sensitive inventory-consistency decisions in a high-volume, event-driven environment where delayed, duplicate, or stale events could corrupt inventory state.',
      'Contributed materially to an architecture built on authoritative absolute updates rather than chained incremental updates, making inventory state resilient to out-of-order events.',
      'Built and operated REST microservices processing several thousand retail transactions per second.',
      'Built near-real-time pipelines on Google Cloud (BigQuery, Spanner, Pub/Sub, Dataflow) and data flows across Cassandra, PostgreSQL, and Redis.',
      'Led the migration of GitHub from on-premises to cloud-hosted infrastructure.',
    ],
    stack: ['Java', 'Kafka', 'Google Cloud', 'Cassandra', 'PostgreSQL', 'Redis'],
  },
  {
    company: 'Liberty Mutual Insurance',
    role: 'Software Engineer (contract)',
    period: 'Mar 2016 – Apr 2022',
    location: 'Dover, NH',
    highlights: [
      'Designed and implemented AWS infrastructure (EC2, RDS, S3) for insurance applications.',
      'Built and maintained complex ETL jobs integrating multiple data sources and improving data quality.',
      'Shipped through Jenkins and Bamboo pipelines, secured microservices with OAuth2, and containerized APIs with Docker.',
    ],
    stack: ['AWS', 'ETL', 'Jenkins', 'Bamboo', 'OAuth2', 'Docker'],
  },
  {
    company: 'Country Financial',
    role: 'Software Engineer (contract)',
    period: 'Jan 2015 – Mar 2016',
    location: 'Bloomington, IL',
    highlights: ['Built and tested web services and supported them in production after release.'],
    stack: ['Web services', 'SOAP UI'],
  },
];

export const contributions = [
  {
    id: 'caching',
    org: 'Liberty Mutual Insurance',
    year: '2026',
    title: 'Production-safe caching for location-specific underwriting rules',
    teaser: 'Removed nearly all repeated database load from a live underwriting application without weakening its rules.',
    problem:
      'A live weather-moratorium application, used to apply underwriting restrictions during severe weather and natural disasters, repeatedly fetched the same underwriting and moratorium data from backend databases. Any fix had to keep ZIP-code, county, and statewide rules accurate and timely.',
    approach:
      'I identified the pattern, originated the architecture, and defended it through architecture review: cache topology, key construction, coherence, invalidation, and handling of jurisdiction-specific rules. Caching itself is not new; the work was making it safe for underwriting decisions.',
    outcome:
      'Deployed to production on July 25, 2026. The architecture template is now being shared with other Liberty Mutual teams whose applications carry similar repeated database demand.',
    metrics: [
      { value: '3.1M → 102', label: 'SQL queries per day' },
      { value: '≈ 1.13B', label: 'fewer queries per year' },
      { value: '≈ 8%', label: 'lower average service-call latency' },
    ],
    metricsNote: 'Source: Liberty Mutual production monitoring, comparable periods before and after deployment.',
    metricsFlag: 'SHOW_PRODUCTION_METRICS',
  },
  {
    id: 'inventory',
    org: 'The Home Depot',
    year: '2022 – 2023',
    title: 'Resilient inventory state for Available-to-Sell',
    teaser: 'Helped move inventory visibility for about 2,000 stores to a model that stays correct when events arrive late or twice.',
    problem:
      'Inventory visibility for about 2,000 stores and 150 warehouses depended on high volumes of event-driven updates. Delayed, duplicated, or stale events could leave inventory counts wrong, affecting orders and fulfillment.',
    approach:
      'I identified structural weaknesses in relying only on chained incremental updates and contributed materially to an architecture based on authoritative absolute updates, so the system converges on correct state even when events arrive late or more than once.',
    outcome:
      'Used in The Home Depot’s retail inventory environment to keep Available-to-Sell data reliable for customer orders, fulfillment, and replenishment.',
  },
  {
    id: 'anomaly',
    org: 'Independent research',
    year: '2025',
    title: 'Deep-learning-driven performance anomaly detection',
    teaser: 'A registered design for adaptive anomaly detection that an outside company drew on for its own production system.',
    problem:
      'Static monitoring rules miss evolving performance failures, correlated anomalies, and early signs of reliability problems in complex enterprise systems.',
    approach:
      'I designed a system that learns expected behavior from historical and real-time signals using recurrent networks, LSTMs, and autoencoders, flags deviations, helps diagnose execution bottlenecks, and adapts as operating patterns change. It is registered in Germany as utility model DE 20 2025 102 432 U1.',
    external: {
      flag: 'SHOW_TECHSOPHY',
      title: 'External consideration by TechSophy',
      body:
        'TechSophy, a company independent of my employers, reviewed this design and my article on automated code refactoring while building its THOP production backend, and states that its engineers used selected principles on bottleneck identification and adaptive anomaly detection. TechSophy designed and deployed its own implementation in September 2025; I did not build, advise on, or deploy it.',
      metrics: [
        { value: '82% → 94%', label: 'production efficiency, Sep 2025 to Jan 2026' },
        { value: '12.20% → 9.52%', label: 'average incident rate, a 22% relative drop' },
      ],
      note:
        'These are TechSophy’s own measurements of its own system. TechSophy also estimates about $5M in added annual processing capacity and about $550K in first-year operational benefit.',
    },
  },
  {
    id: 'legacy',
    org: 'Independent research',
    year: '2025',
    title: 'Adaptive AI-assisted legacy system enhancement',
    teaser: 'A registered design and a book on improving aging enterprise systems incrementally instead of replacing them.',
    problem:
      'Organizations depend on aging systems that are costly and risky to replace. The U.S. Government Accountability Office reports that federal agencies spend about 80% of their IT budgets operating and maintaining existing systems.',
    approach:
      'A system that assesses inefficiencies, bottlenecks, security vulnerabilities, and outdated components in legacy software, generates AI-supported optimization strategies, and supports incremental enhancement with continuous performance and security monitoring. Registered in Germany as DE 20 2025 102 431 U1 and developed further in my book, Obsolete to Optimal.',
  },
];

export const utilityModels = [
  {
    number: 'DE 20 2025 102 432 U1',
    title: 'Deep Learning Driven Performance Anomaly Detection System',
    filed: 'May 4, 2025',
    published: 'June 18, 2025',
    role: 'Inventor and applicant',
    href: 'https://register.dpma.de/DPMAregister/pat/register?AKZ=2020251024322&CURSOR=1',
    summary:
      'Uses historical and real-time performance data with recurrent, LSTM, and autoencoder models to detect abnormal system behavior, raise alerts, help diagnose execution bottlenecks, and adapt detection as behavior changes.',
  },
  {
    number: 'DE 20 2025 102 431 U1',
    title: 'Adaptive AI-Driven Automated Legacy Enhancement System',
    filed: 'May 4, 2025',
    published: 'July 3, 2025',
    role: 'Inventor and applicant',
    href: 'https://register.dpma.de/DPMAregister/pat/register?AKZ=2020251024314&CURSOR=0',
    summary:
      'Assesses inefficiencies, bottlenecks, security vulnerabilities, and outdated components in legacy software, generates AI-supported optimization strategies, and supports incremental enhancement with continuous monitoring.',
  },
];

export const book = {
  title: 'Obsolete to Optimal: How AI Can Transform Aging U.S. Enterprise Systems in Insurance and Retail',
  isbn: '9789367884188',
  href: 'https://isbnsearch.org/isbn/9789367884188',
  note: 'Released at the International Conference on Innovation in Engineering and Sciences (ICIES-2025).',
  summary:
    'Practical approaches to improving the reliability, efficiency, integration, and adaptability of aging enterprise technology in insurance and retail without disruptive system replacement.',
};

export const publications = [
  {
    type: 'ieee',
    title: 'AI Optimized Load Balancing for High-Traffic Web Applications',
    venue: '2nd International Conference on New Frontiers in Communication, Automation, Management and Security (ICCAMS 2025), IEEE',
    date: 'Jul 2025',
    authorship: 'Co-author',
    doi: '10.1109/ICCAMS65118.2025.11234518',
    note: 'Presented in Bengaluru, India. Indexed in IEEE Xplore and Scopus.',
  },
  {
    type: 'ieee',
    title: 'AI-Powered Resource Management to Improve Cloud Scalability',
    venue: '2nd International Conference on New Frontiers in Communication, Automation, Management and Security (ICCAMS 2025), IEEE',
    date: 'Jul 2025',
    authorship: 'Co-author',
    doi: '10.1109/ICCAMS65118.2025.11233868',
    note: 'Indexed in IEEE Xplore and Scopus.',
  },
  {
    type: 'ieee',
    title: 'A Hybrid Cloud Architecture with Intrusion Detection and Prevention Capabilities for Disaster Recovery',
    venue: 'International Conference on Engineering, Technology & Management (ICETM 2025), IEEE',
    date: 'May 2025',
    authorship: 'Co-author',
    doi: '10.1109/ICETM63734.2025.11051927',
    note: 'Oakdale, New York. Indexed in IEEE Xplore and Scopus.',
  },
  {
    type: 'journal',
    title: 'AI-Enhanced Quality Assurance in Software Engineering',
    venue: 'International Journal of Research and Analytical Reviews (IJRAR)',
    date: 'Mar 2026',
    authorship: 'Sole author',
    doi: '10.56975/ijrar.v13i1.329127',
  },
  {
    type: 'journal',
    title: 'Self-Healing Software Systems: AI-Driven Fault Prediction and Recovery',
    venue: 'World Journal of Advanced Engineering Technology and Sciences (WJAETS), vol. 18, no. 3',
    date: '2026',
    authorship: 'Sole author',
    doi: '10.30574/wjaets.2026.18.3.0120',
  },
  {
    type: 'journal',
    title: 'Optimizing Continuous Integration and Deployment Pipelines for High-Performing Systems',
    venue: 'Sarcouncil Journal of Applied Sciences',
    date: 'Jan 2026',
    authorship: 'Sole author',
    doi: '10.5281/zenodo.18715443',
  },
  {
    type: 'journal',
    title: 'Retail Inventory Reimagined: Deep Learning for Retail Demand Forecasting and Stock Optimization',
    venue: 'Sarcouncil Journal of Multidisciplinary',
    date: 'Jan 2026',
    authorship: 'Sole author',
    doi: '10.5281/zenodo.18324111',
  },
  {
    type: 'journal',
    title: 'Redefining Digital Transformation: AI-Driven Strategies for Next-Generation Software Solutions',
    venue: 'Sarcouncil Journal of Engineering and Computer Sciences',
    date: 'Jan 2026',
    authorship: 'Sole author',
    doi: '10.5281/zenodo.18228814',
  },
  {
    type: 'journal',
    title: 'Modernizing Legacy Software in U.S. Enterprises Through Cost-Effective AI-Driven Optimization',
    venue: 'International Journal of Science and Research Archive (IJSRA), vol. 17, no. 1',
    date: '2025',
    authorship: 'Sole author',
    doi: '10.30574/ijsra.2025.17.1.2735',
  },
  {
    type: 'journal',
    title: 'Agile Innovation: The Role of Continuous Improvement in Modern Software Development',
    venue: 'International Journal of Science and Research Archive (IJSRA), vol. 16, no. 1',
    date: '2025',
    authorship: 'Sole author',
    doi: '10.30574/ijsra.2025.16.1.2159',
  },
  {
    type: 'journal',
    title: 'Telematics Transformation: Using Deep Learning to Uncover Driving Trends and Enhance Insurance Models',
    venue: 'World Journal of Advanced Engineering Technology and Sciences (WJAETS), vol. 15, no. 3',
    date: '2025',
    authorship: 'Sole author',
    doi: '10.30574/wjaets.2025.15.3.1018',
  },
  {
    type: 'journal',
    title: 'Insurance in the Age of AI: AI-Enhanced Efficiency, Accuracy, and Risk Assessment',
    venue: 'International Journal of Research and Analytical Reviews (IJRAR)',
    date: 'May 2025',
    authorship: 'Sole author',
    doi: '10.56975/ijrar.v12i2.321587',
  },
  {
    type: 'journal',
    title: 'Enhancing Software Efficiency Through Automated Code Refactoring and Optimization',
    venue: 'International Journal for Research Trends and Innovation (IJRTI)',
    date: 'Apr 2025',
    authorship: 'Sole author',
    doi: '10.56975/ijrti.v10i4.206815',
  },
  {
    type: 'journal',
    title: 'A Brief Analysis on Architecture and Reliability of Cloud Based Data Storage',
    venue: 'International Journal of Wireless Communications and Networking Technologies, vol. 2, no. 5',
    date: '2013',
    authorship: 'Co-author',
    href: 'https://www.warse.org/IJWCNT/archives/Volume%202,%20No.%205%20%282013%29',
    note: 'Written during undergraduate studies.',
  },
];

export const talks = [
  {
    kind: 'Invited talk',
    short: 'IJCACI 2026',
    title: 'Real-Time Fraud Detection in Insurance Using Kafka-Based Streaming and Cloud-Native Microservices',
    event: '10th International Joint Conference on Advances in Computational Intelligence (IJCACI 2026)',
    date: 'Jul 2026',
    links: [
      { label: 'Talk page', href: 'https://theioes.org/index.php/conference/ijcaci2026/speaker/talk/188' },
      { label: 'Recording', href: 'https://www.youtube.com/watch?v=gbqCblYcLKY' },
      { label: 'Program', href: 'https://theioes.org/conference/ijcaci2026/page/ijcaci-2026-program-schedule' },
    ],
  },
  {
    kind: 'Paper presentation',
    short: 'ICCSMLAI 2025',
    title: 'From Code to Capability: AI at the Core of Next-Gen Digital Transformation',
    event: 'International Conference on Computer Science, Machine Learning and Artificial Intelligence, New York',
    date: 'Oct 2025',
    links: [],
  },
  {
    kind: 'Keynote',
    short: 'iThink 2025',
    title: 'AI in Insurance: Efficiency, Accuracy & Risk Assessment',
    event: 'iThink 2025, International Conference on Intelligent Thinking in Technology, Science & Management (AMC Engineering College and RSP Research Hub)',
    date: '2025',
    links: [],
  },
  {
    kind: 'Paper presentation',
    short: 'ICCAMS 2025',
    title: 'AI Optimized Load Balancing for High-Traffic Web Applications',
    event: 'ICCAMS 2025, Presidency University, Bengaluru (IEEE)',
    date: 'Jul 2025',
    links: [{ label: 'IEEE Xplore', href: 'https://doi.org/10.1109/ICCAMS65118.2025.11234518' }],
  },
];

export const review = [
  {
    org: 'Journal of Quantum Science and Technology (JQST)',
    role: 'Editorial reviewer',
    count: 15,
    detail: 'manuscript reviews completed',
  },
  {
    org: 'International Journal of Research in Modern Engineering and Emerging Technology (IJRMEET)',
    role: 'Editorial reviewer',
    count: 15,
    detail: 'manuscript reviews completed',
  },
  {
    org: 'Technovation Girls',
    role: 'Gold Judge',
    detail: 'Evaluated technology projects in the 2025 season',
  },
  {
    org: 'Brandon Hall Group',
    role: 'Judge',
    detail: 'Evaluated submissions for the 2025 HCM Excellence Awards',
  },
];

export const honors = [
  {
    title: 'ADPList100',
    org: 'ADPList',
    year: '2026',
    detail:
      'One of 100 mentors recognized globally; ADPList selects using mentorship-session data, testimonials, community nominations, and an industry expert panel.',
    href: 'https://adplist.org/mentors/pratyosh-d',
  },
  {
    title: 'Senior Member',
    org: 'IEEE',
    year: '2025',
    detail:
      'Elevated grade requiring at least 10 years of professional experience and peer references; IEEE reports that about 10% of its members hold it.',
    href: 'https://ieee-collabratec.ieee.org/app/p/pratyoshdesaraju',
  },
  {
    title: 'Fellow',
    org: 'Soft Computing Research Society (SCRS)',
    year: '2025',
    detail:
      'Elevated grade reviewed by an expert committee and approved by the governing body; SCRS reports that Fellows are about 5% of its membership.',
    href: 'https://scrs.in/scrs-fellow/1226',
  },
  {
    title: 'Outstanding Contribution in Artificial Intelligence',
    org: 'World Business Conclave',
    year: '2025',
    detail: 'Award recognizing work in AI-enabled enterprise modernization.',
  },
  {
    title: 'Claro Awards winner',
    org: 'Claro Awards',
    year: '2025',
  },
];

export const media = [
  {
    outlet: 'HackerNoon',
    title: 'Pioneering Excellence in Enterprise Technology: The Vision of Pratyosh Desaraju',
    href: 'https://hackernoon.com/pioneering-excellence-in-enterprise-technology-the-vision-of-pratyosh-desaraju',
  },
  {
    outlet: 'OneIndia',
    title: 'Pioneering AI Innovation: How Pratyosh Desaraju is Revolutionizing Legacy System Management',
    href: 'https://www.oneindia.com/in-the-news/pratyosh-desaraju-ai-legacy-system-modernisation-patents-011-7976159.html',
  },
  {
    outlet: 'India.com',
    title: 'Innovative Excellence in Software Engineering by Pratyosh Desaraju',
    href: 'https://www.india.com/money/innovative-excellence-in-software-engineering-by-pratyosh-desaraju-7780144/',
  },
  {
    outlet: 'The Hans India',
    title: 'From Mumbai to Texas: Driving Digital Transformation in U.S. Enterprises',
    href: 'https://www.thehansindia.com/news/business/from-mumbai-to-texasdriving-digital-transformation-in-u.s.enterprises-950211',
  },
  {
    outlet: 'Free Press Journal',
    title: 'Leadership Success Story of Pratyosh Desaraju’s Usage-Based Insurance Initiative',
    href: 'https://www.freepressjournal.in/latest-news/leadership-success-story-of-pratyosh-desarajus-usage-based-insurance-initiative',
  },
  {
    outlet: 'The Business Ascent',
    title: 'Redefining Risk: Pratyosh Desaraju’s Patent-Backed Push to Modernize U.S. Insurance',
    href: 'https://www.thebusinessascent.com/readarticals?id=80',
  },
];

export const education = [
  { degree: 'M.S., Computer Science', school: 'University of Central Missouri', year: '2015' },
  { degree: 'B.Tech., Information Technology', school: 'GITAM University, India', year: '2013' },
];

export const bio = [
  'Pratyosh Desaraju is a Senior Software Engineer at Liberty Mutual Insurance with about eleven years of experience building and modernizing enterprise systems in insurance and retail. His work centers on AI-enabled modernization and reliability engineering: improving business-critical legacy systems incrementally, without the operational risk of replacing them outright.',
  'At Liberty Mutual he works on production systems behind underwriting and risk assessment, including a caching architecture that preserves location-specific underwriting rules while removing nearly all repeated database load. At The Home Depot he worked on Available-to-Sell inventory systems spanning about 2,000 stores and 150 warehouses, helping move them to an authoritative absolute-update model that stays correct when events arrive late or twice.',
  'Alongside production work he publishes on AI-assisted code optimization, anomaly detection, and insurance and retail technology, including three papers in IEEE conference proceedings and the book Obsolete to Optimal. He is the named inventor on two German registered utility models, an IEEE Senior Member, and a Fellow of the Soft Computing Research Society. He reviews manuscripts for two journals, judges technology competitions, and speaks on AI in insurance.',
];

export const milestones = [
  { year: '2013', text: 'B.Tech. in Information Technology, GITAM University. Moved to the U.S. for graduate study.' },
  { year: '2015', text: 'M.S. in Computer Science, University of Central Missouri. Began professional software engineering at Country Financial.' },
  { year: '2016', text: 'Joined Liberty Mutual Insurance engineering, building cloud infrastructure and data pipelines.' },
  { year: '2022', text: 'Senior Software Engineer at The Home Depot, on Available-to-Sell inventory systems.' },
  { year: '2023', text: 'Returned to Liberty Mutual as Senior Software Engineer in risk-assessment technology.' },
  { year: '2025', text: 'Registered two utility models in Germany, published three IEEE conference papers and the book Obsolete to Optimal; elevated to IEEE Senior Member and selected as an SCRS Fellow.' },
  { year: '2026', text: 'Recognized in ADPList100, invited speaker at IJCACI 2026, and deployed the underwriting caching architecture to production.' },
];

export const skills = [
  { group: 'Backend and distributed systems', items: ['Java 21', 'Spring Boot', 'REST APIs', 'Microservices', 'Event-driven architecture', 'Kafka', 'Redis'] },
  { group: 'Data', items: ['PostgreSQL', 'MySQL', 'IBM DB2', 'Spanner', 'MongoDB', 'DynamoDB', 'Cassandra', 'BigQuery'] },
  { group: 'Cloud and platform', items: ['AWS', 'Google Cloud', 'Kubernetes', 'Docker', 'Jenkins', 'Bamboo', 'CI/CD'] },
  { group: 'AI and ML', items: ['Anomaly detection', 'LSTM and autoencoder models', 'RAG', 'FastAPI', 'Ollama'] },
  { group: 'Languages', items: ['Java', 'Python', 'SQL', 'JavaScript'] },
];

export const mentoring =
  'Pratyosh mentors engineers and product professionals on ADPList on career development, system design, and interview preparation, and was recognized in ADPList100 2026, ADPList’s annual list of 100 mentors.';
