remove files from public/*
clear globals.css
clear page.tsx
install shadcn npx shadcn@latest init
install components npx shadcn@latest add button label input sonner
show button and test dev server
== PART 1 ==

install Better Auth npm install better-auth

create .env and set Environment Variables

create lib/auth.ts

setup postgres database with neon.tech

install prisma npm install prisma --save-dev

initialize prisma npx prisma init

create Post Model

push database changes npx prisma db push

add generated to .gitignore

adjust scripts in package.json

create single Prisma Client in lib/prisma.ts

setup prisma adapter with better-auth

generate auth tables npx @better-auth/cli generate --output=auth.schema.prisma

make tweaks to schema.prisma

quick walkthrough the models:

User
Session
Account
Verification
push database changes npx prisma db push

create Mount Handler in app/api/auth/[...all]/route.ts

adjust eslint.config.mjs to ignore /src/generated/**/*

create Client instance in lib/auth-client.ts

Enable Email & Password Authentication

Create Sign Up Page PT1

Create Form components/register-form.tsx
Log Form Values
Setup Sonner

Create Sign Up Page PT2

Add Form Validation
Destructure SignUp Function
Showcase onError
OPTIONS - minPasswordLength

Create Sign Up Page PT3

Sign Up default automatically signs in the user
Show Session on Profile Page

Show Data in Neon Dashboard

Sign Out User

Destructure SignOut Function
Show Removed Cookies
Create Sign In Page PT1

Create Form components/login-form.tsx
Log Form Values
Destructure SignIn Function
Show Unauthorized on Profile Page

Create Sign In Page PT2

Showcase onError
Sign In User
FINISH PART 1