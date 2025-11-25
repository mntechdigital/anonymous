# Facebook Page Automation Platform

Multi-tenant Facebook Page management system with centralized scheduling and analytics.

## 🎯 System Overview

### User Roles

1. **Super Admin**

   - Full system access
   - Manage all organizations, users, pages
   - View all analytics

2. **Admin**

   - Manage own organization
   - Add pages, create/schedule posts
   - Grant permissions to users
   - View organization analytics

3. **Page Owner**
   - Facebook OAuth login
   - Add their Facebook pages
   - View own page analytics
   - System uses their token for posting

## 🔑 Key Features

- **Centralized Post Scheduling**: Admin schedules posts for all pages in one place
- **Multi-Page Management**: Manage multiple Facebook pages per organization
- **Role-Based Access Control**: Granular permissions per user per page
- **Analytics Dashboard**: Real-time insights for pages and posts
- **Automated Publishing**: Background jobs publish scheduled posts
- **Activity Audit Logs**: Track all system actions

## 📊 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Super Admin                             │
│  (Full Access: All Orgs, Pages, Analytics)                  │
└─────────────────────────────────────────────────────────────┘
                           │
        ┌──────────────────┴──────────────────┐
        │                                     │
┌───────▼─────────┐                  ┌───────▼─────────┐
│  Organization 1  │                  │  Organization 2  │
│                 │                  │                 │
│  Admin Users    │                  │  Admin Users    │
│  ├─ Manage Pages│                  │  ├─ Manage Pages│
│  ├─ Schedule    │                  │  ├─ Schedule    │
│  └─ Analytics   │                  │  └─ Analytics   │
└────────┬────────┘                  └────────┬────────┘
         │                                    │
    ┌────┴─────┐                         ┌───┴──────┐
    │          │                         │          │
┌───▼───┐  ┌──▼────┐                ┌───▼───┐  ┌──▼────┐
│ Page 1│  │ Page 2│                │ Page 3│  │ Page 4│
│       │  │       │                │       │  │       │
│ Owner │  │ Owner │                │ Owner │  │ Owner │
│ Token │  │ Token │                │ Token │  │ Token │
└───────┘  └───────┘                └───────┘  └───────┘
```

## 🔄 Post Scheduling Flow

```
1. Page Owner logs in via Facebook
   └─> System stores long-lived page token

2. Admin creates scheduled post
   └─> Stored in database with status: PENDING

3. Background job checks every minute
   └─> Finds posts where scheduledTime <= now()
   └─> Fetches page token from database
   └─> Publishes to Facebook via Graph API
   └─> Updates status to PUBLISHED or FAILED

4. Analytics sync (daily cron)
   └─> Fetches insights from Facebook
   └─> Updates PostAnalytics & PageAnalytics tables
```

## 🗄️ Database Schema

Located in `prisma/schema.prisma`

### Core Models

- **User** - Authentication (JWT or Facebook OAuth)
- **Organization** - Multi-tenancy
- **FacebookPage** - Stores page tokens and metadata
- **PageAccess** - Granular permissions (canView, canPost, canSchedule, canDelete)
- **Post** - Published posts
- **ScheduledPost** - Future posts queue
- **PostAnalytics** - Engagement metrics per post
- **PageAnalytics** - Daily page metrics
- **ActivityLog** - Audit trail

## 🚀 Getting Started

### Prerequisites

```bash
Node.js >= 18
PostgreSQL >= 14
Bun or npm
```

### Installation

```bash
# Install dependencies
bun install

# Configure environment
cp .env.example .env
# Edit .env with your credentials

# Setup database
npx prisma migrate dev --name init
npx prisma generate

# Run development server
bun dev
```

### Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/fbautomation"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-secure-secret"

# Facebook App
FACEBOOK_APP_ID="your-app-id"
FACEBOOK_APP_SECRET="your-app-secret"

# JWT
JWT_SECRET="your-jwt-secret"
JWT_EXPIRES_IN="24h"

# Token Encryption
ENCRYPTION_KEY="your-32-char-encryption-key"
```

## 📡 API Endpoints

See [API Documentation](./docs/API-DOCUMENTATION.md) for complete reference.

### Authentication

- `POST /api/v1/auth/login` - Admin/Super Admin JWT login
- `GET /api/auth/signin/facebook` - Page Owner Facebook OAuth

### Core Resources

- `/api/v1/users` - User management
- `/api/v1/organizations` - Organization management
- `/api/v1/pages` - Facebook page management
- `/api/v1/posts` - Post management
- `/api/v1/scheduled-posts` - Scheduled posts
- `/api/v1/analytics` - Analytics & insights
- `/api/v1/permissions` - Access control

## 🔐 Authentication Methods

### Super Admin / Admin (JWT)

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password123"
}
```

### Page Owner (Facebook OAuth)

```
GET /api/auth/signin/facebook
→ Redirects to Facebook
→ User grants permissions
→ Callback stores tokens
```

## 🛡️ Security

- **Token Encryption**: Facebook access tokens encrypted at rest
- **Role-Based Access**: Middleware checks permissions on every request
- **Activity Logging**: All actions logged for audit
- **JWT Expiration**: Admin tokens expire after 24h
- **Token Validation**: Facebook tokens validated before use

## 📈 Analytics

### Page Analytics (Daily)

- Impressions
- Engaged Users
- Page Views
- New Likes
- Total Fans

### Post Analytics (Per Post)

- Impressions & Reach
- Engagement (Likes, Comments, Shares)
- Reactions Breakdown
- Video Views (if applicable)
- Link Clicks

## 🔧 Background Jobs

### Scheduled Post Publisher

- Runs: Every 1 minute
- Checks: `ScheduledPost` where `status = PENDING` and `scheduledTime <= now()`
- Action: Publishes to Facebook, updates status

### Analytics Sync

- Runs: Daily at midnight
- Action: Fetches insights from Facebook Graph API
- Updates: `PageAnalytics` and `PostAnalytics` tables

### Token Validator

- Runs: Every 6 hours
- Checks: Facebook token validity
- Action: Marks pages as inactive if token expired

## 📁 Project Structure

```
facebook_page_automation_client/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   └── user-login/          # Login pages
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/   # NextAuth routes
│   │   │   └── v1/                  # API routes
│   │   │       ├── users/
│   │   │       ├── organizations/
│   │   │       ├── pages/
│   │   │       ├── posts/
│   │   │       ├── scheduled-posts/
│   │   │       ├── analytics/
│   │   │       └── permissions/
│   │   ├── dashboard/               # Admin dashboard
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   └── ui/                      # Shadcn components
│   ├── lib/
│   │   ├── prisma.ts                # Prisma client
│   │   ├── auth.ts                  # Auth helpers
│   │   ├── facebook.ts              # Facebook API client
│   │   └── utils.ts
│   ├── types/
│   │   ├── next-auth.d.ts           # NextAuth types
│   │   └── index.ts
│   └── utils/
│       └── authOption.ts            # NextAuth config
├── prisma/
│   └── schema.prisma                # Database schema
├── docs/
│   └── API-DOCUMENTATION.md         # Complete API docs
├── .env                             # Environment variables
├── package.json
└── README.md
```

## 🎨 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: NextAuth.js (Facebook OAuth) + JWT
- **UI**: React 19 + TailwindCSS + Shadcn/ui
- **Facebook API**: Graph API v24.0
- **Runtime**: Bun

## 📝 Development Workflow

### Adding a New Feature

1. Update Prisma schema if needed

```bash
npx prisma migrate dev --name feature_name
```

2. Create API route in `src/app/api/v1/`

```typescript
// src/app/api/v1/posts/route.ts
export async function GET(request: Request) {
  // Implementation
}
```

3. Add middleware for auth & permissions

```typescript
import { checkAuth, checkPageAccess } from "@/lib/auth";
```

4. Test with Postman/curl
5. Update documentation

## 🧪 Testing

```bash
# Run tests (when implemented)
bun test

# Check types
bun run type-check

# Lint code
bun run lint
```

## 📚 Documentation

- [Complete API Documentation](./docs/API-DOCUMENTATION.md)
- [Prisma Schema](./prisma/schema.prisma)
- [Facebook Graph API](https://developers.facebook.com/docs/graph-api)
- [NextAuth.js Docs](https://next-auth.js.org/)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is proprietary and confidential.

## 👥 Support

For questions or issues, contact the development team.

---

**Built with ❤️ using Next.js and Facebook Graph API**
