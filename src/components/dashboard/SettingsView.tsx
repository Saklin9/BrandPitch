import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Settings,
  Link,
  Copy,
  Check,
  Shield,
  CreditCard,
  RefreshCw,
  Bell,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { user, profile, resetToDemo, viewPublicKit, addToast } = useApp();
  const [copied, setCopied] = useState(false);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(false);

  const publicUrl = window.location.origin + '/u/' + profile.username;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl).then(() => {
      setCopied(true);
      addToast({
        type: 'success',
        title: 'URL copied',
        message: publicUrl,
      });
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-neutral-900">Account & Media Kit Settings</h1>
        <p className="text-xs text-neutral-500 mt-1">
          Configure your public brand URL, subscription tier, and deal alert preferences.
        </p>
      </div>

      {/* Public URL Box */}
      <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 shadow-xs space-y-3">
        <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
          Your Public Media Kit Link
        </h2>
        <p className="text-xs text-neutral-600">
          This is the single link you send to brand managers, sponsor agencies, and include in your email signature.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-2">
          <div className="flex-1 p-3 bg-neutral-50 border border-neutral-200 rounded-xl font-mono text-xs text-neutral-800 select-all overflow-x-auto">
            {publicUrl}
          </div>
          <button
            onClick={handleCopyLink}
            className="px-4 py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors shrink-0"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied' : 'Copy Public URL'}</span>
          </button>
          <button
            onClick={() => viewPublicKit()}
            className="px-4 py-3 border border-neutral-300 hover:bg-neutral-50 text-neutral-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shrink-0"
          >
            <span>Open</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Pricing & Plan (Section 25) */}
      <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
              Subscription Plan
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              BrandPitch Pro Member · Unlimited deals and white-label kit
            </p>
          </div>
          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold uppercase">
            Active Pro Tier
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50 space-y-2 text-xs">
            <span className="font-bold text-neutral-900 block">Pro Monthly Plan</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold font-mono text-neutral-900">$9</span>
              <span className="text-neutral-500">/ month</span>
            </div>
            <p className="text-neutral-600 leading-relaxed text-[11px]">
              Includes unlimited brand inquiries, sponsorship CRM pipeline, custom rates, analytics, and revenue tracking.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-neutral-900 bg-neutral-900 text-white space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="font-bold block">Pro Annual (Recommended)</span>
              <span className="text-[10px] bg-emerald-400 text-neutral-900 font-bold px-2 py-0.5 rounded">
                Save 30%
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold font-mono text-white">$75</span>
              <span className="text-neutral-400">/ year</span>
            </div>
            <p className="text-neutral-300 leading-relaxed text-[11px]">
              Priority brand matching, verified creator badge, and automated invoice payment reminders.
            </p>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 shadow-xs space-y-4 text-xs">
        <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
          Deal & Inquiry Alerts
        </h2>

        <div className="space-y-3">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={emailNotifs}
              onChange={(e) => setEmailNotifs(e.target.checked)}
              className="mt-0.5 rounded text-neutral-900"
            />
            <div>
              <span className="font-semibold text-neutral-900 block">Instant Email Brief Delivery</span>
              <span className="text-neutral-500 text-[11px]">
                Receive instant email notification when a brand submits a brief to your public portal.
              </span>
            </div>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={smsNotifs}
              onChange={(e) => setSmsNotifs(e.target.checked)}
              className="mt-0.5 rounded text-neutral-900"
            />
            <div>
              <span className="font-semibold text-neutral-900 block">Deliverables Deadline Reminders</span>
              <span className="text-neutral-500 text-[11px]">
                Alert me 7 days and 48 hours before scheduled campaign post dates.
              </span>
            </div>
          </label>
        </div>
      </div>

      {/* Demo Reset */}
      <div className="bg-neutral-50 rounded-2xl border border-neutral-200/90 p-6 space-y-3 text-xs">
        <h3 className="font-bold text-neutral-900">Demo Environment Controls</h3>
        <p className="text-neutral-600">
          Reset all mock inquiries, CRM deals, and media kit customizations back to the default state.
        </p>
        <button
          onClick={resetToDemo}
          className="px-4 py-2 border border-neutral-300 hover:bg-neutral-200 text-neutral-800 rounded-lg font-semibold flex items-center gap-1.5 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Demo Data</span>
        </button>
      </div>
    </div>
  );
};
