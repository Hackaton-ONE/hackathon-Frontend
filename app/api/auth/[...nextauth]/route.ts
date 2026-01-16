import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
  interface User {
    token?: string;
    usuario?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        usuario: { label: "Email", type: "email" },
        senha: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          
          const baseUrl = "https://mood-matrix-backend.onrender.com";

          const res = await fetch(`${baseUrl}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              usuario: credentials?.usuario,
              senha: credentials?.senha,
            }),
          });

          const user = await res.json();

          if (!res.ok || !user.token) {
            return null;
          }

          
          return {
            id: credentials?.usuario || "id",
            name: user.usuario ? user.usuario.split('@')[0] : "Usuário",
            email: credentials?.usuario,
            token: user.token, 
          };
        } catch (error) {
          console.error("Erro no login:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
      }
      return token;
    },
    
    
    async session({ session, token }) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (session as any).accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/login", 
  },
  secret: process.env.NEXTAUTH_SECRET || "segredo-do-hackathon-123", 
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };