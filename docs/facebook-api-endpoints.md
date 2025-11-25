# Facebook Page Automation Platform - API Documentation

**Version:** v1.0  
**Base URL:** `/api/v1`  
**Facebook Graph API:** `https://graph.facebook.com/v24.0`

This documentation covers the complete API for a multi-tenant Facebook Page automation platform with three user types:

1. **Super Admin** - Full system access, can see all organizations, pages, and analytics
2. **Admin** - Organization-level access, can manage their organization's pages and posts
3. **Page Owner** - Facebook OAuth users who can view their own page analytics

---

## Table of Contents

1. [Authentication](#authentication)
2. [User Management](#user-management)
3. [Organization Management](#organization-management)
4. [Facebook Page Management](#facebook-page-management)
5. [Post Management](#post-management)
6. [Scheduled Posts](#scheduled-posts)
7. [Analytics](#analytics)
8. [Permissions](#permissions)
9. [Activity Logs](#activity-logs)
10. [Database Schema](#database-schema)
11. [Facebook Graph API Reference](#facebook-graph-api-reference)

---

## Authentication

### 1.1 Super Admin / Admin Login (JWT)

**Endpoint:** `POST /api/v1/auth/login`

**Description:** Login for Super Admin and Admin users using email/password (JWT-based authentication).

**Request Body:**

```json
{
  "email": "admin@example.com",
  "password": "securePassword123"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "usr_abc123",
      "email": "admin@example.com",
      "name": "John Admin",
      "role": "ADMIN",
      "organizationId": "org_xyz789"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 86400
  }
}
```

---

### 1.2 Page Owner Login (Facebook OAuth)

**Endpoint:** `GET /api/auth/signin/facebook`

**Description:** Redirect to Facebook OAuth for Page Owner authentication via NextAuth.

**Flow:**

1. User clicks "Login with Facebook"
2. Redirects to Facebook OAuth consent screen
3. User grants permissions
4. Callback to `/api/auth/callback/facebook`
5. Creates/updates user in database
6. Stores Facebook access token

**Required Facebook Permissions:**

- `email`
- `public_profile`
- `pages_show_list`
- `pages_read_engagement`
- `pages_manage_posts`
- `pages_manage_metadata`

---

### 1.3 Get Current User

**Endpoint:** `GET /api/v1/auth/me`

**Description:** Get current authenticated user details.

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "usr_abc123",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "PAGE_OWNER",
    "authProvider": "FACEBOOK",
    "organizationId": "org_xyz789",
    "organization": {
      "id": "org_xyz789",
      "name": "My Company"
    },
    "lastLoginAt": "2025-11-25T10:30:00Z"
  }
}
```

---

### 1.4 Logout

**Endpoint:** `POST /api/v1/auth/logout`

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## User Management

### 2.1 Create User (Admin/Super Admin Only)

**Endpoint:** `POST /api/v1/users`

**Access:** Super Admin, Admin

**Request Body:**

```json
{
  "email": "newadmin@example.com",
  "name": "Jane Admin",
  "password": "securePassword123",
  "role": "ADMIN",
  "organizationId": "org_xyz789"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "usr_def456",
    "email": "newadmin@example.com",
    "name": "Jane Admin",
    "role": "ADMIN",
    "organizationId": "org_xyz789",
    "createdAt": "2025-11-25T10:30:00Z"
  }
}
```

---

### 2.2 Get All Users

**Endpoint:** `GET /api/v1/users`

**Access:** Super Admin (all users), Admin (organization users only)

**Query Parameters:**

- `role` (optional): Filter by role (SUPER_ADMIN, ADMIN, PAGE_OWNER)
- `organizationId` (optional): Filter by organization
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)

**Response:**

```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "usr_abc123",
        "email": "admin@example.com",
        "name": "John Admin",
        "role": "ADMIN",
        "organizationId": "org_xyz789",
        "isActive": true,
        "lastLoginAt": "2025-11-25T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 45,
      "totalPages": 3
    }
  }
}
```

---

### 2.3 Update User

**Endpoint:** `PATCH /api/v1/users/:userId`

**Access:** Super Admin, Admin (own organization only)

**Request Body:**

```json
{
  "name": "Updated Name",
  "isActive": true
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "usr_abc123",
    "email": "admin@example.com",
    "name": "Updated Name",
    "isActive": true
  }
}
```

---

### 2.4 Delete User

**Endpoint:** `DELETE /api/v1/users/:userId`

**Access:** Super Admin only

**Response:**

```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

## Organization Management

### 3.1 Create Organization

**Endpoint:** `POST /api/v1/organizations`

**Access:** Super Admin only

**Request Body:**

```json
{
  "name": "Acme Corporation",
  "slug": "acme-corp",
  "description": "Leading technology company"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "org_xyz789",
    "name": "Acme Corporation",
    "slug": "acme-corp",
    "description": "Leading technology company",
    "createdAt": "2025-11-25T10:30:00Z"
  }
}
```

---

### 3.2 Get All Organizations

**Endpoint:** `GET /api/v1/organizations`

**Access:** Super Admin (all), Admin (own only)

**Response:**

```json
{
  "success": true,
  "data": {
    "organizations": [
      {
        "id": "org_xyz789",
        "name": "Acme Corporation",
        "slug": "acme-corp",
        "isActive": true,
        "totalPages": 15,
        "totalUsers": 25,
        "createdAt": "2025-11-25T10:30:00Z"
      }
    ]
  }
}
```

---

### 3.3 Get Organization Details

**Endpoint:** `GET /api/v1/organizations/:orgId`

**Access:** Super Admin, Admin (own only), Page Owner (own only)

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "org_xyz789",
    "name": "Acme Corporation",
    "slug": "acme-corp",
    "description": "Leading technology company",
    "totalPages": 15,
    "totalUsers": 25,
    "totalPosts": 450,
    "isActive": true,
    "createdAt": "2025-11-25T10:30:00Z"
  }
}
```

---

## Facebook Page Management

### 4.1 Add Facebook Page

**Endpoint:** `POST /api/v1/pages`

**Access:** All authenticated users

**Description:** Add a new Facebook page to the system. Page Owner users add their own pages via Facebook OAuth. Admins can manually add pages with tokens.

**Request Body:**

```json
{
  "pageId": "123456789012345",
  "pageName": "My Business Page",
  "pageAccessToken": "EAABsbCS1iHgBO...",
  "organizationId": "org_xyz789",
  "category": "Brand",
  "about": "We help businesses grow online",
  "website": "https://example.com"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "page_mno456",
    "pageId": "123456789012345",
    "pageName": "My Business Page",
    "category": "Brand",
    "fanCount": 15420,
    "followersCount": 15850,
    "organizationId": "org_xyz789",
    "addedById": "usr_abc123",
    "isActive": true,
    "createdAt": "2025-11-25T10:30:00Z"
  }
}
```

---

### 4.2 Get All Pages

**Endpoint:** `GET /api/v1/pages`

**Access:**

- Super Admin: All pages
- Admin: Organization pages only
- Page Owner: Own pages only

**Query Parameters:**

- `organizationId` (optional): Filter by organization
- `isActive` (optional): Filter by status
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response:**

```json
{
  "success": true,
  "data": {
    "pages": [
      {
        "id": "page_mno456",
        "pageId": "123456789012345",
        "pageName": "My Business Page",
        "category": "Brand",
        "fanCount": 15420,
        "followersCount": 15850,
        "profilePictureUrl": "https://...",
        "organizationId": "org_xyz789",
        "isActive": true,
        "lastSyncAt": "2025-11-25T09:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 15,
      "totalPages": 1
    }
  }
}
```

---

### 4.3 Get Page Details

**Endpoint:** `GET /api/v1/pages/:pageId`

**Access:** Users with page access

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "page_mno456",
    "pageId": "123456789012345",
    "pageName": "My Business Page",
    "category": "Brand",
    "about": "We help businesses grow online",
    "website": "https://example.com",
    "phone": "+1-555-0123",
    "email": "contact@example.com",
    "fanCount": 15420,
    "followersCount": 15850,
    "profilePictureUrl": "https://...",
    "coverPhotoUrl": "https://...",
    "organizationId": "org_xyz789",
    "organization": {
      "id": "org_xyz789",
      "name": "Acme Corporation"
    },
    "addedBy": {
      "id": "usr_abc123",
      "name": "John Admin"
    },
    "isActive": true,
    "lastSyncAt": "2025-11-25T09:00:00Z",
    "createdAt": "2025-11-24T10:30:00Z"
  }
}
```

---

### 4.4 Sync Page Data from Facebook

**Endpoint:** `POST /api/v1/pages/:pageId/sync`

**Access:** Users with page access

**Description:** Fetch latest page data from Facebook Graph API and update database.

**Response:**

```json
{
  "success": true,
  "data": {
    "pageId": "page_mno456",
    "fanCount": 15450,
    "followersCount": 15880,
    "lastSyncAt": "2025-11-25T10:35:00Z"
  }
}
```

---

### 4.5 Update Page

**Endpoint:** `PATCH /api/v1/pages/:pageId`

**Access:** Admin, Super Admin

**Request Body:**

```json
{
  "isActive": true,
  "organizationId": "org_xyz789"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "page_mno456",
    "isActive": true,
    "updatedAt": "2025-11-25T10:36:00Z"
  }
}
```

---

### 4.6 Delete/Remove Page

**Endpoint:** `DELETE /api/v1/pages/:pageId`

**Access:** Admin, Super Admin

**Response:**

```json
{
  "success": true,
  "message": "Page removed successfully"
}
```

---

## Post Management

### 5.1 Create Post (Publish or Draft)

    "cursors": {
      "before": "MTM1MzI2OTg2NDcy...",
      "after": "MTM1MzI2OTg2NDcy..."
    }

}
}

````

---

## Page Management

### 2.1 Get All Pages

**Endpoint:** `GET /{user-id}/accounts`

**Description:** Get all pages that the user has access to manage.

**Request Example:**

```bash
curl -X GET "https://graph.facebook.com/v24.0/me/accounts?\
fields=id,name,access_token,category,fan_count,followers_count,picture&\
access_token={user-access-token}"
````

**Response Example:**

```json
{
  "data": [
    {
      "id": "123456789012345",
      "name": "My Business Page",
      "access_token": "EAABsbCS1iHgBO...",
      "category": "Brand",
      "fan_count": 15420,
      "followers_count": 15850,
      "picture": {
        "data": {
          "url": "https://scontent.xx.fbcdn.net/..."
        }
      }
    }
  ]
}
```

---

### 2.2 Get Page Details

**Endpoint:** `GET /{page-id}`

**Description:** Get detailed information about a specific page.

**Request Example:**

```bash
curl -X GET "https://graph.facebook.com/v24.0/{page-id}?\
fields=id,name,about,category,fan_count,followers_count,engagement,phone,website,emails,location,cover,picture&\
access_token={page-access-token}"
```

**Response Example:**

```json
{
  "id": "123456789012345",
  "name": "My Business Page",
  "about": "We help businesses grow online",
  "category": "Brand",
  "fan_count": 15420,
  "followers_count": 15850,
  "engagement": {
    "count": 12450,
    "social_sentence": "12K people like this"
  },
  "phone": "+1-555-0123",
  "website": "https://example.com",
  "emails": ["contact@example.com"],
  "location": {
    "city": "New York",
    "country": "United States",
    "latitude": 40.7128,
    "longitude": -74.006,
    "street": "123 Main St",
    "zip": "10001"
  },
  "cover": {
    "id": "987654321098765",
    "source": "https://scontent.xx.fbcdn.net/..."
  },
  "picture": {
    "data": {
      "url": "https://scontent.xx.fbcdn.net/..."
    }
  }
}
```

---

## Post Management

### 3.1 Get Page Feed (All Posts)

**Endpoint:** `GET /{page-id}/feed`

**Description:** Get all posts published on a page (up to ~600 posts per year).

**Request Example:**

```bash
curl -X GET "https://graph.facebook.com/v24.0/{page-id}/feed?\
fields=id,message,created_time,full_picture,permalink_url,likes.summary(true),comments.summary(true),shares,is_published&\
limit=25&\
access_token={page-access-token}"
```

**Response Example:**

```json
{
  "data": [
    {
      "id": "123456789012345_987654321098765",
      "message": "Check out our new product launch! 🚀",
      "created_time": "2025-11-18T10:30:00+0000",
      "full_picture": "https://scontent.xx.fbcdn.net/...",
      "permalink_url": "https://www.facebook.com/123456789012345/posts/987654321098765",
      "likes": {
        "data": [],
        "summary": {
          "total_count": 245,
          "can_like": true,
          "has_liked": false
        }
      },
      "comments": {
        "data": [],
        "summary": {
          "order": "ranked",
          "total_count": 18,
          "can_comment": true
        }
      },
      "shares": {
        "count": 42
      },
      "is_published": true
    }
  ],
  "paging": {
    "cursors": {
      "before": "Q2c4U1pXNT...",
      "after": "Q2c4U1pXNT..."
    },
    "next": "https://graph.facebook.com/v24.0/123456789012345/feed?..."
  }
}
```

---

### 3.2 Publish Text Post

**Endpoint:** `POST /{page-id}/feed`

**Description:** Publish a text-only post to a page.

**Required Permissions:**

- `pages_manage_posts`
- `pages_read_engagement`

**Request Example:**

```bash
curl -X POST "https://graph.facebook.com/v24.0/{page-id}/feed" \
-d "message=Hello from our API! This is a test post." \
-d "published=true" \
-d "access_token={page-access-token}"
```

**Response Example:**

```json
{
  "id": "123456789012345_987654321098765"
}
```

---

### 3.3 Publish Link Post

**Endpoint:** `POST /{page-id}/feed`

**Description:** Publish a link post with optional call-to-action button.

**Request Example:**

```bash
curl -X POST "https://graph.facebook.com/v24.0/{page-id}/feed" \
-d "message=Check out our website!" \
-d "link=https://example.com" \
-d "published=true" \
-d "access_token={page-access-token}"
```

**With Call-to-Action:**

```bash
curl -X POST "https://graph.facebook.com/v24.0/{page-id}/feed" \
-d "message=Join us today!" \
-d "link=https://example.com/signup" \
-d 'call_to_action={"type":"SIGN_UP","value":{"link":"https://example.com/signup"}}' \
-d "published=true" \
-d "access_token={page-access-token}"
```

**Call-to-Action Types:**

- `BOOK_TRAVEL`
- `BUY_TICKETS`
- `CALL_NOW`
- `CONTACT_US`
- `DOWNLOAD`
- `GET_DIRECTIONS`
- `LEARN_MORE`
- `SHOP_NOW`
- `SIGN_UP`
- `WATCH_MORE`

**Response Example:**

```json
{
  "id": "123456789012345_987654321098765"
}
```

---

### 3.4 Publish Photo Post

**Endpoint:** `POST /{page-id}/photos`

**Description:** Publish a photo post to a page.

**Request Example:**

```bash
curl -X POST "https://graph.facebook.com/v24.0/{page-id}/photos" \
-F "message=Beautiful day! 🌞" \
-F "url=https://example.com/photo.jpg" \
-F "published=true" \
-F "access_token={page-access-token}"
```

**Or upload local file:**

```bash
curl -X POST "https://graph.facebook.com/v24.0/{page-id}/photos" \
-F "message=Beautiful day! 🌞" \
-F "source=@/path/to/photo.jpg" \
-F "published=true" \
-F "access_token={page-access-token}"
```

**Response Example:**

```json
{
  "id": "987654321098765",
  "post_id": "123456789012345_987654321098765"
}
```

---

### 3.5 Publish Video Post

**Endpoint:** `POST /{page-id}/videos`

**Description:** Publish a video post to a page.

**Request Example:**

```bash
curl -X POST "https://graph.facebook.com/v24.0/{page-id}/videos" \
-F "description=Check out this amazing video!" \
-F "source=@/path/to/video.mp4" \
-F "published=true" \
-F "access_token={page-access-token}"
```

**Response Example:**

```json
{
  "id": "987654321098765"
}
```

---

### 3.6 Update/Edit Post

**Endpoint:** `POST /{post-id}`

**Description:** Update an existing published post.

**Request Example:**

```bash
curl -X POST "https://graph.facebook.com/v24.0/{post-id}" \
-d "message=Updated message content" \
-d "access_token={page-access-token}"
```

**Response Example:**

```json
{
  "success": true
}
```

---

### 3.7 Delete Post

**Endpoint:** `DELETE /{post-id}`

**Description:** Delete a post from the page.

**Request Example:**

```bash
curl -X DELETE "https://graph.facebook.com/v24.0/{post-id}?\
access_token={page-access-token}"
```

**Response Example:**

```json
{
  "success": true
}
```

---

## Scheduled Posts

### 4.1 Get Scheduled Posts

**Endpoint:** `GET /{page-id}/scheduled_posts`

**Description:** Get all posts scheduled for future publishing.

**Request Example:**

```bash
curl -X GET "https://graph.facebook.com/v24.0/{page-id}/scheduled_posts?\
fields=id,message,scheduled_publish_time,created_time,is_published&\
access_token={page-access-token}"
```

**Response Example:**

```json
{
  "data": [
    {
      "id": "123456789012345_987654321098765",
      "message": "This will be published tomorrow!",
      "scheduled_publish_time": 1732108800,
      "created_time": "2025-11-18T10:30:00+0000",
      "is_published": false
    }
  ]
}
```

---

### 4.2 Create Scheduled Post

**Endpoint:** `POST /{page-id}/feed`

**Description:** Schedule a post for future publishing.

**Request Example:**

```bash
curl -X POST "https://graph.facebook.com/v24.0/{page-id}/feed" \
-d "message=This post will go live tomorrow at 3 PM" \
-d "published=false" \
-d "scheduled_publish_time=1732108800" \
-d "access_token={page-access-token}"
```

**Parameters:**

- `published`: Must be `false`
- `scheduled_publish_time`: Unix timestamp (must be 10 mins to 75 days in future)

**Response Example:**

```json
{
  "id": "123456789012345_987654321098765"
}
```

---

### 4.3 Update Scheduled Post

**Endpoint:** `POST /{post-id}`

**Description:** Update a scheduled post (message or schedule time).

**Request Example:**

```bash
curl -X POST "https://graph.facebook.com/v24.0/{post-id}" \
-d "message=Updated scheduled message" \
-d "scheduled_publish_time=1732195200" \
-d "access_token={page-access-token}"
```

**Response Example:**

```json
{
  "success": true
}
```

---

### 4.4 Publish Scheduled Post Now

**Endpoint:** `POST /{post-id}`

**Description:** Immediately publish a scheduled post.

**Request Example:**

```bash
curl -X POST "https://graph.facebook.com/v24.0/{post-id}" \
-d "is_published=true" \
-d "access_token={page-access-token}"
```

**Response Example:**

```json
{
  "success": true
}
```

---

## Analytics & Insights

### 5.1 Get Page Insights

**Endpoint:** `GET /{page-id}/insights`

**Description:** Get analytics data for the page.

**Request Example:**

```bash
curl -X GET "https://graph.facebook.com/v24.0/{page-id}/insights?\
metric=page_impressions,page_engaged_users,page_post_engagements,page_fans,page_views_total&\
period=day&\
since=2025-11-01&\
until=2025-11-18&\
access_token={page-access-token}"
```

**Available Metrics:**

- `page_impressions` - Total page views
- `page_impressions_unique` - Unique page views
- `page_engaged_users` - People who engaged with page
- `page_post_engagements` - Total engagement on posts
- `page_fans` - Total page likes
- `page_fans_online` - Fans online
- `page_views_total` - Total page views
- `page_views_logout` - Views from non-logged in users
- `page_video_views` - Video views
- `page_negative_feedback` - Negative feedback

**Period Values:**

- `day` - Daily data
- `week` - Weekly data
- `days_28` - 28-day data
- `lifetime` - Lifetime data

**Response Example:**

```json
{
  "data": [
    {
      "name": "page_impressions",
      "period": "day",
      "values": [
        {
          "value": 1250,
          "end_time": "2025-11-18T08:00:00+0000"
        },
        {
          "value": 1340,
          "end_time": "2025-11-19T08:00:00+0000"
        }
      ],
      "title": "Daily Total Impressions",
      "description": "Daily: The number of times any content from your Page or about your Page entered a person's screen. This includes posts, stories, check-ins, ads, social information from people who interact with your Page and more. (Total Count)",
      "id": "123456789012345/insights/page_impressions/day"
    },
    {
      "name": "page_engaged_users",
      "period": "day",
      "values": [
        {
          "value": 845,
          "end_time": "2025-11-18T08:00:00+0000"
        },
        {
          "value": 920,
          "end_time": "2025-11-19T08:00:00+0000"
        }
      ],
      "title": "Daily Engaged Users",
      "description": "Daily: The number of people who engaged with your Page. Engagement includes any click or story created. (Unique Users)",
      "id": "123456789012345/insights/page_engaged_users/day"
    }
  ]
}
```

---

### 5.2 Get Post Insights

**Endpoint:** `GET /{post-id}/insights`

**Description:** Get analytics for a specific post.

**Request Example:**

```bash
curl -X GET "https://graph.facebook.com/v24.0/{post-id}/insights?\
metric=post_impressions,post_engaged_users,post_reactions_by_type_total&\
access_token={page-access-token}"
```

**Available Post Metrics:**

- `post_impressions` - Total impressions
- `post_impressions_unique` - Unique impressions
- `post_engaged_users` - Users who engaged
- `post_reactions_by_type_total` - Reactions breakdown
- `post_clicks` - Total clicks
- `post_video_views` - Video views (for video posts)
- `post_video_view_time` - Total video watch time

**Response Example:**

```json
{
  "data": [
    {
      "name": "post_impressions",
      "period": "lifetime",
      "values": [
        {
          "value": 3450
        }
      ],
      "title": "Lifetime Post Total Impressions",
      "description": "Lifetime: The number of times your Page's post entered a person's screen. Posts include statuses, photos, links, videos and more. (Total Count)",
      "id": "123456789012345_987654321098765/insights/post_impressions/lifetime"
    },
    {
      "name": "post_engaged_users",
      "period": "lifetime",
      "values": [
        {
          "value": 892
        }
      ],
      "title": "Lifetime Engaged Users",
      "description": "Lifetime: The number of people who clicked anywhere in your post. (Unique Users)",
      "id": "123456789012345_987654321098765/insights/post_engaged_users/lifetime"
    },
    {
      "name": "post_reactions_by_type_total",
      "period": "lifetime",
      "values": [
        {
          "value": {
            "like": 145,
            "love": 89,
            "wow": 23,
            "haha": 12,
            "sorry": 3,
            "anger": 1
          }
        }
      ],
      "title": "Lifetime Post Reactions by Type",
      "description": "Lifetime: Total post reactions by type.",
      "id": "123456789012345_987654321098765/insights/post_reactions_by_type_total/lifetime"
    }
  ]
}
```

---

### 5.3 Get Post Engagement Details

**Endpoint:** `GET /{post-id}`

**Description:** Get detailed engagement metrics for a post.

**Request Example:**

```bash
curl -X GET "https://graph.facebook.com/v24.0/{post-id}?\
fields=likes.summary(true),comments.summary(true),shares,reactions.summary(true)&\
access_token={page-access-token}"
```

**Response Example:**

```json
{
  "likes": {
    "data": [],
    "summary": {
      "total_count": 245,
      "can_like": true,
      "has_liked": false
    }
  },
  "comments": {
    "data": [],
    "summary": {
      "order": "ranked",
      "total_count": 18,
      "can_comment": true
    }
  },
  "shares": {
    "count": 42
  },
  "reactions": {
    "data": [],
    "summary": {
      "total_count": 273,
      "viewer_reaction": "NONE"
    }
  },
  "id": "123456789012345_987654321098765"
}
```

---

## Database Schema

### Recommended Tables for Multi-Organization Management

#### Table: `organizations`

```sql
CREATE TABLE organizations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Table: `users`

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  organization_id INTEGER REFERENCES organizations(id),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user', -- 'super_admin', 'admin', 'user'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Table: `facebook_pages`

```sql
CREATE TABLE facebook_pages (
  id SERIAL PRIMARY KEY,
  organization_id INTEGER REFERENCES organizations(id),
  page_id VARCHAR(255) UNIQUE NOT NULL,
  page_name VARCHAR(255) NOT NULL,
  page_access_token TEXT NOT NULL, -- Long-lived page token
  category VARCHAR(100),
  fan_count INTEGER DEFAULT 0,
  followers_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  added_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Table: `facebook_posts`

```sql
CREATE TABLE facebook_posts (
  id SERIAL PRIMARY KEY,
  organization_id INTEGER REFERENCES organizations(id),
  page_id INTEGER REFERENCES facebook_pages(id),
  post_id VARCHAR(255) UNIQUE,
  message TEXT,
  post_type VARCHAR(50), -- 'text', 'link', 'photo', 'video'
  link VARCHAR(500),
  picture_url VARCHAR(500),
  status VARCHAR(50) DEFAULT 'draft', -- 'draft', 'scheduled', 'published', 'failed'
  scheduled_time TIMESTAMP,
  published_time TIMESTAMP,
  is_published BOOLEAN DEFAULT false,
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Table: `post_analytics`

```sql
CREATE TABLE post_analytics (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES facebook_posts(id),
  impressions INTEGER DEFAULT 0,
  reach INTEGER DEFAULT 0,
  engaged_users INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  reactions_love INTEGER DEFAULT 0,
  reactions_wow INTEGER DEFAULT 0,
  reactions_haha INTEGER DEFAULT 0,
  reactions_sad INTEGER DEFAULT 0,
  reactions_angry INTEGER DEFAULT 0,
  video_views INTEGER DEFAULT 0,
  synced_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Table: `page_analytics`

```sql
CREATE TABLE page_analytics (
  id SERIAL PRIMARY KEY,
  page_id INTEGER REFERENCES facebook_pages(id),
  date DATE NOT NULL,
  impressions INTEGER DEFAULT 0,
  engaged_users INTEGER DEFAULT 0,
  post_engagements INTEGER DEFAULT 0,
  page_views INTEGER DEFAULT 0,
  new_likes INTEGER DEFAULT 0,
  total_fans INTEGER DEFAULT 0,
  synced_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(page_id, date)
);
```

#### Table: `user_page_access`

```sql
CREATE TABLE user_page_access (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  page_id INTEGER REFERENCES facebook_pages(id),
  can_view BOOLEAN DEFAULT true,
  can_post BOOLEAN DEFAULT false,
  can_schedule BOOLEAN DEFAULT false,
  can_delete BOOLEAN DEFAULT false,
  granted_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, page_id)
);
```

---

## Usage Flow for Multi-Organization System

### 1. **Admin/Super Admin Login**

- Authenticate using JWT (your internal system)
- No Facebook authentication required for admins

### 2. **Add Facebook Page to Organization**

- Admin provides page access token (long-lived)
- Store in `facebook_pages` table
- Token used for all page operations

### 3. **Create/Schedule Posts**

- Any authorized user can create posts
- Posts stored in `facebook_posts` table
- Use stored page token to publish via API

### 4. **Sync Analytics**

- Periodic job to fetch insights from Facebook API
- Store in `post_analytics` and `page_analytics` tables
- Display in dashboard

### 5. **Multi-User Access Control**

- `user_page_access` table manages permissions
- Different roles (view, post, schedule, delete)

---

## Error Handling

### Common Error Codes

```json
{
  "error": {
    "message": "Invalid OAuth 2.0 Access Token",
    "type": "OAuthException",
    "code": 190,
    "fbtrace_id": "..."
  }
}
```

**Error Codes:**

- `100` - Invalid parameter
- `190` - Invalid OAuth 2.0 Access Token (token expired or invalid)
- `200` - Permissions error
- `368` - The action attempted has been deemed abusive
- `80001` - Too many calls (rate limit)

### Rate Limiting

- Pages are subject to rate limits
- Use system user access tokens for higher limits
- Implement exponential backoff for retries

---

## Best Practices

1. **Token Storage**: Encrypt page access tokens in database
2. **Token Refresh**: Check token validity before operations
3. **Error Handling**: Implement proper error handling and logging
4. **Rate Limiting**: Implement request queuing to avoid rate limits
5. **Webhooks**: Subscribe to real-time updates instead of constant polling
6. **Analytics Sync**: Run scheduled jobs (e.g., daily) to sync analytics
7. **Permissions**: Implement role-based access control
8. **Audit Logs**: Track all post operations for accountability

---

## Additional Resources

- [Facebook Graph API Documentation](https://developers.facebook.com/docs/graph-api)
- [Pages API Overview](https://developers.facebook.com/docs/pages)
- [Access Tokens Guide](https://developers.facebook.com/docs/facebook-login/guides/access-tokens)
- [Rate Limiting](https://developers.facebook.com/docs/graph-api/overview/rate-limiting)
- [Webhooks](https://developers.facebook.com/docs/graph-api/webhooks)
