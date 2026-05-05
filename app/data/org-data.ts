export type SubPractice = 'DX' | 'CRM' | 'CDS' | 'Analytics' | 'Strategy';
export type ModelType = 'profit' | 'cost' | 'neutral';
export type SizeType = 'S' | 'M' | 'L';
export type ReportingType = 'direct' | 'matrix' | 'tbd' | 'tbh';

export interface ModelingRR {
  model?: ModelType;
  size?: SizeType;
  demandCreation?: number;
  assistedSales?: number;
  freebies?: number;
  utilization?: number;
}

export interface PersonEntry {
  id: string;
  name: string;
  title?: string;
  reportingType: ReportingType;
  matrixReportsTo?: string;
}

export interface UnitDetail {
  definition?: string;
  modeling?: ModelingRR;
  people?: PersonEntry[];
  kpis?: string[];
  notes?: string;
  needsInfo?: boolean;
  questions?: string[];
}

export interface FunctionalUnit {
  id: string;
  name: string;
  headcount?: number;
  revenue?: number;
  subPractice?: SubPractice;
  leader?: string;
  isUgam?: boolean;
  detail?: UnitDetail;
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
  isPeteDirectReport?: boolean;
  reportingType?: ReportingType;
  matrixReportsTo?: string;
  detail?: UnitDetail;
  subPeople?: OrgPerson[];
  functionalUnits?: FunctionalUnit[];
}

export interface OrgUnit {
  id: string;
  name: string;
  leader?: OrgPerson;
  subUnits?: OrgUnit[];
  people?: OrgPerson[];
  functionalUnits?: FunctionalUnit[];
  detail?: UnitDetail;
}

export interface OrgGroup {
  id: string;
  name: string;
  colorClass: string;
  headerColorClass: string;
  leader: OrgPerson;
  isPeteDirectReport?: boolean;
  units: OrgUnit[];
  craftLeaders?: CraftLeaders;
  detail?: UnitDetail;
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

export const MODEL_COLORS: Record<ModelType, string> = {
  profit: 'bg-green-100 text-green-800 border-green-300',
  cost: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  neutral: 'bg-blue-100 text-blue-800 border-blue-300',
};

export const orgData: OrgGroup[] = [
  {
    id: 'gtm',
    name: 'GTM & Growth',
    colorClass: 'border-gray-400',
    headerColorClass: 'bg-gray-100',
    isPeteDirectReport: true,
    leader: {
      id: 'cwayman',
      name: 'Chris Wayman',
      title: 'Chief Client Officer',
      isPeteDirectReport: true,
      detail: {
        definition: 'Leads go-to-market strategy, client growth, and revenue generation across all Merkle Americas business units.',
        modeling: { model: 'profit' },
        kpis: [],
        notes: '',
      },
    },
    units: [
      {
        id: 'gtm-csam',
        name: 'Client Service & Account Management',
        detail: { definition: 'Manages integrated client relationships across Merkle Americas.' },
        people: [
          {
            id: 'gtm-icls',
            name: 'ICLs',
            title: 'Integrated Client Leads',
            detail: {
              definition: 'Integrated Client Leads own the full client relationship across all Merkle capabilities.',
              people: [
                { id: 'progers', name: 'Pete Rogers', title: 'Integrated Client Lead', reportingType: 'direct' },
                { id: 'awilliams', name: 'Andy Williams', title: 'Integrated Client Lead', reportingType: 'direct' },
                { id: 'icl-tbd1', name: 'TBD', title: 'Integrated Client Lead', reportingType: 'tbd' },
                { id: 'icl-tbd2', name: 'TBD', title: 'Integrated Client Lead', reportingType: 'tbd' },
              ],
            },
          },
        ],
      },
      {
        id: 'gtm-sales',
        name: 'Sales & Alliances Unit',
        detail: { needsInfo: true, questions: ['Who leads this unit?', 'What is the full remit?'] },
      },
      {
        id: 'gtm-enablement',
        name: 'GTM & Growth Enablement Unit',
        detail: { needsInfo: true },
      },
      {
        id: 'gtm-enterprise',
        name: 'Enterprise Solutions Unit',
        subUnits: [
          { id: 'gtm-named', name: 'Named Solutions' },
          { id: 'gtm-industry', name: 'Industry Solutions' },
        ],
        detail: { needsInfo: true },
      },
      {
        id: 'gtm-marketing',
        name: 'Marketing Unit',
        detail: { needsInfo: true },
      },
    ],
    detail: {
      definition: 'GTM & Growth owns the go-to-market motion for Merkle Americas — driving new logo acquisition, account growth, and cross-BU coordination for client pursuits.',
      needsInfo: false,
    },
  },
  {
    id: 'ops',
    name: 'Operations',
    colorClass: 'border-gray-400',
    headerColorClass: 'bg-gray-100',
    isPeteDirectReport: true,
    leader: {
      id: 'mforlstall',
      name: 'Missy Forlstall',
      title: 'Chief Operations Officer',
      isPeteDirectReport: true,
      detail: {
        definition: 'Leads operational excellence, delivery intelligence, resource management, and program governance across Merkle Americas.',
        modeling: { model: 'cost' },
        kpis: [],
        notes: '',
      },
    },
    units: [
      {
        id: 'ops-ai',
        name: 'AI-Driven Ops',
        detail: {
          needsInfo: true,
          people: [{ id: 'ops-ai-tbd', name: 'TBD', title: 'Applied AI and Operations', reportingType: 'tbd' }],
          notes: 'Leader TBD',
        },
      },
      {
        id: 'ops-delivery',
        name: 'Delivery Intelligence',
        detail: {
          definition: 'Provides delivery intelligence across DBT, DDM, and CTS practices.',
          people: [
            { id: 'cmccomas-ops', name: 'Chris McComas', title: 'DDM Lead', reportingType: 'matrix', matrixReportsTo: 'Missy Forlstall' },
            { id: 'dderocha-ops', name: 'Deana Derocha', title: 'DBT Lead', reportingType: 'matrix', matrixReportsTo: 'Missy Forlstall' },
            { id: 'cts-tbd', name: 'TBD', title: 'CTS Lead', reportingType: 'tbd' },
          ],
        },
        people: [
          { id: 'cmccomas-d', name: 'Chris McComas', title: 'DDM Lead', reportingType: 'matrix', matrixReportsTo: 'Missy Forlstall' },
          { id: 'dderocha-d', name: 'Deana Derocha', title: 'DBT Lead', reportingType: 'matrix', matrixReportsTo: 'Missy Forlstall' },
          { id: 'cts-tbd-d', name: 'TBD', title: 'CTS Lead', reportingType: 'tbd' },
        ],
      },
      {
        id: 'ops-rm',
        name: 'Resource Management & Capacity Planning',
        leader: {
          id: 'aorgan',
          name: 'Adam Organ',
          title: 'Head of RM',
          detail: { definition: 'Owns resource management and capacity planning across all Merkle Americas delivery.' },
        },
      },
      {
        id: 'ops-delivery-excellence',
        name: 'Delivery Excellence',
        detail: {
          definition: 'John Ewen will be head of craft for PM, Program, and Portfolio/Transformation Management. He will lead a SWAT team to: 1) establish big programs, 2) rescue troubled programs, 3) audit major sales opportunities.',
          needsInfo: true,
          notes: 'Formerly Portfolio & Program Management. Unit name TBD — likely Delivery Excellence.',
          questions: ['Finalize unit name — Delivery Excellence?', 'Confirm SWAT team headcount and structure.'],
        },
        leader: {
          id: 'jewen',
          name: 'John Ewen',
          title: 'Head of Transformation',
          detail: {
            needsInfo: true,
            notes: 'Unit name TBD. Will not own P&P resources directly.',
          },
        },
      },
      {
        id: 'ops-finance',
        name: 'Finance',
        detail: {
          needsInfo: true,
          notes: 'Thomas to elaborate on finance team structure. Needs to be made holistic.',
          questions: ['What is the full finance org under Thomas?', 'Which finance teams roll into Ops vs. other groups?'],
        },
      },
    ],
    detail: {
      definition: 'Operations owns the delivery infrastructure of Merkle Americas — AI-driven operations, delivery intelligence, resource management, program governance, and finance.',
    },
  },
  {
    id: 'dbt',
    name: 'Digital Business Transformation',
    colorClass: 'border-blue-300',
    headerColorClass: 'bg-blue-50',
    isPeteDirectReport: true,
    leader: {
      id: 'ebuss',
      name: 'Eric Buss',
      title: 'Managing Director',
      isPeteDirectReport: true,
      detail: {
        definition: 'Leads the Digital Business Transformation business unit — the largest BU by headcount in Merkle Americas.',
        modeling: { model: 'profit' },
      },
    },
    units: [
      {
        id: 'dbt-mbrunst',
        name: 'EVP, Managing Partner',
        leader: {
          id: 'mbrunst',
          name: 'Michael Brunst',
          title: 'EVP, Managing Partner',
          reportingType: 'direct',
          detail: { definition: 'EVP and Managing Partner for DBT.' },
        },
      },
      {
        id: 'dbt-cmccomas',
        name: 'EVP COO, DBT',
        leader: {
          id: 'cmccomas',
          name: 'Chris McComas',
          title: 'EVP COO, DBT',
          reportingType: 'direct',
          detail: { definition: 'COO for DBT — owns operational excellence within the business unit.' },
        },
      },
      {
        id: 'dbt-functional',
        name: 'Practice / Functional Team Business Leader',
        detail: {
          definition: 'Runs large capabilities and services. Solid line to Managing Director. This leader owns a portfolio of functional units.',
          notes: 'Solid line to Managing Director.',
        },
        leader: {
          id: 'ckoberg',
          name: 'Corey Koberg',
          title: 'Head of DBT Analytics & Optimization; CEO, Cardinal Path',
          reportingType: 'direct',
          detail: {
            definition: 'Owns a portfolio of functional units across DBT analytics, optimization, and commerce capabilities. Solid line to Managing Director.',
            modeling: { model: 'profit', size: 'L', demandCreation: 20, assistedSales: 40, freebies: 20, utilization: 80 },
            people: [
              { id: 'ckoberg-self', name: 'Corey Koberg', title: 'Head of DBT Analytics & Optimization', reportingType: 'direct' },
            ],
          },
        },
        functionalUnits: [
          {
            id: 'cardinal-path',
            name: 'Cardinal Path',
            headcount: 159, revenue: 37.5, subPractice: 'DX',
            detail: {
              definition: 'DXA, GA, GEO / SEO capability. Cardinal Path is a full-service digital analytics and optimization agency.',
              modeling: { model: 'profit', size: 'L', demandCreation: 20, assistedSales: 40, freebies: 20, utilization: 80 },
            },
          },
          {
            id: 'adobe-analytics',
            name: 'Adobe Analytics (Core)',
            headcount: 39, revenue: 8.3, subPractice: 'Analytics',
            detail: { definition: 'Adobe Analytics core practice.', modeling: { model: 'profit', size: 'M' } },
          },
          {
            id: 'dx-commerce',
            name: 'DX + Commerce (Applied)',
            headcount: 15, revenue: 4.2, subPractice: 'DX',
            detail: { modeling: { model: 'profit', size: 'S' } },
          },
          {
            id: 'ugam-hd',
            name: 'Ugam HD',
            headcount: 385, revenue: 14.5, subPractice: 'Analytics', isUgam: true,
            detail: {
              definition: 'Market Research, Commerce Analytics. Feasibility of splitting Ugam still under discussion.',
              modeling: { model: 'profit', size: 'L' },
              needsInfo: true,
              notes: 'Ugam split feasibility TBD',
            },
          },
          {
            id: 'ugam-ds',
            name: 'Ugam DS + Commerce',
            headcount: 200, revenue: 7.5, subPractice: 'DX', isUgam: true,
            detail: {
              definition: 'Ugam DS + Commerce capability.',
              modeling: { model: 'profit', size: 'L' },
              needsInfo: true,
              notes: 'Ugam split feasibility TBD',
            },
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
    detail: {
      definition: 'Digital Business Transformation (DBT) is Merkle Americas\' largest business unit, delivering digital experience, commerce, analytics, and optimization capabilities.',
    },
  },
  {
    id: 'advisory',
    name: 'Advisory',
    colorClass: 'border-red-300',
    headerColorClass: 'bg-red-100',
    isPeteDirectReport: true,
    leader: { id: 'advisory-lead', name: '', title: '' },
    units: [
      {
        id: 'advisory-ent',
        name: 'Enterprise & Org Transformation: AI Op Model',
        detail: {
          definition: 'Enterprise and organizational transformation leveraging AI operating models. The Chief Strategy Officer leads this capability.',
          modeling: { model: 'neutral', size: 'M', demandCreation: 20, assistedSales: 20, freebies: 33, utilization: 33 },
        },
        leader: {
          id: 'jstauffer',
          name: 'John Stauffer',
          title: 'Chief Strategy Officer',
          isPeteDirectReport: true,
          reportingType: 'direct',
          detail: {
            definition: 'Chief Strategy Officer. Leads Enterprise & Org Transformation and the AI Operating Model practice.',
            modeling: { model: 'neutral', size: 'M' },
          },
        },
      },
      {
        id: 'advisory-ai',
        name: 'Applied AI',
        detail: {
          definition: 'Applied AI capabilities and solutions for enterprise clients. Includes AI strategy, implementation, and the Head of Analytics craft.',
          modeling: { model: 'neutral', size: 'M', demandCreation: 20, assistedSales: 20, freebies: 33, utilization: 33 },
        },
        leader: {
          id: 'dknauf',
          name: 'Dan Knauf',
          title: 'Chief Technology Officer',
          isPeteDirectReport: true,
          reportingType: 'direct',
          detail: {
            definition: 'Chief Technology Officer. Leads Applied AI capabilities and the Technology craft.',
          },
        },
      },
    ],
    detail: {
      definition: 'Advisory provides enterprise strategy, organizational transformation, and applied AI capabilities. It operates as a neutral cost center focused on client development and strategic support.',
      modeling: { model: 'neutral', size: 'M', demandCreation: 20, assistedSales: 20, freebies: 33, utilization: 33 },
    },
  },
  {
    id: 'design',
    name: 'Design',
    colorClass: 'border-gray-300',
    headerColorClass: 'bg-gray-50',
    isPeteDirectReport: true,
    leader: {
      id: 'bfiske',
      name: 'Barry Fiske',
      title: 'Chief Design Officer',
      isPeteDirectReport: true,
      detail: {
        definition: 'Chief Design Officer. Leads the Design craft and practice across all Merkle Americas business units.',
      },
    },
    units: [],
    detail: {
      definition: 'Design leads the craft of experience design across Merkle Americas, providing dotted-line design leadership into all business units.',
    },
  },
  {
    id: 'ddm',
    name: 'Data-Driven Marketing',
    colorClass: 'border-blue-300',
    headerColorClass: 'bg-blue-50',
    isPeteDirectReport: true,
    leader: {
      id: 'dnovak',
      name: 'David Novak',
      title: 'Managing Director',
      isPeteDirectReport: true,
      detail: {
        definition: 'Leads the Data-Driven Marketing business unit — the second largest BU in Merkle Americas.',
        modeling: { model: 'profit' },
      },
    },
    units: [
      {
        id: 'ddm-evp',
        name: 'EVP, Managing Partner',
        leader: {
          id: 'ddm-evp-tbd',
          name: 'TBC',
          title: 'EVP, Managing Partner',
          reportingType: 'tbd',
          detail: { needsInfo: true },
        },
      },
      {
        id: 'ddm-coo',
        name: 'EVP COO, DDM',
        leader: {
          id: 'dderocha',
          name: 'Deana Derocha',
          title: 'EVP COO, DDM',
          reportingType: 'direct',
          detail: { definition: 'COO for DDM — owns operational excellence within the business unit.' },
        },
      },
      {
        id: 'ddm-plm',
        name: 'PLM',
        detail: { notes: '576 / $115', needsInfo: false },
        functionalUnits: [
          { id: 'ugam-mktg', name: 'Ugam Probably Marketing Analytics', headcount: 40, revenue: 1.5, isUgam: true, subPractice: 'Analytics', detail: { needsInfo: true, notes: 'Ugam split feasibility TBD' } },
          { id: 'ugam-consumer', name: 'Ugam Direct Consumer Research', headcount: 160, revenue: 6, isUgam: true, subPractice: 'Analytics', detail: { needsInfo: true } },
          { id: 'ugam-ux', name: 'Ugam UX (Google)', headcount: 50, revenue: 2, isUgam: true, subPractice: 'DX', detail: { needsInfo: true } },
          { id: 'ugam-research', name: 'Ugam Research Tech', headcount: 50, revenue: 2, isUgam: true, subPractice: 'Analytics', detail: { needsInfo: true } },
          { id: 'b2bi', name: 'B2Bi Research (Core)', headcount: 17, revenue: 3.4, subPractice: 'Analytics' },
        ],
      },
      {
        id: 'ddm-crm',
        name: 'CRM',
        functionalUnits: [
          { id: 'crm-messaging', name: 'CRM and Messaging Operations', headcount: 282, revenue: 47.4, subPractice: 'CRM', detail: { definition: 'Core CRM and messaging operations capability.' } },
          { id: 'sales-service', name: 'Sales, Service, and Revenue', headcount: 10, revenue: 0.4, subPractice: 'CRM' },
          { id: 'helloworld', name: 'HelloWorld', headcount: 284, revenue: 67.3, subPractice: 'CRM' },
          { id: 'promo-loyalty', name: 'Promotions & Loyalty (Applied)', headcount: 51, revenue: 11.0, subPractice: 'CRM' },
          { id: 'rel-mktg', name: 'Relationship Mktg (Applied)', headcount: 8, revenue: 2.1, subPractice: 'CRM' },
        ],
      },
      {
        id: 'ddm-customer-analytics',
        name: 'Customer Analytics',
        leader: {
          id: 'aolsen',
          name: 'Allison Olsen',
          title: 'Head of Customer Analytics',
          detail: { notes: 'Stuff for PLM/CDS, Nathan Miller' },
        },
        functionalUnits: [
          { id: 'cust-analytics', name: 'Customer Analytics (Core)', headcount: 138, revenue: 30.4, subPractice: 'Analytics' },
          { id: 'enterprise-db', name: 'Enterprise DB & Campaign', headcount: 388, revenue: 82, subPractice: 'CDS', detail: { definition: 'Large Customer Data (Public Cloud), Campaign Ops (Dir. Mail), ETL — incl. Sandeep, IMS' } },
          { id: 'cdp', name: 'CDP', headcount: 108, revenue: 20.8, subPractice: 'CDS', detail: { definition: 'SaaS CDP, Journey and Audience Mgmt, AI CRM Process' } },
          { id: 'data-identity', name: 'Data & Identity', headcount: 25, revenue: 50, subPractice: 'CDS', detail: { definition: 'Data Products + Tagging / Dig ID + Terrestrial ID' } },
        ],
      },
    ],
    craftLeaders: {
      strategy: { name: 'TBD', reportTo: 'Stauffer' },
      technology: { name: 'S. Sachdeva', reportTo: 'Knauf' },
      design: { name: 'J. Gray', reportTo: 'Fiske' },
      analytics: { name: 'A. Olson', reportTo: '' },
    },
    detail: {
      definition: 'Data-Driven Marketing (DDM) delivers CRM, data, analytics, and loyalty capabilities for enterprise clients.',
    },
  },
];

export const toBeConfirmed: FunctionalUnit[] = [
  { id: 'industry-transformation', name: 'Industry + Transformation', headcount: 27, revenue: 3.9, subPractice: 'Strategy' },
  { id: 'tech-strategy', name: 'Technology Strategy', headcount: 19, revenue: 4.8, subPractice: 'Strategy' },
];

export const mrBusiness: FunctionalUnit[] = [
  { id: 'ugam-intermediary', name: 'Ugam Intermediary', headcount: 530, revenue: 20, isUgam: true, detail: { needsInfo: true, notes: 'Ugam split feasibility TBD' } },
  { id: 'mktg-analytics-core', name: 'Marketing Analytics (Core)', headcount: 71, revenue: 3.6, subPractice: 'Analytics', leader: 'Amanda Gessert' },
];
