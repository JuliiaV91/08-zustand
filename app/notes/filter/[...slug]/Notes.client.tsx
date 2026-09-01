'use client';

import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../../../lib/api';
import { useDebouncedCallback } from 'use-debounce';
import NoteList from '../../../../components/NoteList/NoteList';
import Pagination from '../../../../components/Pagination/Pagination';
// import Modal from '../../components/Modal/Modal';
import NoteForm from '../../../../components/NoteForm/NoteForm';
import SearchBox from '../../../../components/SearchBox/SearchBox';
import type { NoteTag } from '@/types/note';

import css from './NotesPage.module.css';

interface NotesClientProps {
  tag?: NoteTag;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');

  const { data } = useQuery({
    queryKey: ['notes', page, search, tag],
    queryFn: () =>
      fetchNotes({
        page,
        search,
        tag,
      }),
    placeholderData: keepPreviousData,
  });

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    debouncedSearch(value);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchInput} onChange={handleSearchChange} />

        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}

        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>
      {isModalOpen && (
        // <Modal onClose={() => setIsModalOpen(false)}>
        <NoteForm onCancel={() => setIsModalOpen(false)} />
        // </Modal>
      )}

      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}
