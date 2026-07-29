const mongoose = require('mongoose');
require('dotenv').config();

const Service = require('./models/Service');
const Product = require('./models/Product');
const TeamMember = require('./models/TeamMember');

const servicesData = [
  {
    title: 'Custom Software Development',
    slug: 'custom-software-development',
    category: 'Development',
    shortDesc: 'Tailor-made web, backend, and enterprise software solutions engineered for high performance and scalability.',
    fullDesc: 'We architect and build end-to-end bespoke software applications customized to your enterprise workflows. From modular microservices to resilient client applications, we ensure reliability and seamless scale.',
    features: ['Microservices Architecture', 'High-throughput APIs', 'Legacy System Modernization', 'Custom Enterprise Portals'],
    icon: 'Code',
    tags: ['React', 'Node.js', 'Go', 'Microservices'],
    order: 1
  },
  {
    title: 'Web & Mobile App Development',
    slug: 'web-mobile-development',
    category: 'Development',
    shortDesc: 'Responsive, fluid web apps and native mobile applications crafted with modern frameworks.',
    fullDesc: 'Deliver exceptional cross-platform experiences on iOS, Android, and web with sub-second response times, glassmorphic dark-mode UIs, and robust offline sync.',
    features: ['Progressive Web Apps (PWA)', 'iOS & Android Native Performance', 'Cross-Platform React Native/Flutter', 'Real-time WebSockets'],
    icon: 'Smartphone',
    tags: ['React Native', 'Vite', 'TypeScript', 'TailwindCSS'],
    order: 2
  },
  {
    title: 'AI/ML & Data Solutions',
    slug: 'ai-ml-data-solutions',
    category: 'Intelligence',
    shortDesc: 'Intelligent automation, LLM integration, predictive analytics, and enterprise AI engines.',
    fullDesc: 'Embed custom artificial intelligence models into your business process. We specialize in Retrieval-Augmented Generation (RAG), neural networks, automated document vision, and real-time data pipelines.',
    features: ['Custom LLM Fine-Tuning', 'Predictive Analytics Models', 'Natural Language Processing', 'Computer Vision & OCR'],
    icon: 'Brain',
    tags: ['Python', 'PyTorch', 'LangChain', 'OpenAI API'],
    order: 3
  },
  {
    title: 'Cloud & DevOps Infrastructure',
    slug: 'cloud-devops-infrastructure',
    category: 'Infrastructure',
    shortDesc: 'Resilient cloud infrastructure, automated CI/CD pipelines, and zero-downtime Kubernetes deployments.',
    fullDesc: 'Optimize your cloud operations on AWS, GCP, or Azure. We design immutable infrastructure with automated secrets management, container orchestration, and continuous security compliance.',
    features: ['Infrastructure as Code (Terraform)', 'Kubernetes & Docker Pipelines', 'Cost Optimization & Monitoring', 'Zero-Trust Security Architecture'],
    icon: 'Cloud',
    tags: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
    order: 4
  },
  {
    title: 'UI/UX & Product Design',
    slug: 'ui-ux-product-design',
    category: 'Design & Strategy',
    shortDesc: 'High-end aesthetic visual design, intuitive user flows, dark-mode design systems, and design tokens.',
    fullDesc: 'Elevate your enterprise SaaS and consumer products with luxury design aesthetics. We create interactive visual prototypes, scalable design systems, and friction-free user journeys.',
    features: ['Figma Design Tokens', 'Luxury Visual Aesthetics', 'Interactive Micro-animations', 'Accessibility Compliance (WCAG)'],
    icon: 'Palette',
    tags: ['Figma', 'UX Research', 'Design Systems', 'Framer'],
    order: 5
  },
  {
    title: 'IT & Technology Consulting',
    slug: 'it-technology-consulting',
    category: 'Design & Strategy',
    shortDesc: 'Strategic technology advisory, architecture audits, security reviews, and fractional CTO services.',
    fullDesc: 'Navigate complex technical transformations with guidance from battle-tested engineering leadership. We evaluate system bottlenecks, security postures, and technology stack selection.',
    features: ['Architecture Audits', 'Fractional CTO Support', 'Cybersecurity Healthchecks', 'Tech Stack Optimization'],
    icon: 'Compass',
    tags: ['Strategy', 'Audit', 'Security', 'Compliance'],
    order: 6
  }
];

const productsData = [
  {
    name: 'Denesens Intelligence Engine (DIE)',
    slug: 'intelligence-engine',
    tagline: 'Autonomous Workflow & Knowledge Orchestration Platform',
    description: 'An enterprise AI platform that ingests multi-format internal documents, connects to corporate APIs, and delivers context-aware generative insights with strict data residency controls.',
    features: ['RAG Vector Search Engine', 'Multi-tenant Access Control', 'Custom AI Agent Builder', 'Real-Time Telemetry'],
    techStack: ['Python', 'FastAPI', 'Pinecone', 'React', 'TailwindCSS'],
    status: 'Live',
    demoUrl: '#',
    badge: 'Enterprise SaaS',
    order: 1
  },
  {
    name: 'Denesens Cloud Pulse',
    slug: 'cloud-pulse',
    tagline: 'Automated Infrastructure Performance & Cost Sentinel',
    description: 'Real-time observability and predictive cloud spend optimization platform for multi-cloud Kubernetes clusters.',
    features: ['Anomalous Spend Alerts', 'Kubernetes Pod Auto-scaler', 'Security Threat Detection', 'One-Click Compliance Reporting'],
    techStack: ['Node.js', 'Go', 'Prometheus', 'Grafana', 'MongoDB'],
    status: 'Live',
    demoUrl: '#',
    badge: 'DevOps Tooling',
    order: 2
  },
  {
    name: 'Denesens Sentinel Shield',
    slug: 'sentinel-shield',
    tagline: 'Zero-Trust API Security & Rate-Limit Middleware Suite',
    description: 'A lightweight microservices security gatekeeper offering instantaneous DDOS protection, JWT validation, and automated bot mitigation.',
    features: ['Sub-millisecond Middleware Proxy', 'Dynamic IP Reputation Filtering', 'OAuth2 / OIDC Federation', 'Audit Trail Analytics'],
    techStack: ['Rust', 'Express.js', 'Redis', 'WebAssembly'],
    status: 'Beta',
    demoUrl: '#',
    badge: 'Security Suite',
    order: 3
  }
];

const teamData = [
  {
    name: 'Sarathy M',
    role: 'CEO',
    bio: 'Visionary leader driving strategic growth, product expansion, and enterprise partnerships at Denesens Solutions.',
    initials: 'SM',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      github: 'https://github.com'
    },
    order: 1
  },
  {
    name: 'Deepan S',
    role: 'CTO',
    bio: 'Chief Architect specializing in high-concurrency systems, AI integrations, and cloud infrastructure scalability.',
    initials: 'DS',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      github: 'https://github.com'
    },
    order: 2
  },
  {
    name: 'Durai Rajan G',
    role: 'Marketing Lead',
    bio: 'Brand strategist overseeing global client acquisition, digital campaigns, and product marketing initiatives.',
    initials: 'DR',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      github: 'https://github.com'
    },
    order: 3
  }
];

const seedDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/denesens_db';
    console.log(`Connecting to MongoDB at ${connStr}...`);
    await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 3000
    });
    console.log('MongoDB connected successfully!');

    await Service.deleteMany({});
    await Product.deleteMany({});
    await TeamMember.deleteMany({});

    await Service.insertMany(servicesData);
    await Product.insertMany(productsData);
    await TeamMember.insertMany(teamData);

    console.log('Data successfully seeded!');
    process.exit(0);
  } catch (error) {
    console.error('Database seeding error:', error.message);
    console.log('Seeding process skipped (backend will use built-in fallbacks if MongoDB is unavailable).');
    process.exit(0);
  }
};

seedDB();
