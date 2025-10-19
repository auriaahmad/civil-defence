'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { provinces, getDivisionsByProvince, getDistrictsByDivision } from '@/lib/constants/locations';
import { Download } from 'lucide-react';

export default function VolunteersPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUsername, setAdminUsername] = useState('');

  // Filter states
  const [filters, setFilters] = useState({
    search: '',
    province: '',
    division: '',
    district: '',
    status: '',
    education: '',
    availability: '',
  });

  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);

  // Sample volunteer data (will be fetched from API in production)
  const [volunteers, setVolunteers] = useState([
    {
      id: 1,
      fullName: 'Muhammad Ali Khan',
      cnic: '35202-1234567-1',
      phone: '+92-321-1234567',
      email: 'ali.khan@example.com',
      province: 'Punjab',
      district: 'Lahore',
      education: 'Bachelors',
      availability: 'Anytime',
      status: 'active',
      registrationDate: '2025-09-15',
    },
    {
      id: 2,
      fullName: 'Fatima Ahmed',
      cnic: '42201-9876543-2',
      phone: '+92-300-9876543',
      email: 'fatima.ahmed@example.com',
      province: 'Sindh',
      district: 'Karachi',
      education: 'Masters',
      availability: 'Weekends Only',
      status: 'active',
      registrationDate: '2025-09-18',
    },
    {
      id: 3,
      fullName: 'Ahmed Hassan',
      cnic: '61101-5555555-5',
      phone: '+92-333-5555555',
      email: 'ahmed.hassan@example.com',
      province: 'Islamabad Capital Territory',
      district: 'Islamabad',
      education: 'Intermediate',
      availability: 'Emergencies Only',
      status: 'pending',
      registrationDate: '2025-10-17',
    },
    {
      id: 4,
      fullName: 'Aisha Malik',
      cnic: '37405-2222222-2',
      phone: '+92-345-2222222',
      email: 'aisha.malik@example.com',
      province: 'Punjab',
      district: 'Rawalpindi',
      education: 'Bachelors',
      availability: 'Weekdays Only',
      status: 'active',
      registrationDate: '2025-10-01',
    },
    {
      id: 5,
      fullName: 'Bilal Ahmed',
      cnic: '33100-7777777-7',
      phone: '+92-312-7777777',
      email: 'bilal.ahmed@example.com',
      province: 'Punjab',
      district: 'Faisalabad',
      education: 'Matric',
      availability: 'Anytime',
      status: 'inactive',
      registrationDate: '2025-08-22',
    },
  ]);

  const [selectedVolunteers, setSelectedVolunteers] = useState([]);
  const [filteredVolunteers, setFilteredVolunteers] = useState(volunteers);

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
  }, [router]);

  useEffect(() => {
    // Apply filters
    let filtered = volunteers;

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (v) =>
          v.fullName.toLowerCase().includes(searchLower) ||
          v.cnic.includes(searchLower) ||
          v.email.toLowerCase().includes(searchLower) ||
          v.phone.includes(searchLower)
      );
    }

    if (filters.province) {
      filtered = filtered.filter((v) => v.province === filters.province);
    }

    if (filters.district) {
      filtered = filtered.filter((v) => v.district === filters.district);
    }

    if (filters.status) {
      filtered = filtered.filter((v) => v.status === filters.status);
    }

    if (filters.education) {
      filtered = filtered.filter((v) => v.education === filters.education);
    }

    if (filters.availability) {
      filtered = filtered.filter((v) => v.availability === filters.availability);
    }

    setFilteredVolunteers(filtered);
  }, [filters, volunteers]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Handle cascading location filters
    if (name === 'province') {
      const newDivisions = getDivisionsByProvince(value);
      setDivisions(newDivisions);
      setDistricts([]);
      setFilters((prev) => ({
        ...prev,
        province: value,
        division: '',
        district: '',
      }));
    } else if (name === 'division') {
      const newDistricts = getDistrictsByDivision(value);
      setDistricts(newDistricts);
      setFilters((prev) => ({
        ...prev,
        division: value,
        district: '',
      }));
    }
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      province: '',
      division: '',
      district: '',
      status: '',
      education: '',
      availability: '',
    });
    setDivisions([]);
    setDistricts([]);
  };

  const handleSelectVolunteer = (id) => {
    setSelectedVolunteers((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedVolunteers.length === filteredVolunteers.length) {
      setSelectedVolunteers([]);
    } else {
      setSelectedVolunteers(filteredVolunteers.map((v) => v.id));
    }
  };

  const handleExport = () => {
    const volunteersToExport = filteredVolunteers.filter((v) =>
      selectedVolunteers.length > 0 ? selectedVolunteers.includes(v.id) : true
    );

    // Create CSV content
    const headers = ['Name', 'CNIC', 'Phone', 'WhatsApp', 'Email', 'District', 'Status'];
    const csvContent = [
      headers.join(','),
      ...volunteersToExport.map((v) =>
        [v.fullName, v.cnic, v.phone, v.phone, v.email, v.district, v.status].join(',')
      ),
    ].join('\n');

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `volunteers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const handleBulkAction = (action) => {
    if (selectedVolunteers.length === 0) {
      alert('Please select at least one volunteer');
      return;
    }

    // TODO: Implement bulk actions with API
    console.log(`Bulk action: ${action}`, selectedVolunteers);
    alert(`${action} action will be applied to ${selectedVolunteers.length} volunteers`);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
    router.push('/admin/login');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-green-700 bg-green-100';
      case 'pending':
        return 'text-yellow-700 bg-yellow-100';
      case 'inactive':
        return 'text-gray-700 bg-gray-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
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
              className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-sm font-medium"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/volunteers"
              className="border-b-2 border-[#01411C] text-[#01411C] py-4 px-1 text-sm font-medium"
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
        {/* Filters */}
        <Card className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Filter Volunteers</h2>
            <Button variant="outline" onClick={handleClearFilters} className="text-sm">
              Clear Filters
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input
              label="Search"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Name, CNIC, Email, Phone"
            />

            <Select
              label="Province"
              name="province"
              value={filters.province}
              onChange={handleFilterChange}
              options={provinces}
              placeholder="All Provinces"
            />

            {divisions.length > 0 && (
              <Select
                label="Division"
                name="division"
                value={filters.division}
                onChange={handleFilterChange}
                options={divisions}
                placeholder="All Divisions"
              />
            )}

            {districts.length > 0 && (
              <Select
                label="District"
                name="district"
                value={filters.district}
                onChange={handleFilterChange}
                options={districts}
                placeholder="All Districts"
              />
            )}

            <Select
              label="Status"
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              options={[
                { id: 'active', name: 'Active' },
                { id: 'pending', name: 'Pending' },
                { id: 'inactive', name: 'Inactive' },
              ]}
              placeholder="All Statuses"
            />

            <Select
              label="Education"
              name="education"
              value={filters.education}
              onChange={handleFilterChange}
              options={[
                { id: 'Matric', name: 'Matric' },
                { id: 'Intermediate', name: 'Intermediate' },
                { id: 'Bachelors', name: 'Bachelors' },
                { id: 'Masters', name: 'Masters' },
              ]}
              placeholder="All Education Levels"
            />

            <Select
              label="Availability"
              name="availability"
              value={filters.availability}
              onChange={handleFilterChange}
              options={[
                { id: 'Weekdays Only', name: 'Weekdays Only' },
                { id: 'Weekends Only', name: 'Weekends Only' },
                { id: 'Anytime', name: 'Anytime' },
                { id: 'Emergencies Only', name: 'Emergencies Only' },
              ]}
              placeholder="All Availability"
            />
          </div>
        </Card>

        {/* Bulk Actions */}
        <Card className="mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {selectedVolunteers.length} of {filteredVolunteers.length} selected
              </span>
              {selectedVolunteers.length > 0 && (
                <div className="flex gap-2">
                  <Button variant="success" onClick={() => handleBulkAction('Approve')} className="text-sm">
                    Approve
                  </Button>
                  <Button variant="alert" onClick={() => handleBulkAction('Reject')} className="text-sm">
                    Reject
                  </Button>
                  <Button variant="outline" onClick={() => handleBulkAction('Deactivate')} className="text-sm">
                    Deactivate
                  </Button>
                </div>
              )}
            </div>
            <Button variant="info" onClick={handleExport} className="text-sm flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export {selectedVolunteers.length > 0 ? 'Selected' : 'All'}
            </Button>
          </div>
        </Card>

        {/* Volunteers Table */}
        <Card padding={false}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedVolunteers.length === filteredVolunteers.length && filteredVolunteers.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-[#01411C] focus:ring-[#01411C]"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CNIC
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredVolunteers.map((volunteer) => (
                  <tr key={volunteer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedVolunteers.includes(volunteer.id)}
                        onChange={() => handleSelectVolunteer(volunteer.id)}
                        className="rounded border-gray-300 text-[#01411C] focus:ring-[#01411C]"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{volunteer.fullName}</div>
                      <div className="text-sm text-gray-500">{volunteer.education}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{volunteer.cnic}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{volunteer.phone}</div>
                      <div className="text-sm text-gray-500">{volunteer.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{volunteer.district}</div>
                      <div className="text-sm text-gray-500">{volunteer.province}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(volunteer.status)}`}>
                        {volunteer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button className="text-[#01411C] hover:text-[#025a28] font-medium mr-3">
                        View
                      </button>
                      <button className="text-[#2563EB] hover:text-[#1d4ed8] font-medium">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredVolunteers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No volunteers found matching your filters.</p>
              </div>
            )}
          </div>
        </Card>
      </main>
    </div>
  );
}
