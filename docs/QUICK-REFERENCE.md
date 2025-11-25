# 🎯 Quick Reference Card

## User Roles & Access

| Role            | Login Method         | Access Level                                  |
| --------------- | -------------------- | --------------------------------------------- |
| **Super Admin** | JWT (email/password) | All organizations, all pages, system settings |
| **Admin**       | JWT (email/password) | Own organization pages, can schedule posts    |
| **Page Owner**  | Facebook OAuth       | View own page analytics only                  |

## API Base URL

```
/api/v1
```

## Authentication Endpoints

```http
# Admin/Super Admin Login
POST /api/v1/auth/login
Body: { "email": "admin@example.com", "password": "pass123" }

# Facebook OAuth (Page Owner)
GET /api/auth/signin/facebook

# Get Current User
GET /api/v1/auth/me
Header: Authorization: Bearer <token>
```

## Core Resource Endpoints

### Pages

```http
GET    /api/v1/pages              # List all pages (filtered by role)
POST   /api/v1/pages              # Add new page
GET    /api/v1/pages/:id          # Get page details
PATCH  /api/v1/pages/:id          # Update page
DELETE /api/v1/pages/:id          # Remove page
POST   /api/v1/pages/:id/sync     # Sync from Facebook
```

### Posts

```http
GET    /api/v1/posts              # List all posts
POST   /api/v1/posts              # Create/publish post
GET    /api/v1/posts/:id          # Get post details
PATCH  /api/v1/posts/:id          # Update post
DELETE /api/v1/posts/:id          # Delete post
```

### Scheduled Posts

```http
GET    /api/v1/scheduled-posts    # List scheduled
POST   /api/v1/scheduled-posts    # Schedule new post
GET    /api/v1/scheduled-posts/:id    # Get details
PATCH  /api/v1/scheduled-posts/:id    # Update scheduled
DELETE /api/v1/scheduled-posts/:id    # Cancel scheduled
POST   /api/v1/scheduled-posts/:id/publish-now  # Publish now
```

### Analytics

```http
GET /api/v1/analytics/pages/:pageId      # Page analytics
GET /api/v1/analytics/posts/:postId      # Post analytics
GET /api/v1/analytics/overview           # Platform overview
POST /api/v1/analytics/sync/:pageId      # Trigger sync
```

## Database Models

```
User ─────────┬─────> Organization
              │
              ├─────> FacebookPage ─────> PageAccess
              │            │
              │            ├─────> Post ─────> PostAnalytics
              │            │
              │            └─────> ScheduledPost
              │
              └─────> ActivityLog
```

## Post Creation Request

```json
POST /api/v1/posts
Authorization: Bearer <token>

{
  "pageId": "page_abc123",
  "type": "TEXT",           // TEXT | LINK | PHOTO | VIDEO
  "message": "Hello World!",
  "link": "https://example.com",  // Optional, for LINK type
  "mediaUrl": "https://...",      // Optional, for PHOTO/VIDEO
  "status": "PUBLISHED"     // DRAFT | PUBLISHED
}
```

## Schedule Post Request

```json
POST /api/v1/scheduled-posts
Authorization: Bearer <token>

{
  "pageId": "page_abc123",
  "type": "PHOTO",
  "message": "Coming soon!",
  "mediaUrl": "https://example.com/photo.jpg",
  "scheduledTime": "2025-11-26T15:00:00Z"
}
```

## Permission Checks

```typescript
// Every request checks:
1. User is authenticated (valid JWT/session)
2. User has access to resource (organization/page)
3. User has required permission (canView, canPost, canSchedule, canDelete)

// Example:
PageAccess {
  userId: "usr_123",
  pageId: "page_456",
  canView: true,
  canPost: true,
  canSchedule: true,
  canDelete: false,
  canManage: false
}
```

## Environment Variables

```env
DATABASE_URL="postgresql://user:pass@localhost:5432/fbautomation"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="<generate-secure-secret>"
FACEBOOK_APP_ID="<your-app-id>"
FACEBOOK_APP_SECRET="<your-app-secret>"
JWT_SECRET="<generate-secure-secret>"
ENCRYPTION_KEY="<32-character-key>"
```

## Prisma Commands

```bash
npx prisma studio          # Visual database browser
npx prisma migrate dev     # Run migrations
npx prisma generate        # Generate client
npx prisma db seed         # Seed database
npx prisma format          # Format schema
```

## Setup Commands

```bash
# 1. Install
bun install
bun add prisma @prisma/client bcrypt jsonwebtoken crypto-js axios

# 2. Database
npx prisma migrate dev --name init
npx prisma generate
npx prisma db seed

# 3. Run
bun dev
```

## Facebook Graph API

```bash
# Base URL
https://graph.facebook.com/v24.0

# Common Endpoints
GET  /{user-id}/accounts           # Get pages
POST /{page-id}/feed              # Publish post
POST /{page-id}/photos            # Publish photo
POST /{page-id}/videos            # Publish video
GET  /{page-id}/insights          # Page analytics
GET  /{post-id}/insights          # Post analytics
GET  /{page-id}/feed              # Get published posts
GET  /{page-id}/scheduled_posts   # Get scheduled posts
```

## Response Format

### Success

```json
{
  "success": true,
  "data": {
    /* response data */
  }
}
```

### Error

```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid credentials"
  }
}
```

## Status Codes

| Code | Meaning                              |
| ---- | ------------------------------------ |
| 200  | Success                              |
| 201  | Created                              |
| 400  | Bad Request / Validation Error       |
| 401  | Unauthorized (invalid/missing token) |
| 403  | Forbidden (insufficient permissions) |
| 404  | Not Found                            |
| 429  | Too Many Requests (rate limit)       |
| 500  | Internal Server Error                |

## Token Flow

```
Page Owner Login (Facebook OAuth)
         ↓
Store user.facebookToken (long-lived user token)
         ↓
Fetch Page Tokens (GET /me/accounts)
         ↓
Store facebookPage.pageAccessToken (encrypted)
         ↓
Admin Schedules Post
         ↓
Background Job Triggers
         ↓
Decrypt pageAccessToken
         ↓
Publish via Facebook Graph API
```

## File Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/   # NextAuth
│   │   └── v1/                   # API routes
│   └── dashboard/                # Admin UI
├── lib/
│   ├── prisma.ts                 # DB client
│   ├── jwt.ts                    # JWT helpers
│   ├── encryption.ts             # Token encryption
│   └── facebook.ts               # FB API client
└── types/
    └── next-auth.d.ts            # Type extensions

prisma/
└── schema.prisma                 # Database schema

docs/
├── API-DOCUMENTATION.md          # Full API docs
├── SETUP-GUIDE.md                # Installation guide
└── PROJECT-SUMMARY.md            # Complete overview
```

## Useful Links

- [Prisma Schema](../prisma/schema.prisma)
- [API Documentation](./API-DOCUMENTATION.md)
- [Setup Guide](./SETUP-GUIDE.md)
- [Project Summary](./PROJECT-SUMMARY.md)
- [Facebook Graph API](https://developers.facebook.com/docs/graph-api)
- [NextAuth.js](https://next-auth.js.org/)

---

**Quick Start:** Read `docs/SETUP-GUIDE.md` → Run commands → Test API
