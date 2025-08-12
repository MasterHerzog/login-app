import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/argon2";

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
      verify: verifyPassword // your custom password verification function
    }
  },
  advanced: {
    database: {
      generateId: false,
    }
  }
});
