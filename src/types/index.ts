export type PlatformType = 
  | 'instagram' 
  | 'tiktok' 
  | 'youtube' 
  | 'newsletter' 
  | 'podcast' 
  | 'linkedin' 
  | 'x';

export interface SocialProfile {
  id: string;
  platform: PlatformType;
  handle: string;
  followers: number;
  avgViews: number;
  engagementRate: number; // e.g. 5.8 for 5.8%
  url: string;
  verified?: boolean;
}

export interface AudienceDemographics {
  topLocations: { country: string; percentage: number }[];
  ageGroups: { range: string; percentage: number }[];
  genderSplit: { female: number; male: number; other: number };
}

export interface BrandCollaboration {
  id: string;
  brandName: string;
  campaignTitle: string;
  description: string;
  deliverables: string;
  image: string;
  url?: string;
  results: {
    views?: string;
    engagement?: string;
    conversions?: string;
    roas?: string;
  };
  featured: boolean;
}

export interface SponsorshipPackage {
  id: string;
  userId?: string;
  name: string;
  price: number;
  showPrice: boolean;
  deliverables: string[];
  description: string;
  popular?: boolean;
  turnaroundDays?: number;
  active: boolean;
}

export interface BrandTestimonial {
  id: string;
  brandName: string;
  contactName: string;
  contactRole: string;
  quote: string;
  campaignName: string;
}

export type BudgetRange = 
  | 'Under $250'
  | '$250–$500'
  | '$500–$1,000'
  | '$1,000–$2,500'
  | '$2,500–$5,000'
  | '$5,000+';

export type InquiryStatus = 'new' | 'reviewed' | 'converted' | 'declined' | 'archived';

export interface BrandInquiry {
  id: string;
  creatorId: string;
  brandName: string;
  contactName: string;
  email: string;
  website?: string;
  campaignType: string;
  deliverables: string;
  budgetRange: BudgetRange;
  estimatedBudget?: number;
  timeline: string;
  description: string;
  additionalNotes?: string;
  packageId?: string;
  packageName?: string;
  status: InquiryStatus;
  createdAt: string;
}

export type DealStage = 
  | 'new_inquiry'
  | 'qualified'
  | 'pitch_sent'
  | 'negotiating'
  | 'content_due'
  | 'completed'
  | 'paid';

export type PaymentStatus = 'unpaid' | 'invoiced' | 'partial' | 'paid';

export interface DealActivity {
  id: string;
  dealId: string;
  activityType: 'inquiry_received' | 'pitch_sent' | 'stage_changed' | 'negotiation' | 'content_submitted' | 'payment_received' | 'note_added';
  description: string;
  createdAt: string;
}

export interface Deal {
  id: string;
  creatorId: string;
  inquiryId?: string;
  brandName: string;
  contactName: string;
  email: string;
  value: number;
  stage: DealStage;
  deliverables: string[];
  deadline: string;
  notes: string;
  paymentStatus: PaymentStatus;
  platform?: PlatformType | 'multi-platform';
  paidAt?: string;
  createdAt: string;
  lastActivity: string;
}

export interface CreatorProfile {
  id: string;
  userId: string;
  username: string;
  displayName: string;
  tagline: string;
  bio: string;
  location: string;
  niche: string;
  profileImage: string;
  coverImage?: string;
  email: string;
  website?: string;
  verified: boolean;
  published: boolean;
  socials: SocialProfile[];
  audience: AudienceDemographics;
  collaborations: BrandCollaboration[];
  packages: SponsorshipPackage[];
  testimonials: BrandTestimonial[];
  monthlyViews: number;
  totalReach: number;
  avgEngagement: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'inquiry' | 'deal' | 'payment' | 'deadline';
  read: boolean;
  createdAt: string;
  linkTab?: string;
}

export interface UserAccount {
  id: string;
  email: string;
  name: string;
  role: 'creator' | 'brand';
  plan: 'free' | 'pro' | 'pro_annual';
}
