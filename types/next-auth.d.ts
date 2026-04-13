import "next-auth"
import "next-auth/jwt"

declare module "next-auth" {
  interface User {
    id?: string
    role?: "user" | "admin" | "partner"
  }

  interface Session {
    user: {
      id: string
      name: string
      email: string
      role?: "user" | "admin" | "partner"
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string
    role?: "user" | "admin" | "partner"
  }
}
