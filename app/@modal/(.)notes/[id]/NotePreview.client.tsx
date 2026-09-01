'use client';

import { useQuery } from '@tanstack/react-query';

import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import css from './NotePreview.module.css';

type Props = {
  id: string;
};

const NotePreviewClient = ({ id }: Props) => {
  const { data: note } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  if (!note) {
    return null;
  }

  return (
    <Modal>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
            <span className={css.tag}>{note.tag}</span>
          </div>

          <p className={css.content}>{note.content}</p>

          <p className={css.date}>
            {new Date(note.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default NotePreviewClient;
