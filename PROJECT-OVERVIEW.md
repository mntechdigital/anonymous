# Facebook Page Automation Platform

Multi-tenant Facebook Page management system with centralized scheduling and analytics.

## 🎯 System Overview

### User Roles & Access Control

#### 1. **Super Admin** (JWT Authentication)

- **Authentication**: Login via JWT using internal database (email/password)
- **Access Level**: Full system access
- **Capabilities**:
  - View analytics for ALL pages across all organizations
  - View all pages in the system
  - View all posts (published & scheduled) from every page
  - Manage all organizations, users, and their permissions
  - Access system-wide analytics dashboard
  - Monitor all scheduled posts in one central place
  - Use Page Owners' access tokens to publish posts on their behalf

#### 2. **Admin** (JWT Authentication)

- **Authentication**: Login via JWT using internal database (email/password)
- **Access Level**: Organization-scoped access
- **Capabilities**:
  - Same capabilities as Super Admin, but limited to their organization
  - View analytics for pages within their organization
  - Manage pages within their organization
  - Schedule posts for all pages in their organization using Page Owners' tokens
  - Add/remove Page Owners within their organization
  - View organization-level analytics dashboard

#### 3. **Page Owner** (Facebook OAuth)

- **Authentication**: Login via Facebook OAuth
- **Access Level**: Own pages only
- **Capabilities**:
  - Connect Facebook account and authorize pages
  - System stores their long-lived page access tokens
  - View analytics for their own connected pages only
  - View posts published on their pages
  - Their access token is used by Super Admin/Admin to publish scheduled posts
  - Cannot create scheduled posts (only Super Admin/Admin can schedule)

### Key Authentication Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    AUTHENTICATION METHODS                     │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  JWT (Internal Database)          Facebook OAuth             │
│  ├─ Super Admin                   ├─ Page Owner              │
│  └─ Admin                          └─ Provides Access Token  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## 🔑 Key Features

- **Centralized Post Scheduling**: Super Admin/Admin schedule posts for all pages in one central dashboard
- **Token-Based Publishing**: Uses Page Owner's Facebook access token to publish posts on their behalf
- **Multi-Page Management**: Manage multiple Facebook pages per organization
- **Dual Authentication System**: JWT for Super Admin/Admin, Facebook OAuth for Page Owners
- **Role-Based Access Control**: Strict permissions based on user role
- **Analytics Dashboard**: Real-time insights for pages and posts (role-based visibility)
- **Automated Publishing**: Background jobs publish scheduled posts using stored tokens
- **Activity Audit Logs**: Track all system actions with user attribution

## 📊 Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    SUPER ADMIN (JWT Auth)                        │
│  ├─ View ALL organizations, pages, posts, analytics             │
│  ├─ Schedule posts for ANY page using Page Owner's token        │
│  └─ Central dashboard to manage entire system                   │
└────────────────────────┬────────────────────────────────────────┘
                         │
        ┌────────────────┴────────────────┐
        │                                 │
┌───────▼──────────┐            ┌────────▼─────────┐
│  Organization 1   │            │  Organization 2   │
│  (Tenant 1)      │            │  (Tenant 2)      │
│                  │            │                  │
│  ADMIN (JWT)     │            │  ADMIN (JWT)     │
│  ├─ Manage Org 1 │            │  ├─ Manage Org 2 │
│  ├─ Schedule     │            │  ├─ Schedule     │
│  ├─ Analytics    │            │  ├─ Analytics    │
│  └─ Org 1 Pages  │            │  └─ Org 2 Pages  │
└────────┬─────────┘            └────────┬─────────┘
         │                               │
    ┌────┴─────┐                    ┌───┴──────┐
    │          │                    │          │
┌───▼────┐ ┌──▼────┐           ┌───▼────┐ ┌──▼────┐
│ Page 1 │ │Page 2 │           │ Page 3 │ │Page 4 │
│        │ │       │           │        │ │       │
│PAGE    │ │PAGE   │           │PAGE    │ │PAGE   │
│OWNER 1 │ │OWNER 2│           │OWNER 3 │ │OWNER 4│
│(FB Auth│ │(FB    │           │(FB Auth│ │(FB    │
│        │ │Auth)  │           │        │ │Auth)  │
│Token   │ │Token  │           │Token   │ │Token  │
│Stored) │ │Stored)│           │Stored) │ │Stored)│
└────────┘ └───────┘           └────────┘ └───────┘
```

### Authentication Flow Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                     USER LOGIN FLOW                          │
└──────────────────────────────────────────────────────────────┘

Super Admin / Admin:
1. Visit /api/auth/login (JWT endpoint)
2. Submit email + password
3. System validates against User table (where role = SUPER_ADMIN or ADMIN)
4. Returns JWT token
5. Use JWT in Authorization header for all requests

Page Owner:
1. Visit /api/auth/facebook-connect
2. Redirected to Facebook OAuth dialog
3. Grant permissions (pages_show_list, pages_manage_posts, etc.)
4. Facebook callback with access token
5. System exchanges for long-lived token
6. Fetch user's pages from Facebook Graph API
7. Store user + page tokens in database
8. Super Admin/Admin can now schedule posts using this token
```

## 🔄 Post Scheduling Flow

```
1. Page Owner logs in via Facebook OAuth
   ├─> User authorizes Facebook pages
   ├─> System receives short-lived access token
   ├─> System exchanges for long-lived user token (60 days)
   ├─> System fetches user's pages via Graph API
   └─> System stores long-lived page access tokens (encrypted) for each page

2. Super Admin or Admin creates scheduled post
   ├─> Selects target Facebook page(s) from dropdown
   ├─> Writes post content, adds media (optional)
   ├─> Sets scheduled date/time
   └─> Stored in ScheduledPost table with status: PENDING

3. Background job runs every minute (Cron Job)
   ├─> Queries: SELECT * FROM ScheduledPost WHERE status = 'PENDING' AND scheduledTime <= NOW()
   ├─> For each post:
   │   ├─> Fetches page access token from FacebookPage table
   │   ├─> Calls Facebook Graph API: POST /{page-id}/feed
   │   ├─> If success: Updates status to PUBLISHED, saves Facebook post ID
   │   └─> If failure: Updates status to FAILED, logs error
   └─> Logs activity in ActivityLog table

4. Analytics sync (runs daily at midnight)
   ├─> For each connected Facebook page:
   │   ├─> Fetches page insights via Graph API
   │   ├─> Fetches post insights for all published posts
   │   └─> Updates PageAnalytics & PostAnalytics tables
   └─> Page Owners can view their analytics, Super Admin/Admin see all analytics
```

## 🗄️ Database Schema Design

### Database Tables & Relationships

#### **User Table**

Stores all users (Super Admin, Admin, Page Owner)

| Field               | Type                         | Description                               |
| ------------------- | ---------------------------- | ----------------------------------------- |
| id                  | String (UUID)                | Primary key                               |
| email               | String (unique, nullable)    | For JWT users (Super Admin/Admin)         |
| password            | String (hashed, nullable)    | For JWT users only                        |
| name                | String                       | User full name                            |
| role                | Enum                         | SUPER_ADMIN, ADMIN, PAGE_OWNER            |
| authProvider        | Enum                         | JWT, FACEBOOK                             |
| facebookId          | String (unique, nullable)    | Facebook user ID (for Page Owners)        |
| facebookAccessToken | String (encrypted, nullable) | Long-lived user token (Page Owners)       |
| tokenExpiresAt      | DateTime (nullable)          | Token expiration date                     |
| organizationId      | String (nullable)            | FK to Organization (null for Super Admin) |
| isActive            | Boolean                      | Account status                            |
| createdAt           | DateTime                     | Account creation                          |
| updatedAt           | DateTime                     | Last update                               |

**Relations:**

- belongsTo: Organization (one-to-one, nullable for Super Admin)
- hasMany: FacebookPage (Page Owner can have multiple pages)
- hasMany: ActivityLog (tracks user actions)

---

#### **Organization Table**

Multi-tenant structure for grouping Admins and Pages

| Field       | Type              | Description              |
| ----------- | ----------------- | ------------------------ |
| id          | String (UUID)     | Primary key              |
| name        | String            | Organization name        |
| slug        | String (unique)   | URL-friendly identifier  |
| description | String (nullable) | Organization description |
| isActive    | Boolean           | Active status            |
| createdAt   | DateTime          | Creation date            |
| updatedAt   | DateTime          | Last update              |

**Relations:**

- hasMany: User (Admins and Page Owners in this org)
- hasMany: FacebookPage
- hasMany: ScheduledPost

---

#### **FacebookPage Table**

Stores connected Facebook pages with encrypted tokens

| Field             | Type                | Description                                          |
| ----------------- | ------------------- | ---------------------------------------------------- |
| id                | String (UUID)       | Primary key                                          |
| pageId            | String (unique)     | Facebook page ID                                     |
| pageName          | String              | Page display name                                    |
| pageAccessToken   | String (encrypted)  | Long-lived page token (never expires unless revoked) |
| tokenExpiresAt    | DateTime (nullable) | Token expiration (if applicable)                     |
| category          | String (nullable)   | Page category from Facebook                          |
| pageUsername      | String (nullable)   | Facebook @username                                   |
| pageUrl           | String (nullable)   | Full Facebook page URL                               |
| profilePictureUrl | String (nullable)   | Page profile image                                   |
| followers         | Int (default: 0)    | Total page followers/likes                           |
| isActive          | Boolean             | Page connection status                               |
| ownerId           | String              | FK to User (Page Owner)                              |
| organizationId    | String              | FK to Organization                                   |
| createdAt         | DateTime            | When page was connected                              |
| updatedAt         | DateTime            | Last update                                          |

**Relations:**

- belongsTo: User (Page Owner)
- belongsTo: Organization
- hasMany: ScheduledPost
- hasMany: PublishedPost
- hasMany: PageAnalytics

---

#### **ScheduledPost Table**

Posts scheduled by Super Admin/Admin for future publishing

| Field          | Type                | Description                                  |
| -------------- | ------------------- | -------------------------------------------- |
| id             | String (UUID)       | Primary key                                  |
| content        | Text                | Post text content                            |
| mediaUrls      | String[]            | Array of image/video URLs (optional)         |
| mediaType      | Enum (nullable)     | IMAGE, VIDEO, LINK, null                     |
| linkUrl        | String (nullable)   | External link to share                       |
| scheduledTime  | DateTime            | When to publish                              |
| status         | Enum                | PENDING, PUBLISHED, FAILED, CANCELLED        |
| facebookPostId | String (nullable)   | FB post ID after publishing                  |
| errorMessage   | Text (nullable)     | Error details if failed                      |
| pageId         | String              | FK to FacebookPage                           |
| organizationId | String              | FK to Organization                           |
| createdBy      | String              | FK to User (Super Admin/Admin who scheduled) |
| publishedAt    | DateTime (nullable) | Actual publish timestamp                     |
| createdAt      | DateTime            | When scheduled                               |
| updatedAt      | DateTime            | Last update                                  |

**Relations:**

- belongsTo: FacebookPage
- belongsTo: Organization
- belongsTo: User (creator)
- hasOne: PublishedPost (after publishing)

---

#### **PublishedPost Table**

Successfully published posts (mirror of what's on Facebook)

| Field           | Type              | Description                        |
| --------------- | ----------------- | ---------------------------------- |
| id              | String (UUID)     | Primary key                        |
| facebookPostId  | String (unique)   | Facebook post ID                   |
| content         | Text              | Post content                       |
| mediaUrls       | String[]          | Media URLs                         |
| mediaType       | Enum (nullable)   | IMAGE, VIDEO, LINK, null           |
| linkUrl         | String (nullable) | External link                      |
| pageId          | String            | FK to FacebookPage                 |
| organizationId  | String            | FK to Organization                 |
| scheduledPostId | String (nullable) | FK to ScheduledPost (if scheduled) |
| publishedBy     | String            | FK to User (who published)         |
| publishedAt     | DateTime          | Publish timestamp                  |
| createdAt       | DateTime          | Record creation                    |
| updatedAt       | DateTime          | Last update                        |

**Relations:**

- belongsTo: FacebookPage
- belongsTo: Organization
- belongsTo: User (publisher)
- belongsTo: ScheduledPost (optional)
- hasMany: PostAnalytics

---

#### **PageAnalytics Table**

Daily aggregated page metrics

| Field         | Type             | Description                   |
| ------------- | ---------------- | ----------------------------- |
| id            | String (UUID)    | Primary key                   |
| pageId        | String           | FK to FacebookPage            |
| date          | DateTime         | Metrics date (daily)          |
| impressions   | Int (default: 0) | Page impressions              |
| reach         | Int (default: 0) | Unique users reached          |
| engagedUsers  | Int (default: 0) | Users who engaged             |
| pageViews     | Int (default: 0) | Page profile views            |
| pageLikes     | Int (default: 0) | New likes on this day         |
| pageFollowers | Int (default: 0) | Total followers at end of day |
| createdAt     | DateTime         | Record creation               |
| updatedAt     | DateTime         | Last update                   |

**Relations:**

- belongsTo: FacebookPage

**Unique Constraint:** (pageId, date) - one record per page per day

---

#### **PostAnalytics Table**

Individual post performance metrics

| Field         | Type                       | Description                                  |
| ------------- | -------------------------- | -------------------------------------------- |
| id            | String (UUID)              | Primary key                                  |
| postId        | String                     | FK to PublishedPost                          |
| pageId        | String                     | FK to FacebookPage                           |
| impressions   | Int (default: 0)           | Post impressions                             |
| reach         | Int (default: 0)           | Unique users reached                         |
| engagement    | Int (default: 0)           | Total engagement count                       |
| likes         | Int (default: 0)           | Like count                                   |
| comments      | Int (default: 0)           | Comment count                                |
| shares        | Int (default: 0)           | Share count                                  |
| reactions     | Json (nullable)            | Reactions breakdown {like: 10, love: 5, ...} |
| videoViews    | Int (default: 0, nullable) | Video view count (if video post)             |
| linkClicks    | Int (default: 0, nullable) | Link click count (if link post)              |
| lastFetchedAt | DateTime                   | Last time fetched from Facebook              |
| createdAt     | DateTime                   | Record creation                              |
| updatedAt     | DateTime                   | Last update                                  |

**Relations:**

- belongsTo: PublishedPost
- belongsTo: FacebookPage

---

#### **ActivityLog Table**

Audit trail for all system actions

| Field      | Type              | Description                                                                                              |
| ---------- | ----------------- | -------------------------------------------------------------------------------------------------------- |
| id         | String (UUID)     | Primary key                                                                                              |
| userId     | String            | FK to User (who performed action)                                                                        |
| action     | Enum              | LOGIN, LOGOUT, CREATE_POST, SCHEDULE_POST, DELETE_POST, UPDATE_PAGE, CONNECT_PAGE, DISCONNECT_PAGE, etc. |
| entityType | Enum (nullable)   | USER, ORGANIZATION, PAGE, POST, SCHEDULED_POST, etc.                                                     |
| entityId   | String (nullable) | ID of affected entity                                                                                    |
| details    | Json (nullable)   | Additional context {oldValue, newValue, etc.}                                                            |
| ipAddress  | String (nullable) | User IP address                                                                                          |
| userAgent  | String (nullable) | Browser/device info                                                                                      |
| createdAt  | DateTime          | When action occurred                                                                                     |

**Relations:**

- belongsTo: User

---

### Database Relationships Summary

```
User (Super Admin)
├─ organizationId: null
└─ role: SUPER_ADMIN

User (Admin)
├─ organizationId: FK → Organization
├─ role: ADMIN
└─ authProvider: JWT

User (Page Owner)
├─ organizationId: FK → Organization
├─ role: PAGE_OWNER
├─ authProvider: FACEBOOK
├─ facebookId: "facebook_user_id"
├─ facebookAccessToken: "encrypted_token"
└─ FacebookPages (hasMany)

Organization
├─ Users (hasMany - Admins & Page Owners)
├─ FacebookPages (hasMany)
└─ ScheduledPosts (hasMany)

FacebookPage
├─ ownerId: FK → User (Page Owner)
├─ organizationId: FK → Organization
├─ pageAccessToken: "encrypted_long_lived_token"
├─ ScheduledPosts (hasMany)
├─ PublishedPosts (hasMany)
└─ PageAnalytics (hasMany)

ScheduledPost
├─ pageId: FK → FacebookPage
├─ organizationId: FK → Organization
├─ createdBy: FK → User (Super Admin or Admin)
└─ status: PENDING → (Cron Job) → PUBLISHED → PublishedPost

PublishedPost
├─ pageId: FK → FacebookPage
├─ organizationId: FK → Organization
├─ scheduledPostId: FK → ScheduledPost (optional)
├─ publishedBy: FK → User
├─ facebookPostId: "facebook_id_from_api"
└─ PostAnalytics (hasMany)
```

---

### Enum Definitions

#### UserRole

- `SUPER_ADMIN` - Full system access
- `ADMIN` - Organization-scoped access
- `PAGE_OWNER` - Own pages only

#### AuthProvider

- `JWT` - Internal authentication (Super Admin/Admin)
- `FACEBOOK` - OAuth authentication (Page Owner)

#### PostStatus

- `PENDING` - Waiting to be published
- `PUBLISHED` - Successfully published to Facebook
- `FAILED` - Publishing failed
- `CANCELLED` - Cancelled by user

#### MediaType

- `IMAGE` - Image post
- `VIDEO` - Video post
- `LINK` - Link share post

#### ActivityAction

- `LOGIN` - User logged in
- `LOGOUT` - User logged out
- `CREATE_POST` - Post created
- `SCHEDULE_POST` - Post scheduled
- `UPDATE_POST` - Post updated
- `DELETE_POST` - Post deleted
- `CONNECT_PAGE` - Facebook page connected
- `DISCONNECT_PAGE` - Page disconnected
- `UPDATE_PAGE` - Page settings updated
- `VIEW_ANALYTICS` - Analytics viewed
- `GRANT_PERMISSION` - Permission granted
- `REVOKE_PERMISSION` - Permission revoked

#### EntityType

- `USER`
- `ORGANIZATION`
- `PAGE`
- `POST`
- `SCHEDULED_POST`
- `ANALYTICS`

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

---

## 🛡️ Security & Best Practices

### Token Encryption

- **Facebook access tokens**: Encrypted using AES-256-GCM before storage
- **Encryption key**: Stored in environment variable `ENCRYPTION_KEY`
- **Never expose**: Tokens never sent to frontend

### Password Security

- **Hashing**: bcrypt with salt rounds = 12
- **JWT tokens**: HS256 algorithm, 24h expiration
- **Refresh tokens**: Not implemented (stateless JWT)

### Role-Based Access Control (RBAC)

```javascript
// Middleware checks on every request
1. Verify JWT token (for Super Admin/Admin)
2. Verify session (for Page Owner)
3. Check user role
4. Check organization ownership (for Admin)
5. Check page ownership (for Page Owner)
6. Allow/Deny request
```

### Activity Logging

All actions logged with:

- User ID
- Action type
- Entity affected
- IP address
- Timestamp
- Additional metadata

### API Rate Limiting (Recommended)

```javascript
// Per user/IP limits
POST /api/v1/scheduled-posts: 100 requests/hour
GET /api/v1/analytics/*: 200 requests/hour
POST /api/v1/auth/login: 5 attempts/15 minutes
```

---

## 📡 API Endpoints Documentation

### Base URL

All API endpoints use `/api/v1` prefix (except NextAuth Facebook OAuth)

### Authentication Headers

#### For Super Admin / Admin (JWT)

```
Authorization: Bearer <jwt_token>
```

#### For Page Owner (Facebook OAuth)

Uses NextAuth session cookies automatically

---

## 📌 Core API Endpoints

### 1. Authentication Endpoints

#### 1.1 Super Admin / Admin Login (JWT)

**Endpoint:** `POST /api/v1/auth/login`

**Request Body:**

```json
{
  "email": "admin@example.com",
  "password": "securepassword123"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "uuid",
      "email": "admin@example.com",
      "name": "Admin User",
      "role": "ADMIN",
      "organizationId": "org-uuid"
    }
  }
}
```

**Error Response (401):**

```json
{
  "success": false,
  "error": "Invalid credentials"
}
```

---

#### 1.2 Page Owner Facebook OAuth Connect

**Endpoint:** `GET /api/auth/facebook-connect`

**Description:** Initiates Facebook OAuth flow (uses NextAuth.js)

**Flow:**

1. User clicks "Connect Facebook" button
2. Redirected to Facebook OAuth dialog
3. User authorizes requested permissions
4. Callback to `/api/auth/callback/facebook`
5. System stores tokens and fetches pages

**Facebook Scopes Required:**

- `email`
- `public_profile`
- `pages_show_list`
- `pages_read_engagement`
- `pages_manage_posts`
- `pages_manage_metadata`

**Success Redirect:** `/dashboard/pages` (with session cookie)

---

#### 1.3 Logout

**Endpoint:** `POST /api/v1/auth/logout`

**Headers:** `Authorization: Bearer <token>`

**Success Response (200):**

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

#### 1.4 Get Current User Profile

**Endpoint:** `GET /api/v1/auth/me`

**Headers:** `Authorization: Bearer <token>`

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "admin@example.com",
    "name": "Admin User",
    "role": "SUPER_ADMIN",
    "organizationId": null,
    "isActive": true,
    "createdAt": "2025-01-15T10:00:00Z"
  }
}
```

---

### 2. Facebook Page Endpoints

#### 2.1 Fetch & Connect Facebook Pages (Page Owner)

**Endpoint:** `POST /api/v1/pages/fetch-from-facebook`

**Description:** Fetches pages from Facebook Graph API and stores them

**Headers:** `Authorization: Bearer <token>` (or NextAuth session)

**Facebook API Call:**

```
GET https://graph.facebook.com/v24.0/me/accounts
  ?access_token={user_access_token}
  &fields=id,name,access_token,category,username,link,picture
```

**System Process:**

1. Validate user is PAGE_OWNER role
2. Use user's Facebook access token
3. Call Facebook Graph API `/me/accounts`
4. For each page:
   - Exchange short-lived token for long-lived page token
   - Encrypt and store page access token
   - Create FacebookPage record

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "pagesConnected": 3,
    "pages": [
      {
        "id": "uuid",
        "pageId": "109876543210",
        "pageName": "My Business Page",
        "pageUsername": "mybusinesspage",
        "category": "Business",
        "followers": 1520
      }
    ]
  }
}
```

---

#### 2.2 Get All Pages (Super Admin)

**Endpoint:** `GET /api/v1/pages`

**Headers:** `Authorization: Bearer <token>`

**Access:** Super Admin only

**Query Parameters:**

- `organizationId` (optional) - Filter by organization
- `isActive` (optional) - Filter active/inactive
- `page` (optional) - Pagination page number
- `limit` (optional) - Items per page (default: 20)

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "pages": [
      {
        "id": "uuid",
        "pageId": "109876543210",
        "pageName": "Business Page",
        "pageUrl": "https://facebook.com/mybusinesspage",
        "followers": 1520,
        "isActive": true,
        "owner": {
          "id": "user-uuid",
          "name": "Page Owner Name",
          "email": null
        },
        "organization": {
          "id": "org-uuid",
          "name": "Organization Name"
        }
      }
    ],
    "pagination": {
      "total": 45,
      "page": 1,
      "limit": 20,
      "totalPages": 3
    }
  }
}
```

---

#### 2.3 Get Pages by Organization (Admin)

**Endpoint:** `GET /api/v1/pages/organization/:organizationId`

**Headers:** `Authorization: Bearer <token>`

**Access:** Admin (own org only), Super Admin (any org)

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "organization": {
      "id": "org-uuid",
      "name": "Organization Name"
    },
    "pages": [
      {
        "id": "page-uuid",
        "pageId": "109876543210",
        "pageName": "Business Page",
        "followers": 1520,
        "isActive": true,
        "owner": {
          "name": "Page Owner"
        }
      }
    ]
  }
}
```

---

#### 2.4 Get My Connected Pages (Page Owner)

**Endpoint:** `GET /api/v1/pages/my-pages`

**Headers:** `Authorization: Bearer <token>`

**Access:** Page Owner only

**Success Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "pageId": "109876543210",
      "pageName": "My Business Page",
      "pageUsername": "mybusinesspage",
      "pageUrl": "https://facebook.com/mybusinesspage",
      "profilePictureUrl": "https://...",
      "followers": 1520,
      "category": "Business",
      "isActive": true,
      "createdAt": "2025-01-15T10:00:00Z"
    }
  ]
}
```

---

#### 2.5 Disconnect Facebook Page

**Endpoint:** `DELETE /api/v1/pages/:pageId`

**Headers:** `Authorization: Bearer <token>`

**Access:** Page Owner (own pages), Super Admin (any page)

**Success Response (200):**

```json
{
  "success": true,
  "message": "Page disconnected successfully"
}
```

---

### 3. Scheduled Post Endpoints

#### 3.1 Create Scheduled Post

**Endpoint:** `POST /api/v1/scheduled-posts`

**Headers:** `Authorization: Bearer <token>`

**Access:** Super Admin, Admin only

**Request Body:**

```json
{
  "pageId": "page-uuid",
  "content": "This is a scheduled post for my Facebook page!",
  "mediaUrls": ["https://example.com/image1.jpg"],
  "mediaType": "IMAGE",
  "linkUrl": null,
  "scheduledTime": "2025-12-01T15:00:00Z"
}
```

**Success Response (201):**

```json
{
  "success": true,
  "data": {
    "id": "scheduled-post-uuid",
    "pageId": "page-uuid",
    "content": "This is a scheduled post...",
    "scheduledTime": "2025-12-01T15:00:00Z",
    "status": "PENDING",
    "createdBy": "admin-user-uuid",
    "createdAt": "2025-11-25T10:00:00Z"
  }
}
```

**Error Response (403):**

```json
{
  "success": false,
  "error": "You don't have permission to schedule posts for this page"
}
```

---

#### 3.2 Get All Scheduled Posts (Super Admin)

**Endpoint:** `GET /api/v1/scheduled-posts`

**Headers:** `Authorization: Bearer <token>`

**Access:** Super Admin (all posts), Admin (org posts only)

**Query Parameters:**

- `status` - Filter by status (PENDING, PUBLISHED, FAILED, CANCELLED)
- `pageId` - Filter by page
- `organizationId` - Filter by organization
- `startDate` - Filter scheduled after date
- `endDate` - Filter scheduled before date
- `page` - Pagination
- `limit` - Items per page

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": "uuid",
        "content": "Scheduled post content",
        "scheduledTime": "2025-12-01T15:00:00Z",
        "status": "PENDING",
        "page": {
          "pageId": "109876543210",
          "pageName": "Business Page"
        },
        "createdBy": {
          "name": "Admin User"
        },
        "createdAt": "2025-11-25T10:00:00Z"
      }
    ],
    "pagination": {
      "total": 150,
      "page": 1,
      "limit": 20
    }
  }
}
```

---

#### 3.3 Update Scheduled Post

**Endpoint:** `PATCH /api/v1/scheduled-posts/:postId`

**Headers:** `Authorization: Bearer <token>`

**Access:** Super Admin, Admin (own org only)

**Request Body:**

```json
{
  "content": "Updated post content",
  "scheduledTime": "2025-12-02T10:00:00Z",
  "status": "PENDING"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "content": "Updated post content",
    "scheduledTime": "2025-12-02T10:00:00Z",
    "status": "PENDING",
    "updatedAt": "2025-11-25T14:00:00Z"
  }
}
```

---

#### 3.4 Cancel Scheduled Post

**Endpoint:** `DELETE /api/v1/scheduled-posts/:postId`

**Headers:** `Authorization: Bearer <token>`

**Access:** Super Admin, Admin (own org only)

**Success Response (200):**

```json
{
  "success": true,
  "message": "Scheduled post cancelled"
}
```

---

### 4. Published Posts Endpoints

#### 4.1 Get All Published Posts (Super Admin)

**Endpoint:** `GET /api/v1/posts`

**Headers:** `Authorization: Bearer <token>`

**Access:** Super Admin (all), Admin (org posts), Page Owner (own pages)

**Query Parameters:**

- `pageId` - Filter by page
- `organizationId` - Filter by organization
- `startDate` - Published after date
- `endDate` - Published before date
- `page`, `limit` - Pagination

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": "uuid",
        "facebookPostId": "109876543210_123456789",
        "content": "This is a published post",
        "publishedAt": "2025-11-20T15:00:00Z",
        "page": {
          "pageId": "109876543210",
          "pageName": "Business Page"
        },
        "analytics": {
          "likes": 45,
          "comments": 12,
          "shares": 8,
          "reach": 2500
        }
      }
    ],
    "pagination": {
      "total": 320,
      "page": 1,
      "limit": 20
    }
  }
}
```

---

#### 4.2 Get Single Post Details

**Endpoint:** `GET /api/v1/posts/:postId`

**Headers:** `Authorization: Bearer <token>`

**Access:** Super Admin, Admin (org posts), Page Owner (own pages)

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "facebookPostId": "109876543210_123456789",
    "content": "Post content here",
    "mediaUrls": ["https://..."],
    "publishedAt": "2025-11-20T15:00:00Z",
    "page": {
      "pageId": "109876543210",
      "pageName": "Business Page",
      "pageUrl": "https://facebook.com/businesspage"
    },
    "analytics": {
      "impressions": 5000,
      "reach": 2500,
      "engagement": 65,
      "likes": 45,
      "comments": 12,
      "shares": 8,
      "reactions": {
        "like": 30,
        "love": 10,
        "haha": 3,
        "wow": 2
      }
    }
  }
}
```

---

### 5. Analytics Endpoints

#### 5.1 Get Page Analytics

**Endpoint:** `GET /api/v1/analytics/pages/:pageId`

**Headers:** `Authorization: Bearer <token>`

**Access:** Super Admin (all), Admin (org pages), Page Owner (own pages)

**Query Parameters:**

- `startDate` - Start date (default: 30 days ago)
- `endDate` - End date (default: today)
- `granularity` - `day`, `week`, `month` (default: day)

**Facebook API Call (Background Job):**

```
GET https://graph.facebook.com/v24.0/{page-id}/insights
  ?metric=page_impressions,page_engaged_users,page_views,page_fans
  &period=day
  &since={start_date}
  &until={end_date}
  &access_token={page_access_token}
```

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "page": {
      "pageId": "109876543210",
      "pageName": "Business Page",
      "followers": 1520
    },
    "analytics": [
      {
        "date": "2025-11-20",
        "impressions": 1200,
        "reach": 850,
        "engagedUsers": 120,
        "pageViews": 45,
        "pageLikes": 5,
        "pageFollowers": 1520
      },
      {
        "date": "2025-11-21",
        "impressions": 1500,
        "reach": 920,
        "engagedUsers": 145,
        "pageViews": 52,
        "pageLikes": 8,
        "pageFollowers": 1528
      }
    ],
    "summary": {
      "totalImpressions": 45000,
      "totalReach": 28000,
      "avgEngagement": 3.5,
      "totalNewFollowers": 45
    }
  }
}
```

---

#### 5.2 Get Post Analytics

**Endpoint:** `GET /api/v1/analytics/posts/:postId`

**Headers:** `Authorization: Bearer <token>`

**Access:** Super Admin, Admin (org posts), Page Owner (own pages)

**Facebook API Call (Background Job):**

```
GET https://graph.facebook.com/v24.0/{post-id}/insights
  ?metric=post_impressions,post_engaged_users,post_reactions_by_type_total
  &access_token={page_access_token}
```

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "post": {
      "id": "uuid",
      "facebookPostId": "109876543210_123456789",
      "content": "Post content",
      "publishedAt": "2025-11-20T15:00:00Z"
    },
    "analytics": {
      "impressions": 5000,
      "reach": 2500,
      "engagement": 65,
      "likes": 45,
      "comments": 12,
      "shares": 8,
      "reactions": {
        "like": 30,
        "love": 10,
        "haha": 3,
        "wow": 2,
        "sad": 0,
        "angry": 0
      },
      "videoViews": null,
      "linkClicks": null,
      "lastFetchedAt": "2025-11-25T06:00:00Z"
    }
  }
}
```

---

#### 5.3 Get Organization-Wide Analytics (Admin/Super Admin)

**Endpoint:** `GET /api/v1/analytics/organizations/:organizationId`

**Headers:** `Authorization: Bearer <token>`

**Access:** Super Admin (all), Admin (own org only)

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "organization": {
      "id": "org-uuid",
      "name": "Organization Name"
    },
    "summary": {
      "totalPages": 5,
      "totalFollowers": 12500,
      "totalPosts": 320,
      "totalScheduledPosts": 45
    },
    "analytics": {
      "totalImpressions": 250000,
      "totalReach": 150000,
      "totalEngagement": 8500,
      "avgEngagementRate": 5.6
    },
    "topPerformingPages": [
      {
        "pageId": "109876543210",
        "pageName": "Business Page",
        "followers": 5200,
        "engagement": 3200
      }
    ],
    "topPerformingPosts": [
      {
        "facebookPostId": "109876543210_123456789",
        "content": "Top post content...",
        "engagement": 850,
        "reach": 12000
      }
    ]
  }
}
```

---

### 6. Organization Endpoints

#### 6.1 Create Organization (Super Admin)

**Endpoint:** `POST /api/v1/organizations`

**Headers:** `Authorization: Bearer <token>`

**Access:** Super Admin only

**Request Body:**

```json
{
  "name": "New Organization",
  "slug": "new-organization",
  "description": "Organization description"
}
```

**Success Response (201):**

```json
{
  "success": true,
  "data": {
    "id": "org-uuid",
    "name": "New Organization",
    "slug": "new-organization",
    "isActive": true,
    "createdAt": "2025-11-25T10:00:00Z"
  }
}
```

---

#### 6.2 Get All Organizations

**Endpoint:** `GET /api/v1/organizations`

**Headers:** `Authorization: Bearer <token>`

**Access:** Super Admin only

**Success Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "id": "org-uuid",
      "name": "Organization Name",
      "slug": "organization-name",
      "isActive": true,
      "stats": {
        "totalUsers": 12,
        "totalPages": 5,
        "totalPosts": 320
      }
    }
  ]
}
```

---

### 7. User Management Endpoints

#### 7.1 Create Admin User (Super Admin)

**Endpoint:** `POST /api/v1/users`

**Headers:** `Authorization: Bearer <token>`

**Access:** Super Admin only

**Request Body:**

```json
{
  "email": "newadmin@example.com",
  "password": "securepassword",
  "name": "New Admin",
  "role": "ADMIN",
  "organizationId": "org-uuid"
}
```

**Success Response (201):**

```json
{
  "success": true,
  "data": {
    "id": "user-uuid",
    "email": "newadmin@example.com",
    "name": "New Admin",
    "role": "ADMIN",
    "organizationId": "org-uuid",
    "isActive": true
  }
}
```

---

#### 7.2 Get All Users

**Endpoint:** `GET /api/v1/users`

**Headers:** `Authorization: Bearer <token>`

**Access:** Super Admin (all users), Admin (org users only)

**Query Parameters:**

- `role` - Filter by role
- `organizationId` - Filter by organization
- `authProvider` - Filter by auth provider

**Success Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "id": "user-uuid",
      "email": "admin@example.com",
      "name": "Admin User",
      "role": "ADMIN",
      "authProvider": "JWT",
      "organization": {
        "name": "Organization Name"
      },
      "isActive": true
    }
  ]
}
```

---

### 8. Activity Log Endpoints

#### 8.1 Get Activity Logs

**Endpoint:** `GET /api/v1/activity-logs`

**Headers:** `Authorization: Bearer <token>`

**Access:** Super Admin (all), Admin (org activities)

**Query Parameters:**

- `userId` - Filter by user
- `action` - Filter by action type
- `entityType` - Filter by entity type
- `startDate`, `endDate` - Date range
- `page`, `limit` - Pagination

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "logs": [
      {
        "id": "log-uuid",
        "user": {
          "name": "Admin User",
          "email": "admin@example.com"
        },
        "action": "SCHEDULE_POST",
        "entityType": "SCHEDULED_POST",
        "entityId": "post-uuid",
        "details": {
          "pageId": "109876543210",
          "scheduledTime": "2025-12-01T15:00:00Z"
        },
        "createdAt": "2025-11-25T10:00:00Z"
      }
    ],
    "pagination": {
      "total": 5000,
      "page": 1,
      "limit": 50
    }
  }
}
```

---

## 🔐 Permission Matrix

| Endpoint                               | Super Admin | Admin    | Page Owner |
| -------------------------------------- | ----------- | -------- | ---------- |
| POST /api/v1/auth/login                | ✅          | ✅       | ❌         |
| GET /api/auth/facebook-connect         | ❌          | ❌       | ✅         |
| GET /api/v1/pages                      | ✅ (all)    | ✅ (org) | ❌         |
| GET /api/v1/pages/my-pages             | ❌          | ❌       | ✅         |
| POST /api/v1/pages/fetch-from-facebook | ❌          | ❌       | ✅         |
| POST /api/v1/scheduled-posts           | ✅          | ✅ (org) | ❌         |
| GET /api/v1/scheduled-posts            | ✅ (all)    | ✅ (org) | ❌         |
| GET /api/v1/posts                      | ✅ (all)    | ✅ (org) | ✅ (own)   |
| GET /api/v1/analytics/pages/:id        | ✅ (all)    | ✅ (org) | ✅ (own)   |
| GET /api/v1/analytics/posts/:id        | ✅ (all)    | ✅ (org) | ✅ (own)   |
| POST /api/v1/organizations             | ✅          | ❌       | ❌         |
| POST /api/v1/users                     | ✅          | ❌       | ❌         |

---

## ⚠️ Important Facebook API Notes

**All Facebook API interactions happen server-side (background jobs):**

1. **Page Token Fetching** - When Page Owner connects:

   ```
   GET https://graph.facebook.com/v24.0/me/accounts
   ```

2. **Post Publishing** - Background job (cron):

   ```
   POST https://graph.facebook.com/v24.0/{page-id}/feed
   Body: { message, link, picture }
   ```

3. **Analytics Sync** - Background job (daily):
   ```
   GET https://graph.facebook.com/v24.0/{page-id}/insights
   GET https://graph.facebook.com/v24.0/{post-id}/insights
   ```

**No direct Facebook API endpoints exposed to frontend.**

## 🔐 Authentication Methods

### Super Admin / Admin (JWT)

**Login Flow:**

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "uuid",
      "email": "admin@example.com",
      "name": "Admin User",
      "role": "ADMIN"
    }
  }
}
```

**Usage:**

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### Page Owner (Facebook OAuth)

**Login Flow:**

```
1. GET /api/auth/facebook-connect
   ↓
2. Redirect to Facebook OAuth
   ↓
3. User authorizes permissions
   ↓
4. Callback: /api/auth/callback/facebook
   ↓
5. System stores tokens & fetches pages
   ↓
6. Redirect to dashboard with session cookie
```

**Required Permissions:**

- `pages_show_list` - List user's pages
- `pages_read_engagement` - Read page insights
- `pages_manage_posts` - Publish posts
- `pages_manage_metadata` - Manage page settings

---

## 📈 Background Jobs (Cron Jobs)

### 1. Scheduled Post Publisher

**Frequency:** Every 1 minute

**Process:**

```sql
-- Query pending posts
SELECT * FROM ScheduledPost
WHERE status = 'PENDING'
AND scheduledTime <= NOW()

-- For each post:
-- 1. Get page access token
-- 2. Call Facebook API
-- 3. Update status
```

**Facebook API Call:**

```javascript
POST https://graph.facebook.com/v24.0/{page-id}/feed
Body: {
  message: "Post content",
  link: "https://...",
  published: true,
  access_token: "{encrypted_page_token}"
}

Response: {
  id: "109876543210_123456789" // Facebook post ID
}
```

**Status Updates:**

- `PENDING` → `PUBLISHED` (success)
- `PENDING` → `FAILED` (error)

---

### 2. Analytics Sync Job

**Frequency:** Daily at 12:00 AM UTC

**Process:**

```
For each active FacebookPage:
1. Fetch page insights (last 7 days)
2. Fetch post insights for all published posts
3. Update PageAnalytics table
4. Update PostAnalytics table
```

**Facebook API Calls:**

**Page Insights:**

```javascript
GET https://graph.facebook.com/v24.0/{page-id}/insights
?metric=page_impressions,page_engaged_users,page_post_engagements,page_views,page_fans
&period=day
&since={7_days_ago}
&until={today}
&access_token={page_token}
```

**Post Insights:**

```javascript
GET https://graph.facebook.com/v24.0/{post-id}/insights
?metric=post_impressions,post_engaged_users,post_reactions_by_type_total
&access_token={page_token}

GET https://graph.facebook.com/v24.0/{post-id}
?fields=likes.summary(true),comments.summary(true),shares
&access_token={page_token}
```

---

### 3. Token Validator Job

**Frequency:** Every 6 hours

**Process:**

```javascript
For each FacebookPage:
1. Test token validity:
   GET https://graph.facebook.com/v24.0/me?access_token={page_token}

2. If token invalid:
   - Set page.isActive = false
   - Notify Page Owner via email
   - Log activity
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
│   │   │   └── user-login/          # Login pages (JWT & Facebook)
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── [...nextauth]/   # NextAuth routes (Facebook OAuth)
│   │   │   │   └── login/           # JWT login endpoint
│   │   │   └── v1/                  # API routes
│   │   │       ├── users/           # User management
│   │   │       ├── organizations/   # Organization CRUD
│   │   │       ├── pages/           # Facebook page management
│   │   │       ├── posts/           # Published posts
│   │   │       ├── scheduled-posts/ # Post scheduling
│   │   │       ├── analytics/       # Analytics endpoints
│   │   │       └── activity-logs/   # Audit logs
│   │   ├── dashboard/               # Role-based dashboards
│   │   │   ├── super-admin/         # Super Admin dashboard
│   │   │   ├── admin/               # Admin dashboard
│   │   │   └── page-owner/          # Page Owner dashboard
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   └── ui/                      # Shadcn components
│   ├── lib/
│   │   ├── prisma.ts                # Prisma client
│   │   ├── auth.ts                  # Auth helpers & middleware
│   │   ├── facebook.ts              # Facebook Graph API client
│   │   ├── encryption.ts            # Token encryption utilities
│   │   └── utils.ts
│   ├── types/
│   │   ├── next-auth.d.ts           # NextAuth types extension
│   │   └── index.ts                 # Global types
│   └── utils/
│       └── authOption.ts            # NextAuth configuration
├── prisma/
│   └── schema.prisma                # Complete database schema
├── cron-jobs/                       # Background jobs
│   ├── publish-scheduled-posts.ts   # Post publisher (runs every 1 min)
│   ├── sync-analytics.ts            # Analytics sync (daily)
│   └── validate-tokens.ts           # Token validator (every 6 hours)
├── .env                             # Environment variables
├── package.json
├── PROJECT-OVERVIEW.md              # This file
└── README.md
```

---

## 🎨 Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: NextAuth.js (Facebook OAuth) + JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **Token Encryption**: crypto (AES-256-GCM)
- **UI**: React 19 + TailwindCSS + Shadcn/ui
- **Facebook API**: Graph API v24.0
- **Runtime**: Bun (or Node.js)
- **Cron Jobs**: node-cron or Vercel Cron

---

## 📝 Development Workflow

### Adding a New Feature

1. **Update Prisma schema** if database changes needed

```bash
npx prisma migrate dev --name feature_name
npx prisma generate
```

2. **Create API route** in `src/app/api/v1/`

```typescript
// src/app/api/v1/posts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "@/lib/auth";

export async function GET(request: NextRequest) {
  // 1. Verify authentication
  const user = await verifyJWT(request);

  // 2. Check permissions
  if (!user || user.role === "PAGE_OWNER") {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 403 }
    );
  }

  // 3. Implement logic
  // 4. Return response
}
```

3. **Add middleware** for auth & permissions

4. **Test with Postman/Insomnia**

5. **Update this documentation**

---

## 🧪 Testing

```bash
# Run tests (when implemented)
bun test

# Check types
bun run type-check

# Lint code
bun run lint

# Run database migrations
npx prisma migrate dev

# Open Prisma Studio (GUI for database)
npx prisma studio
```

---

## 🔄 Complete System Flow Example

### Scenario: Admin schedules a post for a Facebook page

```
1. Page Owner (user1@example.com) logs in via Facebook OAuth
   ├─> Authorizes permissions
   ├─> System fetches their pages
   └─> Stores encrypted page access tokens in database

2. Admin (admin@company.com) logs in via JWT
   ├─> POST /api/v1/auth/login { email, password }
   └─> Receives JWT token

3. Admin creates scheduled post
   ├─> POST /api/v1/scheduled-posts
   ├─> Headers: Authorization: Bearer {jwt_token}
   ├─> Body: {
         "pageId": "page-uuid",
         "content": "Check out our new product!",
         "scheduledTime": "2025-12-01T15:00:00Z"
       }
   └─> System validates admin owns this organization
   └─> Creates ScheduledPost record with status: PENDING

4. Background job runs every minute
   ├─> Finds post where scheduledTime <= NOW()
   ├─> Fetches page owner's encrypted access token
   ├─> Decrypts token
   ├─> Calls Facebook Graph API:
       POST https://graph.facebook.com/v24.0/{page-id}/feed
       Body: { message: "Check out...", access_token: "{token}" }
   ├─> Facebook responds: { id: "109876543210_123456789" }
   └─> Updates ScheduledPost:
       - status: PUBLISHED
       - facebookPostId: "109876543210_123456789"
   └─> Creates PublishedPost record
   └─> Logs activity: SCHEDULE_POST, PUBLISH_POST

5. Daily analytics job runs at midnight
   ├─> For each published post:
       GET https://graph.facebook.com/v24.0/{post-id}/insights
   ├─> Fetches engagement data
   └─> Updates PostAnalytics table

6. Page Owner views their analytics
   ├─> GET /api/v1/analytics/pages/{page-id}
   └─> Sees engagement metrics for their page

7. Admin views organization-wide analytics
   ├─> GET /api/v1/analytics/organizations/{org-id}
   └─> Sees aggregated metrics for all pages in organization

8. Super Admin views all system analytics
   ├─> GET /api/v1/analytics/system
   └─> Sees metrics across all organizations
```

---

## 📚 Key Implementation Notes

### 1. Token Management

- **Short-lived tokens**: Facebook user tokens (60 days)
- **Long-lived tokens**: Facebook page tokens (no expiration unless revoked)
- **Token refresh**: Implement token refresh flow for user tokens
- **Encryption**: Always encrypt before storing in database

### 2. Error Handling

- **Facebook API errors**: Catch and log errors (token expired, rate limits, etc.)
- **Scheduled post failures**: Mark as FAILED, store error message
- **Token validation**: Check token validity before publishing

### 3. Database Indexes

```sql
-- Recommended indexes for performance
CREATE INDEX idx_scheduled_posts_status_time ON ScheduledPost(status, scheduledTime);
CREATE INDEX idx_facebook_pages_org ON FacebookPage(organizationId);
CREATE INDEX idx_published_posts_page ON PublishedPost(pageId);
CREATE INDEX idx_page_analytics_page_date ON PageAnalytics(pageId, date);
CREATE INDEX idx_activity_logs_user ON ActivityLog(userId, createdAt);
```

### 4. Rate Limiting Considerations

- **Facebook API**: 200 calls/hour/user, 4800 calls/hour/app
- **Graph API**: Use batching for multiple requests
- **Cron jobs**: Stagger requests to avoid rate limits

---

## 🚀 Deployment Checklist

- [ ] Set up PostgreSQL database
- [ ] Configure environment variables
- [ ] Run Prisma migrations
- [ ] Create Super Admin user manually (seed script)
- [ ] Set up Facebook App (OAuth credentials)
- [ ] Configure cron jobs (Vercel Cron or separate service)
- [ ] Enable SSL/HTTPS
- [ ] Set up monitoring (Sentry, LogRocket, etc.)
- [ ] Configure CDN for media files
- [ ] Set up backup strategy for database

---

## 📚 External Resources

- [Facebook Graph API Documentation](https://developers.facebook.com/docs/graph-api)
- [Facebook Page Insights](https://developers.facebook.com/docs/graph-api/reference/insights)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Next.js App Router](https://nextjs.org/docs/app)

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

This project is proprietary and confidential.

---

## 👥 Support

For questions or issues, contact the development team.

---

**Built with ❤️ using Next.js and Facebook Graph API**
