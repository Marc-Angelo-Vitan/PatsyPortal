/* eslint-disable @typescript-eslint/no-explicit-any */
// app/main/campaign/discount/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Colors } from '../../../../styles/colors';

// Sample discount data
const sampleDiscounts = [
  { 
    id: 1, 
    name: 'Student Discount', 
    description: '15% off for students with valid ID',
    code: 'STUDENT15',
    discountType: 'Percentage',
    discountValue: 15,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    status: 'Active',
    usageLimit: 1000,
    usedCount: 456,
    minPurchase: 0,
    maxDiscount: 0,
    applicableProducts: 'All Products',
    customerGroup: 'Students',
    image: '🎓',
  },
  { 
    id: 2, 
    name: 'Loyalty Member', 
    description: '10% off for loyalty program members',
    code: 'LOYALTY10',
    discountType: 'Percentage',
    discountValue: 10,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    status: 'Active',
    usageLimit: 5000,
    usedCount: 892,
    minPurchase: 10,
    maxDiscount: 0,
    applicableProducts: 'All Products',
    customerGroup: 'Loyalty Members',
    image: '⭐',
  },
  { 
    id: 3, 
    name: 'Flash Sale', 
    description: '$5 off on orders above $25',
    code: 'FLASH5',
    discountType: 'Fixed Amount',
    discountValue: 5,
    startDate: '2024-03-25',
    endDate: '2024-04-10',
    status: 'Active',
    usageLimit: 300,
    usedCount: 234,
    minPurchase: 25,
    maxDiscount: 0,
    applicableProducts: 'All Products',
    customerGroup: 'All Customers',
    image: '⚡',
  },
  { 
    id: 4, 
    name: 'Referral Discount', 
    description: 'Refer a friend and both get $10 off',
    code: 'REFER10',
    discountType: 'Fixed Amount',
    discountValue: 10,
    startDate: '2024-02-01',
    endDate: '2024-06-30',
    status: 'Scheduled',
    usageLimit: 200,
    usedCount: 0,
    minPurchase: 15,
    maxDiscount: 0,
    applicableProducts: 'All Products',
    customerGroup: 'All Customers',
    image: '🤝',
  },
  { 
    id: 5, 
    name: 'First Order', 
    description: '20% off on first purchase',
    code: 'FIRST20',
    discountType: 'Percentage',
    discountValue: 20,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    status: 'Active',
    usageLimit: 500,
    usedCount: 178,
    minPurchase: 0,
    maxDiscount: 0,
    applicableProducts: 'All Products',
    customerGroup: 'New Customers',
    image: '🆕',
  },
  { 
    id: 6, 
    name: 'Weekend Special', 
    description: '$3 off on orders above $15 (Weekends only)',
    code: 'WEEKEND3',
    discountType: 'Fixed Amount',
    discountValue: 3,
    startDate: '2024-03-01',
    endDate: '2024-05-31',
    status: 'Active',
    usageLimit: 500,
    usedCount: 312,
    minPurchase: 15,
    maxDiscount: 0,
    applicableProducts: 'All Products',
    customerGroup: 'All Customers',
    image: '📅',
  },
  { 
    id: 7, 
    name: 'Birthday Treat', 
    description: 'Free pastry on your birthday month',
    code: 'BDAYFREE',
    discountType: 'Free Item',
    discountValue: 100,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    status: 'Active',
    usageLimit: 2000,
    usedCount: 67,
    minPurchase: 0,
    maxDiscount: 0,
    applicableProducts: 'Pastry',
    customerGroup: 'All Customers',
    image: '🎂',
  },
  { 
    id: 8, 
    name: 'Corporate Discount', 
    description: '15% off for corporate clients',
    code: 'CORP15',
    discountType: 'Percentage',
    discountValue: 15,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    status: 'Active',
    usageLimit: 1000,
    usedCount: 89,
    minPurchase: 50,
    maxDiscount: 50,
    applicableProducts: 'All Products',
    customerGroup: 'Corporate',
    image: '🏢',
  },
];

export default function DiscountPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const itemsPerPage = 6;

  // Filter discounts
  const filteredDiscounts = sampleDiscounts.filter(discount => {
    const matchesSearch = discount.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      discount.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      discount.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || discount.status === statusFilter;
    const matchesType = typeFilter === 'All' || discount.discountType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Pagination
  const totalPages = Math.ceil(filteredDiscounts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDiscounts = filteredDiscounts.slice(startIndex, startIndex + itemsPerPage);

  // Stats
  const activeDiscounts = sampleDiscounts.filter(d => d.status === 'Active').length;
  const totalRedemptions = sampleDiscounts.reduce((sum, d) => sum + d.usedCount, 0);
  const avgDiscountValue = Math.round(sampleDiscounts.reduce((sum, d) => sum + d.discountValue, 0) / sampleDiscounts.length);
  const totalUsageLimit = sampleDiscounts.reduce((sum, d) => sum + d.usageLimit, 0);
  const overallRedemptionRate = Math.round((totalRedemptions / totalUsageLimit) * 100);

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
      case 'Free Item': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDiscount = (type: string, value: number) => {
    if (type === 'Percentage') return `${value}% OFF`;
    if (type === 'Fixed Amount') return `$${value} OFF`;
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

  const handleEdit = (discount: any) => {
    setSelectedDiscount(discount);
    setShowEditModal(true);
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
            Discount Codes
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Create and manage discount codes, coupons, and special offers for your customers
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Active Discounts</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{activeDiscounts}</p>
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
              <p className="text-xs text-gray-500 uppercase tracking-wider">Avg. Discount</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{avgDiscountValue}%</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Redemption Rate</p>
              <p className="text-2xl font-bold text-amber-600 mt-1">{overallRedemptionRate}%</p>
            </div>
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
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
              placeholder="Search by name or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-gray-50 hover:bg-white transition"
            />
          </div>

          {/* Create Discount Button */}
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-tertiary transition flex items-center gap-2 text-sm font-medium shadow-sm"
            style={{ backgroundColor: Colors.primary }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Discount
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
                  <button onClick={() => handleExport('Codes')} className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 flex items-center gap-2 border-t">🏷️ Code List</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Discount Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedDiscounts.length > 0 ? (
          paginatedDiscounts.map((discount) => (
            <div
              key={discount.id}
              className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="relative">
                <div className="absolute top-3 right-3 z-10 flex gap-1">
                  <button 
                    onClick={() => handleEdit(discount)}
                    className="p-1.5 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition"
                  >
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
                <div className={`p-5 ${discount.status === 'Active' ? 'bg-gradient-to-r from-green-50 to-emerald-50' : 'bg-gradient-to-r from-gray-50 to-slate-50'}`}>
                  <div className="text-5xl mb-3">{discount.image}</div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-800">{discount.name}</h3>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(discount.status)}`}>
                      {discount.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-xs mb-3 line-clamp-2">{discount.description}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getDiscountTypeBadge(discount.discountType)}`}>
                      {discount.discountType}
                    </span>
                    <span className="text-xl font-bold" style={{ color: Colors.primary }}>
                      {formatDiscount(discount.discountType, discount.discountValue)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-5 bg-white">
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-gray-500">Discount Code</p>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(discount.code);
                        alert(`Code ${discount.code} copied!`);
                      }}
                      className="text-xs text-primary hover:underline"
                      style={{ color: Colors.primary }}
                    >
                      Copy
                    </button>
                  </div>
                  <p className="text-lg font-mono font-bold tracking-wider text-gray-800">{discount.code}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Valid Period</p>
                    <p className="text-xs font-medium text-gray-700">{discount.startDate} → {discount.endDate}</p>
                  </div>
                  {discount.minPurchase > 0 && (
                    <div>
                      <p className="text-xs text-gray-500">Min. Purchase</p>
                      <p className="text-xs font-medium text-gray-700">${discount.minPurchase}</p>
                    </div>
                  )}
                  {discount.maxDiscount > 0 && (
                    <div>
                      <p className="text-xs text-gray-500">Max Discount</p>
                      <p className="text-xs font-medium text-gray-700">${discount.maxDiscount}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-gray-500">Customer Group</p>
                    <p className="text-xs font-medium text-gray-700">{discount.customerGroup}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500">Redemptions</p>
                    <p className="text-sm font-semibold text-gray-800">{discount.usedCount.toLocaleString()} / {discount.usageLimit.toLocaleString()}</p>
                  </div>
                  <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full" 
                      style={{ width: `${(discount.usedCount / discount.usageLimit) * 100}%`, backgroundColor: Colors.primary }}
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-gray-500 font-medium">No discount codes found</p>
              <p className="text-gray-400 text-sm">Create your first discount code to get started</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="mt-2 px-4 py-2 bg-primary text-white rounded-lg text-sm"
                style={{ backgroundColor: Colors.primary }}
              >
                + Create Discount
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center py-2">
          <p className="text-sm text-gray-500">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredDiscounts.length)} of {filteredDiscounts.length} discounts
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
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">🏆</span>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-green-800">Best Performing</h3>
              <p className="text-xs text-green-600 mt-1">Student Discount has the highest redemption rate at 45.6%</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">💡</span>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-blue-800">Pro Tip</h3>
              <p className="text-xs text-blue-600 mt-1">Limited-time discounts with clear expiration dates see 2x more usage</p>
            </div>
          </div>
        </div>
      </div>

      {/* Create Discount Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white">
              <h3 className="text-lg font-semibold text-gray-900">Create New Discount Code</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Discount Name</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="e.g., Summer Sale" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Describe your discount..." />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Percentage</option>
                    <option>Fixed Amount</option>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Discount Code</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono uppercase" placeholder="e.g., SUMMER20" />
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Group</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>All Customers</option>
                  <option>New Customers</option>
                  <option>Loyalty Members</option>
                  <option>Students</option>
                  <option>Corporate</option>
                </select>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 sticky bottom-0 bg-white">
              <button onClick={() => setShowCreateModal(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition">Cancel</button>
              <button onClick={() => { alert('Discount created! (demo)'); setShowCreateModal(false); }} className="px-4 py-2 text-sm font-medium text-white rounded-lg transition" style={{ backgroundColor: Colors.primary }}>Create Discount</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Discount Modal */}
      {showEditModal && selectedDiscount && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white">
              <h3 className="text-lg font-semibold text-gray-900">Edit Discount: {selectedDiscount.name}</h3>
              <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Discount Name</label>
                <input type="text" defaultValue={selectedDiscount.name} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea rows={2} defaultValue={selectedDiscount.description} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input type="date" defaultValue={selectedDiscount.startDate} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input type="date" defaultValue={selectedDiscount.endDate} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select defaultValue={selectedDiscount.status} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>Active</option>
                  <option>Scheduled</option>
                  <option>Expired</option>
                </select>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 sticky bottom-0 bg-white">
              <button onClick={() => setShowEditModal(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition">Cancel</button>
              <button onClick={() => { alert('Discount updated! (demo)'); setShowEditModal(false); }} className="px-4 py-2 text-sm font-medium text-white rounded-lg transition" style={{ backgroundColor: Colors.primary }}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}