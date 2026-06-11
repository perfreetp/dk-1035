import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Note } from '../types';

interface NoteState {
  notes: Note[];
  addNote: (caseId: string, userId: string, content: string) => void;
  updateNote: (noteId: string, content: string) => void;
  deleteNote: (noteId: string) => void;
  getNoteByCaseId: (caseId: string) => Note[];
  getNoteById: (noteId: string) => Note | undefined;
}

export const useNoteStore = create<NoteState>()(
  persist(
    (set, get) => ({
      notes: [],

      addNote: (caseId: string, userId: string, content: string) => {
        const newNote: Note = {
          id: String(Date.now()),
          caseId,
          userId,
          content,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        set(state => ({
          notes: [newNote, ...state.notes]
        }));
      },

      updateNote: (noteId: string, content: string) => {
        set(state => ({
          notes: state.notes.map(note =>
            note.id === noteId
              ? { ...note, content, updatedAt: new Date().toISOString() }
              : note
          )
        }));
      },

      deleteNote: (noteId: string) => {
        set(state => ({
          notes: state.notes.filter(note => note.id !== noteId)
        }));
      },

      getNoteByCaseId: (caseId: string) => {
        return get().notes.filter(note => note.caseId === caseId);
      },

      getNoteById: (noteId: string) => {
        return get().notes.find(note => note.id === noteId);
      }
    }),
    {
      name: 'notes-storage'
    }
  )
);
