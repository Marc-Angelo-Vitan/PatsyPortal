// app/main/campaign/promo/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Colors } from '../../../../styles/colors';

// Sample promo data
const samplePromos = [
  { 
    id: 1, 
    name: 'Happy Hour Special', 
    description: '50% off on all coffee drinks from 3 PM to 5 PM',
    code: 'HAPPY50',
    discountType: 'Percentage',
    discountValue: 50,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    status: 'Active',
    usageLimit: 1000,
    usedCount: 342,
    minPurchase: 0,
    applicableProducts: 'All Coffee Drinks',
    image: '☕',
    createdAt: '2024-01-01',
  },
  { 
    id: 2, 
    name: 'Weekend Brew Fest', 
    description: 'Buy 1 Get 1 Free on all specialty drinks on weekends',
    code: 'BOGO20',
    discountType: 'BOGO',
    discountValue: 100,
    startDate: '2024-01-01',
    endDate: '2024-05-30',
    status: 'Active',
    usageLimit: 500,
    usedCount: 187,
    minPurchase: 0,
    applicableProducts: 'Specialty Drinks',
    image: '🎉',
    createdAt: '2024-01-01',
  },
  { 
    id: 3, 
    name: 'New Customer Welcome', 
    description: 'First-time customers get 20% off their entire order',
    code: 'WELCOME20',
    discountType: 'Percentage',
    discountValue: 20,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    status: 'Active',
    usageLimit: 200,
    usedCount: 89,
    minPurchase: 0,
    applicableProducts: 'Entire Order',
    image: '👋',
    createdAt: '2024-01-01',
  },
  { 
    id: 4, 
    name: 'Morning Rush', 
    description: 'Free pastry with any large coffee purchase before 10 AM',
    code: 'MORNINGFREE',
    discountType: 'Free Item',
    discountValue: 100,
    startDate: '2024-03-01',
    endDate: '2024-04-15',
    status: 'Scheduled',
    usageLimit: 300,
    usedCount: 0,
    minPurchase: 5,
    applicableProducts: 'Large Coffee + Pastry',
    image: '🌅',
    createdAt: '2024-02-28',
  },
  { 
    id: 5, 
    name: 'Summer Cooler', 
    description: '$3 off on all cold beverages',
    code: 'SUMMER3',
    discountType: 'Fixed Amount',
    discountValue: 3,
    startDate: '2024-06-01',
    endDate: '2024-08-31',
    status: 'Scheduled',
    usageLimit: 1000,
    usedCount: 0,
    minPurchase: 0,
    applicableProducts: 'Cold Beverages',
    image: '🍹',
    createdAt: '2024-03-01',
  },
];

export default function PromoPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const itemsPerPage = 6;

  // Filter promos
  const filteredPromos = samplePromos.filter(promo => {
    const matchesSearch = promo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promo.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promo.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || promo.status === statusFilter;
    const matchesType = typeFilter === 'All' || promo.discountType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPromos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPromos = filteredPromos.slice(startIndex, startIndex + itemsPerPage);

  // Stats
  const activePromos = samplePromos.filter(p => p.status === 'Active').length;
  const scheduledPromos = samplePromos.filter(p => p.status === 'Scheduled').length;
  const totalRedemptions = samplePromos.reduce((sum, p) => sum + p.usedCount, 0);
  const avgRedemptionRate = Math.round((totalRedemptions / samplePromos.reduce((sum, p) => sum + p.usageLimit, 0)) * 100);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'Expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDiscountTypeBadge = (type: string) => {
    switch(type) {
      case 'Percentage': return 'bg-purple-100 text-purple-800';
      case 'Fixed Amount': return 'bg-blue-100 text-blue-800';
      case 'BOGO': return 'bg-pink-100 text-pink-800';
      case 'Free Item': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDiscount = (type: string, value: number) => {
    if (type === 'Percentage') return `${value}% OFF`;
    if (type === 'Fixed Amount') return `$${value} OFF`;
    if (type === 'BOGO') return 'Buy 1 Get 1 Free';
    if (type === 'Free Item') return 'Free Item';
    return `${value} OFF`;
  };

  const handleExport = (type: string) => {
    setShowExportDropdown(false);
    alert(`${type} export will be available soon!`);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      {/* Header with Back Navigation */}
      <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
        <Link
          href="/main/campaign"
          className="p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: Colors.primary }}>
            Promotions
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Create and manage special offers, discounts, and promotional campaigns
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Active Promos</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{activePromos}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Scheduled</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">{scheduledPromos}</p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Total Redemptions</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">{totalRedemptions.toLocaleString()}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Redemption Rate</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{avgRedemptionRate}%</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-wrap justify-between gap-3 items-center">
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Expired">Expired</option>
          </select>
          
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="All">All Types</option>
            <option value="Percentage">Percentage</option>
            <option value="Fixed Amount">Fixed Amount</option>
            <option value="BOGO">BOGO</option>
            <option value="Free Item">Free Item</option>
          </select>
        </div>

        <div className="flex gap-3 items-center">
          {/* Search */}
          <div className="relative w-64">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search promos by name or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-gray-50 hover:bg-white transition"
            />
          </div>

          {/* Create Promo Button */}
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-tertiary transition flex items-center gap-2 text-sm font-medium shadow-sm"
            style={{ backgroundColor: Colors.primary }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Promotion
          </button>

          {/* Export Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowExportDropdown(!showExportDropdown)}
              className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition flex items-center gap-2 text-sm font-medium bg-gray-50"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showExportDropdown && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowExportDropdown(false)} />
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-100 z-20 overflow-hidden">
                  <button onClick={() => handleExport('CSV')} className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 flex items-center gap-2">📊 CSV</button>
                  <button onClick={() => handleExport('PDF')} className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 flex items-center gap-2 border-t">📄 PDF</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Promo Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedPromos.length > 0 ? (
          paginatedPromos.map((promo) => (
            <div
              key={promo.id}
              className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="relative">
                <div className="absolute top-3 right-3 z-10 flex gap-1">
                  <button className="p-1.5 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition">
                    <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button className="p-1.5 bg-white rounded-lg shadow-sm hover:bg-red-50 transition">
                    <svg className="w-3.5 h-3.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                <div className={`p-5 ${promo.status === 'Active' ? 'bg-gradient-to-r from-green-50 to-emerald-50' : 'bg-gradient-to-r from-yellow-50 to-amber-50'}`}>
                  <div className="text-5xl mb-3">{promo.image}</div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-800">{promo.name}</h3>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(promo.status)}`}>
                      {promo.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-xs mb-3 line-clamp-2">{promo.description}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getDiscountTypeBadge(promo.discountType)}`}>
                      {promo.discountType}
                    </span>
                    <span className="text-xl font-bold" style={{ color: Colors.primary }}>
                      {formatDiscount(promo.discountType, promo.discountValue)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-5 bg-white">
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-gray-500">Promo Code</p>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(promo.code);
                        alert('Code copied!');
                      }}
                      className="text-xs text-primary hover:underline"
                      style={{ color: Colors.primary }}
                    >
                      Copy
                    </button>
                  </div>
                  <p className="text-lg font-mono font-bold tracking-wider text-gray-800">{promo.code}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Valid Period</p>
                    <p className="text-xs font-medium text-gray-700">{promo.startDate} → {promo.endDate}</p>
                  </div>
                  {promo.minPurchase > 0 && (
                    <div>
                      <p className="text-xs text-gray-500">Min. Purchase</p>
                      <p className="text-xs font-medium text-gray-700">${promo.minPurchase}</p>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500">Redemptions</p>
                    <p className="text-sm font-semibold text-gray-800">{promo.usedCount} / {promo.usageLimit}</p>
                  </div>
                  <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full" 
                      style={{ width: `${(promo.usedCount / promo.usageLimit) * 100}%`, backgroundColor: Colors.primary }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 py-12 text-center">
            <div className="flex flex-col items-center gap-2">
              <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <p className="text-gray-500 font-medium">No promotions found</p>
              <p className="text-gray-400 text-sm">Create your first promotion to get started</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="mt-2 px-4 py-2 bg-primary text-white rounded-lg text-sm"
                style={{ backgroundColor: Colors.primary }}
              >
                + Create Promotion
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center py-2">
          <p className="text-sm text-gray-500">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredPromos.length)} of {filteredPromos.length} promotions
          </p>
          <div className="flex gap-1.5">
            <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50">← Prev</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button key={page} onClick={() => goToPage(page)} className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition ${currentPage === page ? 'bg-primary text-white shadow-sm' : 'border border-gray-300 hover:bg-gray-50'}`} style={currentPage === page ? { backgroundColor: Colors.primary } : {}}>{page}</button>
            ))}
            <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50">Next →</button>
          </div>
        </div>
      )}

      {/* Performance Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-xl">💡</span>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-blue-800">Promotion Tips</h3>
            <p className="text-xs text-blue-600 mt-1">Limited-time offers create urgency. Try running weekend-specific promotions to boost sales during slower periods.</p>
          </div>
        </div>
      </div>

      {/* Create Promo Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white">
              <h3 className="text-lg font-semibold text-gray-900">Create New Promotion</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Promotion Name</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="e.g., Summer Sale" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Describe your promotion..." />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Percentage</option>
                    <option>Fixed Amount</option>
                    <option>BOGO</option>
                    <option>Free Item</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount Value</label>
                  <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="e.g., 20" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Promo Code</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono" placeholder="e.g., SUMMER20" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Usage Limit</label>
                  <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="e.g., 500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min. Purchase ($)</label>
                  <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0" />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 sticky bottom-0 bg-white">
              <button onClick={() => setShowCreateModal(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition">Cancel</button>
              <button onClick={() => { alert('Promotion created! (demo)'); setShowCreateModal(false); }} className="px-4 py-2 text-sm font-medium text-white rounded-lg transition" style={{ backgroundColor: Colors.primary }}>Create Promotion</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}