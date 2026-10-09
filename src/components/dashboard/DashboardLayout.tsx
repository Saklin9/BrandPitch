import React, { useState } from 'react';
import { useApp, DashboardTab } from '../../context/AppContext';
import { OverviewView } from './OverviewView';
import { MediaKitEditor } from './MediaKitEditor';
import { InquiriesView } from './InquiriesView';
import { DealsPipelineView } from './DealsPipelineView';
import { RateCardEditor } from './RateCardEditor';
import { RateCalculatorView } from './RateCalculatorView';
import { RevenueView } from './RevenueView';
import { AnalyticsView } from './AnalyticsView';
import { SettingsView } from './SettingsView';
import {
  LayoutDashboard,
  FileSpreadsheet,
  Inbox,
  Kanban,
  CreditCard,
  Calculator,
  TrendingUp,
  DollarSign,
  Settings,
  Bell,
  ExternalLink,
  Copy,
  Check,
  Menu,
  X,
  Sparkles,
  ChevronRight,
  LogOut,
  User,
} from 'lucide-react';

export const DashboardLayout: React.FC = () => {
  const {
    activeDashboardTab,
    setActiveDashboardTab,
    profile,
    viewPublicKit,
    goToLanding,
    notifications,
    unreadNotificationCount,
    markNotificationRead,
    markAllNotificationsRead,
    inquiries,
    deals,
    addToast,
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const newInquiriesCount = inquiries.filter((i) => i.status === 'new').length;

  const handleCopyLink = () => {
    const url = window.location.origin + '/u/' + profile.username;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedLink(true);
      addToast({
        type: 'success',
        title: 'Media kit link copied',
        message: url,
      });
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  const navItems: {
    key: DashboardTab;
    label: string;
    icon: React.ReactNode;
    badge?: number | string;
  }[] = [
    { key: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { key: 'mediakit_builder', label: 'My Media Kit', icon: <FileSpreadsheet className="w-4 h-4" /> },
    {
      key: 'inquiries',
      label: 'Brand Inquiries',
      icon: <Inbox className="w-4 h-4" />,
      badge: newInquiriesCount > 0 ? newInquiriesCount : undefined,
    },
    { key: 'deals', label: 'Deals Pipeline', icon: <Kanban className="w-4 h-4" />, badge: deals.length },
    { key: 'ratecard', label: 'Rate Card', icon: <CreditCard className="w-4 h-4" /> },
    { key: 'calculator', label: 'Rate Calculator', icon: <Calculator className="w-4 h-4" /> },
    { key: 'revenue', label: 'Revenue Tracking', icon: <DollarSign className="w-4 h-4" /> },
    { key: 'analytics', label: 'Analytics', icon: <TrendingUp className="w-4 h-4" /> },
    { key: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#F9F9FB] flex">
      {/* Desktop Sidebar (240px-280px conforming to SaaS guidelines) */}
      <aside className="hidden lg:flex w-64 flex-col justify-between border-r border-neutral-200/90 bg-white p-5 sticky top-0 h-screen">
        <div className="space-y-6">
          {/* Brand Wordmark (Single text element according to Top Bar Contract) */}
          <div className="flex items-center justify-between">
            <button
              onClick={goToLanding}
              className="text-lg font-extrabold tracking-tight text-neutral-900 hover:opacity-80 transition-opacity"
            >
              BrandPitch
            </button>
            <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 bg-neutral-100 text-neutral-600 rounded">
              PRO
            </span>
          </div>

          {/* Quick link to public media kit */}
          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-neutral-500 font-medium">Your Public Link</span>
              <button
                onClick={handleCopyLink}
                className="text-neutral-700 hover:text-neutral-900 flex items-center gap-1 font-semibold"
                title="Copy public link"
              >
                {copiedLink ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedLink ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <button
              onClick={() => viewPublicKit()}
              className="w-full text-left font-mono text-xs text-neutral-900 font-semibold truncate hover:text-blue-600 transition-colors flex items-center justify-between"
            >
              <span>/u/{profile.username}</span>
              <ExternalLink className="w-3 h-3 text-neutral-400 shrink-0" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeDashboardTab === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setActiveDashboardTab(item.key)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-neutral-900 text-white shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full ${
                        isActive
                          ? 'bg-white text-neutral-900'
                          : 'bg-neutral-200 text-neutral-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Account Footer */}
        <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src={profile.profileImage}
              alt={profile.displayName}
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full object-cover border border-neutral-200"
            />
            <div className="text-left">
              <span className="text-xs font-bold text-neutral-900 block truncate max-w-[110px]">
                {profile.displayName}
              </span>
              <span className="text-[10px] text-neutral-400 font-mono">@{profile.username}</span>
            </div>
          </div>
          <button
            onClick={goToLanding}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 transition-colors rounded"
            title="Return to Landing"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-neutral-200/90 h-16 px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-100"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Breadcrumb representation */}
            <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-500 font-medium">
              <button onClick={() => setActiveDashboardTab('overview')} className="hover:text-neutral-900">
                Dashboard
              </button>
              <span>/</span>
              <span className="text-neutral-900 font-semibold capitalize">
                {activeDashboardTab.replace('_', ' ')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View Public Kit button */}
            <button
              onClick={() => viewPublicKit()}
              className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>Public Kit</span>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
            </button>

            {/* Notification Bell with Badge */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors relative"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotificationCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-600"></span>
                )}
              </button>

              {/* Notification Popover */}
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-neutral-200 p-4 space-y-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                    <span className="text-xs font-bold text-neutral-900">Notifications</span>
                    {unreadNotificationCount > 0 && (
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-[11px] text-neutral-500 hover:text-neutral-900 underline"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-neutral-400 py-3 text-center">No notifications</p>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => {
                            markNotificationRead(notif.id);
                            if (notif.linkTab) setActiveDashboardTab(notif.linkTab as DashboardTab);
                            setIsNotificationOpen(false);
                          }}
                          className={`p-2.5 rounded-xl border text-xs space-y-1 cursor-pointer transition-colors ${
                            !notif.read
                              ? 'bg-neutral-50 border-neutral-300'
                              : 'bg-white border-neutral-100 text-neutral-500'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <span className="font-bold text-neutral-900 text-[11px]">{notif.title}</span>
                            <span className="text-[10px] text-neutral-400 font-mono">
                              {new Date(notif.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-600 leading-snug">{notif.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-neutral-200 p-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  setActiveDashboardTab(item.key);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold ${
                  activeDashboardTab === item.key
                    ? 'bg-neutral-900 text-white'
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-neutral-200 text-neutral-800">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
            <div className="pt-2 border-t border-neutral-100 flex justify-between">
              <button
                onClick={() => {
                  viewPublicKit();
                  setIsMobileMenuOpen(false);
                }}
                className="text-xs font-semibold text-blue-600"
              >
                View Public Media Kit &rarr;
              </button>
              <button onClick={goToLanding} className="text-xs text-neutral-500">
                Log Out
              </button>
            </div>
          </div>
        )}

        {/* Main Content View Container */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {activeDashboardTab === 'overview' && <OverviewView />}
          {activeDashboardTab === 'mediakit_builder' && <MediaKitEditor />}
          {activeDashboardTab === 'inquiries' && <InquiriesView />}
          {activeDashboardTab === 'deals' && <DealsPipelineView />}
          {activeDashboardTab === 'ratecard' && <RateCardEditor />}
          {activeDashboardTab === 'calculator' && <RateCalculatorView />}
          {activeDashboardTab === 'revenue' && <RevenueView />}
          {activeDashboardTab === 'analytics' && <AnalyticsView />}
          {activeDashboardTab === 'settings' && <SettingsView />}
        </main>
      </div>
    </div>
  );
};
