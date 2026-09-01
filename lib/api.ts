import axios from 'axios';
import type { Note } from '../types/note';

const API_URL = 'https://notehub-public.goit.study/api';
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  page: number;
  search?: string;
  tag?: Note['tag'];
}

interface CreateNotePayload {
  title: string;
  content: string;
  tag: Note['tag'];
}

export const fetchNotes = async ({
  page,
  search,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await axios.get<FetchNotesResponse>(`${API_URL}/notes`, {
    params: {
      page,
      perPage: 12,
      search,
      ...(tag ? { tag } : {}),
    },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return response.data;
};

export const createNote = async (note: CreateNotePayload): Promise<Note> => {
  const response = await axios.post<Note>(`${API_URL}/notes`, note, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await axios.delete<Note>(`${API_URL}/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return response.data;
};
export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const response = await axios.get<Note>(`${API_URL}/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return response.data;
};
