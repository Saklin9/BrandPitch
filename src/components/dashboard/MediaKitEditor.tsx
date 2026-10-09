import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PlatformType, SocialProfile, BrandCollaboration } from '../../types';
import {
  User,
  Share2,
  ExternalLink,
  Plus,
  Trash2,
  Edit2,
  Check,
  Globe,
  Upload,
  Image,
  Sparkles,
  Layers,
  ArrowRight,
} from 'lucide-react';

export const MediaKitEditor: React.FC = () => {
  const {
    profile,
    updateProfile,
    updateSocial,
    addSocial,
    removeSocial,
    addCollaboration,
    updateCollaboration,
    removeCollaboration,
    viewPublicKit,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'socials' | 'audience' | 'collabs'>('profile');

  // Profile form state
  const [displayName, setDisplayName] = useState(profile.displayName);
  const [username, setUsername] = useState(profile.username);
  const [tagline, setTagline] = useState(profile.tagline);
  const [bio, setBio] = useState(profile.bio);
  const [niche, setNiche] = useState(profile.niche);
  const [location, setLocation] = useState(profile.location);
  const [email, setEmail] = useState(profile.email);
  const [website, setWebsite] = useState(profile.website || '');
  const [profileImage, setProfileImage] = useState(profile.profileImage);

  // Collab modal
  const [isCollabModalOpen, setIsCollabModalOpen] = useState(false);
  const [collabBrand, setCollabBrand] = useState('');
  const [collabTitle, setCollabTitle] = useState('');
  const [collabDesc, setCollabDesc] = useState('');
  const [collabDeliv, setCollabDeliv] = useState('');
  const [collabImage, setCollabImage] = useState('/src/assets/images/campaign_collab_tech_1791476998406.jpg');
  const [collabViews, setCollabViews] = useState('95,000');
  const [collabEng, setCollabEng] = useState('7.2%');

  // Social modal
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [newPlatform, setNewPlatform] = useState<PlatformType>('tiktok');
  const [newHandle, setNewHandle] = useState('@creator');
  const [newFollowers, setNewFollowers] = useState('50000');
  const [newAvgViews, setNewAvgViews] = useState('25000');
  const [newEngRate, setNewEngRate] = useState('5.5');
  const [newUrl, setNewUrl] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      displayName,
      username,
      tagline,
      bio,
      niche,
      location,
      email,
      website: website || undefined,
      profileImage,
    });
  };

  const handleCreateCollab = (e: React.FormEvent) => {
    e.preventDefault();
    if (!collabBrand.trim() || !collabTitle.trim()) return;

    addCollaboration({
      brandName: collabBrand.trim(),
      campaignTitle: collabTitle.trim(),
      description: collabDesc.trim(),
      deliverables: collabDeliv.trim(),
      image: collabImage,
      results: {
        views: collabViews.trim(),
        engagement: collabEng.trim(),
      },
      featured: true,
    });

    setIsCollabModalOpen(false);
    setCollabBrand('');
    setCollabTitle('');
    setCollabDesc('');
    setCollabDeliv('');
  };

  const handleCreateSocial = (e: React.FormEvent) => {
    e.preventDefault();
    addSocial({
      platform: newPlatform,
      handle: newHandle.trim(),
      followers: parseInt(newFollowers) || 0,
      avgViews: parseInt(newAvgViews) || 0,
      engagementRate: parseFloat(newEngRate) || 0,
      url: newUrl.trim() || `https://${newPlatform}.com/${newHandle.replace('@', '')}`,
      verified: true,
    });
    setIsSocialModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-neutral-900">Media Kit Visual Builder</h1>
          <p className="text-xs text-neutral-500 mt-1">
            Customize how brands see your profile, statistics, past work, and credibility signals.
          </p>
        </div>

        <button
          onClick={() => viewPublicKit()}
          className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
        >
          <span>View Public Kit</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Navigation tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-200 text-xs pb-1">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-3.5 py-2 font-semibold transition-colors border-b-2 -mb-[5px] ${
            activeTab === 'profile'
              ? 'border-neutral-900 text-neutral-900'
              : 'border-transparent text-neutral-500 hover:text-neutral-800'
          }`}
        >
          Basic Profile & Bio
        </button>
        <button
          onClick={() => setActiveTab('socials')}
          className={`px-3.5 py-2 font-semibold transition-colors border-b-2 -mb-[5px] ${
            activeTab === 'socials'
              ? 'border-neutral-900 text-neutral-900'
              : 'border-transparent text-neutral-500 hover:text-neutral-800'
          }`}
        >
          Platforms & Reach ({profile.socials.length})
        </button>
        <button
          onClick={() => setActiveTab('collabs')}
          className={`px-3.5 py-2 font-semibold transition-colors border-b-2 -mb-[5px] ${
            activeTab === 'collabs'
              ? 'border-neutral-900 text-neutral-900'
              : 'border-transparent text-neutral-500 hover:text-neutral-800'
          }`}
        >
          Featured Brand Work ({profile.collaborations.length})
        </button>
        <button
          onClick={() => setActiveTab('audience')}
          className={`px-3.5 py-2 font-semibold transition-colors border-b-2 -mb-[5px] ${
            activeTab === 'audience'
              ? 'border-neutral-900 text-neutral-900'
              : 'border-transparent text-neutral-500 hover:text-neutral-800'
          }`}
        >
          Audience Demographics
        </button>
      </div>

      {/* Tab 1: Profile */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="bg-white rounded-2xl border border-neutral-200/90 p-6 space-y-5 shadow-xs">
          <div className="flex items-center gap-4 pb-4 border-b border-neutral-100">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100 shrink-0">
              <img
                src={profileImage}
                alt={displayName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-neutral-900">Profile Photo</h3>
              <p className="text-xs text-neutral-500">Avatar displayed in the header and public media kit</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Display Name *</label>
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
            </div>
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Public Username / Slug *</label>
              <div className="flex items-center">
                <span className="px-2.5 py-2 bg-neutral-100 border border-r-0 border-neutral-200 rounded-l-lg text-neutral-500 font-mono text-[11px]">
                  brandpitch.me/u/
                </span>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-r-lg focus:outline-none focus:ring-1 focus:ring-neutral-900 font-mono"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Niche / Category *</label>
              <input
                type="text"
                required
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
            </div>
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Location *</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block font-semibold text-neutral-700 mb-1">Headline Tagline *</label>
            <input
              type="text"
              required
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900"
            />
          </div>

          <div className="text-xs">
            <label className="block font-semibold text-neutral-700 mb-1">Creator Bio *</label>
            <textarea
              rows={3}
              required
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900 leading-relaxed resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Partnerships Email *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
            </div>
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Personal Website</label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
            </div>
          </div>

          <div className="pt-3 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: Socials & Stats */}
      {activeTab === 'socials' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-xs text-neutral-500">
              Manually managed statistics for each connected platform.
            </p>
            <button
              onClick={() => setIsSocialModalOpen(true)}
              className="px-3.5 py-1.5 bg-neutral-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Platform</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {profile.socials.map((soc) => (
              <div
                key={soc.id}
                className="bg-white rounded-xl border border-neutral-200/90 p-4 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs capitalize text-neutral-900 block">
                      {soc.platform}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-500">{soc.handle}</span>
                  </div>
                  <button
                    onClick={() => removeSocial(soc.id)}
                    className="text-neutral-400 hover:text-rose-600 p-1 rounded"
                    title="Remove social channel"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <label className="text-[10px] text-neutral-400 uppercase block">Followers</label>
                    <input
                      type="number"
                      value={soc.followers}
                      onChange={(e) => updateSocial(soc.id, { followers: Number(e.target.value) })}
                      className="w-full px-2 py-1 bg-neutral-50 border border-neutral-200 rounded font-mono text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-400 uppercase block">Avg Views</label>
                    <input
                      type="number"
                      value={soc.avgViews}
                      onChange={(e) => updateSocial(soc.id, { avgViews: Number(e.target.value) })}
                      className="w-full px-2 py-1 bg-neutral-50 border border-neutral-200 rounded font-mono text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-400 uppercase block">Eng. Rate (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={soc.engagementRate}
                      onChange={(e) => updateSocial(soc.id, { engagementRate: Number(e.target.value) })}
                      className="w-full px-2 py-1 bg-neutral-50 border border-neutral-200 rounded font-mono text-xs font-bold text-emerald-600"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Featured Collabs */}
      {activeTab === 'collabs' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-xs text-neutral-500">
              Showcase past campaigns, brand deliverables, and results to instill brand confidence.
            </p>
            <button
              onClick={() => setIsCollabModalOpen(true)}
              className="px-3.5 py-1.5 bg-neutral-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Collaboration</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {profile.collaborations.map((collab) => (
              <div
                key={collab.id}
                className="bg-white rounded-xl border border-neutral-200/90 overflow-hidden shadow-xs flex flex-col justify-between"
              >
                <div className="aspect-video bg-neutral-100 overflow-hidden relative">
                  <img
                    src={collab.image}
                    alt={collab.campaignTitle}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-neutral-900 text-white text-[10px] px-2 py-0.5 rounded font-semibold">
                    {collab.brandName}
                  </div>
                  <button
                    onClick={() => removeCollaboration(collab.id)}
                    className="absolute top-2 right-2 bg-white/90 hover:bg-white text-rose-600 p-1.5 rounded shadow-sm"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-4 space-y-2 text-xs">
                  <h4 className="font-bold text-neutral-900">{collab.campaignTitle}</h4>
                  <p className="text-neutral-600 line-clamp-2 leading-relaxed">{collab.description}</p>
                  <div className="flex justify-between text-[11px] pt-2 border-t border-neutral-100 text-neutral-500 font-mono">
                    <span>Views: {collab.results.views}</span>
                    <span className="text-emerald-600 font-bold">Eng: {collab.results.engagement}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Audience Demographics */}
      {activeTab === 'audience' && (
        <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 space-y-6 shadow-xs text-xs">
          <div>
            <h3 className="font-bold text-sm text-neutral-900">Audience Information</h3>
            <p className="text-xs text-neutral-500">Provide non-confidential audience breakdown to prospective sponsors.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <span className="font-bold uppercase tracking-wider text-neutral-600 text-[11px] block">
                Top Geographies (%)
              </span>
              {profile.audience.topLocations.map((loc, i) => (
                <div key={i} className="flex items-center justify-between gap-3">
                  <input
                    type="text"
                    value={loc.country}
                    onChange={(e) => {
                      const updated = [...profile.audience.topLocations];
                      updated[i].country = e.target.value;
                      updateProfile({
                        audience: { ...profile.audience, topLocations: updated },
                      });
                    }}
                    className="flex-1 px-2.5 py-1.5 bg-neutral-50 border border-neutral-200 rounded font-medium"
                  />
                  <div className="flex items-center gap-1 w-20">
                    <input
                      type="number"
                      value={loc.percentage}
                      onChange={(e) => {
                        const updated = [...profile.audience.topLocations];
                        updated[i].percentage = Number(e.target.value);
                        updateProfile({
                          audience: { ...profile.audience, topLocations: updated },
                        });
                      }}
                      className="w-14 px-2 py-1.5 bg-neutral-50 border border-neutral-200 rounded font-mono font-bold text-right"
                    />
                    <span className="text-neutral-500">%</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <span className="font-bold uppercase tracking-wider text-neutral-600 text-[11px] block">
                Age Distribution (%)
              </span>
              {profile.audience.ageGroups.map((age, i) => (
                <div key={i} className="flex items-center justify-between gap-3">
                  <span className="w-24 text-neutral-700 font-medium">{age.range}</span>
                  <div className="flex items-center gap-1 w-20">
                    <input
                      type="number"
                      value={age.percentage}
                      onChange={(e) => {
                        const updated = [...profile.audience.ageGroups];
                        updated[i].percentage = Number(e.target.value);
                        updateProfile({
                          audience: { ...profile.audience, ageGroups: updated },
                        });
                      }}
                      className="w-14 px-2 py-1.5 bg-neutral-50 border border-neutral-200 rounded font-mono font-bold text-right"
                    />
                    <span className="text-neutral-500">%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Collab Modal */}
      {isCollabModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-neutral-200 p-6 space-y-4 text-xs">
            <h2 className="text-base font-bold text-neutral-900">Add Brand Collaboration</h2>
            <form onSubmit={handleCreateCollab} className="space-y-3">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Brand Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sony, Nike, Notion"
                  value={collabBrand}
                  onChange={(e) => setCollabBrand(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Campaign Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Workspace Audio ANC Launch"
                  value={collabTitle}
                  onChange={(e) => setCollabTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Campaign Description</label>
                <textarea
                  rows={2}
                  placeholder="Summary of narrative, talking points and outcome..."
                  value={collabDesc}
                  onChange={(e) => setCollabDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg resize-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Deliverables</label>
                <input
                  type="text"
                  placeholder="e.g. 1x YouTube 90s Integration + 1 Reel"
                  value={collabDeliv}
                  onChange={(e) => setCollabDeliv(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Views</label>
                  <input
                    type="text"
                    value={collabViews}
                    onChange={(e) => setCollabViews(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Engagement Rate</label>
                  <input
                    type="text"
                    value={collabEng}
                    onChange={(e) => setCollabEng(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsCollabModalOpen(false)}
                  className="px-3.5 py-1.5 border border-neutral-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-neutral-900 text-white rounded-lg font-semibold"
                >
                  Save Collaboration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Social Modal */}
      {isSocialModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-neutral-200 p-6 space-y-4 text-xs">
            <h2 className="text-base font-bold text-neutral-900">Add Social Channel</h2>
            <form onSubmit={handleCreateSocial} className="space-y-3">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Platform</label>
                <select
                  value={newPlatform}
                  onChange={(e) => setNewPlatform(e.target.value as PlatformType)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg capitalize"
                >
                  <option value="youtube">YouTube</option>
                  <option value="instagram">Instagram</option>
                  <option value="tiktok">TikTok</option>
                  <option value="newsletter">Newsletter</option>
                  <option value="podcast">Podcast</option>
                  <option value="x">X / Twitter</option>
                  <option value="linkedin">LinkedIn</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Handle / Name</label>
                <input
                  type="text"
                  required
                  value={newHandle}
                  onChange={(e) => setNewHandle(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Followers</label>
                  <input
                    type="number"
                    value={newFollowers}
                    onChange={(e) => setNewFollowers(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Avg Views</label>
                  <input
                    type="number"
                    value={newAvgViews}
                    onChange={(e) => setNewAvgViews(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Eng. Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newEngRate}
                    onChange={(e) => setNewEngRate(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsSocialModalOpen(false)}
                  className="px-3.5 py-1.5 border border-neutral-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-neutral-900 text-white rounded-lg font-semibold"
                >
                  Add Platform
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
