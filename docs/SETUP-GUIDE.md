# Quick Setup Guide

## 1. Install Prisma

```bash
bun add prisma @prisma/client
bun add -D @types/bcrypt bcrypt
```

## 2. Initialize Database

```bash
# Create .env file with DATABASE_URL
echo 'DATABASE_URL="postgresql://user:password@localhost:5432/fbautomation"' >> .env

# Run Prisma migration
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate
```

## 3. Seed Super Admin User

Create `prisma/seed.ts`:

```typescript
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const superAdmin = await prisma.user.create({
    data: {
      email: "superadmin@example.com",
      name: "Super Admin",
      password: hashedPassword,
      role: "SUPER_ADMIN",
      authProvider: "LOCAL",
      isActive: true,
    },
  });

  console.log("✅ Super Admin created:", superAdmin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Add to package.json:

```json
{
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  }
}
```

Run seed:

```bash
buninstall ts-node -D
npx prisma db seed
```

## 4. Install Additional Dependencies

```bash
# JWT & Encryption
bun add jsonwebtoken crypto-js
bun add -D @types/jsonwebtoken @types/crypto-js

# Facebook Graph API client
bun add axios

# Environment variables
bun add dotenv
```

## 5. Update .env

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/fbautomation"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="run: openssl rand -base64 32"

# Facebook App (from developers.facebook.com)
FACEBOOK_APP_ID="1190483199707045"
FACEBOOK_APP_SECRET="379d9d2ae41e469e9adee57fabc97e35"

# JWT for Admin/Super Admin
JWT_SECRET="run: openssl rand -base64 32"
JWT_EXPIRES_IN="24h"

# Token Encryption (32 characters)
ENCRYPTION_KEY="run: openssl rand -hex 16"

# Facebook Graph API
FACEBOOK_API_VERSION="v24.0"
FACEBOOK_GRAPH_URL="https://graph.facebook.com"
```

## 6. Create Core Utilities

### lib/prisma.ts

```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query", "error", "warn"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

### lib/jwt.ts

```typescript
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function signToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "24h",
  });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}
```

### lib/encryption.ts

```typescript
import CryptoJS from "crypto-js";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY!;

export function encrypt(text: string): string {
  return CryptoJS.AES.encrypt(text, ENCRYPTION_KEY).toString();
}

export function decrypt(ciphertext: string): string {
  const bytes = CryptoJS.AES.decrypt(ciphertext, ENCRYPTION_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}
```

### lib/facebook.ts

```typescript
import axios from "axios";

const FB_API_VERSION = process.env.FACEBOOK_API_VERSION || "v24.0";
const FB_BASE_URL = `https://graph.facebook.com/${FB_API_VERSION}`;

export class FacebookAPI {
  constructor(private accessToken: string) {}

  async publishPost(
    pageId: string,
    data: {
      message?: string;
      link?: string;
      url?: string;
      published?: boolean;
      scheduled_publish_time?: number;
    }
  ) {
    const response = await axios.post(`${FB_BASE_URL}/${pageId}/feed`, {
      ...data,
      access_token: this.accessToken,
    });
    return response.data;
  }

  async getPageInsights(
    pageId: string,
    metrics: string[],
    since?: string,
    until?: string
  ) {
    const response = await axios.get(`${FB_BASE_URL}/${pageId}/insights`, {
      params: {
        metric: metrics.join(","),
        since,
        until,
        access_token: this.accessToken,
      },
    });
    return response.data;
  }

  async getPostInsights(postId: string, metrics: string[]) {
    const response = await axios.get(`${FB_BASE_URL}/${postId}/insights`, {
      params: {
        metric: metrics.join(","),
        access_token: this.accessToken,
      },
    });
    return response.data;
  }
}
```

## 7. Create First API Route

### src/app/api/v1/auth/login/route.ts

```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signToken } from "@/lib/jwt";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const user = await prisma.user.findUnique({
      where: { email },
      include: { organization: true },
    });

    if (!user || user.authProvider !== "LOCAL") {
      return NextResponse.json(
        { success: false, error: { message: "Invalid credentials" } },
        { status: 401 }
      );
    }

    const isValid = await bcrypt.compare(password, user.password!);

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: { message: "Invalid credentials" } },
        { status: 401 }
      );
    }

    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          organizationId: user.organizationId,
        },
        token,
        expiresIn: 86400,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: { message: "Internal server error" } },
      { status: 500 }
    );
  }
}
```

## 8. Test the Setup

```bash
# Start dev server
bun dev

# Test Super Admin login
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"superadmin@example.com","password":"admin123"}'
```

## 9. Next Steps

1. ✅ Database setup complete
2. ✅ Authentication working
3. ⏳ Implement remaining API routes (users, organizations, pages, posts)
4. ⏳ Create dashboard UI
5. ⏳ Setup background jobs for scheduled posts
6. ⏳ Implement analytics sync

## Useful Commands

```bash
# Prisma Studio (visual database browser)
npx prisma studio

# Reset database
npx prisma migrate reset

# Generate Prisma Client after schema changes
npx prisma generate

# Create new migration
npx prisma migrate dev --name migration_name

# Format Prisma schema
npx prisma format
```
