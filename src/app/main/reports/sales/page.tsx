// app/main/reports/sales/page.tsx
'use client';

import { useState } from 'react';
import { Colors } from '../../../../styles/colors';

const sampleSalesData = [
  { id: 1, date: '2024-03-25', time: '10:30 AM', invoiceNo: 'INV-001', customer: 'John Smith', items: 3, subtotal: 42.50, tax: 3.40, total: 45.90, paymentMethod: 'Credit Card', status: 'Completed', cashier: 'Sarah Johnson' },
  { id: 2, date: '2024-03-25', time: '11:15 AM', invoiceNo: 'INV-002', customer: 'Emma Davis', items: 2, subtotal: 28.00, tax: 2.24, total: 30.24, paymentMethod: 'Cash', status: 'Completed', cashier: 'Mike Wilson' },
  { id: 3, date: '2024-03-25', time: '12:00 PM', invoiceNo: 'INV-003', customer: 'James Brown', items: 4, subtotal: 62.00, tax: 4.96, total: 66.96, paymentMethod: 'Debit Card', status: 'Completed', cashier: 'Sarah Johnson' },
  { id: 4, date: '2024-03-25', time: '01:30 PM', invoiceNo: 'INV-004', customer: 'Lisa Anderson', items: 1, subtotal: 4.50, tax: 0.36, total: 4.86, paymentMethod: 'Cash', status: 'Completed', cashier: 'Mike Wilson' },
  { id: 5, date: '2024-03-24', time: '09:45 AM', invoiceNo: 'INV-005', customer: 'Robert Taylor', items: 3, subtotal: 38.50, tax: 3.08, total: 41.58, paymentMethod: 'Credit Card', status: 'Completed', cashier: 'Sarah Johnson' },
  { id: 6, date: '2024-03-24', time: '02:15 PM', invoiceNo: 'INV-006', customer: 'Maria Garcia', items: 2, subtotal: 7.50, tax: 0.60, total: 8.10, paymentMethod: 'Cash', status: 'Refunded', cashier: 'Mike Wilson' },
  { id: 7, date: '2024-03-24', time: '04:00 PM', invoiceNo: 'INV-007', customer: 'David Lee', items: 5, subtotal: 75.00, tax: 6.00, total: 81.00, paymentMethod: 'Credit Card', status: 'Completed', cashier: 'Sarah Johnson' },
  { id: 8, date: '2024-03-23', time: '11:30 AM', invoiceNo: 'INV-008', customer: 'Anna White', items: 2, subtotal: 9.00, tax: 0.72, total: 9.72, paymentMethod: 'Debit Card', status: 'Completed', cashier: 'Mike Wilson' },
  { id: 9, date: '2024-03-23', time: '01:45 PM', invoiceNo: 'INV-009', customer: 'John Smith', items: 3, subtotal: 52.00, tax: 4.16, total: 56.16, paymentMethod: 'Credit Card', status: 'Completed', cashier: 'Sarah Johnson' },
  { id: 10, date: '2024-03-23', time: '03:30 PM', invoiceNo: 'INV-010', customer: 'Emma Davis', items: 1, subtotal: 5.50, tax: 0.44, total: 5.94, paymentMethod: 'Cash', status: 'Pending', cashier: 'Mike Wilson' },
  { id: 11, date: '2024-03-22', time: '10:00 AM', invoiceNo: 'INV-011', customer: 'James Brown', items: 4, subtotal: 48.00, tax: 3.84, total: 51.84, paymentMethod: 'Credit Card', status: 'Completed', cashier: 'Sarah Johnson' },
  { id: 12, date: '2024-03-22', time: '12:30 PM', invoiceNo: 'INV-012', customer: 'Lisa Anderson', items: 2, subtotal: 18.50, tax: 1.48, total: 19.98, paymentMethod: 'Cash', status: 'Completed', cashier: 'Mike Wilson' },
];

export default function SalesReportPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFilter, setDateFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const itemsPerPage = 10;

  // Filter sales data
  const filteredSales = sampleSalesData.filter(sale => {
    const matchesSearch = sale.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.cashier.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDate = dateFilter === 'all' || 
      (dateFilter === 'today' && sale.date === new Date().toISOString().split('T')[0]) ||
      // eslint-disable-next-line react-hooks/purity
      (dateFilter === 'week' && new Date(sale.date) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
      (dateFilter === 'month' && new Date(sale.date).getMonth() === new Date().getMonth());
    
    const matchesStatus = statusFilter === 'all' || sale.status === statusFilter;
    
    return matchesSearch && matchesDate && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredSales.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSales = filteredSales.slice(startIndex, startIndex + itemsPerPage);

  const handleExport = (type: string) => {
    setShowExportDropdown(false);
    alert(`${type} export feature will be available soon!`);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  // Stats calculations
  const totalSales = filteredSales.reduce((sum, sale) => sum + sale.total, 0);
  const totalTransactions = filteredSales.length;
  const averageOrder = totalSales / totalTransactions || 0;
  const completedSales = filteredSales.filter(s => s.status === 'Completed').length;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold tracking-tight" style={{ color: Colors.primary }}>
          Sales Report
        </h1>
        <p className="text-gray-500 mt-1 text-sm">
          Track and analyze your daily sales transactions and revenue
        </p>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-3 items-center">
            {/* Search Field */}
            <div className="relative w-64">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by invoice or customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-gray-50 hover:bg-white transition"
              />
            </div>

            {/* Date Filter */}
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Status</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Refunded">Refunded</option>
            </select>
          </div>

          {/* Export Button */}
          <div className="relative">
            <button
              onClick={() => setShowExportDropdown(!showExportDropdown)}
              className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition flex items-center gap-2 text-sm font-medium bg-gray-50 hover:bg-white"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export Report
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showExportDropdown && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowExportDropdown(false)} />
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-100 z-20 overflow-hidden">
                  <button
                    onClick={() => handleExport('CSV')}
                    className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition flex items-center gap-2"
                  >
                    <span className="text-lg">📊</span>
                    Export as CSV
                  </button>
                  <button
                    onClick={() => handleExport('PDF')}
                    className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition flex items-center gap-2 border-t border-gray-100"
                  >
                    <span className="text-lg">📄</span>
                    Export as PDF
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white">
          <p className="text-sm opacity-90">Total Revenue</p>
          <p className="text-2xl font-bold mt-1">${totalSales.toFixed(2)}</p>
          <p className="text-xs opacity-75 mt-1">from {totalTransactions} transactions</p>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white">
          <p className="text-sm opacity-90">Average Order Value</p>
          <p className="text-2xl font-bold mt-1">${averageOrder.toFixed(2)}</p>
          <p className="text-xs opacity-75 mt-1">per transaction</p>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 text-white">
          <p className="text-sm opacity-90">Total Transactions</p>
          <p className="text-2xl font-bold mt-1">{totalTransactions}</p>
          <p className="text-xs opacity-75 mt-1">{completedSales} completed</p>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-4 text-white">
          <p className="text-sm opacity-90">Tax Collected</p>
          <p className="text-2xl font-bold mt-1">${filteredSales.reduce((sum, s) => sum + s.tax, 0).toFixed(2)}</p>
          <p className="text-xs opacity-75 mt-1">in sales tax</p>
        </div>
      </div>

      {/* Sales Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Invoice #</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Time</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Items</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Subtotal</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tax</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Payment</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Cashier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedSales.length > 0 ? (
                paginatedSales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{sale.invoiceNo}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{sale.date}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{sale.time}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{sale.customer}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{sale.items}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">${sale.subtotal.toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">${sale.tax.toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">${sale.total.toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{sale.paymentMethod}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        sale.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        sale.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          sale.status === 'Completed' ? 'bg-green-500' :
                          sale.status === 'Pending' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></span>
                        {sale.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{sale.cashier}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={11} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      <p className="text-gray-500 font-medium">No sales data found</p>
                      <p className="text-gray-400 text-sm">Try adjusting your filters</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Section */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center py-2">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium text-gray-700">{startIndex + 1}</span> to{' '}
            <span className="font-medium text-gray-700">{Math.min(startIndex + itemsPerPage, filteredSales.length)}</span> of{' '}
            <span className="font-medium text-gray-700">{filteredSales.length}</span> transactions
          </p>
          <div className="flex gap-1.5">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition"
            >
              ← Previous
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => goToPage(pageNum)}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition ${
                    currentPage === pageNum
                      ? 'bg-primary text-white shadow-sm'
                      : 'border border-gray-300 hover:bg-gray-50'
                  }`}
                  style={currentPage === pageNum ? { backgroundColor: Colors.primary } : {}}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}