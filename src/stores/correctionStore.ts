import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Correction } from '../types';

interface CorrectionState {
  corrections: Correction[];
  addCorrection: (correction: Omit<Correction, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => void;
  approveCorrection: (correctionId: string) => void;
  rejectCorrection: (correctionId: string) => void;
  getPendingCorrections: () => Correction[];
  getCorrectionsByCaseId: (caseId: string) => Correction[];
}

export const useCorrectionStore = create<CorrectionState>()(
  persist(
    (set, get) => ({
      corrections: [],

      addCorrection: (correction) => {
        const newCorrection: Correction = {
          ...correction,
          id: String(Date.now()) + Math.random().toString(36).substring(2, 9),
          status: 'pending',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        set(state => ({
          corrections: [newCorrection, ...state.corrections]
        }));
      },

      approveCorrection: (correctionId) => {
        set(state => ({
          corrections: state.corrections.map(c =>
            c.id === correctionId
              ? { ...c, status: 'approved' as const, updatedAt: new Date().toISOString() }
              : c
          )
        }));
      },

      rejectCorrection: (correctionId) => {
        set(state => ({
          corrections: state.corrections.map(c =>
            c.id === correctionId
              ? { ...c, status: 'rejected' as const, updatedAt: new Date().toISOString() }
              : c
          )
        }));
      },

      getPendingCorrections: () => {
        return get().corrections.filter(c => c.status === 'pending');
      },

      getCorrectionsByCaseId: (caseId) => {
        return get().corrections.filter(c => c.caseId === caseId);
      }
    }),
    {
      name: 'corrections-storage'
    }
  )
);
