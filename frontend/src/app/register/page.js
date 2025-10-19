'use client';

import { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';
import Alert from '@/components/ui/Alert';
import {
  validateCNIC,
  validatePhone,
  validateEmail,
  validateMinimumAge,
  validateRequired,
  validateName,
  formatCNIC,
  formatPhone,
  getValidationError,
} from '@/lib/utils/validation';
import {
  provinces,
  getDivisionsByProvince,
  getDistrictsByDivision,
  getTehsilsByDistrict,
  getUnionCouncilsByTehsil,
} from '@/lib/constants/locations';

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    fatherName: '',
    cnic: '',
    dateOfBirth: '',
    gender: '',

    // Contact Information
    phone: '',
    whatsapp: '',
    email: '',

    // Location Information
    province: '',
    division: '',
    district: '',
    tehsil: '',
    unionCouncil: '',
    houseNumber: '',
    street: '',
    blockMohalla: '',
    village: '',
    city: '',
    address: '',
    postalCode: '',

    // Volunteer Information
    education: '',
    occupation: '',
    skills: [],
    availability: '',
    experience: '',
    emergencyContact: '',
    emergencyPhone: '',
  });

  const [errors, setErrors] = useState({});
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [tehsils, setTehsils] = useState([]);
  const [unionCouncils, setUnionCouncils] = useState([]);
  const [submitStatus, setSubmitStatus] = useState(null);

  const totalSteps = 4;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    // Format CNIC and phone numbers as user types
    if (name === 'cnic') {
      processedValue = formatCNIC(value);
    } else if (name === 'phone' || name === 'whatsapp' || name === 'emergencyPhone') {
      processedValue = formatPhone(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }

    // Handle cascading location selects
    if (name === 'province') {
      const newDivisions = getDivisionsByProvince(value);
      setDivisions(newDivisions);
      setDistricts([]);
      setTehsils([]);
      setUnionCouncils([]);
      setFormData((prev) => ({
        ...prev,
        province: value,
        division: '',
        district: '',
        tehsil: '',
        unionCouncil: '',
        city: '',
      }));
    } else if (name === 'division') {
      const newDistricts = getDistrictsByDivision(value);
      setDistricts(newDistricts);
      setTehsils([]);
      setUnionCouncils([]);
      setFormData((prev) => ({
        ...prev,
        division: value,
        district: '',
        tehsil: '',
        unionCouncil: '',
      }));
    } else if (name === 'district') {
      const newTehsils = getTehsilsByDistrict(value);
      setTehsils(newTehsils);
      setUnionCouncils([]);
      setFormData((prev) => ({
        ...prev,
        district: value,
        tehsil: '',
        unionCouncil: '',
      }));
    } else if (name === 'tehsil') {
      const newUnionCouncils = getUnionCouncilsByTehsil(value);
      setUnionCouncils(newUnionCouncils);
      setFormData((prev) => ({
        ...prev,
        tehsil: value,
        unionCouncil: '',
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      // Personal Information validation
      if (!validateRequired(formData.fullName)) {
        newErrors.fullName = getValidationError('Full Name', 'required');
      } else if (!validateName(formData.fullName)) {
        newErrors.fullName = getValidationError('Full Name', 'name');
      }

      if (!validateRequired(formData.fatherName)) {
        newErrors.fatherName = getValidationError('Father Name', 'required');
      } else if (!validateName(formData.fatherName)) {
        newErrors.fatherName = getValidationError('Father Name', 'name');
      }

      if (!validateCNIC(formData.cnic)) {
        newErrors.cnic = getValidationError('CNIC', 'cnic');
      }

      if (!validateRequired(formData.dateOfBirth)) {
        newErrors.dateOfBirth = getValidationError('Date of Birth', 'required');
      } else if (!validateMinimumAge(formData.dateOfBirth)) {
        newErrors.dateOfBirth = getValidationError('Age', 'age');
      }

      if (!validateRequired(formData.gender)) {
        newErrors.gender = getValidationError('Gender', 'required');
      }
    } else if (step === 2) {
      // Contact Information validation
      if (!validatePhone(formData.phone)) {
        newErrors.phone = getValidationError('Phone', 'phone');
      }

      if (formData.whatsapp && !validatePhone(formData.whatsapp)) {
        newErrors.whatsapp = getValidationError('WhatsApp', 'phone');
      }

      if (!validateEmail(formData.email)) {
        newErrors.email = getValidationError('Email', 'email');
      }
    } else if (step === 3) {
      // Location Information validation
      if (!validateRequired(formData.province)) {
        newErrors.province = getValidationError('Province', 'required');
      }

      if (!validateRequired(formData.division)) {
        newErrors.division = getValidationError('Division', 'required');
      }

      if (!validateRequired(formData.district)) {
        newErrors.district = getValidationError('District', 'required');
      }

      if (!validateRequired(formData.tehsil)) {
        newErrors.tehsil = getValidationError('Tehsil', 'required');
      }

      if (!validateRequired(formData.street)) {
        newErrors.street = getValidationError('Street', 'required');
      }

      if (!validateRequired(formData.blockMohalla)) {
        newErrors.blockMohalla = getValidationError('Block/Mohalla/Society', 'required');
      }

      if (!validateRequired(formData.city)) {
        newErrors.city = getValidationError('City', 'required');
      }

      if (!validateRequired(formData.postalCode)) {
        newErrors.postalCode = getValidationError('Postal Code', 'required');
      }
    } else if (step === 4) {
      // Volunteer Information validation
      if (!validateRequired(formData.education)) {
        newErrors.education = getValidationError('Education', 'required');
      }

      if (!validateRequired(formData.availability)) {
        newErrors.availability = getValidationError('Availability', 'required');
      }

      if (!validateRequired(formData.emergencyContact)) {
        newErrors.emergencyContact = getValidationError('Emergency Contact Name', 'required');
      }

      if (!validatePhone(formData.emergencyPhone)) {
        newErrors.emergencyPhone = getValidationError('Emergency Contact Phone', 'phone');
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(currentStep)) {
      return;
    }

    try {
      // TODO: Replace with actual API call
      console.log('Form Data:', formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSubmitStatus({
        type: 'success',
        message: 'Registration successful! Thank you for joining Civil Defence Pakistan. You will receive a confirmation email shortly.',
      });

      // Reset form
      setTimeout(() => {
        window.location.href = '/';
      }, 3000);
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Registration failed. Please try again or contact support.',
      });
    }
  };

  const renderStepIndicator = () => {
    const steps = [
      { number: 1, label: 'Personal' },
      { number: 2, label: 'Contact' },
      { number: 3, label: 'Location' },
      { number: 4, label: 'Volunteer Info' },
    ];

    return (
      <div className="mb-8">
        {/* Progress bar with circles */}
        <div className="flex items-center justify-between mb-3">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all font-semibold shrink-0 ${
                  currentStep >= step.number
                    ? 'bg-[#01411C] border-[#01411C] text-white shadow-md'
                    : 'bg-white border-gray-300 text-gray-500'
                }`}
              >
                {step.number}
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 h-1 mx-3">
                  <div
                    className={`h-full transition-all ${
                      currentStep > step.number ? 'bg-[#01411C]' : 'bg-gray-300'
                    }`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Labels underneath */}
        <div className="flex justify-between">
          {steps.map((step) => (
            <div key={step.number} className="flex-1 text-center">
              <span
                className={`text-sm font-medium transition-colors ${
                  currentStep >= step.number ? 'text-[#01411C]' : 'text-gray-500'
                }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Volunteer Registration
            </h1>
            <p className="text-gray-600">
              Join Civil Defence Pakistan and make a difference in your community
            </p>
          </div>

          <Card>
            {submitStatus && (
              <Alert
                type={submitStatus.type}
                message={submitStatus.message}
                onClose={() => setSubmitStatus(null)}
              />
            )}

            {renderStepIndicator()}

            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">Personal Information</h2>

                  <Input
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    error={errors.fullName}
                    required
                    placeholder="Enter your full name"
                  />

                  <Input
                    label="Father's Name"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleInputChange}
                    error={errors.fatherName}
                    required
                    placeholder="Enter your father's name"
                  />

                  <Input
                    label="CNIC Number"
                    name="cnic"
                    value={formData.cnic}
                    onChange={handleInputChange}
                    error={errors.cnic}
                    required
                    placeholder="XXXXX-XXXXXXX-X"
                    helperText="13-digit CNIC number"
                    maxLength={15}
                  />

                  <Input
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    error={errors.dateOfBirth}
                    required
                    helperText="You must be at least 18 years old"
                  />

                  <Select
                    label="Gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    error={errors.gender}
                    required
                    options={[
                      { id: 'male', name: 'Male' },
                      { id: 'female', name: 'Female' },
                      { id: 'other', name: 'Other' },
                    ]}
                  />
                </div>
              )}

              {/* Step 2: Contact Information */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">Contact Information</h2>

                  <Input
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    error={errors.phone}
                    required
                    placeholder="+92-XXX-XXXXXXX"
                    helperText="Pakistani phone number"
                  />

                  <Input
                    label="WhatsApp Number (Optional)"
                    name="whatsapp"
                    type="tel"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    error={errors.whatsapp}
                    placeholder="+92-XXX-XXXXXXX"
                    helperText="Leave blank if same as phone number"
                  />

                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
              )}

              {/* Step 3: Location Information */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">Location Information</h2>

                  <Select
                    label="Province/Territory"
                    name="province"
                    value={formData.province}
                    onChange={handleInputChange}
                    error={errors.province}
                    required
                    options={provinces}
                  />

                  {divisions.length > 0 && (
                    <Select
                      label="Division"
                      name="division"
                      value={formData.division}
                      onChange={handleInputChange}
                      error={errors.division}
                      required
                      options={divisions}
                    />
                  )}

                  {districts.length > 0 && (
                    <Select
                      label="District"
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      error={errors.district}
                      required
                      options={districts}
                    />
                  )}

                  {districts.length > 0 && formData.district && (
                    <Select
                      label="Tehsil"
                      name="tehsil"
                      value={formData.tehsil}
                      onChange={handleInputChange}
                      required
                      error={errors.tehsil}
                      options={tehsils}
                    />
                  )}

                  {unionCouncils.length > 0 && (
                    <Select
                      label="Union Council (Optional)"
                      name="unionCouncil"
                      value={formData.unionCouncil}
                      onChange={handleInputChange}
                      options={unionCouncils}
                    />
                  )}

                  <div className="border-t border-gray-200 pt-6 mt-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">Complete Address</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="House/Flat Number (Optional)"
                        name="houseNumber"
                        value={formData.houseNumber}
                        onChange={handleInputChange}
                        placeholder="e.g., House 123, Flat 4B"
                      />

                      <Input
                        label="Street/Road Name"
                        name="street"
                        value={formData.street}
                        onChange={handleInputChange}
                        error={errors.street}
                        required
                        placeholder="e.g., Main Boulevard"
                      />

                      <Input
                        label="Block/Mohalla/Society"
                        name="blockMohalla"
                        value={formData.blockMohalla}
                        onChange={handleInputChange}
                        error={errors.blockMohalla}
                        required
                        placeholder="e.g., Block C, Gulshan Colony"
                      />

                      <Input
                        label="Village (Optional)"
                        name="village"
                        value={formData.village}
                        onChange={handleInputChange}
                        placeholder="e.g., Chak No. 123"
                      />

                      <Input
                        label="City"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        error={errors.city}
                        required
                        placeholder="e.g., Lahore"
                        helperText="If city not in list, enter nearest city"
                      />

                      <Input
                        label="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="e.g., Near City Hospital, DHA Phase 5"
                        helperText="Area/Sector or landmark"
                      />

                      <Input
                        label="Postal Code"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        error={errors.postalCode}
                        required
                        placeholder="e.g., 54000"
                        maxLength={5}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Volunteer Information */}
              {currentStep === 4 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">Volunteer Information</h2>

                  <Select
                    label="Education Level"
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    error={errors.education}
                    required
                    options={[
                      { id: 'primary', name: 'Primary School' },
                      { id: 'middle', name: 'Middle School' },
                      { id: 'matric', name: 'Matric' },
                      { id: 'intermediate', name: 'Intermediate' },
                      { id: 'bachelors', name: 'Bachelors' },
                      { id: 'masters', name: 'Masters' },
                      { id: 'phd', name: 'PhD or Higher' },
                    ]}
                  />

                  <Input
                    label="Occupation (Optional)"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    placeholder="Your current occupation"
                  />

                  <Select
                    label="Availability"
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    error={errors.availability}
                    required
                    options={[
                      { id: 'weekdays', name: 'Weekdays Only' },
                      { id: 'weekends', name: 'Weekends Only' },
                      { id: 'anytime', name: 'Anytime' },
                      { id: 'emergencies', name: 'Emergencies Only' },
                    ]}
                  />

                  <div className="mb-4">
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                      Previous Volunteer Experience (Optional)
                    </label>
                    <textarea
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#01411C] focus:border-transparent"
                      placeholder="Describe any previous volunteer or emergency response experience"
                    />
                  </div>

                  <Input
                    label="Emergency Contact Name"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    error={errors.emergencyContact}
                    required
                    placeholder="Name of emergency contact person"
                  />

                  <Input
                    label="Emergency Contact Phone"
                    name="emergencyPhone"
                    type="tel"
                    value={formData.emergencyPhone}
                    onChange={handleInputChange}
                    error={errors.emergencyPhone}
                    required
                    placeholder="+92-XXX-XXXXXXX"
                  />
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>

                {currentStep < totalSteps ? (
                  <Button type="button" onClick={handleNext}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit" variant="success">
                    Submit Registration
                  </Button>
                )}
              </div>
            </form>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
