'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRealTimeLeads } from '@/hooks/useRealTimeLeads';
import { LeadItem } from '@/lib/repository';
import { LeadStatus } from '@/models/Lead';
import {
  Radio,
  Volume2,
  VolumeX,
  Search,
  Filter,
  Download,
  Trash2,
  CheckCircle2,
  Clock,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Building,
  RefreshCw,
  Bell,
  X,
  Plus,
  Play,
  ArrowLeft,
  ChevronRight,
  Eye,
  FileSpreadsheet,
  AlertCircle,
} from 'lucide-react';

export default function AdminDashboard() {
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLeadForDetail, setSelectedLeadForDetail] = useState<LeadItem | null>(null);
  const [newNoteText, setNewNoteText] = useState<string>('');
  const [isAddingNote, setIsAddingNote] = useState<boolean>(false);
  const [deleteConfirmationId, setDeleteConfirmationId] = useState<string | null>(null);

  const {
    leads,
    latestNewLead,
    connectionStatus,
    transportType,
    soundEnabled,
    toggleSound,
    testSound,
    clearLatestNewLead,
    refreshLeads,
    updateLeadStatusAction,
    deleteLeadAction,
    simulateTestLead,
    loading,
  } = useRealTimeLeads(statusFilter, searchQuery);

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
      const matchesSearch =
        !searchQuery.trim() ||
        lead.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.phone.includes(searchQuery) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.structureType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (lead.addressOrSiteLocation &&
          lead.addressOrSiteLocation.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesStatus && matchesSearch;
    });
  }, [leads, statusFilter, searchQuery]);

  // Aggregate Metrics
  const stats = useMemo(() => {
    const total = leads.length;
    const newCount = leads.filter((l) => l.status === 'New').length;
    const siteVisits = leads.filter((l) => l.status === 'Site Visit Scheduled').length;
    const contacted = leads.filter((l) => l.status === 'Contacted').length;
    const closed = leads.filter((l) => l.status === 'Closed').length;

    return { total, newCount, siteVisits, contacted, closed };
  }, [leads]);

  // Status color badge map
  const getStatusBadgeClass = (status: LeadStatus) => {
    switch (status) {
      case 'New':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Contacted':
        return 'bg-sky-500/20 text-sky-300 border-sky-500/40';
      case 'Site Visit Scheduled':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'Closed':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      default:
        return 'bg-slate-700 text-slate-300 border-slate-600';
    }
  };

  // Export leads to CSV
  const exportToCSV = () => {
    if (leads.length === 0) return;

    const headers = [
      'ID',
      'Name',
      'Phone',
      'Email',
      'Structure Type',
      'Fabric/Material',
      'Area (Sq Ft)',
      'Budget Bracket',
      'Site Visit Requested',
      'Site Location',
      'Status',
      'Date Submitted',
    ];

    const rows = leads.map((l) => [
      l._id,
      `"${l.fullName.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.email}"`,
      `"${l.structureType.replace(/"/g, '""')}"`,
      `"${l.fabricMaterial.replace(/"/g, '""')}"`,
      l.estimatedArea,
      `"${l.projectBudgetBracket}"`,
      l.siteVisitRequested ? 'Yes' : 'No',
      `"${(l.addressOrSiteLocation || '').replace(/"/g, '""')}"`,
      l.status,
      new Date(l.createdAt).toLocaleString('en-IN'),
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `sunshade_solutions_leads_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddNote = async (leadId: string) => {
    if (!newNoteText.trim()) return;
    setIsAddingNote(true);
    const currentLead = leads.find((l) => l._id === leadId);
    if (currentLead) {
      await updateLeadStatusAction(leadId, currentLead.status, newNoteText);
      setNewNoteText('');
      // update modal view
      const updated = leads.find((l) => l._id === leadId);
      if (updated) setSelectedLeadForDetail(updated);
    }
    setIsAddingNote(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Floating Live Toast Notification Alert */}
      {latestNewLead && (
        <div className="fixed top-6 right-6 z-50 max-w-md w-full animate-bounce sm:animate-none">
          <div className="bg-slate-900 border-2 border-amber-500 rounded-2xl p-4 shadow-2xl shadow-amber-500/20 backdrop-blur-xl relative overflow-hidden">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-400 animate-ping"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  New Live Inbound Lead!
                </span>
              </div>
              <button
                onClick={clearLatestNewLead}
                className="text-slate-400 hover:text-white p-1 rounded-md bg-slate-800 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-2 space-y-1">
              <h4 className="text-sm font-bold text-white">{latestNewLead.fullName}</h4>
              <p className="text-xs text-slate-300">
                {latestNewLead.structureType} ({latestNewLead.estimatedArea} Sq. Ft.)
              </p>
              <div className="text-xs text-amber-400 font-mono font-semibold">
                Budget: {latestNewLead.projectBudgetBracket}
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between gap-2 text-xs">
              <a
                href={`tel:${latestNewLead.phone}`}
                className="flex items-center gap-1 text-slate-300 hover:text-white"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call Client</span>
              </a>
              <a
                href={`https://wa.me/${latestNewLead.phone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(
                  latestNewLead.fullName
                )}%2C%20this%20is%20S.C.%20Sharma%20from%20Sunshade%20Solutions%20regarding%20your%20tensile%20quote.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-emerald-400 font-semibold"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <button
                onClick={() => {
                  setSelectedLeadForDetail(latestNewLead);
                  clearLatestNewLead();
                }}
                className="px-2.5 py-1 rounded bg-amber-500 text-slate-950 font-bold text-[11px] cursor-pointer"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Top Navigation */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Website</span>
            </Link>
            <div className="h-5 w-px bg-slate-800" />
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
                  <Radio className="w-4 h-4 text-amber-400" />
                </div>
              </div>
              <div>
                <h1 className="text-base font-black text-white font-['Outfit'] leading-none">
                  SUNSHADE SOLUTIONS
                </h1>
                <span className="text-[10px] text-amber-400 uppercase tracking-widest font-bold">
                  Enterprise Lead Control Center
                </span>
              </div>
            </div>
          </div>

          {/* Real-time Status Badge & Controls */}
          <div className="flex items-center gap-3">
            {/* Live Connection Indicator */}
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold ${
                connectionStatus === 'connected'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : connectionStatus === 'connecting'
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
              }`}
              title={`Real-Time Engine: ${transportType}`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  connectionStatus === 'connected'
                    ? 'bg-emerald-400 animate-pulse'
                    : 'bg-amber-400'
                }`}
              />
              <span className="hidden sm:inline">
                {connectionStatus === 'connected' ? `Live: ${transportType}` : 'Connecting...'}
              </span>
            </div>

            {/* Sound Notification Control */}
            <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-xl p-1">
              <button
                onClick={toggleSound}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  soundEnabled ? 'text-amber-400 bg-amber-500/10' : 'text-slate-500 hover:text-slate-300'
                }`}
                title={soundEnabled ? 'Notification Sound Enabled' : 'Notification Sound Muted'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <button
                onClick={testSound}
                className="px-2 py-1 text-[11px] font-semibold text-slate-400 hover:text-white rounded transition-colors cursor-pointer"
                title="Play test audio chime"
              >
                Test Chime
              </button>
            </div>

            {/* Live Lead Simulator (One-Click Testing) */}
            <button
              onClick={simulateTestLead}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30 text-xs font-bold transition-all cursor-pointer"
              title="Dispatches a test inquiry so you can verify the live sound ping and real-time table prepend"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Simulate Lead</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
            <span className="text-xs text-slate-400 font-medium">Total Inquiries</span>
            <div className="text-3xl font-black text-white font-['Outfit']">{stats.total}</div>
            <span className="text-[11px] text-slate-500 block">Across Telangana & AP</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
            <span className="text-xs text-amber-400 font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
              New Leads
            </span>
            <div className="text-3xl font-black text-amber-400 font-['Outfit']">{stats.newCount}</div>
            <span className="text-[11px] text-slate-500 block">Action pending</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
            <span className="text-xs text-purple-400 font-medium">Site Visits Scheduled</span>
            <div className="text-3xl font-black text-purple-400 font-['Outfit']">{stats.siteVisits}</div>
            <span className="text-[11px] text-slate-500 block">Hyderabad Twin Cities</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
            <span className="text-xs text-emerald-400 font-medium">Closed / Fabrication</span>
            <div className="text-3xl font-black text-emerald-400 font-['Outfit']">{stats.closed}</div>
            <span className="text-[11px] text-slate-500 block">Active in Mallapur Plant</span>
          </div>
        </div>

        {/* Filter & Action Toolbar */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex items-center overflow-x-auto w-full md:w-auto gap-1.5 scrollbar-none">
            {['All', 'New', 'Contacted', 'Site Visit Scheduled', 'Closed'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  statusFilter === status
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Search Bar & Export */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search leads, phones, locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <button
              onClick={exportToCSV}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer shrink-0"
              title="Download Excel / CSV lead sheet"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            <button
              onClick={() => refreshLeads()}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
              title="Refresh lead data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Real-Time Leads Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/70 text-slate-400 uppercase tracking-wider font-semibold text-[11px]">
                  <th className="py-4 px-4 sm:px-6">Client & Submission</th>
                  <th className="py-4 px-4">Direct Contact</th>
                  <th className="py-4 px-4">Structure & Area</th>
                  <th className="py-4 px-4">Estimated Budget</th>
                  <th className="py-4 px-4">Site Visit</th>
                  <th className="py-4 px-4">Status Tag</th>
                  <th className="py-4 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-500">
                      {loading ? 'Refreshing leads list...' : 'No inquiries found matching this filter.'}
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr
                      key={lead._id}
                      className="hover:bg-slate-800/40 transition-colors group"
                    >
                      {/* Client Name & Time */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="font-bold text-white text-sm">{lead.fullName}</div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3 text-slate-500" />
                          <span>{new Date(lead.createdAt).toLocaleString('en-IN')}</span>
                        </div>
                        {lead.addressOrSiteLocation && (
                          <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-1 truncate max-w-xs">
                            <MapPin className="w-3 h-3 text-amber-500/70 shrink-0" />
                            <span className="truncate">{lead.addressOrSiteLocation}</span>
                          </div>
                        )}
                      </td>

                      {/* Direct Contact Actions */}
                      <td className="py-4 px-4 space-y-1">
                        <a
                          href={`tel:${lead.phone}`}
                          className="font-mono text-slate-200 hover:text-amber-400 flex items-center gap-1.5"
                        >
                          <Phone className="w-3 h-3 text-amber-400" />
                          <span>{lead.phone}</span>
                        </a>
                        <div className="text-[11px] text-slate-400 truncate max-w-[180px]">
                          {lead.email}
                        </div>
                        <a
                          href={`https://wa.me/${lead.phone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(
                            lead.fullName
                          )}%2C%20this%20is%20S.C.%20Sharma%20from%20Sunshade%20Solutions.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:underline"
                        >
                          <MessageCircle className="w-3 h-3" /> WhatsApp
                        </a>
                      </td>

                      {/* Structure & Area */}
                      <td className="py-4 px-4">
                        <span className="font-semibold text-slate-200 block truncate max-w-xs">
                          {lead.structureType}
                        </span>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          <span className="font-mono text-white font-medium">{lead.estimatedArea}</span> Sq. Ft.
                        </div>
                        <div className="text-[10px] text-slate-500 truncate max-w-[200px]">
                          {lead.fabricMaterial}
                        </div>
                      </td>

                      {/* Budget Bracket */}
                      <td className="py-4 px-4 font-mono font-bold text-amber-400">
                        {lead.projectBudgetBracket}
                      </td>

                      {/* Site Visit Badge */}
                      <td className="py-4 px-4">
                        {lead.siteVisitRequested ? (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold text-[10px]">
                            Site Visit Req.
                          </span>
                        ) : (
                          <span className="text-slate-500 text-[11px]">Estimate Only</span>
                        )}
                      </td>

                      {/* Interactive Status Dropdown */}
                      <td className="py-4 px-4">
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            updateLeadStatusAction(lead._id, e.target.value as LeadStatus)
                          }
                          className={`px-2.5 py-1 rounded-lg border text-xs font-semibold focus:outline-none cursor-pointer ${getStatusBadgeClass(
                            lead.status
                          )}`}
                        >
                          <option value="New" className="bg-slate-900 text-white">New</option>
                          <option value="Contacted" className="bg-slate-900 text-white">Contacted</option>
                          <option value="Site Visit Scheduled" className="bg-slate-900 text-white">Site Visit Scheduled</option>
                          <option value="Closed" className="bg-slate-900 text-white">Closed</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 sm:px-6 text-right space-x-2">
                        <button
                          onClick={() => setSelectedLeadForDetail(lead)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                          title="View lead details & add notes"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmationId(lead._id)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                          title="Delete lead record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Lead Detail & Engineering Notes Modal */}
      {selectedLeadForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedLeadForDetail(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadgeClass(selectedLeadForDetail.status)}`}>
                {selectedLeadForDetail.status}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                ID: {selectedLeadForDetail._id}
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white font-['Outfit']">
                {selectedLeadForDetail.fullName}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Submitted on {new Date(selectedLeadForDetail.createdAt).toLocaleString('en-IN')}
              </p>
            </div>

            {/* Inquired Project Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div>
                <span className="text-slate-500 block">Structure Requirement:</span>
                <span className="font-semibold text-white">{selectedLeadForDetail.structureType}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Estimated Area:</span>
                <span className="font-semibold text-white">{selectedLeadForDetail.estimatedArea} Sq. Ft.</span>
              </div>
              <div>
                <span className="text-slate-500 block">Fabric Specification:</span>
                <span className="font-semibold text-white">{selectedLeadForDetail.fabricMaterial}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Project Budget Bracket:</span>
                <span className="font-bold text-amber-400 font-mono">{selectedLeadForDetail.projectBudgetBracket}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-slate-500 block">Site Address / Location:</span>
                <span className="text-slate-200">{selectedLeadForDetail.addressOrSiteLocation || 'Not provided'}</span>
              </div>
              {selectedLeadForDetail.message && (
                <div className="sm:col-span-2">
                  <span className="text-slate-500 block">Client Message:</span>
                  <p className="text-slate-300 italic mt-0.5">{selectedLeadForDetail.message}</p>
                </div>
              )}
            </div>

            {/* Direct Contact Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`tel:${selectedLeadForDetail.phone}`}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call {selectedLeadForDetail.phone}</span>
              </a>
              <a
                href={`https://wa.me/${selectedLeadForDetail.phone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(
                  selectedLeadForDetail.fullName
                )}%2C%20this%20is%20S.C.%20Sharma%20from%20Sunshade%20Solutions.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Open WhatsApp</span>
              </a>
              <a
                href={`mailto:${selectedLeadForDetail.email}`}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-xs transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Send Email</span>
              </a>
            </div>

            {/* Engineering Notes History */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <h4 className="text-xs uppercase font-bold tracking-wider text-slate-300">
                Internal Engineering Notes & Timeline
              </h4>

              {selectedLeadForDetail.notes && selectedLeadForDetail.notes.length > 0 ? (
                <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                  {selectedLeadForDetail.notes.map((note, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 space-y-1"
                    >
                      <p>{note.text}</p>
                      <span className="text-[10px] text-slate-500 block font-mono">
                        {new Date(note.createdAt).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">No internal notes added yet.</p>
              )}

              {/* Add Note Input */}
              <div className="flex gap-2 pt-2">
                <input
                  type="text"
                  placeholder="e.g. S.C. Sharma scheduled site visit on Friday at 3:00 PM..."
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddNote(selectedLeadForDetail._id);
                    }
                  }}
                  className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:border-amber-500 focus:outline-none"
                />
                <button
                  onClick={() => handleAddNote(selectedLeadForDetail._id)}
                  disabled={isAddingNote || !newNoteText.trim()}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs uppercase cursor-pointer"
                >
                  Add Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmationId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-white">Delete Lead Record?</h3>
              <p className="text-xs text-slate-400">
                Are you sure you want to permanently remove this lead from the database?
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmationId(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs cursor-pointer hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await deleteLeadAction(deleteConfirmationId);
                  setDeleteConfirmationId(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 text-white font-bold text-xs cursor-pointer hover:bg-rose-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
