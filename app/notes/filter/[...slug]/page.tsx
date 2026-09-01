import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { fetchNotes } from '@/lib/api';
import NotesClient from '@/app/notes/filter/[...slug]/Notes.client';
import type { NoteTag } from '@/types/note';

type Props = {
  params: Promise<{
    slug: string[];
  }>;
};

export default async function FilteredNotesPage({ params }: Props) {
  const { slug } = await params;

  const tag = slug[0];
  const selectedTag = tag === 'all' ? undefined : (tag as NoteTag);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', selectedTag],
    queryFn: () =>
      fetchNotes({
        page: 1,
        search: '',
        tag: selectedTag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={selectedTag} />
    </HydrationBoundary>
  );
}
