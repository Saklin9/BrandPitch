import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CreatorProfile,
  Deal,
  BrandInquiry,
  NotificationItem,
  UserAccount,
  DealStage,
  PaymentStatus,
  SponsorshipPackage,
  BrandCollaboration,
  SocialProfile,
} from '../types';
import {
  INITIAL_USER,
  INITIAL_CREATOR_PROFILE,
  INITIAL_INQUIRIES,
  INITIAL_DEALS,
  INITIAL_NOTIFICATIONS,
} from '../data/initialData';

export type AppView = 'landing' | 'dashboard' | 'public_mediakit';
export type DashboardTab = 
  | 'overview' 
  | 'mediakit_builder' 
  | 'inquiries' 
  | 'deals' 
  | 'ratecard' 
  | 'calculator' 
  | 'analytics' 
  | 'revenue' 
  | 'settings';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message?: string;
}

interface AppContextType {
  // Navigation & View State
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  activeDashboardTab: DashboardTab;
  setActiveDashboardTab: (tab: DashboardTab) => void;
  publicUsername: string;
  setPublicUsername: (username: string) => void;
  viewPublicKit: (username?: string) => void;
  returnToDashboard: () => void;
  goToLanding: () => void;

  // User & Profile
  user: UserAccount;
  profile: CreatorProfile;
  updateProfile: (updated: Partial<CreatorProfile>) => void;
  updateSocial: (socialId: string, updated: Partial<SocialProfile>) => void;
  addSocial: (social: Omit<SocialProfile, 'id'>) => void;
  removeSocial: (socialId: string) => void;

  // Collaborations
  addCollaboration: (collab: Omit<BrandCollaboration, 'id'>) => void;
  updateCollaboration: (collabId: string, updated: Partial<BrandCollaboration>) => void;
  removeCollaboration: (collabId: string) => void;

  // Sponsorship Packages
  addPackage: (pkg: Omit<SponsorshipPackage, 'id'>) => void;
  updatePackage: (pkgId: string, updated: Partial<SponsorshipPackage>) => void;
  removePackage: (pkgId: string) => void;

  // Inquiries
  inquiries: BrandInquiry[];
  submitInquiry: (inquiryData: Omit<BrandInquiry, 'id' | 'createdAt' | 'status'>) => string;
  updateInquiryStatus: (inquiryId: string, status: BrandInquiry['status']) => void;
  convertInquiryToDeal: (inquiryId: string, customValue?: number) => Deal;

  // Deals CRM
  deals: Deal[];
  selectedDeal: Deal | null;
  setSelectedDeal: (deal: Deal | null) => void;
  addDeal: (dealData: Omit<Deal, 'id' | 'createdAt' | 'lastActivity'>) => Deal;
  updateDeal: (dealId: string, updated: Partial<Deal>) => void;
  moveDealStage: (dealId: string, nextStage: DealStage) => void;
  updateDealPayment: (dealId: string, paymentStatus: PaymentStatus) => void;
  deleteDeal: (dealId: string) => void;

  // Notifications
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Toast
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;

  // Reset to Demo
  resetToDemo: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: 'brandpitch_user_v1',
  PROFILE: 'brandpitch_profile_v1',
  INQUIRIES: 'brandpitch_inquiries_v1',
  DEALS: 'brandpitch_deals_v1',
  NOTIFICATIONS: 'brandpitch_notifications_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [activeDashboardTab, setActiveDashboardTab] = useState<DashboardTab>('overview');
  const [publicUsername, setPublicUsername] = useState<string>('elenacodes');
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  // Core Data
  const [user, setUser] = useState<UserAccount>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  });

  const [profile, setProfile] = useState<CreatorProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return saved ? JSON.parse(saved) : INITIAL_CREATOR_PROFILE;
    } catch {
      return INITIAL_CREATOR_PROFILE;
    }
  });

  const [inquiries, setInquiries] = useState<BrandInquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
    } catch {
      return INITIAL_INQUIRIES;
    }
  });

  const [deals, setDeals] = useState<Deal[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DEALS);
      return saved ? JSON.parse(saved) : INITIAL_DEALS;
    } catch {
      return INITIAL_DEALS;
    }
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [inquiries]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.DEALS, JSON.stringify(deals));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [deals]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [notifications]);

  // Toast helper
  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = 'toast_' + Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Nav actions
  const viewPublicKit = (username?: string) => {
    if (username) setPublicUsername(username);
    setCurrentView('public_mediakit');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const returnToDashboard = () => {
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToLanding = () => {
    setCurrentView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Profile actions
  const updateProfile = (updated: Partial<CreatorProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
    addToast({
      type: 'success',
      title: 'Media kit updated',
      message: 'Changes are live immediately on your public link.',
    });
  };

  const updateSocial = (socialId: string, updated: Partial<SocialProfile>) => {
    setProfile((prev) => {
      const nextSocials = prev.socials.map((s) =>
        s.id === socialId ? { ...s, ...updated } : s
      );
      // Recalculate totals
      const totalFollowers = nextSocials.reduce((sum, s) => sum + (s.followers || 0), 0);
      const avgEng = nextSocials.length
        ? Number(
            (nextSocials.reduce((sum, s) => sum + (s.engagementRate || 0), 0) / nextSocials.length).toFixed(1)
          )
        : prev.avgEngagement;
      return {
        ...prev,
        socials: nextSocials,
        totalReach: totalFollowers,
        avgEngagement: avgEng,
      };
    });
    addToast({ type: 'success', title: 'Social channel updated' });
  };

  const addSocial = (social: Omit<SocialProfile, 'id'>) => {
    const newSocial: SocialProfile = {
      ...social,
      id: 'soc_' + Date.now(),
    };
    setProfile((prev) => {
      const nextSocials = [...prev.socials, newSocial];
      const totalFollowers = nextSocials.reduce((sum, s) => sum + (s.followers || 0), 0);
      return {
        ...prev,
        socials: nextSocials,
        totalReach: totalFollowers,
      };
    });
    addToast({ type: 'success', title: 'New platform added' });
  };

  const removeSocial = (socialId: string) => {
    setProfile((prev) => ({
      ...prev,
      socials: prev.socials.filter((s) => s.id !== socialId),
    }));
    addToast({ type: 'info', title: 'Platform removed' });
  };

  // Collaborations
  const addCollaboration = (collab: Omit<BrandCollaboration, 'id'>) => {
    const newCollab: BrandCollaboration = {
      ...collab,
      id: 'collab_' + Date.now(),
    };
    setProfile((prev) => ({
      ...prev,
      collaborations: [newCollab, ...prev.collaborations],
    }));
    addToast({ type: 'success', title: 'Featured brand collaboration added' });
  };

  const updateCollaboration = (collabId: string, updated: Partial<BrandCollaboration>) => {
    setProfile((prev) => ({
      ...prev,
      collaborations: prev.collaborations.map((c) =>
        c.id === collabId ? { ...c, ...updated } : c
      ),
    }));
    addToast({ type: 'success', title: 'Brand collaboration updated' });
  };

  const removeCollaboration = (collabId: string) => {
    setProfile((prev) => ({
      ...prev,
      collaborations: prev.collaborations.filter((c) => c.id !== collabId),
    }));
    addToast({ type: 'info', title: 'Collaboration removed' });
  };

  // Packages
  const addPackage = (pkg: Omit<SponsorshipPackage, 'id'>) => {
    const newPkg: SponsorshipPackage = {
      ...pkg,
      id: 'pkg_' + Date.now(),
    };
    setProfile((prev) => ({
      ...prev,
      packages: [...prev.packages, newPkg],
    }));
    addToast({ type: 'success', title: 'Sponsorship package added' });
  };

  const updatePackage = (pkgId: string, updated: Partial<SponsorshipPackage>) => {
    setProfile((prev) => ({
      ...prev,
      packages: prev.packages.map((p) =>
        p.id === pkgId ? { ...p, ...updated } : p
      ),
    }));
    addToast({ type: 'success', title: 'Package updated' });
  };

  const removePackage = (pkgId: string) => {
    setProfile((prev) => ({
      ...prev,
      packages: prev.packages.filter((p) => p.id !== pkgId),
    }));
    addToast({ type: 'info', title: 'Package removed' });
  };

  // Inquiries
  const submitInquiry = (
    inquiryData: Omit<BrandInquiry, 'id' | 'createdAt' | 'status'>
  ): string => {
    const inqId = 'inq_' + Date.now();
    const newInquiry: BrandInquiry = {
      ...inquiryData,
      id: inqId,
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    setInquiries((prev) => [newInquiry, ...prev]);

    // Create In-App Notification for Creator
    const newNotif: NotificationItem = {
      id: 'notif_' + Date.now(),
      title: `New Inquiry from ${newInquiry.brandName}`,
      message: `${newInquiry.contactName} requested ${newInquiry.deliverables || 'campaign brief'} (${newInquiry.budgetRange})`,
      type: 'inquiry',
      read: false,
      createdAt: new Date().toISOString(),
      linkTab: 'inquiries',
    };
    setNotifications((prev) => [newNotif, ...prev]);

    addToast({
      type: 'success',
      title: 'Inquiry submitted successfully!',
      message: `The brief has been routed directly to ${profile.displayName}.`,
    });

    return inqId;
  };

  const updateInquiryStatus = (inquiryId: string, status: BrandInquiry['status']) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === inquiryId ? { ...inq, status } : inq))
    );
  };

  const convertInquiryToDeal = (inquiryId: string, customValue?: number): Deal => {
    const inq = inquiries.find((i) => i.id === inquiryId);
    if (!inq) {
      throw new Error('Inquiry not found');
    }

    // Determine estimated value
    let val = customValue || inq.estimatedBudget || 1000;
    if (!val && inq.budgetRange) {
      if (inq.budgetRange === 'Under $250') val = 250;
      else if (inq.budgetRange === '$250–$500') val = 450;
      else if (inq.budgetRange === '$500–$1,000') val = 850;
      else if (inq.budgetRange === '$1,000–$2,500') val = 1750;
      else if (inq.budgetRange === '$2,500–$5,000') val = 3200;
      else if (inq.budgetRange === '$5,000+') val = 6000;
    }

    const newDeal: Deal = {
      id: 'deal_' + Date.now(),
      creatorId: profile.id,
      inquiryId: inq.id,
      brandName: inq.brandName,
      contactName: inq.contactName,
      email: inq.email,
      value: val,
      stage: 'qualified',
      deliverables: inq.deliverables ? [inq.deliverables] : ['Campaign deliverables'],
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      notes: `Inquiry details: ${inq.description}${inq.timeline ? ` | Timeline: ${inq.timeline}` : ''}`,
      paymentStatus: 'unpaid',
      createdAt: new Date().toISOString(),
      lastActivity: `Converted from inbound inquiry on ${new Date().toLocaleDateString()}`,
    };

    setDeals((prev) => [newDeal, ...prev]);

    // Update inquiry status to converted
    updateInquiryStatus(inquiryId, 'converted');

    addToast({
      type: 'success',
      title: `Deal created with ${inq.brandName}`,
      message: 'Moved to your CRM pipeline in Qualified stage.',
    });

    return newDeal;
  };

  // Deals CRM
  const addDeal = (dealData: Omit<Deal, 'id' | 'createdAt' | 'lastActivity'>): Deal => {
    const newDeal: Deal = {
      ...dealData,
      id: 'deal_' + Date.now(),
      createdAt: new Date().toISOString(),
      lastActivity: `Deal logged on ${new Date().toLocaleDateString()}`,
    };

    setDeals((prev) => [newDeal, ...prev]);
    addToast({
      type: 'success',
      title: `New deal added: ${dealData.brandName}`,
      message: `$${dealData.value.toLocaleString()} in ${dealData.stage.replace('_', ' ')}`,
    });
    return newDeal;
  };

  const updateDeal = (dealId: string, updated: Partial<Deal>) => {
    setDeals((prev) =>
      prev.map((deal) => {
        if (deal.id === dealId) {
          const mod = {
            ...deal,
            ...updated,
            lastActivity: updated.lastActivity || `Updated on ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
          };
          if (selectedDeal?.id === dealId) {
            setSelectedDeal(mod);
          }
          return mod;
        }
        return deal;
      })
    );
    addToast({ type: 'success', title: 'Deal updated' });
  };

  const moveDealStage = (dealId: string, nextStage: DealStage) => {
    setDeals((prev) =>
      prev.map((deal) => {
        if (deal.id === dealId) {
          const isPaid = nextStage === 'paid';
          const updatedDeal: Deal = {
            ...deal,
            stage: nextStage,
            paymentStatus: isPaid ? 'paid' : deal.paymentStatus,
            paidAt: isPaid ? (deal.paidAt || new Date().toISOString()) : deal.paidAt,
            lastActivity: `Moved to ${nextStage.replace('_', ' ').toUpperCase()} on ${new Date().toLocaleDateString()}`,
          };
          if (selectedDeal?.id === dealId) {
            setSelectedDeal(updatedDeal);
          }
          return updatedDeal;
        }
        return deal;
      })
    );

    const stageNames: Record<DealStage, string> = {
      new_inquiry: 'New Inquiry',
      qualified: 'Qualified',
      pitch_sent: 'Pitch Sent',
      negotiating: 'Negotiating',
      content_due: 'Content Due',
      completed: 'Completed',
      paid: 'Paid (Won)',
    };

    addToast({
      type: 'info',
      title: 'Deal stage updated',
      message: `Stage moved to ${stageNames[nextStage]}`,
    });
  };

  const updateDealPayment = (dealId: string, paymentStatus: PaymentStatus) => {
    setDeals((prev) =>
      prev.map((deal) => {
        if (deal.id === dealId) {
          const isPaid = paymentStatus === 'paid';
          const updatedDeal: Deal = {
            ...deal,
            paymentStatus,
            stage: isPaid ? 'paid' : deal.stage,
            paidAt: isPaid ? (deal.paidAt || new Date().toISOString()) : undefined,
            lastActivity: `Payment status marked as ${paymentStatus.toUpperCase()}`,
          };
          if (selectedDeal?.id === dealId) {
            setSelectedDeal(updatedDeal);
          }
          return updatedDeal;
        }
        return deal;
      })
    );

    addToast({
      type: 'success',
      title: 'Payment status updated',
      message: `Marked as ${paymentStatus.toUpperCase()}`,
    });
  };

  const deleteDeal = (dealId: string) => {
    setDeals((prev) => prev.filter((d) => d.id !== dealId));
    if (selectedDeal?.id === dealId) setSelectedDeal(null);
    addToast({ type: 'info', title: 'Deal removed from CRM' });
  };

  // Notifications
  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast({ type: 'info', title: 'All notifications marked as read' });
  };

  // Reset to initial demo state
  const resetToDemo = () => {
    setUser(INITIAL_USER);
    setProfile(INITIAL_CREATOR_PROFILE);
    setInquiries(INITIAL_INQUIRIES);
    setDeals(INITIAL_DEALS);
    setNotifications(INITIAL_NOTIFICATIONS);
    localStorage.clear();
    addToast({ type: 'info', title: 'Reset to demo dataset successfully' });
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        activeDashboardTab,
        setActiveDashboardTab,
        publicUsername,
        setPublicUsername,
        viewPublicKit,
        returnToDashboard,
        goToLanding,

        user,
        profile,
        updateProfile,
        updateSocial,
        addSocial,
        removeSocial,

        addCollaboration,
        updateCollaboration,
        removeCollaboration,

        addPackage,
        updatePackage,
        removePackage,

        inquiries,
        submitInquiry,
        updateInquiryStatus,
        convertInquiryToDeal,

        deals,
        selectedDeal,
        setSelectedDeal,
        addDeal,
        updateDeal,
        moveDealStage,
        updateDealPayment,
        deleteDeal,

        notifications,
        unreadNotificationCount,
        markNotificationRead,
        markAllNotificationsRead,

        toasts,
        addToast,
        removeToast,

        resetToDemo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
