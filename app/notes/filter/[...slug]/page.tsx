import { Metadata } from 'next';
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0];

  const filterName = tag === 'all' ? 'All notes' : tag;

  const title = `Notes: ${filterName}`;
  const description = `View notes filtered by ${filterName} in NoteHub.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://08-zustand-oxebjy3up-juliias-projects-717dc739.vercel.app/notes/filter/${tag}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `Notes: ${filterName}`,
        },
      ],
      type: 'website',
    },
  };
}

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
