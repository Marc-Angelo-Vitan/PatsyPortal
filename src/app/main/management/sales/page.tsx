// app/main/management/sales/page.tsx
'use client';

import { useState } from 'react';
import { Colors } from '../../../../styles/colors';

// Sample sales data
const sampleSales = [
  { id: 'INV-001', date: '2024-03-28', time: '08:23 AM', product: 'Caffè Latte', category: 'Coffee', quantity: 2, unitPrice: 4.50, total: 9.00, paymentMethod: 'Credit Card', barista: 'Emma Watson', customerType: 'Regular' },
  { id: 'INV-002', date: '2024-03-28', time: '08:45 AM', product: 'Croissant', category: 'Pastry', quantity: 1, unitPrice: 3.50, total: 3.50, paymentMethod: 'Cash', barista: 'Liam Chen', customerType: 'New' },
  { id: 'INV-003', date: '2024-03-28', time: '09:15 AM', product: 'Caramel Macchiato', category: 'Coffee', quantity: 1, unitPrice: 5.50, total: 5.50, paymentMethod: 'Mobile Pay', barista: 'Sophia Rodriguez', customerType: 'Regular' },
  { id: 'INV-004', date: '2024-03-28', time: '09:30 AM', product: 'Matcha Latte', category: 'Tea', quantity: 1, unitPrice: 5.00, total: 5.00, paymentMethod: 'Credit Card', barista: 'Olivia Kim', customerType: 'Regular' },
  { id: 'INV-005', date: '2024-03-28', time: '10:00 AM', product: 'Blueberry Muffin', category: 'Pastry', quantity: 2, unitPrice: 3.00, total: 6.00, paymentMethod: 'Cash', barista: 'Emma Watson', customerType: 'New' },
  { id: 'INV-006', date: '2024-03-27', time: '07:30 AM', product: 'Espresso', category: 'Coffee', quantity: 3, unitPrice: 3.00, total: 9.00, paymentMethod: 'Credit Card', barista: 'Liam Chen', customerType: 'Regular' },
  { id: 'INV-007', date: '2024-03-27', time: '08:00 AM', product: 'Chai Latte', category: 'Tea', quantity: 1, unitPrice: 4.75, total: 4.75, paymentMethod: 'Mobile Pay', barista: 'Emma Watson', customerType: 'Regular' },
  { id: 'INV-008', date: '2024-03-27', time: '09:20 AM', product: 'Breakfast Sandwich', category: 'Food', quantity: 1, unitPrice: 6.00, total: 6.00, paymentMethod: 'Credit Card', barista: 'Mason Lee', customerType: 'New' },
  { id: 'INV-009', date: '2024-03-27', time: '10:45 AM', product: 'Vanilla Latte', category: 'Coffee', quantity: 2, unitPrice: 5.25, total: 10.50, paymentMethod: 'Cash', barista: 'Sophia Rodriguez', customerType: 'Regular' },
  { id: 'INV-010', date: '2024-03-26', time: '07:15 AM', product: 'Cold Brew', category: 'Coffee', quantity: 1, unitPrice: 4.50, total: 4.50, paymentMethod: 'Credit Card', barista: 'Olivia Kim', customerType: 'Regular' },
  { id: 'INV-011', date: '2024-03-26', time: '08:30 AM', product: 'Cinnamon Roll', category: 'Pastry', quantity: 1, unitPrice: 4.00, total: 4.00, paymentMethod: 'Mobile Pay', barista: 'Ethan Johnson', customerType: 'New' },
  { id: 'INV-012', date: '2024-03-26', time: '09:00 AM', product: 'Mocha', category: 'Coffee', quantity: 1, unitPrice: 5.75, total: 5.75, paymentMethod: 'Cash', barista: 'Emma Watson', customerType: 'Regular' },
];

// Helper function to get date range filter
const getDateFilter = (range: string, date: string) => {
  const today = new Date();
  const itemDate = new Date(date);
  
  switch(range) {
    case 'today':
      return itemDate.toDateString() === today.toDateString();
    case 'week': {
      const weekAgo = new Date();
      weekAgo.setDate(today.getDate() - 7);
      return itemDate >= weekAgo;
    }
    case 'month': {
      const monthAgo = new Date();
      monthAgo.setMonth(today.getMonth() - 1);
      return itemDate >= monthAgo;
    }
    default:
      return true;
  }
};

export default function SalesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState('week');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPayment, setSelectedPayment] = useState('All');
  const itemsPerPage = 8;

  // Filter sales
  const filteredSales = sampleSales.filter(sale => {
    const matchesSearch = sale.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.barista.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = getDateFilter(dateRange, sale.date);
    const matchesCategory = selectedCategory === 'All' || sale.category === selectedCategory;
    const matchesPayment = selectedPayment === 'All' || sale.paymentMethod === selectedPayment;
    return matchesSearch && matchesDate && matchesCategory && matchesPayment;
  });

  // Pagination
  const totalPages = Math.ceil(filteredSales.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSales = filteredSales.slice(startIndex, startIndex + itemsPerPage);

  // Stats calculations
  const totalRevenue = filteredSales.reduce((sum, sale) => sum + sale.total, 0);
  const totalTransactions = filteredSales.length;
  const averageOrderValue = totalTransactions > 0 ? totalRevenue / totalTransactions : 0;
  const topProduct = filteredSales.reduce((acc, sale) => {
    acc[sale.product] = (acc[sale.product] || 0) + sale.quantity;
    return acc;
  }, {} as Record<string, number>);
  const bestSeller = Object.entries(topProduct).sort((a, b) => b[1] - a[1])[0]?.[0] || '—';
  
  // Category breakdown
  const categoryRevenue = filteredSales.reduce((acc, sale) => {
    acc[sale.category] = (acc[sale.category] || 0) + sale.total;
    return acc;
  }, {} as Record<string, number>);

  const handleExport = (type: string) => {
    setShowExportDropdown(false);
    alert(`${type} export will be available soon!`);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold tracking-tight" style={{ color: Colors.primary }}>
          Sales Management
        </h1>
        <p className="text-gray-500 mt-1 text-sm">
          Track transactions, analyze revenue, and monitor sales performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(totalRevenue)}</p>
            </div>
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5" style={{ color: Colors.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Transactions</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{totalTransactions}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Average Order</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{formatCurrency(averageOrderValue)}</p>
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
              <p className="text-xs text-gray-500 uppercase tracking-wider">Best Seller</p>
              <p className="text-lg font-bold text-amber-600 mt-1 truncate">{bestSeller}</p>
            </div>
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Category Revenue Breakdown */}
      <div className="grid grid-cols-5 gap-3">
        {Object.entries(categoryRevenue).map(([category, revenue]) => (
          <div key={category} className="bg-gray-50 rounded-lg p-3 text-center border border-gray-100">
            <p className="text-xs text-gray-500">{category}</p>
            <p className="text-lg font-bold text-gray-800">{formatCurrency(revenue)}</p>
          </div>
        ))}
      </div>

      {/* Actions Bar */}
      <div className="flex flex-wrap justify-between gap-3 items-center">
        <div className="flex gap-2">
          {/* Date Range Filter */}
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="today">Today</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="all">All Time</option>
          </select>
          
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="All">All Categories</option>
            <option value="Coffee">Coffee</option>
            <option value="Tea">Tea</option>
            <option value="Pastry">Pastry</option>
            <option value="Food">Food</option>
          </select>
          
          {/* Payment Filter */}
          <select
            value={selectedPayment}
            onChange={(e) => setSelectedPayment(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="All">All Payments</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Cash">Cash</option>
            <option value="Mobile Pay">Mobile Pay</option>
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
              placeholder="Search by product, invoice, or barista..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-gray-50 hover:bg-white transition"
            />
          </div>

          {/* New Sale Button */}
          <button
            onClick={() => alert('New sale form coming soon!')}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-tertiary transition flex items-center gap-2 text-sm font-medium shadow-sm"
            style={{ backgroundColor: Colors.primary }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Sale
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
                  <button onClick={() => handleExport('Receipts')} className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 flex items-center gap-2 border-t">🧾 Receipts</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Sales Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Invoice</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Qty</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Unit Price</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Payment</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Barista</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedSales.length > 0 ? (
                paginatedSales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-mono font-semibold text-gray-900">{sale.id}</span>
                        {sale.customerType === 'New' && (
                          <span className="inline-flex px-1.5 py-0.5 bg-green-100 text-green-700 text-xs rounded">New</span>
                        )}
                      </div>
                     </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{sale.date}</div>
                      <div className="text-xs text-gray-500">{sale.time}</div>
                     </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-md bg-gradient-to-br from-primary/20 to-tertiary/20 flex items-center justify-center text-xs font-semibold" style={{ color: Colors.primary }}>
                          {sale.product.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{sale.product}</p>
                          <p className="text-xs text-gray-500">{sale.category}</p>
                        </div>
                      </div>
                     </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800">×{sale.quantity}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{formatCurrency(sale.unitPrice)}</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{formatCurrency(sale.total)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        sale.paymentMethod === 'Credit Card' ? 'bg-purple-100 text-purple-800' :
                        sale.paymentMethod === 'Cash' ? 'bg-green-100 text-green-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {sale.paymentMethod === 'Credit Card' ? '💳' : sale.paymentMethod === 'Cash' ? '💰' : '📱'} {sale.paymentMethod}
                      </span>
                     </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{sale.barista}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1.5">
                        <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition" title="View Details">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition" title="Refund">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 4V9a2 2 0 00-2-2h-1" />
                          </svg>
                        </button>
                        <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition" title="Print Receipt">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                          </svg>
                        </button>
                      </div>
                     </td>
                   </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <p className="text-gray-500 font-medium">No sales found</p>
                      <p className="text-gray-400 text-sm">Try adjusting your filters</p>
                    </div>
                   </td>
                 </tr>
              )}
            </tbody>
           </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center py-2">
          <p className="text-sm text-gray-500">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredSales.length)} of {filteredSales.length} transactions
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

      {/* Recent Activity Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-700">Recent Activity</h3>
          <span className="text-xs text-gray-400">Last 3 days</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Peak Hour</span>
            <span className="font-medium text-gray-800">9:00 AM - 10:00 AM</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Most Popular Payment</span>
            <span className="font-medium text-gray-800">
              {(() => {
                const payments = filteredSales.reduce((acc, s) => {
                  acc[s.paymentMethod] = (acc[s.paymentMethod] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>);
                const top = Object.entries(payments).sort((a, b) => b[1] - a[1])[0];
                return top ? `${top[0]} (${top[1]} transactions)` : '—';
              })()}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Top Barista</span>
            <span className="font-medium text-gray-800">
              {(() => {
                const baristas = filteredSales.reduce((acc, s) => {
                  acc[s.barista] = (acc[s.barista] || 0) + s.total;
                  return acc;
                }, {} as Record<string, number>);
                const top = Object.entries(baristas).sort((a, b) => b[1] - a[1])[0];
                return top ? `${top[0]} (${formatCurrency(top[1])})` : '—';
              })()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}