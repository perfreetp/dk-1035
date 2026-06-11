export interface Product {
  id: string;
  name: string;
  description: string;
  features: string[];
  targetUsers: string;
}

export interface TimelineEvent {
  year: number;
  month: number;
  title: string;
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  change: string;
}

export interface FundingRecord {
  round: string;
  amount: number;
  investors: string;
  year: number;
}

export interface FailureReason {
  category: string;
  description: string;
  severity: number;
}

export interface Reference {
  title: string;
  url: string;
  source: string;
}

export interface CaseStats {
  views: number;
  favorites: number;
  corrections: number;
}

export interface Case {
  id: string;
  name: string;
  logo: string;
  industry: string;
  region: string;
  foundedYear: number;
  closedYear: number;
  stage: string;
  fundingAmount: number;
  products: Product[];
  timeline: TimelineEvent[];
  team: TeamMember[];
  fundingRecords: FundingRecord[];
  failureReasons: FailureReason[];
  lessons: string[];
  references: Reference[];
  stats: CaseStats;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
  topics: string[];
}

export interface Note {
  id: string;
  userId: string;
  caseId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  icon: string;
  tags: string[];
  caseCount: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  avatar?: string;
  createdAt: string;
}

export interface FilterState {
  industry: string[];
  region: string[];
  stage: string[];
  fundingRange: string[];
  yearRange: string[];
  search: string;
}

export interface CaseSubmission {
  name: string;
  logo?: string;
  industry: string;
  region: string;
  foundedYear: number;
  closedYear: number;
  stage: string;
  fundingAmount: number;
  products: Product[];
  failureReasons: FailureReason[];
  lessons: string[];
  references: Reference[];
}

export interface Correction {
  id: string;
  caseId: string;
  userId: string;
  type: 'basic' | 'timeline' | 'team' | 'funding' | 'reason';
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}
