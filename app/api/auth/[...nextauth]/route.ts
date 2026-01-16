import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Tipagem para o TypeScript não reclamar
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

          // Se o Java retornou erro ou não tem token, falha o login
          if (!res.ok || !user.token) {
            return null;
          }

          // Retorna o objeto usuário com o Token do Java
          return {
            id: credentials?.usuario || "id",
            name: user.usuario.split('@')[0], // Pega o nome antes do @
            email: credentials?.usuario,
            token: user.token, // O token 
          };
        } catch (error) {
          console.error("Erro no login:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // 1. O Token JWT é gerado/atualizado
    async jwt({ token, user }) {
      // Se for o primeiro login, o objeto 'user' existe.
      // Pega o token que veio do Java e salva no Cookie JWT.
      if (user) {
        token.accessToken = user.token;
      }
      return token;
    },
    // 2. A Sessão é entregue para o Front (useSession)
    async session({ session, token }) {
      // Pega o token do Cookie JWT e coloca na Sessão visível
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/login", // Se der erro, volta pra cá
  },
  secret: process.env.NEXTAUTH_SECRET || "segredo-do-hackathon", // Chave interna do Next
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };