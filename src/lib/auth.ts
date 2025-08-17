import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js"; // import nextCookies
import { createAuthMiddleware, APIError } from "better-auth/api";

import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/argon2";
import { getValidDomains, normalizeName } from "@/lib/utils";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
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
  user: {
    additionalFields: {
      role: {
        type: ["USER", "ADMIN"],
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
  plugins: [nextCookies()], // add the nextCookies plugin
});

export type ErrorCode = keyof typeof auth.$ERROR_CODES | "UNKNOWN";
