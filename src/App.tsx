/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LandingPage } from './components/landing/LandingPage';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { PublicMediaKit } from './components/mediakit/PublicMediaKit';
import { ToastContainer } from './components/common/ToastContainer';

const AppContent: React.FC = () => {
  const { currentView, setCurrentView, setPublicUsername } = useApp();

  // Basic path / hash routing support so URLs like /u/elenacodes or #/u/elenacodes work
  useEffect(() => {
    const handleUrl = () => {
      const pathname = window.location.pathname;
      const hash = window.location.hash;

      if (pathname.startsWith('/u/')) {
        const username = pathname.replace('/u/', '').split('/')[0];
        if (username) {
          setPublicUsername(username);
          setCurrentView('public_mediakit');
        }
      } else if (hash.startsWith('#/u/')) {
        const username = hash.replace('#/u/', '').split('/')[0];
        if (username) {
          setPublicUsername(username);
          setCurrentView('public_mediakit');
        }
      } else if (hash === '#/dashboard') {
        setCurrentView('dashboard');
      }
    };

    handleUrl();
    window.addEventListener('popstate', handleUrl);
    window.addEventListener('hashchange', handleUrl);
    return () => {
      window.removeEventListener('popstate', handleUrl);
      window.removeEventListener('hashchange', handleUrl);
    };
  }, [setCurrentView, setPublicUsername]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-neutral-900 antialiased font-sans">
      {currentView === 'landing' && <LandingPage />}
      {currentView === 'dashboard' && <DashboardLayout />}
      {currentView === 'public_mediakit' && <PublicMediaKit />}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
