export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  handle: string;
}

export interface HeroMetric {
  value: string;
  label: string;
  detail: string;
}

export interface HeroContent {
  eyebrow: string;
  headlineLines: string[];
  subhead: string;
  description: string;
  ctaPrimary: NavLink;
  ctaSecondary: NavLink;
  scrollHint: string;
  metrics: HeroMetric[];
  terminalLines: string[];
  interactionHint: string;
}

export interface AboutPillar {
  index: string;
  title: string;
  copy: string;
}

export interface AboutContent {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  pillars: AboutPillar[];
  portrait: {
    src: string;
    alt: string;
  };
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface SkillsContent {
  eyebrow: string;
  heading: string;
  groups: SkillGroup[];
}

export interface Project {
  id: string;
  index: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  stack: string[];
  href: string;
}

export interface ProjectsContent {
  eyebrow: string;
  heading: string;
  items: Project[];
}

export interface TeachingProgram {
  title: string;
  audience: string;
  copy: string;
}

export interface TeachingContent {
  eyebrow: string;
  heading: string;
  description: string;
  programs: TeachingProgram[];
  quote: {
    text: string;
    attribution: string;
  };
}

export interface EqBadgeContent {
  label: string;
  copy: string;
}

export interface LinkedInPost {
  id: string;
  date: string;
  tag: string;
  excerpt: string;
  reactions: string;
  comments: string;
  href: string;
}

export interface LinkedInContent {
  eyebrow: string;
  heading: string;
  description: string;
  profileHref: string;
  profileLabel: string;
  posts: LinkedInPost[];
}

export interface ContactContent {
  eyebrow: string;
  heading: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface FooterContent {
  availability?: string;
  location: string;
  copyright: string;
  backToTop: string;
}

export interface UiStrings {
  menuOpen: string;
  menuClose: string;
  loaderLabel: string;
}

export const SITE = {
  name: 'Omolara Bello',
  title: 'Omolara Bello — Data Scientist & AI Engineer',
  description:
    'Omolara Bello is a Data Scientist and AI Engineer building practical machine learning systems and training the next generation of data & AI professionals.',
  url: 'https://omolarabello.dev',
  locale: 'en_NG',
};

export const NAV_LINKS: NavLink[] = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Teaching', href: '#teaching' },
  { label: 'Skills', href: '#skills' },
  { label: 'Posts', href: '#posts' },
  { label: 'Contact', href: '#contact' },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/omolara-bello-gmnse-a22803198',
    handle: '@omolara-bello',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Omolara-EB',
    handle: '@omolarabello',
  },
  {
    label: 'Twitter / X',
    href: 'https://twitter.com/omolarabello',
    handle: '@omolarabello',
  },
  {
    label: 'Email',
    href: 'mailto:hello@omolarabello.dev',
    handle: 'hello@omolarabello.dev',
  },
];

// HERO

export const HERO: HeroContent = {
  eyebrow: 'Data Scientist · AI Engineer · Educator',
  headlineLines: ['Omolara', 'Bello'],
  subhead:
    "I build machine learning systems that hold up in production, and I teach the people who'll build the next ones.",
  description:
    'My work sits where rigorous modeling meets real classrooms — shipping AI solutions for real problems, and training the next generation of data and AI professionals through practical, hands-on projects.',
  ctaPrimary: { label: 'See the work', href: '#work' },
  ctaSecondary: { label: 'Get in touch', href: '#contact' },
  scrollHint: 'Scroll to explore',
  metrics: [
    {
      value: '5+',
      label: 'years in data & ML',
      detail: 'Shipping models since 2021',
    },
    {
      value: '100+',
      label: 'students taught',
      detail: 'Youth cohorts & career switchers',
    },
    // { value: '20+', label: 'models shipped', detail: 'From forecasting to NLP' },
  ],
  terminalLines: [
    'import pandas as pd',
    'explain(model, sample)',
    'shap.summary_plot(values)',
    'student.ship_model()',
  ],
  interactionHint: 'move your cursor — the data reacts',
};

// ABOUT

export const ABOUT: AboutContent = {
  eyebrow: 'About',
  heading: 'The person behind the model',
  paragraphs: [
    "I'm a Data Scientist and AI Engineer who thinks in distributions, but works in people. Most of my career has been spent doing two things at once: building ML and AI systems that need to survive contact with messy, real-world data, and teaching Python, data science, and AI to learners ranging from curious teenagers to working adults changing careers.",
    "I'm also an emotional intelligence advocate — which sounds like an unusual line on a data scientist's bio, until you've sat in enough model reviews and classrooms to notice that the hardest part of this work is rarely the math. It's communication, trust, and reading a room. I bring that lens into how I build, how I explain, and how I teach.",
    'My niche is the overlap: I build AI solutions and train the next generation of data and AI professionals using practical, real-world projects — not toy datasets and slide theory.',
  ],
  pillars: [
    {
      index: '01',
      title: 'Build',
      copy: 'End-to-end ML/AI systems — from data pipelines and model training to deployment and monitoring.',
    },
    {
      index: '02',
      title: 'Teach',
      copy: 'Python, data science, and AI curricula for youth and adults, grounded in real, hands-on projects.',
    },
    {
      index: '03',
      title: 'Translate',
      copy: 'Emotional intelligence applied to technical work — turning complex models into decisions people trust.',
    },
  ],
  portrait: {
    src: '/images/omolara-headshot.png',
    alt: 'Portrait of Omolara Bello',
  },
};

// SKILLS

export const SKILLS: SkillsContent = {
  eyebrow: 'Toolkit',
  heading: 'How I work',
  groups: [
    {
      label: 'Languages & Core',
      items: ['Python', 'SQL'],
    },
    {
      label: 'ML & AI',
      items: [
        'scikit-learn',
        'PyTorch',
        'TensorFlow',
        'XGBoost',
        'Microsoft Excel',
        'NLP',
        'Matplotlib',
        'LangChain',
      ],
    },
    {
      label: 'Teaching & Communication',
      items: [
        'Curriculum Design',
        'Technical Facilitation',
        'Emotional Intelligence',
      ],
    },
  ],
};

// PROJECTS / WORK

export const PROJECTS: ProjectsContent = {
  eyebrow: 'Selected Work',
  heading: 'Systems I have built',
  items: [
    {
      id: 'proj-01',
      index: '01',
      title: 'Crop Yield Forecasting Model',
      category: 'Applied ML',
      year: '2025',
      summary:
        'A regression and time-series pipeline predicting smallholder crop yields from satellite and weather data, cutting forecast error against the prior baseline.',
      stack: ['Python', 'scikit-learn', 'XGBoost', 'Airflow'],
      href: '#',
    },
    {
      id: 'proj-02',
      index: '02',
      title: 'Customer Sentiment Intelligence',
      category: 'NLP',
      year: '2024',
      summary:
        'Fine-tuned transformer model classifying support tickets and reviews by sentiment and intent, feeding a live dashboard for a product team.',
      stack: ['PyTorch', 'Hugging Face', 'FastAPI', 'Docker'],
      href: '#',
    },
    {
      id: 'proj-03',
      index: '03',
      title: 'Churn Prediction & Retention Engine',
      category: 'Applied ML',
      year: '2024',
      summary:
        'End-to-end churn model with an explainability layer, giving a customer success team ranked, human-readable reasons behind every risk score.',
      stack: ['Python', 'SHAP', 'MLflow', 'AWS'],
      href: '#',
    },
    {
      id: 'proj-04',
      index: '04',
      title: 'AI Literacy Curriculum for Youth',
      category: 'Education',
      year: '2023 — Ongoing',
      summary:
        'A project-based Python and AI curriculum for teenagers, replacing lecture-first teaching with real datasets and real, working models by week two.',
      stack: ['Python', 'Jupyter', 'Curriculum Design'],
      href: '#',
    },
  ],
};

// TEACHING

export const TEACHING: TeachingContent = {
  eyebrow: 'Teaching',
  heading: 'Training the next generation',
  description:
    "Teaching is not a side project — it's half of the work. I design and run practical Python, data science, and AI programs for youth and adults, built around real projects instead of slide decks, because that's how the concepts actually stick.",
  programs: [
    {
      title: 'Youth AI & Python Bootcamp',
      audience: 'Ages 13–19',
      copy: 'A hands-on introduction to Python and AI, where every learner ships a working model before the program ends.',
    },
    {
      title: 'Career-Switch Data Science Track',
      audience: 'Working adults',
      copy: 'A structured, project-first path from spreadsheets to shipped models, for adults moving into data and AI careers.',
    },
    {
      title: 'AI for Educators Workshop',
      audience: 'Teachers & facilitators',
      copy: 'Practical AI literacy for classroom use — plain-language, tool-agnostic, and grounded in real teaching contexts.',
    },
  ],
  quote: {
    text: 'Good teaching and good modeling ask the same question: what does this person actually need to understand right now?',
    attribution: 'Omolara Bello',
  },
};
// EMOTIONAL INTELLIGENCE

export const EQ_BADGE: EqBadgeContent = {
  label: 'EQ in practice',
  copy: 'The technical skill gets a model built. Emotional intelligence is what gets it trusted, adopted, and taught to someone else.',
};

// LINKEDIN — recent posts

export const LINKEDIN: LinkedInContent = {
  eyebrow: 'From LinkedIn',
  heading: 'Recent thoughts',
  description:
    'I write about the messier, less-slide-deck parts of data science and AI — what actually happens between the model and the meeting.',
  profileHref: 'https://www.linkedin.com/in/omolara-bello-gmnse-a22803198',
  profileLabel: 'Follow on LinkedIn',
  posts: [
    {
      id: 'li-01',
      date: 'July 2026',
      tag: 'On Growth',
      excerpt:
        "Growth can feel strangely uncomfortable. And that confused me for a long time. I spent years running on pressure. Deadlines. Self-doubt. Comparison. That tension became my normal. So when things started to calm down, when I started to actually improve, I realized that growth is not about pressure — it's about curiosity, reflection, and the willingness to be wrong.",
      reactions: '312',
      comments: '48',
      href: 'https://www.linkedin.com/posts/omolara-bello-gmnse-a22803198_growth-can-feel-strangely-uncomfortable-activity-7478689070605438976-DYZz?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE81Ds8B5g7InAA88LicGlq-sRJouL8wXx4',
    },
    {
      id: 'li-02',
      date: 'June 2026',
      tag: 'On building',
      excerpt: `Your fear might be older than the situation. 👀 

A new opportunity shows up.

And before you even try, your brain says:

❌ "I'm not good enough."
❌ "I'll probably fail."
❌ "Others are way ahead of me."

But here's what's actually happening 👇

You're not reacting to the present.
You're reacting to the past.`,
      reactions: '487',
      comments: '63',
      href: 'https://www.linkedin.com/posts/omolara-bello-gmnse-a22803198_your-fear-might-be-older-than-the-situation-ugcPost-7474679781624745985-Ma98?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE81Ds8B5g7InAA88LicGlq-sRJouL8wXx4',
    },
    {
      id: 'li-03',
      date: 'July 2026',
      tag: 'On EQ in tech',
      excerpt: `Not every problem needs your immediate response.

Early in my career, I thought professionalism meant speed.

Reply instantly.
React quickly.
Fix it now.

I believed fast responses proved I was competent.

I was wrong.

Over time, I learned something that changed how I work
and how I show up for people.`,
      reactions: '598',
      comments: '91',
      href: 'https://www.linkedin.com/posts/omolara-bello-gmnse-a22803198_not-every-problem-needs-your-immediate-response-activity-7477601975329656832-TNXL?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE81Ds8B5g7InAA88LicGlq-sRJouL8wXx4',
    },
  ],
};

// CONTACT / FOOTER

export const CONTACT: ContactContent = {
  eyebrow: 'Contact',
  heading: "Let's build or teach something",
  description:
    "Open to ML/AI engineering roles, consulting engagements, and speaking or teaching opportunities. If it involves data, AI, or the people learning to work with them, I'd like to hear about it.",
  ctaLabel: 'hello@omolarabello.dev',
  ctaHref: 'mailto:hello@omolarabello.dev',
};

export const FOOTER: FooterContent = {
  // availability:
  //   'Currently available for select engineering & teaching engagements.',
  location: 'Based in Nigeria · working with teams worldwide',
  copyright: `© ${new Date().getFullYear()} Omolara Bello. All rights reserved.`,
  backToTop: 'Back to top',
};

// MISC UI STRINGS

export const UI: UiStrings = {
  menuOpen: 'Menu',
  menuClose: 'Close',
  loaderLabel: 'Loading',
};
