import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SponsorshipPackage } from '../../types';
import {
  Plus,
  Edit2,
  Trash2,
  Check,
  Eye,
  EyeOff,
  Sparkles,
  DollarSign,
  Clock,
  Layers,
  ChevronRight,
} from 'lucide-react';

export const RateCardEditor: React.FC = () => {
  const { profile, addPackage, updatePackage, removePackage, setActiveDashboardTab } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [price, setPrice] = useState('750');
  const [showPrice, setShowPrice] = useState(true);
  const [deliverablesInput, setDeliverablesInput] = useState('');
  const [description, setDescription] = useState('');
  const [turnaroundDays, setTurnaroundDays] = useState('7');
  const [popular, setPopular] = useState(false);
  const [active, setActive] = useState(true);

  const openAdd = () => {
    setEditingId(null);
    setName('');
    setPrice('800');
    setShowPrice(true);
    setDeliverablesInput('1x Instagram Reel, 30-Day Digital Usage, 1 Revision');
    setDescription('High production vertical video showcasing product integration.');
    setTurnaroundDays('7');
    setPopular(false);
    setActive(true);
    setIsModalOpen(true);
  };

  const openEdit = (pkg: SponsorshipPackage) => {
    setEditingId(pkg.id);
    setName(pkg.name);
    setPrice(pkg.price.toString());
    setShowPrice(pkg.showPrice);
    setDeliverablesInput(pkg.deliverables.join(', '));
    setDescription(pkg.description);
    setTurnaroundDays((pkg.turnaroundDays || 7).toString());
    setPopular(!!pkg.popular);
    setActive(pkg.active);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const delivs = deliverablesInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingId) {
      updatePackage(editingId, {
        name,
        price: parseFloat(price) || 0,
        showPrice,
        deliverables: delivs,
        description,
        turnaroundDays: parseInt(turnaroundDays) || 7,
        popular,
        active,
      });
    } else {
      addPackage({
        userId: profile.userId,
        name,
        price: parseFloat(price) || 0,
        showPrice,
        deliverables: delivs,
        description,
        turnaroundDays: parseInt(turnaroundDays) || 7,
        popular,
        active,
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-neutral-900">Rate Card & Sponsorship Packages</h1>
          <p className="text-xs text-neutral-500 mt-1">
            Standardize your deliverables and pricing so brands can immediately select and request packages.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveDashboardTab('calculator')}
            className="px-3 py-2 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
          >
            Calculate Fair Rates
          </button>
          <button
            onClick={openAdd}
            className="px-3.5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Package</span>
          </button>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {profile.packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`bg-white rounded-2xl border p-5 flex flex-col justify-between transition-all ${
              !pkg.active
                ? 'opacity-60 border-dashed border-neutral-300'
                : pkg.popular
                ? 'border-neutral-900 ring-1 ring-neutral-900 shadow-sm'
                : 'border-neutral-200/90 shadow-xs hover:border-neutral-300'
            }`}
          >
            <div className="space-y-3.5">
              <div className="flex items-start justify-between">
                <div>
                  {pkg.popular && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-900 block mb-1">
                      Featured / Most Popular
                    </span>
                  )}
                  <h3 className="font-bold text-neutral-900 text-base">{pkg.name}</h3>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => updatePackage(pkg.id, { active: !pkg.active })}
                    className={`p-1.5 rounded transition-colors ${
                      pkg.active ? 'text-neutral-500 hover:text-neutral-900' : 'text-neutral-400 hover:text-neutral-600'
                    }`}
                    title={pkg.active ? 'Deactivate package' : 'Activate package'}
                  >
                    {pkg.active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => openEdit(pkg)}
                    className="p-1.5 text-neutral-500 hover:text-neutral-900 rounded"
                    title="Edit package"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => removePackage(pkg.id)}
                    className="p-1.5 text-neutral-400 hover:text-rose-600 rounded"
                    title="Delete package"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="py-2 border-y border-neutral-100 flex items-baseline justify-between">
                <div className="flex items-baseline gap-1">
                  {pkg.showPrice ? (
                    <>
                      <span className="text-2xl font-extrabold font-mono text-neutral-900 tabular-nums">
                        ${pkg.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-neutral-400">USD</span>
                    </>
                  ) : (
                    <span className="text-sm font-semibold text-neutral-700">Price Hidden (Inquiry Only)</span>
                  )}
                </div>
                {pkg.turnaroundDays && (
                  <span className="text-[10px] text-neutral-400 font-mono">
                    ~{pkg.turnaroundDays}d turnaround
                  </span>
                )}
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed">{pkg.description}</p>

              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">
                  Deliverables
                </span>
                <ul className="space-y-1 text-xs text-neutral-700">
                  {pkg.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-neutral-900 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 mt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
              <span>{pkg.active ? 'Active on Public Kit' : 'Hidden from Public'}</span>
              <button
                onClick={() => openEdit(pkg)}
                className="font-semibold text-neutral-900 hover:underline"
              >
                Edit &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Editor */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-neutral-200 p-6 space-y-4">
            <h2 className="text-base font-bold text-neutral-900">
              {editingId ? 'Edit Sponsorship Package' : 'Create Sponsorship Package'}
            </h2>

            <form onSubmit={handleSave} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Package Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. YouTube Dedicated Video, Instagram Reel"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Price ($ USD)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Turnaround (Days)</label>
                  <input
                    type="number"
                    value={turnaroundDays}
                    onChange={(e) => setTurnaroundDays(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Deliverables (comma separated) *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="e.g. 1x 60s Reel, 30-Day Paid Ad Rights, 1 Revision Round, Bio Link for 48 Hours"
                  value={deliverablesInput}
                  onChange={(e) => setDeliverablesInput(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Package Description</label>
                <textarea
                  rows={2}
                  placeholder="Explain why this package is effective and what style of integration is offered..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <div className="space-y-2 pt-1 border-t border-neutral-100">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showPrice}
                    onChange={(e) => setShowPrice(e.target.checked)}
                    className="rounded text-neutral-900"
                  />
                  <span className="text-neutral-700">Display price publicly on media kit</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={popular}
                    onChange={(e) => setPopular(e.target.checked)}
                    className="rounded text-neutral-900"
                  />
                  <span className="text-neutral-700">Mark as "Featured / Most Requested"</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                    className="rounded text-neutral-900"
                  />
                  <span className="text-neutral-700">Active package (visible to brands)</span>
                </label>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3.5 py-1.5 border border-neutral-200 rounded-lg hover:bg-neutral-50 text-neutral-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg font-semibold"
                >
                  {editingId ? 'Save Changes' : 'Create Package'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
