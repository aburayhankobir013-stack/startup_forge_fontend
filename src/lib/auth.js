import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(`${process.env.MONGODB_URI}`);
const db = client.db("startup_forge");

export const auth = betterAuth({
  baseURL: `${process.env.NEXT_PUBLIC_FRONTEND_URL}` || `http://localhost:3000`, 
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  user: {
    additionalFields: {
      role: {
        defaultValue: "collaborator",
      },
      plan: {
        defaultValue: "free",
      },
    },
  },
});
