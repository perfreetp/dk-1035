import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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
  getPendingCases: () => Case[];
  submitCase: (caseData: Partial<Case>, userId: string) => void;
  approveCase: (caseId: string) => void;
  rejectCase: (caseId: string) => void;
}

const initialFilters: FilterState = {
  industry: [],
  region: [],
  stage: [],
  fundingRange: [],
  yearRange: [],
  search: ''
};

export const useCaseStore = create<CaseState>()(
  persist(
    (set, get) => ({
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
        const allCases = [...mockCases, ...get().cases];
        const caseItem = allCases.find(c => c.id === id);
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
        const allCases = [...mockCases, ...cases].filter(c => c.status === 'approved');
        let filtered = [...allCases];

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
            const amountInWan = c.fundingAmount;
            return filters.fundingRange.some(range => {
              const ranges: Record<string, [number, number]> = {
                '0-100万': [0, 100],
                '100-500万': [100, 500],
                '500-2000万': [500, 2000],
                '2000万以上': [2000, Infinity]
              };
              const [min, max] = ranges[range] || [0, Infinity];
              return amountInWan >= min && amountInWan < max;
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

      getPendingCases: () => {
        return get().cases.filter(c => c.status === 'pending');
      },

      submitCase: (caseData: Partial<Case>, userId: string) => {
        const newCase: Case = {
          id: String(Date.now()) + Math.random().toString(36).substring(2, 9),
          stats: { views: 0, favorites: 0, corrections: 0 },
          status: 'pending',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          ...caseData,
          submittedBy: userId,
          products: caseData.products || [],
          timeline: caseData.timeline || [],
          team: caseData.team || [],
          fundingRecords: caseData.fundingRecords || [],
          failureReasons: caseData.failureReasons || [],
          lessons: caseData.lessons || [],
          references: caseData.references || [],
          topics: caseData.topics || []
        } as Case;
        
        set(state => ({
          cases: [newCase, ...state.cases]
        }));
      },

      approveCase: (caseId: string) => {
        set(state => ({
          cases: state.cases.map(c =>
            c.id === caseId
              ? { ...c, status: 'approved' as const, updatedAt: new Date().toISOString() }
              : c
          )
        }));
      },

      rejectCase: (caseId: string) => {
        set(state => ({
          cases: state.cases.map(c =>
            c.id === caseId
              ? { ...c, status: 'rejected' as const, updatedAt: new Date().toISOString() }
              : c
          )
        }));
      }
    }),
    {
      name: 'cases-storage'
    }
  )
);
