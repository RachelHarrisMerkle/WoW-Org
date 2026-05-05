export type SubPractice = 'DX' | 'CRM' | 'CDS' | 'Analytics' | 'Strategy';

export interface FunctionalUnit {
  id: string;
  name: string;
  headcount?: number;
  revenue?: number;
  subPractice?: SubPractice;
  leader?: string;
  remit?: string;
  kpis?: string[];
  notes?: string;
  needsInfo?: boolean;
  questions?: string[];
  isUgam?: boolean;
}

export interface CraftLeaders {
  strategy?: { name: string; reportTo?: string };
  technology?: { name: string; reportTo?: string };
  design?: { name: string; reportTo?: string };
  analytics?: { name: string; reportTo?: string };
}

export interface OrgPerson {
  id: string;
  name: string;
  title: string;
  remit?: string;
  kpis?: string[];
  notes?: string;
  needsInfo?: boolean;
  questions?: string[];
  subPeople?: OrgPerson[];
  functionalUnits?: FunctionalUnit[];
}

export interface OrgGroup {
  id: string;
  name: string;
  colorClass: string;
  headerColorClass: string;
  leader: OrgPerson;
  units: OrgUnit[];
  craftLeaders?: CraftLeaders;
  notes?: string;
}

export interface OrgUnit {
  id: string;
  name: string;
  leader?: OrgPerson;
  subUnits?: OrgUnit[];
  people?: OrgPerson[];
  functionalUnits?: FunctionalUnit[];
  needsInfo?: boolean;
  notes?: string;
  remit?: string;
  kpis?: string[];
  questions?: string[];
}

export const SUB_PRACTICE_COLORS: Record<SubPractice, string> = {
  DX: 'bg-blue-500',
  CRM: 'bg-purple-500',
  CDS: 'bg-pink-400',
  Analytics: 'bg-yellow-500',
  Strategy: 'bg-green-500',
};

export const SUB_PRACTICE_LIGHT: Record<SubPractice, string> = {
  DX: 'bg-blue-100 border-blue-400 text-blue-800',
  CRM: 'bg-purple-100 border-purple-400 text-purple-800',
  CDS: 'bg-pink-100 border-pink-400 text-pink-800',
  Analytics: 'bg-yellow-100 border-yellow-400 text-yellow-800',
  Strategy: 'bg-green-100 border-green-400 text-green-800',
};

export const orgData: OrgGroup[] = [
  {
    id: 'gtm',
    name: 'GTM & Growth',
    colorClass: 'border-gray-400',
    headerColorClass: 'bg-gray-100',
    leader: {
      id: 'cwayman',
      name: 'Chris Wayman',
      title: 'Chief Client Officer',
      remit: 'Leads go-to-market strategy, client growth, and revenue generation across all business units.',
      kpis: [],
      notes: '',
      needsInfo: false,
    },
    units: [
      {
        id: 'gtm-csam',
        name: 'Client Service & Account Management',
        people: [
          {
            id: 'gtm-icls',
            name: 'ICLs',
            title: 'Integrated Client Leads',
            remit: 'Owns integrated client relationships across Merkle Americas.',
            subPeople: [
              { id: 'progers', name: 'Pete Rogers', title: 'Integrated Client Lead' },
              { id: 'awilliams', name: 'Andy Williams', title: 'Integrated Client Lead' },
              { id: 'icl-tbd1', name: 'TBD', title: 'Integrated Client Lead', needsInfo: true },
              { id: 'icl-tbd2', name: 'TBD', title: 'Integrated Client Lead', needsInfo: true },
            ],
          },
        ],
      },
      {
        id: 'gtm-sales',
        name: 'Sales & Alliances Unit',
        needsInfo: false,
      },
      {
        id: 'gtm-enablement',
        name: 'GTM & Growth Enablement Unit',
        needsInfo: false,
      },
      {
        id: 'gtm-enterprise',
        name: 'Enterprise Solutions Unit',
        subUnits: [
          { id: 'gtm-named', name: 'Named Solutions' },
          { id: 'gtm-industry', name: 'Industry Solutions' },
        ],
      },
      {
        id: 'gtm-marketing',
        name: 'Marketing Unit',
        needsInfo: false,
      },
    ],
  },
  {
    id: 'ops',
    name: 'Operations',
    colorClass: 'border-gray-400',
    headerColorClass: 'bg-gray-100',
    leader: {
      id: 'mforlstall',
      name: 'Missy Forlstall',
      title: 'Chief Operations Officer',
      remit: 'Leads operational excellence, delivery intelligence, resource management, and program governance.',
      kpis: [],
      notes: '',
      needsInfo: false,
    },
    units: [
      {
        id: 'ops-ai',
        name: 'AI-Driven Ops',
        leader: { id: 'ops-ai-tbd', name: 'TBD', title: 'Applied AI and Operations', needsInfo: true },
        needsInfo: true,
        notes: 'Leader TBD',
      },
      {
        id: 'ops-delivery',
        name: 'Delivery Intelligence',
        people: [
          { id: 'cmccomas-ops', name: 'Chris McComas', title: 'DDM Lead' },
          { id: 'dderocha-ops', name: 'Deana Derocha', title: 'DBT Lead' },
          { id: 'cts-tbd', name: 'TBD', title: 'CTS Lead', needsInfo: true },
        ],
      },
      {
        id: 'ops-rm',
        name: 'Resource Management & Capacity Planning',
        leader: { id: 'aorgan', name: 'Adam Organ', title: 'Head of RM' },
      },
      {
        id: 'ops-delivery-excellence',
        name: 'Delivery Excellence',
        notes: 'Formerly Portfolio & Program Management. John will be head of craft for PM, Program, and Portfolio/Transformation Management with a SWAT team to: establish big programs, rescue troubled programs, and audit major sales.',
        leader: {
          id: 'jewen',
          name: 'John Ewen',
          title: 'Head of Transformation',
          notes: 'Unit name TBD — likely Delivery Excellence. Will not own Program & Portfolio resources directly; those sit in the teams. SWAT team focus: 1) establish big programs, 2) rescue troubled programs, 3) audit big sales.',
          needsInfo: true,
        },
      },
      {
        id: 'ops-finance',
        name: 'Finance',
        needsInfo: true,
        notes: 'Thomas to elaborate on finance team structure. Needs to be made holistic.',
        questions: ['What is the full finance org under Thomas?', 'Which finance teams roll into Ops vs. other groups?'],
      },
    ],
  },
  {
    id: 'dbt',
    name: 'Digital Business Transformation',
    colorClass: 'border-blue-300',
    headerColorClass: 'bg-blue-50',
    leader: {
      id: 'ebuss',
      name: 'Eric Buss',
      title: 'Managing Director',
      remit: 'Leads Digital Business Transformation business unit.',
      kpis: [],
    },
    units: [
      {
        id: 'dbt-mbrunst',
        name: 'EVP, Managing Partner',
        leader: { id: 'mbrunst', name: 'Michael Brunst', title: 'EVP, Managing Partner' },
      },
      {
        id: 'dbt-cmccomas',
        name: 'EVP COO, DBT',
        leader: { id: 'cmccomas', name: 'Chris McComas', title: 'EVP COO, DBT' },
      },
      {
        id: 'dbt-functional',
        name: 'Practice / Functional Team Business Leader',
        notes: 'Runs large capabilities and services; solid line to Managing Director',
        leader: {
          id: 'ckoberg',
          name: 'Corey Koberg',
          title: 'Head of DBT Analytics & Optimization; CEO, Cardinal Path',
          remit: 'Owns a portfolio of functional units across DBT analytics, optimization, and commerce capabilities.',
          notes: 'Solid line to Managing Director.',
        },
        functionalUnits: [
          {
            id: 'cardinal-path',
            name: 'Cardinal Path',
            headcount: 159,
            revenue: 37.5,
            subPractice: 'DX',
            remit: 'DXA, GA, GEO / SEO',
            notes: '',
          },
          {
            id: 'adobe-analytics',
            name: 'Adobe Analytics (Core)',
            headcount: 39,
            revenue: 8.3,
            subPractice: 'Analytics',
            remit: 'Adobe Analytics core practice',
          },
          {
            id: 'dx-commerce',
            name: 'DX + Commerce (Applied)',
            headcount: 15,
            revenue: 4.2,
            subPractice: 'DX',
          },
          {
            id: 'ugam-hd',
            name: 'Ugam HD',
            headcount: 385,
            revenue: 14.5,
            subPractice: 'Analytics',
            remit: 'Market Research, Commerce Analytics, Stuff',
            isUgam: true,
            notes: 'Feasibility of splitting Ugam still under discussion',
          },
          {
            id: 'ugam-ds',
            name: 'Ugam DS + Commerce',
            headcount: 200,
            revenue: 7.5,
            subPractice: 'DX',
            isUgam: true,
            notes: 'Feasibility of splitting Ugam still under discussion',
          },
        ],
      },
    ],
    craftLeaders: {
      strategy: { name: 'M. Petzinger', reportTo: 'Stauffer' },
      technology: { name: 'C. Kostakis', reportTo: 'Knauf' },
      design: { name: 'D. Calleja', reportTo: 'Fiske' },
      analytics: { name: 'TBD', reportTo: '' },
    },
  },
  {
    id: 'advisory',
    name: 'Advisory',
    colorClass: 'border-red-300',
    headerColorClass: 'bg-red-100',
    leader: {
      id: 'advisory-lead',
      name: 'Advisory Leadership',
      title: '',
    },
    units: [
      {
        id: 'advisory-ent',
        name: 'Enterprise & Org Transformation: AI Op Model',
        leader: { id: 'jstauffer', name: 'John Stauffer', title: 'Chief Strategy Officer' },
        remit: 'Enterprise and organizational transformation leveraging AI operating models.',
      },
      {
        id: 'advisory-ai',
        name: 'Applied AI',
        leader: { id: 'dknauf', name: 'Dan Knauf', title: 'Chief Technology Officer' },
        remit: 'Applied AI capabilities and solutions.',
      },
    ],
  },
  {
    id: 'design',
    name: 'Design',
    colorClass: 'border-gray-300',
    headerColorClass: 'bg-gray-50',
    leader: {
      id: 'bfiske',
      name: 'Barry Fiske',
      title: 'Chief Design Officer',
      remit: 'Leads design craft and practice across all business units.',
    },
    units: [],
  },
  {
    id: 'ddm',
    name: 'Data-Driven Marketing',
    colorClass: 'border-blue-300',
    headerColorClass: 'bg-blue-50',
    leader: {
      id: 'dnovak',
      name: 'David Novak',
      title: 'Managing Director',
      remit: 'Leads Data-Driven Marketing business unit.',
    },
    units: [
      {
        id: 'ddm-evp',
        name: 'EVP, Managing Partner',
        leader: { id: 'ddm-evp-tbd', name: 'TBC', title: 'EVP, Managing Partner', needsInfo: true },
      },
      {
        id: 'ddm-coo',
        name: 'EVP COO, DDM',
        leader: { id: 'dderocha', name: 'Deana Derocha', title: 'EVP COO, DDM' },
      },
      {
        id: 'ddm-plm',
        name: 'PLM',
        notes: '576 / $115',
        functionalUnits: [
          { id: 'ugam-mktg', name: 'Ugam Probably Marketing Analytics', headcount: 40, revenue: 1.5, isUgam: true, subPractice: 'Analytics', notes: 'Feasibility of splitting Ugam still under discussion' },
          { id: 'ugam-consumer', name: 'Ugam Direct Consumer Research', headcount: 160, revenue: 6, isUgam: true, subPractice: 'Analytics', notes: 'Feasibility of splitting Ugam still under discussion' },
          { id: 'ugam-ux', name: 'Ugam UX (Google)', headcount: 50, revenue: 2, isUgam: true, subPractice: 'DX', notes: 'Feasibility of splitting Ugam still under discussion' },
          { id: 'ugam-research', name: 'Ugam Research Tech', headcount: 50, revenue: 2, isUgam: true, subPractice: 'Analytics', notes: 'Feasibility of splitting Ugam still under discussion' },
          { id: 'b2bi', name: 'B2Bi Research (Core)', headcount: 17, revenue: 3.4, subPractice: 'Analytics' },
        ],
      },
      {
        id: 'ddm-crm',
        name: 'CRM',
        functionalUnits: [
          { id: 'crm-messaging', name: 'CRM and Messaging Operations', headcount: 282, revenue: 47.4, subPractice: 'CRM' },
          { id: 'sales-service', name: 'Sales, Service, and Revenue', headcount: 10, revenue: 0.4, subPractice: 'CRM' },
          { id: 'helloworld', name: 'HelloWorld', headcount: 284, revenue: 67.3, subPractice: 'CRM' },
          { id: 'promo-loyalty', name: 'Promotions & Loyalty (Applied)', headcount: 51, revenue: 11.0, subPractice: 'CRM' },
          { id: 'rel-mktg', name: 'Relationship Mktg (Applied)', headcount: 8, revenue: 2.1, subPractice: 'CRM' },
        ],
      },
      {
        id: 'ddm-customer-analytics',
        name: 'Customer Analytics',
        leader: { id: 'aolsen', name: 'Allison Olsen', title: 'Head of Customer Analytics', notes: 'stuff for PLM/CDS, Nathan Miller' },
        functionalUnits: [
          { id: 'cust-analytics', name: 'Customer Analytics (Core)', headcount: 138, revenue: 30.4, subPractice: 'Analytics' },
          { id: 'enterprise-db', name: 'Enterprise DB & Campaign', headcount: 388, revenue: 82, subPractice: 'CDS', remit: 'Large Customer Data (Public Cloud), Campaign Ops (Dir. Mail), ETL — incl. Sandeep, IMS' },
          { id: 'cdp', name: 'CDP', headcount: 108, revenue: 20.8, subPractice: 'CDS', remit: 'SaaS CDP, Journey and Audience Mgmt, AI CRM Process' },
          { id: 'data-identity', name: 'Data & Identity', headcount: 25, revenue: 50, subPractice: 'CDS', remit: 'Data Products + Tagging / Dig ID + Terrestrial ID' },
        ],
      },
    ],
    craftLeaders: {
      strategy: { name: 'TBD', reportTo: 'Stauffer' },
      technology: { name: 'S. Sachdeva', reportTo: 'Knauf' },
      design: { name: 'J. Gray', reportTo: 'Fiske' },
      analytics: { name: 'A. Olson', reportTo: '' },
    },
  },
];

export const toBeConfirmed: FunctionalUnit[] = [
  { id: 'industry-transformation', name: 'Industry + Transformation', headcount: 27, revenue: 3.9, subPractice: 'Strategy' },
  { id: 'tech-strategy', name: 'Technology Strategy', headcount: 19, revenue: 4.8, subPractice: 'Strategy' },
];

export const mrBusiness: FunctionalUnit[] = [
  { id: 'ugam-intermediary', name: 'Ugam Intermediary', headcount: 530, revenue: 20, isUgam: true, notes: 'Feasibility of splitting Ugam still under discussion' },
  { id: 'mktg-analytics-core', name: 'Marketing Analytics (Core)', headcount: 71, revenue: 3.6, subPractice: 'Analytics', leader: 'Amanda Gessert', notes: 'Amanda Gessert' },
];
