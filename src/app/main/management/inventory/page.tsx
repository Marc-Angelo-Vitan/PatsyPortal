// app/main/management/inventory/page.tsx
'use client';

import { useState } from 'react';
import { Colors } from '../../../../styles/colors';

const sampleInventory = [
  { id: 1, product: 'Espresso Beans', category: 'Coffee Beans', quantity: 45, unit: 'kg', minStock: 20, maxStock: 100, status: 'Good', lastRestocked: '2024-03-25', supplier: 'Bean Importers Co.' },
  { id: 2, product: 'Milk', category: 'Dairy', quantity: 30, unit: 'liters', minStock: 15, maxStock: 50, status: 'Good', lastRestocked: '2024-03-26', supplier: 'Fresh Dairy Farms' },
  { id: 3, product: 'Sugar', category: 'Supplies', quantity: 12, unit: 'kg', minStock: 10, maxStock: 30, status: 'Low', lastRestocked: '2024-03-20', supplier: 'Sweet Supplies Inc.' },
  { id: 4, product: 'Cups (12oz)', category: 'Packaging', quantity: 500, unit: 'pcs', minStock: 200, maxStock: 1000, status: 'Good', lastRestocked: '2024-03-24', supplier: 'Eco Packaging' },
  { id: 5, product: 'Lids', category: 'Packaging', quantity: 350, unit: 'pcs', minStock: 200, maxStock: 1000, status: 'Good', lastRestocked: '2024-03-24', supplier: 'Eco Packaging' },
  { id: 6, product: 'Vanilla Syrup', category: 'Syrups', quantity: 8, unit: 'bottles', minStock: 10, maxStock: 30, status: 'Critical', lastRestocked: '2024-03-15', supplier: 'Flavor House' },
  { id: 7, product: 'Caramel Syrup', category: 'Syrups', quantity: 5, unit: 'bottles', minStock: 10, maxStock: 30, status: 'Critical', lastRestocked: '2024-03-15', supplier: 'Flavor House' },
  { id: 8, product: 'Napkins', category: 'Supplies', quantity: 1000, unit: 'pcs', minStock: 500, maxStock: 2000, status: 'Good', lastRestocked: '2024-03-22', supplier: 'Eco Packaging' },
  { id: 9, product: 'Straws', category: 'Supplies', quantity: 800, unit: 'pcs', minStock: 300, maxStock: 1500, status: 'Good', lastRestocked: '2024-03-22', supplier: 'Eco Packaging' },
  { id: 10, product: 'Chocolate Powder', category: 'Ingredients', quantity: 6, unit: 'kg', minStock: 8, maxStock: 25, status: 'Low', lastRestocked: '2024-03-18', supplier: 'Cocoa Masters' },
];

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter inventory
  const filteredInventory = sampleInventory.filter(item =>
    item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredInventory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedInventory = filteredInventory.slice(startIndex, startIndex + itemsPerPage);

  const handleExport = (type: string) => {
    setShowExportDropdown(false);
    alert(`${type} export feature will be available soon!`);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  // Stats calculations
  const totalItems = sampleInventory.length;
  const criticalItems = sampleInventory.filter(i => i.status === 'Critical').length;
  const lowItems = sampleInventory.filter(i => i.status === 'Low').length;
  const totalQuantity = sampleInventory.reduce((sum, i) => sum + i.quantity, 0);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'Low': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const getStatusDot = (status: string) => {
    switch(status) {
      case 'Critical': return 'bg-red-500';
      case 'Low': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold tracking-tight" style={{ color: Colors.primary }}>
          Inventory Management
        </h1>
        <p className="text-gray-500 mt-1 text-sm">
          Track and manage your coffee shop inventory, stock levels, and suppliers
        </p>
      </div>

      {/* Actions Bar */}
      <div className="flex justify-end gap-3 items-center">
        {/* Search Field */}
        <div className="relative w-64">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by product, category or supplier..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-gray-50 hover:bg-white transition"
          />
        </div>

        {/* Add Stock Button */}
        <button
          onClick={() => alert('Add stock form coming soon!')}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-tertiary transition flex items-center gap-2 text-sm font-medium shadow-sm"
          style={{ backgroundColor: Colors.primary }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Stock
        </button>

        {/* Export Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowExportDropdown(!showExportDropdown)}
            className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition flex items-center gap-2 text-sm font-medium bg-gray-50 hover:bg-white"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export Data
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

      {/* Inventory Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Min Stock</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Last Restocked</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Supplier</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedInventory.length > 0 ? (
                paginatedInventory.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-tertiary flex items-center justify-center text-white text-xs font-semibold">
                          {item.product.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{item.product}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{item.quantity} {item.unit}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.minStock} {item.unit}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${getStatusDot(item.status)}`}></span>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.lastRestocked}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.supplier}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1.5">
                        <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition" title="Edit Stock">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition" title="Delete Item">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                      <p className="text-gray-500 font-medium">No inventory items found</p>
                      <p className="text-gray-400 text-sm">Try adjusting your search criteria</p>
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
            <span className="font-medium text-gray-700">{Math.min(startIndex + itemsPerPage, filteredInventory.length)}</span> of{' '}
            <span className="font-medium text-gray-700">{filteredInventory.length}</span> items
          </p>
          <div className="flex gap-1.5">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition"
            >
              ← Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition ${
                  currentPage === page
                    ? 'bg-primary text-white shadow-sm'
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
                style={currentPage === page ? { backgroundColor: Colors.primary } : {}}
              >
                {page}
              </button>
            ))}
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

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Total Items</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalItems}</p>
            </div>
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5" style={{ color: Colors.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Critical Stock</p>
              <p className="text-2xl font-bold text-red-600 mt-1">{criticalItems}</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Low Stock</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">{lowItems}</p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Total Quantity</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalQuantity.toLocaleString()} units</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}