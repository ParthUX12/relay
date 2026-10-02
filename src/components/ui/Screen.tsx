import { ReactNode } from 'react';

// Standard screen wrapper: page title + standard side padding.
export default function Screen({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <main className="px-screen-x pt-8 pb-10">
      {title && <h1 className="text-h1 mb-6">{title}</h1>}
      {children}
    </main>
  );
}
