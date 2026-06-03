// app/main/management/baristas/page.tsx
'use client';

import { useState } from 'react';
import { Colors } from '../../../../styles/colors';

// Sample barista data
const sampleBaristas = [
  { id: 1, name: 'Emma Watson', email: 'emma.watson@brewscafe.com', phone: '(555) 123-4567', role: 'Head Barista', shift: 'Morning', status: 'Active', joinDate: '2023-01-15', avatar: 'EW', certifications: ['Latte Art', 'Pour Over'] },
  { id: 2, name: 'Liam Chen', email: 'liam.chen@brewscafe.com', phone: '(555) 234-5678', role: 'Senior Barista', shift: 'Morning', status: 'Active', joinDate: '2023-03-20', avatar: 'LC', certifications: ['Espresso', 'Cupping'] },
  { id: 3, name: 'Sophia Rodriguez', email: 'sophia.r@brewscafe.com', phone: '(555) 345-6789', role: 'Barista', shift: 'Afternoon', status: 'Active', joinDate: '2024-01-10', avatar: 'SR', certifications: ['Brewing'] },
  { id: 4, name: 'Noah Williams', email: 'noah.w@brewscafe.com', phone: '(555) 456-7890', role: 'Barista', shift: 'Evening', status: 'Inactive', joinDate: '2023-11-05', avatar: 'NW', certifications: [] },
  { id: 5, name: 'Olivia Kim', email: 'olivia.kim@brewscafe.com', phone: '(555) 567-8901', role: 'Head Barista', shift: 'Morning', status: 'Active', joinDate: '2022-08-12', avatar: 'OK', certifications: ['Latte Art', 'Espresso', 'Roasting'] },
  { id: 6, name: 'Mason Lee', email: 'mason.lee@brewscafe.com', phone: '(555) 678-9012', role: 'Barista', shift: 'Afternoon', status: 'Active', joinDate: '2024-02-18', avatar: 'ML', certifications: ['Pour Over'] },
  { id: 7, name: 'Isabella Garcia', email: 'isabella.g@brewscafe.com', phone: '(555) 789-0123', role: 'Barista', shift: 'Evening', status: 'On Leave', joinDate: '2023-09-30', avatar: 'IG', certifications: ['Brewing', 'Latte Art'] },
  { id: 8, name: 'Ethan Johnson', email: 'ethan.j@brewscafe.com', phone: '(555) 890-1234', role: 'Senior Barista', shift: 'Morning', status: 'Active', joinDate: '2023-05-14', avatar: 'EJ', certifications: ['Espresso', 'Cupping', 'Latte Art'] },
];

export default function BaristaManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddBarista, setShowAddBarista] = useState(false);
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const itemsPerPage = 5;

  // Filter baristas based on search, role, and status
  const filteredBaristas = sampleBaristas.filter(barista => {
    const matchesSearch = barista.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      barista.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      barista.phone.includes(searchTerm) ||
      barista.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'All' || barista.role === selectedRole;
    const matchesStatus = selectedStatus === 'All' || barista.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBaristas.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBaristas = filteredBaristas.slice(startIndex, startIndex + itemsPerPage);

  // Stats
  const totalBaristas = sampleBaristas.length;
  const activeCount = sampleBaristas.filter(b => b.status === 'Active').length;
  const onLeaveCount = sampleBaristas.filter(b => b.status === 'On Leave').length;
  const headBaristas = sampleBaristas.filter(b => b.role === 'Head Barista').length;

  const getStatusStyles = (status: string) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'On Leave': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleBadgeStyles = (role: string) => {
    switch(role) {
      case 'Head Barista': return 'bg-amber-100 text-amber-800';
      case 'Senior Barista': return 'bg-blue-100 text-blue-800';
      default: return 'bg-purple-100 text-purple-800';
    }
  };

  const handleExport = (type: string) => {
    setShowExportDropdown(false);
    alert(`${type} export will be available soon!`);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  // Shift schedule data for upcoming week
  const weeklySchedule = [
    { day: 'Monday', morning: 'Emma, Liam', afternoon: 'Sophia, Mason', evening: 'Noah, Isabella' },
    { day: 'Tuesday', morning: 'Emma, Olivia', afternoon: 'Sophia, Mason', evening: 'Isabella' },
    { day: 'Wednesday', morning: 'Liam, Olivia', afternoon: 'Sophia, Ethan', evening: 'Noah' },
    { day: 'Thursday', morning: 'Emma, Liam', afternoon: 'Mason, Ethan', evening: 'Isabella' },
    { day: 'Friday', morning: 'Olivia, Ethan', afternoon: 'Sophia, Mason', evening: 'Noah, Isabella' },
    { day: 'Saturday', morning: 'Emma, Liam, Olivia', afternoon: 'Ethan, Mason', evening: 'Noah' },
    { day: 'Sunday', morning: 'Emma, Olivia', afternoon: 'Sophia, Ethan', evening: 'Isabella' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold tracking-tight" style={{ color: Colors.primary }}>
          Barista Management
        </h1>
        <p className="text-gray-500 mt-1 text-sm">
          Manage your coffee shop team, track performance, and schedule shifts
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Total Baristas</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalBaristas}</p>
            </div>
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5" style={{ color: Colors.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Active Now</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{activeCount}</p>
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
              <p className="text-xs text-gray-500 uppercase tracking-wider">On Leave</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">{onLeaveCount}</p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Head Baristas</p>
              <p className="text-2xl font-bold text-amber-600 mt-1">{headBaristas}</p>
            </div>
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-wrap justify-between gap-3 items-center">
        <div className="flex gap-2">
          {/* Role Filter */}
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="All">All Roles</option>
            <option value="Head Barista">Head Barista</option>
            <option value="Senior Barista">Senior Barista</option>
            <option value="Barista">Barista</option>
          </select>
          
          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="On Leave">On Leave</option>
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
              placeholder="Search by name, email, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-gray-50 hover:bg-white transition"
            />
          </div>

          {/* Add Barista Button */}
          <button
            onClick={() => setShowAddBarista(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-tertiary transition flex items-center gap-2 text-sm font-medium shadow-sm"
            style={{ backgroundColor: Colors.primary }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Barista
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
                  <button onClick={() => handleExport('Schedule')} className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 flex items-center gap-2 border-t">📅 Schedule</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Barista Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Barista</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Shift</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Certifications</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Join Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedBaristas.length > 0 ? (
                paginatedBaristas.map((barista) => (
                  <tr key={barista.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-tertiary flex items-center justify-center text-white text-xs font-semibold shadow-sm">
                          {barista.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{barista.name}</p>
                          <p className="text-xs text-gray-500">ID: #{barista.id.toString().padStart(3, '0')}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{barista.email}</div>
                      <div className="text-xs text-gray-500">{barista.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getRoleBadgeStyles(barista.role)}`}>
                        {barista.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700">{barista.shift}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusStyles(barista.status)}`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${barista.status === 'Active' ? 'bg-green-500' : barista.status === 'On Leave' ? 'bg-yellow-500' : 'bg-gray-500'}`}></span>
                        {barista.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {barista.certifications.length > 0 ? barista.certifications.map((cert, idx) => (
                          <span key={idx} className="inline-block px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600">{cert}</span>
                        )) : <span className="text-xs text-gray-400">—</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{barista.joinDate}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1.5">
                        <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition" title="Edit">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition" title="Remove">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                        <button className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-lg transition" title="Schedule">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <p className="text-gray-500 font-medium">No baristas found</p>
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
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredBaristas.length)} of {filteredBaristas.length} baristas
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

      {/* Weekly Schedule Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Weekly Schedule</h2>
            <p className="text-xs text-gray-500 mt-0.5">Upcoming shift assignments</p>
          </div>
          <button className="text-sm text-primary hover:underline" style={{ color: Colors.primary }}>Edit Schedule →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Day</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Morning (6am-2pm)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Afternoon (2pm-10pm)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Evening (10pm-6am)</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {weeklySchedule.map((day, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium text-gray-900">{day.day}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{day.morning || '—'}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{day.afternoon || '—'}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{day.evening || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Barista Modal */}
      {showAddBarista && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Add New Barista</h3>
              <button onClick={() => setShowAddBarista(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="e.g., John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="john@brewscafe.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="(555) 000-0000" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Barista</option>
                    <option>Senior Barista</option>
                    <option>Head Barista</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Shift</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Morning</option>
                    <option>Afternoon</option>
                    <option>Evening</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setShowAddBarista(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition">Cancel</button>
              <button onClick={() => { alert('Barista added! (demo)'); setShowAddBarista(false); }} className="px-4 py-2 text-sm font-medium text-white rounded-lg transition" style={{ backgroundColor: Colors.primary }}>Add Barista</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}