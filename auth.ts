import NextAuth, { Account } from "next-auth"
import { JWT } from "next-auth/jwt"
import Spotify from "next-auth/providers/spotify"

export type AuthUser = {
  name: string
  email: string
  emailVerified: Date
  image: string
  access_token: string
  token_type: string
  expires_at: number
  expires_in: number
  refresh_token: string
  scope: string
  id: string
}

declare module "next-auth" {
  interface Session {
    user: AuthUser
    error: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token: string
    token_type: string
    expires_at: number
    expires_in: number
    refresh_token: string
    scope: string
    id: string
    error: string
  }
}

export async function refreshAccessToken(token: JWT) {
  try {
    const response = await fetch("https://accounts.spotify.com/authorize", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    })

    const refreshedTokens = (await response.json()) as {
      access_token: string
      token_type: string
      expires_at: number
      refresh_token: string
      scope: string
    }

    if (!response.ok) {
      throw refreshedTokens
    }

    return {
      ...token,
      access_token: refreshedTokens.access_token,
      token_type: refreshedTokens.token_type,
      expires_at: refreshedTokens.expires_at,
      expires_in: (refreshedTokens.expires_at ?? 0) - Date.now() / 1000,
      refresh_token: refreshedTokens.refresh_token ?? token.refresh_token,
      scope: refreshedTokens.scope,
    }
  } catch (error) {
    console.error(error)
    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: process.env.NODE_ENV === "development",
  secret: process.env.AUTH_SECRET,
  session: {
    maxAge: 60 * 60, // 1hr
  },

  providers: [
    Spotify({
      clientId: process.env.NEXT_PUBLIC_AUTH_SPOTIFY_ID,
      clientSecret: process.env.NEXT_PUBLIC_AUTH_SPOTIFY_SECRET,
      authorization:
        "https://accounts.spotify.com/authorize?scope=user-read-email,playlist-modify-public,playlist-modify-private",
    }),
  ],
  callbacks: {
    async jwt({ token, account }: { token: JWT; account: Account | null }) {
      if (!account) {
        return token
      }

      const updatedToken = {
        ...token,
        access_token: account?.access_token,
        token_type: account?.token_type,
        expires_at: account?.expires_at ?? Date.now() / 1000,
        expires_in: (account?.expires_at ?? 0) - Date.now() / 1000,
        refresh_token: account?.refresh_token,
        scope: account?.scope,
        id: account?.providerAccountId,
      } as JWT

      if (Date.now() < updatedToken.expires_at) {
        return refreshAccessToken(updatedToken)
      }

      return updatedToken
    },
    async session({ session, token }) {
      const user: AuthUser = {
        ...session.user,
        access_token: token.access_token,
        token_type: token.token_type,
        expires_at: token.expires_at,
        expires_in: token.expires_in,
        refresh_token: token.refresh_token,
        scope: token.scope,
        id: token.id,
      }
      session.user = user
      session.error = token.error
      return session
    },
  },
})
