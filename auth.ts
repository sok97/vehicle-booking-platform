import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import bcrypt from "bcryptjs"
import { connectDb } from "@/app/lib/db"
import User from "@/app/models/user.model"

// Email ଏବଂ password ର structure declare କରାଯାଇଛି
type CredentialsInput = {
  email?: unknown
  password?: unknown
}

// ଏହି ଫଙ୍କସନ୍ value କୁ string ରେ convert କରେ ଆଉ ଯଦି string ଅଟେ ତାହେଲେ ସାଇଡ଼ ରୁ space (ଖାଲି ଜାଗା) କାଟିଦିଏ
const getCredentialValue = (value: unknown) =>
  typeof value === "string" ? value.trim() : ""

// Database ରୁ user କୁ ତାଙ୍କ email ଦ୍ୱାରା ଖୋଜିବା ପାଇଁ ଏହି ଫଙ୍କସନ୍
const getUserFromDb = async (email: string) => {
  await connectDb() // Database ସହିତ connect କରେ
  // ଆବଶ୍ୟକ field ଗୁଡ଼ିକ ମାତ୍ର ଆଣେ — memory ଓ speed ଭଲ ରହେ
  return User.findOne({ email }).select("_id name email password role").lean()
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // Google ଦ୍ୱାରା ଲଗଇନ୍ ପାଇଁ (ଏହା ଆପେ ଆପେ .env ରୁ ଆଇଡି ଏବଂ ସିକ୍ରେଟ୍ ନେଇଥାଏ)
    Google,
    // ନିଜର ଇମେଲ୍ ଏବଂ ପାସୱାର୍ଡ ବ୍ୟବହାର କରି ଲଗଇନ୍ କରିବା ପାଇଁ
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "johndoe@gmail.com",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "*****",
        },
      },
      // ଦିଆଯାଇଥିବା ତଥ୍ୟ (credentials) କୁ ଯାଞ୍ଚ କରିବା ପ୍ରକ୍ରିୟା
      authorize: async (credentials) => {
        const { email, password } = (credentials ?? {}) as CredentialsInput
        const parsedEmail = getCredentialValue(email).toLowerCase() // Email କୁ ଛୋଟ ଅକ୍ଷର କରେ
        const parsedPassword = getCredentialValue(password)

        // ଯଦି email କିମ୍ବା password ଦିଆଯାଇ ନାହିଁ
        if (!parsedEmail || !parsedPassword) {
          // ସୁରକ୍ଷା (Security): generic message — hacker କୁ specific info ଦିଅ ନାହିଁ
          throw new Error("Invalid credentials.")
        }

        // Database ରୁ user କୁ ଖୋଜ
        const user = await getUserFromDb(parsedEmail)

        // ଯଦି user ମିଳିଲେ ନାହିଁ
        if (!user) {
          // Generic message — email exist କରେ କି ନାହିଁ hacker ବୁଝିପାରିବ ନାହିଁ
          throw new Error("Invalid credentials.")
        }

        // ଦିଆଯାଇଥିବା password ଏବଂ database ରେ ଥିବା password ସହିତ ମ୍ୟାଚ୍ କରନ୍ତୁ
        const isPasswordValid = await bcrypt.compare(parsedPassword, user.password)
        if (!isPasswordValid) {
          // ଏଠି ବି generic — password ଭୁଲ ବୋଲି specific ଭାବରେ ନ ଦେଖାଇ
          throw new Error("Invalid credentials.")
        }

        // ଯଦି user ର role "user" ନୁହେଁ (admin/partner), credentials login ମନା
        // admin/partner ଙ୍କ ପାଇଁ ଅଲଗା login page ରଖିବା ଉଚିତ
        if (user.role !== "user") {
          throw new Error("Invalid credentials.")
        }

        // ସବୁ ଠିକ୍ ଥିଲେ user ର ତଥ୍ୟ ଫେରାନ୍ତୁ (return କରନ୍ତୁ)
        return {
          id: String(user._id),
          name: user.name,
          email: user.email,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    // ଲଗଇନ୍ ସମୟରେ ଯାଞ୍ଚ ପାଇଁ
    async signIn({ account, profile }) {
      // Google ପାଇଁ: ଯଦି ଇମେଲ୍ verify ହୋଇଛି ତେବେ ହିଁ ଆଗକୁ ଛାଡ଼ିବ
      if (account?.provider === "google") {
        return !!(profile?.email_verified && profile?.email)
      }
      // Credentials (ଇମେଲ୍/ପାସୱାର୍ଡ) authorize ଫଙ୍କସନ୍ ରେ ଚେକ୍ ହେଉଛି ତେଣୁ true ଫେରାଇବ
      return true
    },
    // JWT ଟୋକେନ୍ (Token) ତିଆରି କରିବା ସମୟରେ
    async jwt({ token, user }) {
      // ଯଦି user ଥାଏ ତେବେ token ରେ user ର ଡାଟା ସେଭ୍ କର
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.role = user.role
      }
      return token
    },
    // Session ତିଆରି କରିବା ସମୟରେ ଟୋକେନ୍ ରୁ ତଥ୍ୟ ନେଇ ସେସନ୍ ରେ ରଖିବ
    async session({ session, token }) {
      session.user.id = (token.id ?? "") as string
      session.user.name = (token.name ?? "") as string
      session.user.email = (token.email ?? "") as string
      session.user.role = token.role as "user" | "admin" | "partner" | undefined
      return session
    },
  },
  pages: {
    signIn: "/login", // ନିଜର login ପେଜ୍ ର ଲିଙ୍କ୍
    signOut: "/logout", // ନିଜର logout ପେଜ୍ ର ଲିଙ୍କ୍
    error: "/error", // ଏରର୍ (Error) ପେଜ୍ ର ଲିଙ୍କ୍
  },
  session: {
    strategy: "jwt", // ସେସନ୍ ପାଇଁ JWT ର ବ୍ୟବହାର
    maxAge: 30 * 24 * 60 * 60,   // 30 ଦିନ ଯାଏଁ ଲଗଇନ୍ ରହିବେ (ସେକେଣ୍ଡ୍ ରେ)
    updateAge: 7 * 24 * 60 * 60, // ପ୍ରତି 7 ଦିନରେ ଏହାକୁ update କରିବ (ସେକେଣ୍ଡ୍ ରେ)
  },
  secret: process.env.NEXTAUTH_SECRET, // ସିକ୍ୟୁରିଟି ପାଇଁ ସିକ୍ରେଟ୍ (Secret) କି
})
