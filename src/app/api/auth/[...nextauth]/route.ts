import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from 'bcrypt'
import prisma from '@/libs/db';
import { setCookie } from 'cookies-next';


const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password", placeholder: "*****" },
      },
      async authorize(credentials, req) {
       
        const userFound = await prisma.user.findUnique({
            where: {
                email: credentials!.email
            }
        })

        if (!userFound) throw new Error('No user found')

        const matchPassword = await bcrypt.compare(credentials!.password, userFound.password)

        if (!matchPassword) throw new Error('Wrong password')

          setCookie('userId', userFound.id);
        
        return {
            id: userFound.id,
            name: userFound.username,
            email: userFound.email,
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      const userFound = await prisma.user.findUnique({
        where: {
          email: credentials.email,
        },
      });
      setCookie('userId', userFound?.id, { req: credentials.req, res: credentials.res });
      return true;
    },
    async session({ session, token, user }: any) {
      session.userId = token.sub;
      return session;
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };