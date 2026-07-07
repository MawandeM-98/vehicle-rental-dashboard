import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function Layout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 p-6 lg:p-8 bg-slate-50 dark:bg-slate-950">
          <Outlet />
        </main>
        <footer className="py-4 text-center text-xs text-slate-400 bg-slate-50 dark:bg-slate-950">
          © {new Date().getFullYear()} RentXpress. All rights reserved.
        </footer>
      </div>
    </div>
  );
}