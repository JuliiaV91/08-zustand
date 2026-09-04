import { Metadata } from 'next';
import css from './page.module.css';

export const metadata: Metadata = {
  title: 'Page Not Found | NoteHub',
  description: 'The requested page does not exist in NoteHub.',
  openGraph: {
    title: 'Page Not Found | NoteHub',
    description: 'The requested page does not exist in NoteHub.',
    url: 'https://08-zustand-oxebjy3up-juliias-projects-717dc739.vercel.app',
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Page Not Found | NoteHub',
      },
    ],
    type: 'website',
  },
};

export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}
