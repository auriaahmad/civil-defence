'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Users, UserCheck, Clock, Map, FileText, Download, UserPlus } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUsername, setAdminUsername] = useState('');
  const [stats, setStats] = useState({
    totalVolunteers: 12543,
    activeVolunteers: 8921,
    pendingApplications: 234,
    totalProvinces: 7,
    totalDistricts: 159,
    volunteersByProvince: [
      { name: 'Punjab', count: 5234 },
      { name: 'Sindh', count: 3421 },
      { name: 'Khyber Pakhtunkhwa', count: 1892 },
      { name: 'Balochistan', count: 987 },
      { name: 'Gilgit-Baltistan', count: 543 },
      { name: 'Azad Jammu & Kashmir', count: 321 },
      { name: 'Islamabad Capital Territory', count: 145 },
    ],
    recentRegistrations: [
      { id: 1, name: 'Muhammad Ali', district: 'Lahore', date: '2025-10-18' },
      { id: 2, name: 'Fatima Khan', district: 'Karachi', date: '2025-10-18' },
      { id: 3, name: 'Ahmed Hassan', district: 'Islamabad', date: '2025-10-17' },
      { id: 4, name: 'Aisha Malik', district: 'Rawalpindi', date: '2025-10-17' },
      { id: 5, name: 'Bilal Ahmed', district: 'Faisalabad', date: '2025-10-16' },
    ],
  });

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('adminToken');
    const username = localStorage.getItem('adminUsername');

    if (!token) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
      setAdminUsername(username || 'Admin');
    }

    // TODO: Fetch actual stats from API
    // fetchDashboardStats();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
    router.push('/admin/login');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#01411C] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#01411C] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Civil Defence Admin</h1>
              <p className="text-sm text-gray-200">Welcome back, {adminUsername}</p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="secondary" className="text-sm">
                  View Public Site
                </Button>
              </Link>
              <Button variant="alert" onClick={handleLogout} className="text-sm">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <Link
              href="/admin/dashboard"
              className="border-b-2 border-[#01411C] text-[#01411C] py-4 px-1 text-sm font-medium"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/volunteers"
              className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-sm font-medium"
            >
              Manage Volunteers
            </Link>
            <Link
              href="/admin/reports"
              className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-sm font-medium"
            >
              Reports
            </Link>
            <Link
              href="/admin/settings"
              className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-sm font-medium"
            >
              Settings
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="gradient-card border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Volunteers</p>
                <p className="text-3xl font-bold text-[#01411C]">{stats.totalVolunteers.toLocaleString()}</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="gradient-card border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Volunteers</p>
                <p className="text-3xl font-bold text-[#059669]">{stats.activeVolunteers.toLocaleString()}</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-green-50">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="gradient-card border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending Applications</p>
                <p className="text-3xl font-bold text-[#DC2626]">{stats.pendingApplications}</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-red-50">
                <Clock className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </Card>

          <Card className="gradient-card border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Districts Covered</p>
                <p className="text-3xl font-bold text-[#2563EB]">{stats.totalDistricts}</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-50">
                <Map className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Volunteers by Province */}
          <Card className="gradient-card border border-gray-100">
            <h2 className="text-xl font-bold mb-4">Volunteers by Province</h2>
            <div className="space-y-3">
              {stats.volunteersByProvince.map((province) => (
                <div key={province.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{province.name}</span>
                    <span className="font-medium text-gray-900">{province.count.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#01411C] h-2 rounded-full"
                      style={{
                        width: `${(province.count / stats.totalVolunteers) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Registrations */}
          <Card className="gradient-card border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Recent Registrations</h2>
              <Link href="/admin/volunteers">
                <span className="text-sm text-[#01411C] hover:text-[#025a28] font-medium">
                  View All →
                </span>
              </Link>
            </div>
            <div className="space-y-3">
              {stats.recentRegistrations.map((volunteer) => (
                <div
                  key={volunteer.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <p className="font-medium text-gray-900">{volunteer.name}</p>
                    <p className="text-sm text-gray-600">{volunteer.district}</p>
                  </div>
                  <div className="text-sm text-gray-500">{volunteer.date}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-6 gradient-card border border-gray-100">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/admin/volunteers">
              <Button fullWidth variant="primary" className="flex items-center justify-center gap-2">
                <FileText className="w-4 h-4" />
                Manage Volunteers
              </Button>
            </Link>
            <Link href="/admin/volunteers?filter=pending">
              <Button fullWidth variant="info" className="flex items-center justify-center gap-2">
                <Clock className="w-4 h-4" />
                Review Pending ({stats.pendingApplications})
              </Button>
            </Link>
            <Link href="/admin/volunteers?action=export">
              <Button fullWidth variant="success" className="flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Export Data
              </Button>
            </Link>
          </div>
        </Card>
      </main>
    </div>
  );
}
