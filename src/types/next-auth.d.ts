import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface User extends DefaultUser {
        id: string; // Keep as string for NextAuth compatibility
        name: string;
    }

    interface Session extends DefaultSession {
        user: {
            id: string;
            name: string;
        };
    }

    interface JWT {
        id: string;
        name: string;
    }
}