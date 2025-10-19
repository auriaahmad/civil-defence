// Pakistan Geographical Hierarchy Data
// Province → Division → District → Tehsil → Union Council

export const provinces = [
  { id: 'punjab', name: 'Punjab', urdu: 'پنجاب' },
  { id: 'sindh', name: 'Sindh', urdu: 'سندھ' },
  { id: 'kpk', name: 'Khyber Pakhtunkhwa', urdu: 'خیبر پختونخوا' },
  { id: 'balochistan', name: 'Balochistan', urdu: 'بلوچستان' },
  { id: 'gilgit', name: 'Gilgit-Baltistan', urdu: 'گلگت بلتستان' },
  { id: 'ajk', name: 'Azad Jammu & Kashmir', urdu: 'آزاد جموں و کشمیر' },
  { id: 'ict', name: 'Islamabad Capital Territory', urdu: 'وفاقی دارالحکومت' },
];

// Punjab Divisions
export const divisions = {
  punjab: [
    { id: 'lahore', name: 'Lahore Division', province: 'punjab' },
    { id: 'gujranwala', name: 'Gujranwala Division', province: 'punjab' },
    { id: 'rawalpindi', name: 'Rawalpindi Division', province: 'punjab' },
    { id: 'faisalabad', name: 'Faisalabad Division', province: 'punjab' },
    { id: 'multan', name: 'Multan Division', province: 'punjab' },
    { id: 'bahawalpur', name: 'Bahawalpur Division', province: 'punjab' },
    { id: 'dera-ghazi-khan', name: 'Dera Ghazi Khan Division', province: 'punjab' },
    { id: 'sahiwal', name: 'Sahiwal Division', province: 'punjab' },
    { id: 'sargodha', name: 'Sargodha Division', province: 'punjab' },
  ],
  sindh: [
    { id: 'karachi', name: 'Karachi Division', province: 'sindh' },
    { id: 'hyderabad', name: 'Hyderabad Division', province: 'sindh' },
    { id: 'sukkur', name: 'Sukkur Division', province: 'sindh' },
    { id: 'larkana', name: 'Larkana Division', province: 'sindh' },
    { id: 'mirpurkhas', name: 'Mirpur Khas Division', province: 'sindh' },
    { id: 'shaheed-benazirabad', name: 'Shaheed Benazirabad Division', province: 'sindh' },
  ],
  // Add more divisions for other provinces as needed
};

// Punjab Districts (36 districts)
export const districts = {
  lahore: [
    { id: 'lahore', name: 'Lahore', division: 'lahore' },
    { id: 'kasur', name: 'Kasur', division: 'lahore' },
    { id: 'okara', name: 'Okara', division: 'lahore' },
    { id: 'sheikhupura', name: 'Sheikhupura', division: 'lahore' },
    { id: 'nankana-sahib', name: 'Nankana Sahib', division: 'lahore' },
  ],
  gujranwala: [
    { id: 'gujranwala', name: 'Gujranwala', division: 'gujranwala' },
    { id: 'gujrat', name: 'Gujrat', division: 'gujranwala' },
    { id: 'hafizabad', name: 'Hafizabad', division: 'gujranwala' },
    { id: 'mandi-bahauddin', name: 'Mandi Bahauddin', division: 'gujranwala' },
    { id: 'narowal', name: 'Narowal', division: 'gujranwala' },
    { id: 'sialkot', name: 'Sialkot', division: 'gujranwala' },
  ],
  rawalpindi: [
    { id: 'rawalpindi', name: 'Rawalpindi', division: 'rawalpindi' },
    { id: 'attock', name: 'Attock', division: 'rawalpindi' },
    { id: 'chakwal', name: 'Chakwal', division: 'rawalpindi' },
    { id: 'jhelum', name: 'Jhelum', division: 'rawalpindi' },
  ],
  faisalabad: [
    { id: 'faisalabad', name: 'Faisalabad', division: 'faisalabad' },
    { id: 'chiniot', name: 'Chiniot', division: 'faisalabad' },
    { id: 'jhang', name: 'Jhang', division: 'faisalabad' },
    { id: 'toba-tek-singh', name: 'Toba Tek Singh', division: 'faisalabad' },
  ],
  multan: [
    { id: 'multan', name: 'Multan', division: 'multan' },
    { id: 'khanewal', name: 'Khanewal', division: 'multan' },
    { id: 'lodhran', name: 'Lodhran', division: 'multan' },
    { id: 'vehari', name: 'Vehari', division: 'multan' },
  ],
  bahawalpur: [
    { id: 'bahawalpur', name: 'Bahawalpur', division: 'bahawalpur' },
    { id: 'bahawalnagar', name: 'Bahawalnagar', division: 'bahawalpur' },
    { id: 'rahim-yar-khan', name: 'Rahim Yar Khan', division: 'bahawalpur' },
  ],
  'dera-ghazi-khan': [
    { id: 'dera-ghazi-khan', name: 'Dera Ghazi Khan', division: 'dera-ghazi-khan' },
    { id: 'layyah', name: 'Layyah', division: 'dera-ghazi-khan' },
    { id: 'muzaffargarh', name: 'Muzaffargarh', division: 'dera-ghazi-khan' },
    { id: 'rajanpur', name: 'Rajanpur', division: 'dera-ghazi-khan' },
  ],
  sahiwal: [
    { id: 'sahiwal', name: 'Sahiwal', division: 'sahiwal' },
    { id: 'pakpattan', name: 'Pakpattan', division: 'sahiwal' },
  ],
  sargodha: [
    { id: 'sargodha', name: 'Sargodha', division: 'sargodha' },
    { id: 'bhakkar', name: 'Bhakkar', division: 'sargodha' },
    { id: 'khushab', name: 'Khushab', division: 'sargodha' },
    { id: 'mianwali', name: 'Mianwali', division: 'sargodha' },
  ],
  // Sindh Districts
  karachi: [
    { id: 'karachi-central', name: 'Karachi Central', division: 'karachi' },
    { id: 'karachi-east', name: 'Karachi East', division: 'karachi' },
    { id: 'karachi-south', name: 'Karachi South', division: 'karachi' },
    { id: 'karachi-west', name: 'Karachi West', division: 'karachi' },
    { id: 'korangi', name: 'Korangi', division: 'karachi' },
    { id: 'malir', name: 'Malir', division: 'karachi' },
  ],
};

// Sample Tehsils (can be expanded)
export const tehsils = {
  lahore: [
    { id: 'lahore-city', name: 'Lahore City', district: 'lahore' },
    { id: 'lahore-cantt', name: 'Lahore Cantt', district: 'lahore' },
    { id: 'model-town', name: 'Model Town', district: 'lahore' },
    { id: 'raiwind', name: 'Raiwind', district: 'lahore' },
    { id: 'shalimar', name: 'Shalimar', district: 'lahore' },
  ],
  rawalpindi: [
    { id: 'rawalpindi', name: 'Rawalpindi', district: 'rawalpindi' },
    { id: 'gujar-khan', name: 'Gujar Khan', district: 'rawalpindi' },
    { id: 'kahuta', name: 'Kahuta', district: 'rawalpindi' },
    { id: 'kallar-syedan', name: 'Kallar Syedan', district: 'rawalpindi' },
    { id: 'taxila', name: 'Taxila', district: 'rawalpindi' },
  ],
  faisalabad: [
    { id: 'faisalabad-city', name: 'Faisalabad City', district: 'faisalabad' },
    { id: 'faisalabad-sadar', name: 'Faisalabad Sadar', district: 'faisalabad' },
    { id: 'jaranwala', name: 'Jaranwala', district: 'faisalabad' },
    { id: 'tandlianwala', name: 'Tandlianwala', district: 'faisalabad' },
  ],
  // Add more tehsils as needed
};

// Sample Union Councils (can be expanded significantly)
export const unionCouncils = {
  'lahore-city': [
    { id: 'uc-1', name: 'UC-1 Mochi Gate', tehsil: 'lahore-city' },
    { id: 'uc-2', name: 'UC-2 Bhati Gate', tehsil: 'lahore-city' },
    { id: 'uc-3', name: 'UC-3 Taxali Gate', tehsil: 'lahore-city' },
    // Add more UCs
  ],
  'model-town': [
    { id: 'uc-20', name: 'UC-20 Model Town', tehsil: 'model-town' },
    { id: 'uc-21', name: 'UC-21 Garden Town', tehsil: 'model-town' },
    // Add more UCs
  ],
  // Add more union councils as needed
};

// Helper function to get divisions by province
export const getDivisionsByProvince = (provinceId) => {
  return divisions[provinceId] || [];
};

// Helper function to get districts by division
export const getDistrictsByDivision = (divisionId) => {
  return districts[divisionId] || [];
};

// Helper function to get tehsils by district
export const getTehsilsByDistrict = (districtId) => {
  // Return specific tehsils if available, otherwise return default tehsils
  if (tehsils[districtId] && tehsils[districtId].length > 0) {
    return tehsils[districtId];
  }
  // Return default tehsils for districts without specific data
  return [
    { id: `${districtId}-city`, name: 'City Tehsil', district: districtId },
    { id: `${districtId}-sadar`, name: 'Sadar Tehsil', district: districtId },
  ];
};

// Helper function to get union councils by tehsil
export const getUnionCouncilsByTehsil = (tehsilId) => {
  return unionCouncils[tehsilId] || [];
};
