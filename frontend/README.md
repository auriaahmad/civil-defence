# Civil Defence Pakistan - Volunteer Management System

A modern web-based platform for managing volunteer registration and emergency response coordination across Pakistan.

## Features

### Public Features
- **Home Page**: Hero section with stats, features, and call-to-action
- **Multi-Step Registration**: Comprehensive 4-step volunteer registration form with:
  - Personal Information (Name, CNIC, DOB, Gender)
  - Contact Information (Phone, WhatsApp, Email)
  - Location Information (5-level Pakistani geographical hierarchy)
  - Volunteer Information (Education, Availability, Skills, Emergency Contact)
- **Form Validation**: Pakistani CNIC format, phone numbers, age verification (18+)
- **About Page**: Mission, objectives, and coverage information

### Admin Features
- **Admin Login**: Secure authentication (demo mode enabled)
- **Dashboard**: Statistics and analytics overview
  - Total/Active/Pending volunteers count
  - Province-wise volunteer distribution
  - Recent registrations
  - Quick action buttons
- **Volunteer Management**:
  - Advanced filtering (by province, district, status, education, availability)
  - Search functionality (name, CNIC, email, phone)
  - Bulk actions (approve, reject, deactivate)
  - CSV export functionality
  - Volunteer details view

## Technology Stack

- **Framework**: Next.js 15.5.4 with React 19.1.0
- **Styling**: Tailwind CSS v4 (PostCSS-based)
- **Build Tool**: Turbopack (Next.js built-in)
- **Font**: Geist Sans & Geist Mono
- **Linting**: ESLint 9

## Project Structure

```
frontend/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.js            # Root layout
│   │   ├── page.js              # Home page
│   │   ├── globals.css          # Global styles with Tailwind
│   │   ├── about/
│   │   │   └── page.js          # About page
│   │   ├── register/
│   │   │   └── page.js          # Volunteer registration form
│   │   └── admin/
│   │       ├── login/
│   │       │   └── page.js      # Admin login
│   │       ├── dashboard/
│   │       │   └── page.js      # Admin dashboard
│   │       └── volunteers/
│   │           └── page.js      # Volunteer management
│   ├── components/
│   │   └── ui/                  # Reusable UI components
│   │       ├── Button.js
│   │       ├── Input.js
│   │       ├── Select.js
│   │       ├── Card.js
│   │       ├── Alert.js
│   │       ├── Navbar.js
│   │       └── Footer.js
│   └── lib/
│       ├── constants/
│       │   └── locations.js     # Pakistani geographical data
│       └── utils/
│           └── validation.js    # Validation functions
├── public/                      # Static assets
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
# Development mode with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Brand Colors

- **Primary (Pakistan Green)**: `#01411C`
- **Secondary (White)**: `#FFFFFF`
- **Alert/Emergency (Red)**: `#DC2626`
- **Success (Green)**: `#059669`
- **Info (Blue)**: `#2563EB`

## Pakistani Geographical Hierarchy

The system implements Pakistan's complete 5-level administrative hierarchy:

1. **Province/Territory** (7 total)
   - Punjab
   - Sindh
   - Khyber Pakhtunkhwa
   - Balochistan
   - Gilgit-Baltistan
   - Azad Jammu & Kashmir
   - Islamabad Capital Territory

2. **Division** (varies by province)
3. **District** (159 total across Pakistan)
4. **Tehsil** (optional)
5. **Union Council** (optional)

## Validation Rules

### CNIC Format
- 13 digits in format: `XXXXX-XXXXXXX-X`
- Automatically formatted as user types

### Phone Numbers
- Pakistani format: `+92-XXX-XXXXXXX` or `03XX-XXXXXXX`
- Automatically formatted as user types

### Age Verification
- Minimum age: 18 years
- Calculated from date of birth

### Email
- Standard email format validation

## Demo Mode

The admin section currently runs in demo mode:
- Any username/password will grant access
- Data is stored in browser localStorage
- Sample volunteer data is pre-loaded

**Note**: This is for demonstration purposes. In production, this will be replaced with actual API authentication and database integration.

## Future Backend Integration

The frontend is designed to integrate with:
- **Backend**: Express.js + MongoDB
- **Authentication**: JWT-based admin authentication
- **API Endpoints**: RESTful API for volunteer CRUD operations
- **File Upload**: CNIC/document upload functionality
- **WhatsApp Integration**: Bulk messaging for volunteer coordination

## Mobile Responsiveness

The application is fully responsive and optimized for:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## Performance Considerations

- Server-side rendering with Next.js for fast initial page loads
- Turbopack for blazing-fast development builds
- Lazy loading for images and components
- Optimized for low-bandwidth scenarios (common in Pakistan)

## Contributing

This is a government project for Civil Defence Pakistan. For contributions or issues, please contact the project administrators.

## License

© 2025 Civil Defence Pakistan. All rights reserved.

## Contact

- **Emergency Hotline**: 1122
- **Email**: info@civildefence.gov.pk
- **Headquarters**: Islamabad, Pakistan

---

**Built with ❤️ for the people of Pakistan**
