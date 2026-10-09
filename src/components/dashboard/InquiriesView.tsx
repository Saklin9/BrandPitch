import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BrandInquiry } from '../../types';
import {
  Inbox,
  Mail,
  Building2,
  Calendar,
  DollarSign,
  ArrowRight,
  CheckCircle,
  ExternalLink,
  Search,
  Filter,
  Check,
  X,
  FileText,
  Clock,
  Sparkles,
} from 'lucide-react';

export const InquiriesView: React.FC = () => {
  const { inquiries, updateInquiryStatus, convertInquiryToDeal, setActiveDashboardTab } = useApp();
  const [filter, setFilter] = useState<'all' | 'new' | 'reviewed' | 'converted'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<BrandInquiry | null>(null);

  const filteredInquiries = inquiries.filter((inq) => {
    if (filter !== 'all' && inq.status !== filter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        inq.brandName.toLowerCase().includes(q) ||
        inq.contactName.toLowerCase().includes(q) ||
        inq.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleConvert = (inquiryId: string) => {
    convertInquiryToDeal(inquiryId);
    if (selectedInquiry?.id === inquiryId) {
      setSelectedInquiry((prev) => (prev ? { ...prev, status: 'converted' } : null));
    }
    setActiveDashboardTab('deals');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-neutral-900">Brand Inquiries Portal</h1>
          <p className="text-xs text-neutral-500 mt-1">
            Inbound sponsorship briefs submitted through your public BrandPitch media kit link.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-lg text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
                filter === 'all' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              All ({inquiries.length})
            </button>
            <button
              onClick={() => setFilter('new')}
              className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
                filter === 'new' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              New ({inquiries.filter((i) => i.status === 'new').length})
            </button>
            <button
              onClick={() => setFilter('reviewed')}
              className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
                filter === 'reviewed' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Reviewed
            </button>
            <button
              onClick={() => setFilter('converted')}
              className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
                filter === 'converted' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Converted
            </button>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Search inquiries by brand name, contact person, or keyword..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-neutral-200/90 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
        />
      </div>

      {/* Main Content Layout: Inquiry List + Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Inquiries List */}
        <div className="lg:col-span-7 space-y-3">
          {filteredInquiries.length === 0 ? (
            <div className="bg-white rounded-2xl border border-neutral-200/90 p-12 text-center space-y-3">
              <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400">
                <Inbox className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-neutral-900">No inquiries found</h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                {searchQuery
                  ? 'No results match your search query.'
                  : 'Share your public media kit link with brands to start receiving structured sponsorship briefs.'}
              </p>
            </div>
          ) : (
            filteredInquiries.map((inq) => {
              const isSelected = selectedInquiry?.id === inq.id;

              return (
                <div
                  key={inq.id}
                  onClick={() => setSelectedInquiry(inq)}
                  className={`bg-white rounded-xl border p-4.5 transition-all cursor-pointer space-y-3 ${
                    isSelected
                      ? 'border-neutral-900 ring-1 ring-neutral-900 shadow-xs'
                      : 'border-neutral-200/90 hover:border-neutral-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-neutral-900">{inq.brandName}</span>
                        {inq.status === 'new' && (
                          <span className="text-[10px] font-semibold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200/60 uppercase">
                            New Brief
                          </span>
                        )}
                        {inq.status === 'converted' && (
                          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded uppercase">
                            In Pipeline
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        {inq.contactName} · {inq.email}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-neutral-900 block">
                        {inq.budgetRange}
                      </span>
                      <span className="text-[10px] text-neutral-400 font-mono">
                        {new Date(inq.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="bg-neutral-50 p-2.5 rounded-lg border border-neutral-100 text-xs text-neutral-600 line-clamp-2">
                    {inq.description}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1">
                    <span className="font-medium text-neutral-700">
                      Deliverables: {inq.deliverables}
                    </span>
                    <span className="font-mono">{inq.timeline}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Selected Inquiry Detail Drawer / Card */}
        <div className="lg:col-span-5">
          {selectedInquiry ? (
            <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 shadow-xs space-y-5 sticky top-24">
              <div className="flex items-start justify-between border-b border-neutral-100 pb-4">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">
                    Inquiry Details
                  </span>
                  <h2 className="text-lg font-bold text-neutral-900 mt-0.5">{selectedInquiry.brandName}</h2>
                  <p className="text-xs text-neutral-500">
                    Received {new Date(selectedInquiry.createdAt).toLocaleString()}
                  </p>
                </div>
                {selectedInquiry.status === 'new' && (
                  <button
                    onClick={() => updateInquiryStatus(selectedInquiry.id, 'reviewed')}
                    className="px-2.5 py-1 text-[11px] font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-md transition-colors"
                  >
                    Mark Reviewed
                  </button>
                )}
              </div>

              {/* Contact Information */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Contact Person</span>
                  <span className="font-semibold text-neutral-900">{selectedInquiry.contactName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Email</span>
                  <a
                    href={`mailto:${selectedInquiry.email}`}
                    className="font-mono text-neutral-900 hover:underline"
                  >
                    {selectedInquiry.email}
                  </a>
                </div>
                {selectedInquiry.website && (
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Brand Website</span>
                    <a
                      href={selectedInquiry.website}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <span>{selectedInquiry.website.replace('https://', '')}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-neutral-500">Campaign Type</span>
                  <span className="font-semibold text-neutral-900">{selectedInquiry.campaignType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Indicated Budget</span>
                  <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                    {selectedInquiry.budgetRange}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Target Timeline</span>
                  <span className="font-semibold text-neutral-900">{selectedInquiry.timeline}</span>
                </div>
              </div>

              {/* Brief Content */}
              <div className="space-y-1.5 pt-2 border-t border-neutral-100">
                <span className="text-xs font-semibold text-neutral-800 uppercase tracking-wider block">
                  Campaign Brief & Talking Points
                </span>
                <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/80 text-xs text-neutral-700 leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.description}
                </div>
              </div>

              {selectedInquiry.additionalNotes && (
                <div className="space-y-1 text-xs">
                  <span className="text-neutral-500 font-medium">Additional Notes:</span>
                  <p className="text-neutral-700 italic">{selectedInquiry.additionalNotes}</p>
                </div>
              )}

              {/* Actions */}
              <div className="pt-4 border-t border-neutral-100 space-y-2">
                {selectedInquiry.status !== 'converted' ? (
                  <button
                    onClick={() => handleConvert(selectedInquiry.id)}
                    className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    <span>Convert to Deal Pipeline</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveDashboardTab('deals')}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>In Pipeline · View in Deals CRM</span>
                  </button>
                )}

                <a
                  href={`mailto:${selectedInquiry.email}?subject=RE: BrandPitch Partnership - ${selectedInquiry.brandName}`}
                  className="w-full py-2.5 border border-neutral-200 hover:bg-neutral-50 text-neutral-700 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-neutral-50 rounded-2xl border border-dashed border-neutral-200 p-8 text-center text-xs text-neutral-400">
              Select an inquiry from the list to view the full campaign brief and convert it into a deal.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
