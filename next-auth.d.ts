import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      image: string;
    };
  }
}

declare module "next-auth/providers" {
  class CredentialsProvider {
    constructor(options?: any);
    async getAdapter(appOptions: any): Promise<{
      createUser: (data: any) => Promise<any>;
      getUser: (id: any) => Promise<any>;
      getUserByEmail: (email: any) => Promise<any>;
      getUserByProviderAccountId: (providerId: any, providerAccountId: any) => Promise<any>;
      updateUser: (id: any, data: any) => Promise<any>;
      linkAccount: (userId: any, providerId: any, providerType: any, providerAccountId: any, refreshToken?: string | undefined, accessToken?: string | undefined, accessTokenExpires?: number | undefined) => Promise<void>;
      unlinkAccount: (userId: any, providerId: any, providerAccountId?: any) => Promise<void>;
    }>;
  }
}
