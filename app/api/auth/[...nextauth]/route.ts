import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        senha: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Ajuste a URL se necessário (ex: localhost:8080)
          const res = await fetch("http://localhost:8080/auth/login", { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              senha: credentials?.senha,
            }),
          });

          if (!res.ok) return null;

          // O Backend retorna o token como TEXTO (String), não JSON
          const token = await res.text(); 

          if (token) {
            // Retornamos um objeto com o token para o NextAuth salvar
            return { id: "1", email: credentials?.email, accessToken: token };
          }
          return null;
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Passa o token do login para o JWT interno
      if (user) {
        token.accessToken = (user as any).accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      // Passa o token do JWT para a sessão do navegador
      if (token) {
        (session as any).accessToken = token.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "segredo_hackathon",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
