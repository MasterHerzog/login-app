import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js"; // import nextCookies
import { createAuthMiddleware, APIError } from "better-auth/api";
import { admin } from "better-auth/plugins";

import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/argon2";
import { getValidDomains, normalizeName } from "@/lib/utils";
import { UserRole } from "@/generated/prisma";
import { ac, roles } from "@/lib/permissions";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
    },
    github: {
      clientId: String(process.env.GITHUB_CLIENT_ID),
      clientSecret: String(process.env.GITHUB_CLIENT_SECRET),
    },
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    autoSignIn: false,
    password: {
      hash: hashPassword, // your custom password hashing function
      verify: verifyPassword, // your custom password verification function
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path == "/sign-up/email") {
        const email = String(ctx.body.email);
        const domain = email.split("@")[1];
        const VALID_DOMAINS = getValidDomains();
        if (!VALID_DOMAINS.includes(domain)) {
          throw new APIError("BAD_REQUEST", {
            message: "Invalid email domain. Please use a valid email.",
          });
        }
        const name = normalizeName(ctx.body.name);

        return {
          context: {
            ...ctx,
            body: {
              ...ctx.body,
              name,
            },
          },
        };
      }
    }),
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(";") || [];

          if (ADMIN_EMAILS.includes(user.email)) {
            return { data: { ...user, role: UserRole.ADMIN } }; // set role to ADMIN if email is in the list
          }

          return { data: user };
        },
      },
    },
  },
  user: {
    additionalFields: {
      role: {
        type: ["USER", "ADMIN"] as Array<UserRole>,
        input: false,
      },
    },
  },
  session: {
    expiresIn: 30 * 24 * 60 * 60, // session expiration time in seconds
  },
  advanced: {
    database: {
      generateId: false,
    },
  },
  plugins: [
    nextCookies(),
    admin({
      defaultRole: UserRole.USER, // default role for new users
      adminRoles: [UserRole.ADMIN],
      ac,
      roles,
    }),
  ], // add the nextCookies plugin
});

export type ErrorCode = keyof typeof auth.$ERROR_CODES | "UNKNOWN";
