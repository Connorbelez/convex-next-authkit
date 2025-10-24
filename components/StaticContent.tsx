'use cache';

export default function StaticContent() {
  return (
    <div className="flex flex-col gap-8 max-w-lg mx-auto">
      <p>
        Click the button below and open this page in another window - this data is persisted in the Convex cloud
        database!
      </p>
      <p>
        Edit{' '}
        <code className="text-sm font-bold font-mono bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded-md">
          convex/myFunctions.ts
        </code>{' '}
        to change your backend
      </p>
      <p>
        Edit{' '}
        <code className="text-sm font-bold font-mono bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded-md">
          app/page.tsx
        </code>{' '}
        to change your frontend
      </p>
      <p>
        See the{' '}
        <a href="/server" className="underline hover:no-underline">
          /server route
        </a>{' '}
        for an example of loading data in a server component
      </p>
    </div>
  );
}