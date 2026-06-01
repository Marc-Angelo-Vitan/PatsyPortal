// app/main/reports/transaction/page.tsx
'use client';

import { useState } from 'react';
import { Colors } from '../../../../styles/colors';

const sampleTransactions = [
  { id: 1, transactionId: 'TRX-001', date: '2024-03-25', time: '10:30 AM', type: 'Sale', amount: 45.90, paymentMethod: 'Credit Card', status: 'Completed', customer: 'John Smith', cashier: 'Sarah Johnson', reference: 'INV-001' },
  { id: 2, transactionId: 'TRX-002', date: '2024-03-25', time: '11:15 AM', type: 'Sale', amount: 30.24, paymentMethod: 'Cash', status: 'Completed', customer: 'Emma Davis', cashier: 'Mike Wilson', reference: 'INV-002' },
  { id: 3, transactionId: 'TRX-003', date: '2024-03-25', time: '12:00 PM', type: 'Refund', amount: 15.50, paymentMethod: 'Credit Card', status: 'Completed', customer: 'James Brown', cashier: 'Sarah Johnson', reference: 'REF-001' },
  { id: 4, transactionId: 'TRX-004', date: '2024-03-25', time: '01:30 PM', type: 'Sale', amount: 4.86, paymentMethod: 'Cash', status: 'Completed', customer: 'Lisa Anderson', cashier: 'Mike Wilson', reference: 'INV-004' },
  { id: 5, transactionId: 'TRX-005', date: '2024-03-24', time: '09:45 AM', type: 'Sale', amount: 41.58, paymentMethod: 'Credit Card', status: 'Completed', customer: 'Robert Taylor', cashier: 'Sarah Johnson', reference: 'INV-005' },
  { id: 6, transactionId: 'TRX-006', date: '2024-03-24', time: '02:15 PM', type: 'Void', amount: 8.10, paymentMethod: 'Cash', status: 'Cancelled', customer: 'Maria Garcia', cashier: 'Mike Wilson', reference: 'VOID-001' },
  { id: 7, transactionId: 'TRX-007', date: '2024-03-24', time: '04:00 PM', type: 'Sale', amount: 81.00, paymentMethod: 'Credit Card', status: 'Completed', customer: 'David Lee', cashier: 'Sarah Johnson', reference: 'INV-007' },
  { id: 8, transactionId: 'TRX-008', date: '2024-03-23', time: '11:30 AM', type: 'Sale', amount: 9.72, paymentMethod: 'Debit Card', status: 'Completed', customer: 'Anna White', cashier: 'Mike Wilson', reference: 'INV-008' },
  { id: 9, transactionId: 'TRX-009', date: '2024-03-23', time: '01:45 PM', type: 'Sale', amount: 56.16, paymentMethod: 'Credit Card', status: 'Pending', customer: 'John Smith', cashier: 'Sarah Johnson', reference: 'INV-009' },
  { id: 10, transactionId: 'TRX-010', date: '2024-03-23', time: '03:30 PM', type: 'Refund', amount: 5.94, paymentMethod: 'Cash', status: 'Completed', customer: 'Emma Davis', cashier: 'Mike Wilson', reference: 'REF-002' },
  { id: 11, transactionId: 'TRX-011', date: '2024-03-22', time: '10:00 AM', type: 'Sale', amount: 51.84, paymentMethod: 'Credit Card', status: 'Completed', customer: 'James Brown', cashier: 'Sarah Johnson', reference: 'INV-011' },
  { id: 12, transactionId: 'TRX-012', date: '2024-03-22', time: '12:30 PM', type: 'Sale', amount: 19.98, paymentMethod: 'Cash', status: 'Completed', customer: 'Lisa Anderson', cashier: 'Mike Wilson', reference: 'INV-012' },
];

export default function TransactionReportPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const itemsPerPage = 10;

  // Filter transactions
  const filteredTransactions = sampleTransactions.filter(transaction => {
    const matchesSearch = transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.cashier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  const handleExport = (type: string) => {
    setShowExportDropdown(false);
    alert(`${type} export feature will be available soon!`);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  // Stats calculations
  const totalAmount = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  const totalTransactions = filteredTransactions.length;
  const totalSales = filteredTransactions.filter(t => t.type === 'Sale').reduce((sum, t) => sum + t.amount, 0);
  const totalRefunds = filteredTransactions.filter(t => t.type === 'Refund').reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold tracking-tight" style={{ color: Colors.primary }}>
          Transaction Reports
        </h1>
        <p className="text-gray-500 mt-1 text-sm">
          Track all financial transactions including sales, refunds, and voids
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
                placeholder="Search by ID, customer, cashier..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-gray-50 hover:bg-white transition"
              />
            </div>

            {/* Transaction Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Types</option>
              <option value="Sale">Sales</option>
              <option value="Refund">Refunds</option>
              <option value="Void">Voids</option>
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
              <option value="Cancelled">Cancelled</option>
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
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white">
          <p className="text-sm opacity-90">Total Transactions</p>
          <p className="text-2xl font-bold mt-1">{totalTransactions}</p>
          <p className="text-xs opacity-75 mt-1">All types</p>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white">
          <p className="text-sm opacity-90">Total Sales</p>
          <p className="text-2xl font-bold mt-1">${totalSales.toFixed(2)}</p>
          <p className="text-xs opacity-75 mt-1">From sales only</p>
        </div>
        
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-4 text-white">
          <p className="text-sm opacity-90">Total Refunds</p>
          <p className="text-2xl font-bold mt-1">${totalRefunds.toFixed(2)}</p>
          <p className="text-xs opacity-75 mt-1">Processed refunds</p>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 text-white">
          <p className="text-sm opacity-90">Net Revenue</p>
          <p className="text-2xl font-bold mt-1">${(totalSales - totalRefunds).toFixed(2)}</p>
          <p className="text-xs opacity-75 mt-1">After refunds</p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Transaction ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Time</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Payment</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Cashier</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedTransactions.length > 0 ? (
                paginatedTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-mono font-medium text-gray-900">{transaction.transactionId}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{transaction.date}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{transaction.time}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        transaction.type === 'Sale' ? 'bg-green-100 text-green-800' :
                        transaction.type === 'Refund' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800">{transaction.customer}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">${transaction.amount.toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{transaction.paymentMethod}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        transaction.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          transaction.status === 'Completed' ? 'bg-green-500' :
                          transaction.status === 'Pending' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></span>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{transaction.cashier}</td>
                    <td className="px-4 py-3 text-sm font-mono text-gray-500">{transaction.reference}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      <p className="text-gray-500 font-medium">No transactions found</p>
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
            <span className="font-medium text-gray-700">{Math.min(startIndex + itemsPerPage, filteredTransactions.length)}</span> of{' '}
            <span className="font-medium text-gray-700">{filteredTransactions.length}</span> transactions
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