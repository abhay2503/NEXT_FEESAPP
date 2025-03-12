import { FieldPacket, RowDataPacket } from "mysql2";
import CredentialsProvider from "next-auth/providers/credentials";
import connection from "@/lib/dbconnect";
import { NextAuthOptions } from "next-auth";

interface Admin extends RowDataPacket {
    id: number;
    adminname: string;
    adminpassword: string;
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                name: { label: "Name", type: "text", placeholder: "Name" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.name || !credentials?.password) {
                    throw new Error("Please provide both name and password");
                }
                try {
                    const [result]: [Admin[], FieldPacket[]] = await connection.query(
                        'SELECT * FROM admin WHERE adminname=? AND adminpassword=?',
                        [credentials.name, credentials.password]
                    );

                    console.log('DB Result:', result);

                    if (result.length === 0) {
                        throw new Error("Invalid credentials");
                    }

                    const user = {
                        id: String(result[0].id),
                        name: result[0].adminname
                    };
                    console.log(user);

                    return user;

                } catch (error) {
                    console.error("Login Error:", error);
                    throw new Error("Invalid credentials");
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
            }
            return token;
        },
        async session({ session, token }) {
            if (token?.name && token?.id) {
                session.user = {
                    id: String(token.id),
                    name: token.name
                };
            }
            return session;
        }
    }
};
