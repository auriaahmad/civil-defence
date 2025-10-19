# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Civil Defence Volunteer Management System for Pakistan - A web-based platform enabling volunteer registration and administrative management for emergency response coordination. The system allows citizens to register as volunteers and enables administrators to manage and contact volunteers based on geographical location during emergencies.

## Technology Stack

- **Frontend**: Next.js 15.5.4 with React 19.1.0
- **Styling**: Tailwind CSS v4 (PostCSS-based)
- **Build Tool**: Turbopack (Next.js built-in)
- **Linting**: ESLint 9 with Next.js config
- **Future Backend**: Express.js + MongoDB (not yet implemented)

## Development Commands

### Running the Application

```bash
# Development mode with Turbopack (fast refresh)
npm run dev

# Production build with Turbopack
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

The development server runs on `http://localhost:3000` by default.

## Project Architecture

### Current Structure

This is a Next.js App Router project with the following structure:

- `src/app/` - App Router pages and layouts
  - `layout.js` - Root layout with Geist fonts and global metadata
  - `page.js` - Home page (currently placeholder)
  - `globals.css` - Global styles using Tailwind v4 with CSS variables for theming
- `public/` - Static assets
- `frontend/` - Empty directory (reserved for future organization)
- `claude.md` - Detailed project specification with all features and requirements

### Planned Architecture

The application will have two main areas:

1. **Public Volunteer Registration**
   - Multi-step registration form with comprehensive volunteer information
   - Pakistani geographical hierarchy (Province → Division → District → Tehsil → Union Council)
   - CNIC validation and phone number validation (Pakistani formats)
   - No authentication required

2. **Admin Dashboard** (Authentication Required)
   - Volunteer management with advanced filtering
   - Geographical filtering at all administrative levels
   - Skills-based search and emergency response tools
   - Export functionality for WhatsApp contact lists
   - Province/District/Block-wise volunteer organization

### Database Schema (MongoDB - Planned)

Key collections defined in `claude.md`:

- **Volunteers Collection**: Personal info, contact info, location (with 5-level Pakistani geographical hierarchy), volunteer info, documents, status
- **Admins Collection**: Username, email, hashed password, role-based permissions
- **Locations Collection**: Reference data for Pakistan's administrative divisions (7 provinces/territories, 159 total districts)

See `claude.md` for complete schema definitions.

## Key Implementation Details

### Tailwind CSS v4 Configuration

This project uses Tailwind CSS v4 with the new PostCSS architecture:
- Configuration is in `src/app/globals.css` using `@theme inline` directive
- CSS variables for theming: `--color-background`, `--color-foreground`
- Font variables defined in layout: `--font-geist-sans`, `--font-geist-mono`
- Dark mode support via `prefers-color-scheme`

### Next.js App Router Conventions

- Use `page.js` for route pages
- Use `layout.js` for shared layouts
- Server Components by default (use `'use client'` directive when needed)
- Metadata exported from layouts and pages for SEO

### Pakistani Context Requirements

When implementing features, be aware of:

1. **CNIC Format**: 13 digits (XXXXX-XXXXXXX-X) with uniqueness validation
2. **Phone Number Format**: Pakistani format validation
3. **Geographical Hierarchy**: 5 levels (Province → Division → District → Tehsil → Union Council)
4. **7 Provinces/Territories**: Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan, Gilgit-Baltistan, Azad Jammu & Kashmir, Islamabad Capital Territory
5. **Bilingual Support**: English and Urdu (UTF-8 encoding required)
6. **Low Bandwidth Consideration**: Many users have limited internet connectivity
7. **Mobile-First**: Many volunteers will access via mobile devices

### Color Scheme (Brand Guidelines)

As defined in `claude.md`:
- Primary: Pakistan Green (`#01411C`)
- Secondary: White (`#FFFFFF`)
- Alert/Emergency: Red (`#DC2626`)
- Success: Green (`#059669`)
- Info: Blue (`#2563EB`)

## API Integration (Future)

The frontend will consume Express.js REST APIs. See `claude.md` for complete API endpoint specifications including:

### Public Endpoints
- `POST /api/volunteers/register` - Volunteer registration
- `GET /api/locations/*` - Geographical data (provinces, divisions, districts, tehsils, union councils)

### Admin Protected Endpoints
- `POST /api/admin/login` - Authentication
- `GET /api/admin/dashboard/stats` - Dashboard statistics
- `GET /api/admin/volunteers` - List with filters
- `PUT /api/admin/volunteers/:id` - Update volunteer
- `POST /api/admin/volunteers/export` - Export data
- `POST /api/admin/volunteers/bulk-action` - Bulk operations

## Important Validation Rules

### Registration Form
- CNIC: Unique, 13 digits, format validation
- Age: Minimum 18 years (calculated from Date of Birth)
- Phone: Pakistani format required
- Email: Standard email validation
- Province/District/etc.: Must be from valid reference data

### Data Security
- CNIC is sensitive personal information - handle with care
- Passwords must be hashed (bcrypt recommended)
- Implement HTTPS in production
- Input sanitization for XSS/injection protection

## Development Phases

### Phase 1 (Current): Core System
1. Project specification (`claude.md` created)
2. Frontend Development:
   - Public volunteer registration form (multi-step)
   - Admin authentication UI
   - Admin dashboard with statistics
   - Volunteer management interface (list, search, filters)
   - Export functionality UI
3. Backend Development:
   - Express.js server setup
   - MongoDB connection and schemas
   - API endpoints implementation
   - JWT authentication

### Phase 2: Enhanced Features
- WhatsApp Business API integration
- Advanced reporting and analytics
- Performance optimization

### Phase 3: Scale & Expand
- Mobile application
- Progressive Web App (PWA) features
- Offline capability

## Performance Requirements

- Page load time: < 2 seconds
- API response time: < 500ms
- Support for 100,000+ volunteer records
- Efficient geographical queries with MongoDB indexing
- Consider lazy loading for large datasets

## Notes for AI Assistants

- Reference `claude.md` for detailed feature specifications, database schemas, and complete requirements
- Prioritize mobile responsiveness - many Pakistani users access via mobile
- Keep forms simple and accessible for varying tech literacy levels
- Ensure proper UTF-8 encoding for Urdu text support
- Consider low-bandwidth scenarios when adding features
- Use real geographical data from Pakistan Bureau of Statistics
- Start with Punjab province data for initial testing (36 districts)
- CNIC and contact information accuracy is critical for emergency response
- The system's primary purpose is emergency volunteer coordination - prioritize features that enable quick volunteer contact during emergencies
