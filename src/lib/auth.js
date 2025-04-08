const { betterAuth } = require("better-auth");
const { prismaAdapter } = require("better-auth/adapters/prisma");
const prisma = require("../db/prisma");

const CLIENT_SIDE_URL = process.env.BETTER_AUTH_URL;

const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [`${CLIENT_SIDE_URL}`],
});

module.exports = { auth };
