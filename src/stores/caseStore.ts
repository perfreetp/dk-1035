import { create } from 'zustand';
import { Case, FilterState } from '../types';
import { mockCases } from '../data/mockData';

interface CaseState {
  cases: Case[];
  currentCase: Case | null;
  filters: FilterState;
  loading: boolean;
  viewMode: 'grid' | 'list';
  sortBy: 'time' | 'funding' | 'hot';
  fetchCases: () => void;
  fetchCaseById: (id: string) => Case | null;
  setFilters: (filters: Partial<FilterState>) => void;
  clearFilters: () => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  setSortBy: (sort: 'time' | 'funding' | 'hot') => void;
  getFilteredCases: () => Case[];
  submitCase: (caseData: Partial<Case>) => void;
}

const initialFilters: FilterState = {
  industry: [],
  region: [],
  stage: [],
  fundingRange: [],
  yearRange: [],
  search: ''
};

export const useCaseStore = create<CaseState>((set, get) => ({
  cases: [],
  currentCase: null,
  filters: initialFilters,
  loading: false,
  viewMode: 'grid',
  sortBy: 'time',

  fetchCases: () => {
    set({ loading: true });
    setTimeout(() => {
      set({ cases: mockCases, loading: false });
    }, 500);
  },

  fetchCaseById: (id: string) => {
    const caseItem = mockCases.find(c => c.id === id);
    set({ currentCase: caseItem || null });
    return caseItem || null;
  },

  setFilters: (newFilters: Partial<FilterState>) => {
    set(state => ({
      filters: { ...state.filters, ...newFilters }
    }));
  },

  clearFilters: () => {
    set({ filters: initialFilters });
  },

  setViewMode: (mode: 'grid' | 'list') => {
    set({ viewMode: mode });
  },

  setSortBy: (sort: 'time' | 'funding' | 'hot') => {
    set({ sortBy: sort });
  },

  getFilteredCases: () => {
    const { cases, filters, sortBy } = get();
    let filtered = [...cases];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(searchLower) ||
        c.industry.toLowerCase().includes(searchLower) ||
        c.failureReasons.some(r => r.description.toLowerCase().includes(searchLower))
      );
    }

    if (filters.industry.length > 0) {
      filtered = filtered.filter(c => filters.industry.includes(c.industry));
    }

    if (filters.region.length > 0) {
      filtered = filtered.filter(c => filters.region.includes(c.region));
    }

    if (filters.stage.length > 0) {
      filtered = filtered.filter(c => filters.stage.includes(c.stage));
    }

    if (filters.yearRange.length > 0) {
      filtered = filtered.filter(c => {
        return filters.yearRange.some(range => {
          const [start, end] = range.split('-').map(Number);
          return c.closedYear >= start && c.closedYear <= (end || 2025);
        });
      });
    }

    if (filters.fundingRange.length > 0) {
      filtered = filtered.filter(c => {
        return filters.fundingRange.some(range => {
          const ranges: Record<string, [number, number]> = {
            '0-100': [0, 1000000],
            '100-500': [1000000, 5000000],
            '500-2000': [5000000, 20000000],
            '2000+': [20000000, Infinity]
          };
          const [min, max] = ranges[range] || [0, Infinity];
          return c.fundingAmount >= min && c.fundingAmount < max;
        });
      });
    }

    switch (sortBy) {
      case 'time':
        filtered.sort((a, b) => b.closedYear - a.closedYear);
        break;
      case 'funding':
        filtered.sort((a, b) => b.fundingAmount - a.fundingAmount);
        break;
      case 'hot':
        filtered.sort((a, b) => b.stats.views - a.stats.views);
        break;
    }

    return filtered;
  },

  submitCase: (caseData: Partial<Case>) => {
    const newCase: Case = {
      ...caseData,
      id: String(mockCases.length + 1),
      stats: { views: 0, favorites: 0, corrections: 0 },
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      products: caseData.products || [],
      timeline: caseData.timeline || [],
      team: caseData.team || [],
      fundingRecords: caseData.fundingRecords || [],
      failureReasons: caseData.failureReasons || [],
      lessons: caseData.lessons || [],
      references: caseData.references || [],
      topics: caseData.topics || []
    } as Case;
    
    mockCases.unshift(newCase);
    set({ cases: mockCases });
  }
}));
