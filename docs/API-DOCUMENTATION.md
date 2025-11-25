# Facebook Page Automation Platform - Complete API Documentation

**Version:** v1.0  
**Base URL:** `/api/v1`  
**Facebook Graph API:** `https://graph.facebook.com/v24.0`

## System Overview

Multi-tenant Facebook Page automation platform with **3 user types**:

1. **Super Admin** - Full system access (all organizations, pages, analytics)
2. **Admin** - Organization-level access (manage organization pages & posts)
3. **Page Owner** - Facebook OAuth users (view own page analytics)

---

## Authentication Flow

### Super Admin / Admin (JWT-based)

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "securePassword123"
}

Response:
{
  "success": true,
  "data": {
    "user": { "id": "usr_123", "role": "ADMIN", "organizationId": "org_xyz" },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 86400
  }
}
```

### Page Owner (Facebook OAuth)

- Route: `GET /api/auth/signin/facebook` (NextAuth)
- Permissions: `email`, `public_profile`, `pages_show_list`, `pages_read_engagement`, `pages_manage_posts`
- Auto-creates user and stores Facebook access token

---

## Core API Endpoints

### 1. Users

| Endpoint            | Method | Access             | Description      |
| ------------------- | ------ | ------------------ | ---------------- |
| `/api/v1/users`     | POST   | Super Admin, Admin | Create new user  |
| `/api/v1/users`     | GET    | Super Admin, Admin | List all users   |
| `/api/v1/users/:id` | GET    | All                | Get user details |
| `/api/v1/users/:id` | PATCH  | Super Admin, Admin | Update user      |
| `/api/v1/users/:id` | DELETE | Super Admin        | Delete user      |

### 2. Organizations

| Endpoint                    | Method | Access      | Description         |
| --------------------------- | ------ | ----------- | ------------------- |
| `/api/v1/organizations`     | POST   | Super Admin | Create organization |
| `/api/v1/organizations`     | GET    | All         | List organizations  |
| `/api/v1/organizations/:id` | GET    | All         | Get org details     |
| `/api/v1/organizations/:id` | PATCH  | Super Admin | Update org          |

### 3. Facebook Pages

| Endpoint                 | Method | Access                 | Description        |
| ------------------------ | ------ | ---------------------- | ------------------ |
| `/api/v1/pages`          | POST   | All                    | Add Facebook page  |
| `/api/v1/pages`          | GET    | All (filtered by role) | List pages         |
| `/api/v1/pages/:id`      | GET    | Users with access      | Get page details   |
| `/api/v1/pages/:id/sync` | POST   | Users with access      | Sync from Facebook |
| `/api/v1/pages/:id`      | PATCH  | Admin, Super Admin     | Update page        |
| `/api/v1/pages/:id`      | DELETE | Admin, Super Admin     | Remove page        |

### 4. Posts

| Endpoint                    | Method | Access                 | Description         |
| --------------------------- | ------ | ---------------------- | ------------------- |
| `/api/v1/posts`             | POST   | Users with `canPost`   | Create/publish post |
| `/api/v1/posts`             | GET    | All (filtered by role) | List all posts      |
| `/api/v1/posts/:id`         | GET    | Users with access      | Get post details    |
| `/api/v1/posts/:id`         | PATCH  | Creator or Admin       | Update post         |
| `/api/v1/posts/:id`         | DELETE | Users with `canDelete` | Delete post         |
| `/api/v1/posts/:id/publish` | POST   | Users with `canPost`   | Publish draft post  |

### 5. Scheduled Posts

| Endpoint                                  | Method | Access                   | Description         |
| ----------------------------------------- | ------ | ------------------------ | ------------------- |
| `/api/v1/scheduled-posts`                 | POST   | Users with `canSchedule` | Schedule post       |
| `/api/v1/scheduled-posts`                 | GET    | All (filtered by role)   | List scheduled      |
| `/api/v1/scheduled-posts/:id`             | GET    | Users with access        | Get details         |
| `/api/v1/scheduled-posts/:id`             | PATCH  | Creator or Admin         | Update scheduled    |
| `/api/v1/scheduled-posts/:id`             | DELETE | Users with `canDelete`   | Cancel scheduled    |
| `/api/v1/scheduled-posts/:id/publish-now` | POST   | Users with `canPost`     | Publish immediately |

### 6. Analytics

| Endpoint                          | Method | Access               | Description       |
| --------------------------------- | ------ | -------------------- | ----------------- |
| `/api/v1/analytics/pages/:pageId` | GET    | Users with `canView` | Page analytics    |
| `/api/v1/analytics/posts/:postId` | GET    | Users with `canView` | Post analytics    |
| `/api/v1/analytics/overview`      | GET    | Super Admin, Admin   | Platform overview |
| `/api/v1/analytics/sync/:pageId`  | POST   | Admin, Super Admin   | Sync analytics    |

### 7. Permissions

| Endpoint                  | Method | Access             | Description        |
| ------------------------- | ------ | ------------------ | ------------------ |
| `/api/v1/permissions`     | POST   | Admin, Super Admin | Grant page access  |
| `/api/v1/permissions/:id` | PATCH  | Admin, Super Admin | Update permissions |
| `/api/v1/permissions/:id` | DELETE | Admin, Super Admin | Revoke access      |

### 8. Activity Logs

| Endpoint                | Method | Access             | Description        |
| ----------------------- | ------ | ------------------ | ------------------ |
| `/api/v1/activity-logs` | GET    | Super Admin, Admin | View activity logs |

---

## Request/Response Examples

### Create Post

```http
POST /api/v1/posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "pageId": "page_mno456",
  "type": "TEXT",
  "message": "Hello World! 🚀",
  "status": "PUBLISHED"
}

Response:
{
  "success": true,
  "data": {
    "id": "post_abc123",
    "postId": "123456789_987654321",
    "message": "Hello World! 🚀",
    "type": "TEXT",
    "status": "PUBLISHED",
    "publishedAt": "2025-11-25T10:30:00Z",
    "permalink": "https://facebook.com/..."
  }
}
```

### Schedule Post

```http
POST /api/v1/scheduled-posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "pageId": "page_mno456",
  "type": "PHOTO",
  "message": "Coming soon! 📸",
  "mediaUrl": "https://example.com/photo.jpg",
  "scheduledTime": "2025-11-26T15:00:00Z"
}

Response:
{
  "success": true,
  "data": {
    "id": "sched_xyz789",
    "pageId": "page_mno456",
    "message": "Coming soon! 📸",
    "scheduledTime": "2025-11-26T15:00:00Z",
    "status": "PENDING"
  }
}
```

### Get Page Analytics

```http
GET /api/v1/analytics/pages/page_mno456?startDate=2025-11-01&endDate=2025-11-25
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": {
    "pageId": "page_mno456",
    "pageName": "My Business Page",
    "summary": {
      "totalPosts": 45,
      "totalImpressions": 125000,
      "totalEngagement": 8950,
      "fanCount": 15420,
      "followersCount": 15850
    },
    "dailyMetrics": [
      {
        "date": "2025-11-25",
        "impressions": 5200,
        "engagedUsers": 430,
        "pageViews": 850,
        "newLikes": 12
      }
    ]
  }
}
```

---

## Access Control Logic

### Super Admin

- Access: **ALL** pages, posts, analytics across all organizations
- Can: Manage users, organizations, and system settings

### Admin

- Access: Own organization's pages and posts only
- Can: Add pages, create posts, schedule posts, grant permissions to users in their org

### Page Owner (Facebook OAuth)

- Access: Only pages they added via Facebook OAuth
- Can: View analytics for their pages
- Cannot: Create posts directly (uses scheduled posts via Admin)

### Scheduled Post Workflow

1. **Page Owner** logs in via Facebook → Gets page access token
2. **Admin/Super Admin** creates scheduled posts for ALL pages in organization
3. System uses stored `pageAccessToken` from database to publish
4. Each page has its owner's token stored → Used for posting

---

## Database Schema Summary

See `prisma/schema.prisma` for complete schema.

### Key Models

**User**

- `role`: SUPER_ADMIN | ADMIN | PAGE_OWNER
- `authProvider`: LOCAL | FACEBOOK
- `facebookToken`: Stored for PAGE_OWNER users

**Organization**

- Groups users and pages together

**FacebookPage**

- `pageAccessToken`: Long-lived token (encrypted)
- `addedById`: User who added the page
- `organizationId`: Belongs to organization

**PageAccess**

- Controls user permissions per page
- `canView`, `canPost`, `canSchedule`, `canDelete`, `canManage`

**Post**

- Status: DRAFT | PUBLISHED | FAILED | DELETED
- Type: TEXT | LINK | PHOTO | VIDEO | CAROUSEL

**ScheduledPost**

- Status: PENDING | PROCESSING | PUBLISHED | FAILED | CANCELLED
- Auto-publishes at `scheduledTime`

**PostAnalytics**

- Impressions, reach, engagement, reactions breakdown

**PageAnalytics**

- Daily metrics synced from Facebook

**ActivityLog**

- Audit trail of all system actions

---

## Implementation Notes

### Token Management

1. **PAGE_OWNER login** → Store long-lived user token
2. **Get page tokens** → Call Facebook `/me/accounts`
3. **Store page tokens** → Encrypted in `facebook_pages.pageAccessToken`
4. **Use for posting** → Retrieve from DB when publishing

### Scheduled Posts Process

```
1. Admin creates scheduled post → Stored with status: PENDING
2. Background job checks every minute
3. When scheduledTime reached → status: PROCESSING
4. Fetch page token from DB
5. Call Facebook Graph API
6. On success → status: PUBLISHED, create Post record
7. On failure → status: FAILED, store error message
```

### Analytics Sync

```
1. Daily cron job runs at midnight
2. Fetches all active pages
3. For each page:
   - Call Facebook Graph API with page token
   - Get page insights (last 30 days)
   - Get post insights for recent posts
   - Store in PageAnalytics and PostAnalytics tables
```

### Permissions Check

Every API endpoint checks:

1. User is authenticated
2. User has access to the resource (organization/page)
3. User has required permission (canView, canPost, etc.)

```typescript
// Example middleware
async function checkPageAccess(
  userId: string,
  pageId: string,
  permission: "canView" | "canPost" | "canSchedule" | "canDelete"
) {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (user.role === "SUPER_ADMIN") return true;

  const access = await prisma.pageAccess.findFirst({
    where: { userId, pageId, [permission]: true },
  });

  return !!access;
}
```

---

## Facebook Graph API Integration

### Used Endpoints

| Facebook API                     | Usage                 | Our API                               |
| -------------------------------- | --------------------- | ------------------------------------- |
| `GET /{user-id}/accounts`        | Fetch user pages      | Called during OAuth callback          |
| `POST /{page-id}/feed`           | Publish/schedule post | Used in `/api/v1/posts`               |
| `POST /{page-id}/photos`         | Publish photo         | Used in `/api/v1/posts` (type: PHOTO) |
| `POST /{page-id}/videos`         | Publish video         | Used in `/api/v1/posts` (type: VIDEO) |
| `GET /{page-id}/insights`        | Get page analytics    | Used in analytics sync job            |
| `GET /{post-id}/insights`        | Get post analytics    | Used in analytics sync job            |
| `GET /{page-id}/feed`            | Fetch published posts | Used to sync posts                    |
| `GET /{page-id}/scheduled_posts` | Fetch scheduled posts | Used to sync scheduled                |
| `DELETE /{post-id}`              | Delete post           | Used in `/api/v1/posts/:id` DELETE    |

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "You don't have permission to access this resource",
    "details": {}
  }
}
```

### Error Codes

| Code                 | HTTP Status | Description              |
| -------------------- | ----------- | ------------------------ |
| `UNAUTHORIZED`       | 401         | Invalid or missing token |
| `FORBIDDEN`          | 403         | Insufficient permissions |
| `NOT_FOUND`          | 404         | Resource not found       |
| `VALIDATION_ERROR`   | 400         | Invalid request data     |
| `FACEBOOK_API_ERROR` | 500         | Facebook API call failed |
| `TOKEN_EXPIRED`      | 401         | Facebook token expired   |
| `RATE_LIMIT`         | 429         | Too many requests        |

---

## Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/fbautomation"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Facebook App
FACEBOOK_APP_ID="1190483199707045"
FACEBOOK_APP_SECRET="379d9d2ae41e469e9adee57fabc97e35"

# JWT for Admin/Super Admin
JWT_SECRET="your-jwt-secret"
JWT_EXPIRES_IN="24h"

# Encryption (for storing Facebook tokens)
ENCRYPTION_KEY="your-encryption-key"

# Facebook Graph API
FACEBOOK_API_VERSION="v24.0"
```

---

## Next Steps

1. **Install Prisma**: `npm install prisma @prisma/client`
2. **Setup Database**: Configure `DATABASE_URL` in `.env`
3. **Run Migrations**: `npx prisma migrate dev --name init`
4. **Generate Client**: `npx prisma generate`
5. **Implement API Routes**: Create Next.js API routes in `src/app/api/v1/`
6. **Add Middleware**: Implement auth & permission checks
7. **Setup Cron Jobs**: For scheduled posts and analytics sync
8. **Add Encryption**: Encrypt Facebook tokens before storing

---

## Additional Resources

- [Prisma Schema](../prisma/schema.prisma)
- [Facebook Graph API](https://developers.facebook.com/docs/graph-api)
- [NextAuth.js](https://next-auth.js.org/)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
