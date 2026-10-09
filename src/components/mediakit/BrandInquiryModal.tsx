import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BudgetRange, SponsorshipPackage } from '../../types';
import { X, CheckCircle, ArrowRight, Sparkles, Building2, Mail, Calendar, DollarSign, FileText, Globe } from 'lucide-react';

interface BrandInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage?: SponsorshipPackage | null;
}

export const BrandInquiryModal: React.FC<BrandInquiryModalProps> = ({
  isOpen,
  onClose,
  selectedPackage,
}) => {
  const { profile, submitInquiry, returnToDashboard, setActiveDashboardTab } = useApp();

  const [brandName, setBrandName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [campaignType, setCampaignType] = useState(
    selectedPackage ? selectedPackage.name : 'Sponsored Content'
  );
  const [deliverables, setDeliverables] = useState(
    selectedPackage ? selectedPackage.deliverables.join(', ') : ''
  );
  const [budgetRange, setBudgetRange] = useState<BudgetRange>(
    selectedPackage && selectedPackage.price > 2500
      ? '$2,500–$5,000'
      : selectedPackage && selectedPackage.price > 1000
      ? '$1,000–$2,500'
      : '$1,000–$2,500'
  );
  const [timeline, setTimeline] = useState('Next 30 Days');
  const [description, setDescription] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName.trim() || !contactName.trim() || !email.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const inqId = submitInquiry({
        creatorId: profile.id,
        brandName: brandName.trim(),
        contactName: contactName.trim(),
        email: email.trim(),
        website: website.trim() || undefined,
        campaignType,
        deliverables: deliverables || 'Custom campaign deliverables',
        budgetRange,
        timeline,
        description: description.trim() || `Inquiry regarding ${campaignType} partnership.`,
        additionalNotes: additionalNotes.trim() || undefined,
        packageId: selectedPackage?.id,
        packageName: selectedPackage?.name,
      });

      setIsSubmitting(false);
      setSubmittedId(inqId);
    }, 400);
  };

  const handleResetAndClose = () => {
    setSubmittedId(null);
    setBrandName('');
    setContactName('');
    setEmail('');
    setWebsite('');
    setDescription('');
    setAdditionalNotes('');
    onClose();
  };

  const handleViewInCreatorDashboard = () => {
    handleResetAndClose();
    returnToDashboard();
    setActiveDashboardTab('inquiries');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-8">
        {/* Header */}
        <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold tracking-wider uppercase text-neutral-500">Official Brand Portal</span>
              <span className="text-neutral-300">·</span>
              <span className="text-xs text-neutral-600 font-medium">Verified Creator</span>
            </div>
            <h2 className="text-xl font-bold text-neutral-900 mt-0.5">
              Work With {profile.displayName}
            </h2>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-2 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {submittedId ? (
          <div className="p-8 text-center">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900">Inquiry Delivered Directly</h3>
            <p className="text-neutral-600 mt-2 max-w-md mx-auto text-sm leading-relaxed">
              Your partnership brief from <strong className="text-neutral-900">{brandName}</strong> has been logged to {profile.displayName}’s BrandPitch CRM. You will receive a direct reply at <strong className="text-neutral-900">{email}</strong>.
            </p>

            <div className="mt-6 p-4 bg-neutral-50 rounded-xl border border-neutral-200/80 text-left max-w-md mx-auto text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-500">Campaign Focus</span>
                <span className="font-semibold text-neutral-900">{campaignType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Budget Range</span>
                <span className="font-semibold text-neutral-900">{budgetRange}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Target Timeline</span>
                <span className="font-semibold text-neutral-900">{timeline}</span>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleResetAndClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-neutral-300 text-neutral-700 text-sm font-medium hover:bg-neutral-50 transition-colors"
              >
                Close Window
              </button>
              <button
                onClick={handleViewInCreatorDashboard}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
              >
                <span>View inside Creator CRM</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
            {selectedPackage && (
              <div className="p-3.5 bg-neutral-900 text-white rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="text-neutral-400 block text-[10px] uppercase font-semibold">Selected Package</span>
                  <span className="font-semibold text-sm">{selectedPackage.name}</span>
                </div>
                {selectedPackage.showPrice && (
                  <span className="font-mono text-base font-bold tabular-nums text-emerald-400">
                    ${selectedPackage.price.toLocaleString()}
                  </span>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Brand or Company Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Studio, Figma, Notion"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Contact Person <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Miller (Marketing Lead)"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Work Email <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="sarah@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Brand Website
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="url"
                    placeholder="https://company.com"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Campaign Type
                </label>
                <select
                  value={campaignType}
                  onChange={(e) => setCampaignType(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:bg-white transition-all"
                >
                  <option value="YouTube Dedicated Video">YouTube Dedicated Video</option>
                  <option value="YouTube Integrated Segment">YouTube Integrated Segment</option>
                  <option value="Instagram Reel / TikTok">Instagram Reel / TikTok</option>
                  <option value="Newsletter Headline Sponsorship">Newsletter Headline Sponsorship</option>
                  <option value="Multi-Platform Bundle">Multi-Platform Bundle</option>
                  <option value="Brand Ambassadorship">Brand Ambassadorship (Long-term)</option>
                  <option value="Custom Campaign">Custom Campaign / Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Budget Range <span className="text-neutral-400 font-normal">(USD)</span>
                </label>
                <select
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value as BudgetRange)}
                  className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:bg-white transition-all font-mono"
                >
                  <option value="Under $250">Under $250</option>
                  <option value="$250–$500">$250 – $500</option>
                  <option value="$500–$1,000">$500 – $1,000</option>
                  <option value="$1,000–$2,500">$1,000 – $2,500</option>
                  <option value="$2,500–$5,000">$2,500 – $5,000</option>
                  <option value="$5,000+">$5,000+</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Target Timeline / Launch Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="e.g. Next 2 Weeks, Nov 15th, Q4 Campaign"
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Requested Deliverables
                </label>
                <input
                  type="text"
                  placeholder="e.g. 1 Reel + 2 Stories, 60s YouTube spot"
                  value={deliverables}
                  onChange={(e) => setDeliverables(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Campaign Brief & Objectives <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={3}
                required
                placeholder="Describe your product, goals, target audience angle, key talking points or call-to-action..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:bg-white transition-all resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Additional Notes or Whitelisting Requirements (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Paid ads usage rights for 30 days, product sample shipping, promo code"
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:bg-white transition-all"
              />
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-neutral-100">
              <span className="text-xs text-neutral-500">
                Direct creator delivery · No agency middleman
              </span>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-400 text-white text-sm font-semibold rounded-lg transition-all shadow-sm flex items-center gap-2"
              >
                {isSubmitting ? (
                  <span>Sending Brief...</span>
                ) : (
                  <>
                    <span>Submit Inquiry</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
