// app/main/reports/product/page.tsx
'use client';

import { useState } from 'react';
import { Colors } from '../../../../styles/colors';

const sampleProductReports = [
  { id: 1, productName: 'Espresso', category: 'Coffee', unitsSold: 245, revenue: 857.50, avgPrice: 3.50, cost: 1.20, profit: 230.30, profitMargin: 26.9, stockLevel: 150, status: 'Best Seller' },
  { id: 2, productName: 'Latte', category: 'Coffee', unitsSold: 189, revenue: 850.50, avgPrice: 4.50, cost: 1.50, profit: 567.00, profitMargin: 66.7, stockLevel: 120, status: 'Popular' },
  { id: 3, productName: 'Cappuccino', category: 'Coffee', unitsSold: 156, revenue: 702.00, avgPrice: 4.50, cost: 1.50, profit: 468.00, profitMargin: 66.7, stockLevel: 45, status: 'Low Stock' },
  { id: 4, productName: 'Americano', category: 'Coffee', unitsSold: 134, revenue: 402.00, avgPrice: 3.00, cost: 1.00, profit: 268.00, profitMargin: 66.7, stockLevel: 200, status: 'Popular' },
  { id: 5, productName: 'Mocha', category: 'Coffee', unitsSold: 112, revenue: 560.00, avgPrice: 5.00, cost: 1.80, profit: 358.40, profitMargin: 64.0, stockLevel: 35, status: 'Low Stock' },
  { id: 6, productName: 'Cold Brew', category: 'Coffee', unitsSold: 98, revenue: 441.00, avgPrice: 4.50, cost: 1.40, profit: 303.80, profitMargin: 68.9, stockLevel: 80, status: 'Growing' },
  { id: 7, productName: 'Blueberry Muffin', category: 'Pastry', unitsSold: 78, revenue: 234.00, avgPrice: 3.00, cost: 1.00, profit: 156.00, profitMargin: 66.7, stockLevel: 25, status: 'Low Stock' },
  { id: 8, productName: 'Croissant', category: 'Pastry', unitsSold: 67, revenue: 234.50, avgPrice: 3.50, cost: 1.20, profit: 154.10, profitMargin: 65.7, stockLevel: 40, status: 'Popular' },
  { id: 9, productName: 'Green Tea', category: 'Tea', unitsSold: 54, revenue: 162.00, avgPrice: 3.00, cost: 0.80, profit: 118.80, profitMargin: 73.3, stockLevel: 95, status: 'Steady' },
  { id: 10, productName: 'Chai Latte', category: 'Tea', unitsSold: 43, revenue: 172.00, avgPrice: 4.00, cost: 1.30, profit: 116.10, profitMargin: 67.5, stockLevel: 60, status: 'Steady' },
];

export default function ProductReportPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const itemsPerPage = 10;

  // Filter products
  const filteredProducts = sampleProductReports.filter(product => {
    const matchesSearch = product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleExport = (type: string) => {
    setShowExportDropdown(false);
    alert(`${type} export feature will be available soon!`);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  // Stats calculations
  const totalRevenue = filteredProducts.reduce((sum, p) => sum + p.revenue, 0);
  const totalProfit = filteredProducts.reduce((sum, p) => sum + p.profit, 0);
  const totalUnits = filteredProducts.reduce((sum, p) => sum + p.unitsSold, 0);
  const avgProfitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue * 100).toFixed(1) : 0;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold tracking-tight" style={{ color: Colors.primary }}>
          Product Reports
        </h1>
        <p className="text-gray-500 mt-1 text-sm">
          Analyze product performance, sales trends, and profitability
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
                placeholder="Search by product name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-gray-50 hover:bg-white transition"
              />
            </div>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Categories</option>
              <option value="Coffee">Coffee</option>
              <option value="Tea">Tea</option>
              <option value="Pastry">Pastry</option>
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
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 text-white">
          <p className="text-sm opacity-90">Total Revenue</p>
          <p className="text-2xl font-bold mt-1">${totalRevenue.toFixed(2)}</p>
          <p className="text-xs opacity-75 mt-1">From all products</p>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white">
          <p className="text-sm opacity-90">Total Profit</p>
          <p className="text-2xl font-bold mt-1">${totalProfit.toFixed(2)}</p>
          <p className="text-xs opacity-75 mt-1">Net earnings</p>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white">
          <p className="text-sm opacity-90">Units Sold</p>
          <p className="text-2xl font-bold mt-1">{totalUnits.toLocaleString()}</p>
          <p className="text-xs opacity-75 mt-1">Total items sold</p>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-4 text-white">
          <p className="text-sm opacity-90">Avg Profit Margin</p>
          <p className="text-2xl font-bold mt-1">{avgProfitMargin}%</p>
          <p className="text-xs opacity-75 mt-1">Profitability rate</p>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Units Sold</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Revenue</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Cost</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Profit</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Margin</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Stock</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-tertiary flex items-center justify-center text-white text-xs font-semibold">
                          {product.productName.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{product.productName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        product.category === 'Coffee' ? 'bg-amber-100 text-amber-800' :
                        product.category === 'Tea' ? 'bg-green-100 text-green-800' :
                        'bg-pink-100 text-pink-800'
                      }`}>
                        {product.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">{product.unitsSold}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">${product.revenue.toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">${product.cost.toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-green-600">${product.profit.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 rounded-full h-2" 
                            style={{ width: `${Math.min(product.profitMargin, 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-gray-600">{product.profitMargin}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{product.stockLevel} units</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        product.status === 'Best Seller' ? 'bg-yellow-100 text-yellow-800' :
                        product.status === 'Popular' ? 'bg-green-100 text-green-800' :
                        product.status === 'Low Stock' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      <p className="text-gray-500 font-medium">No products found</p>
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
            <span className="font-medium text-gray-700">{Math.min(startIndex + itemsPerPage, filteredProducts.length)}</span> of{' '}
            <span className="font-medium text-gray-700">{filteredProducts.length}</span> products
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