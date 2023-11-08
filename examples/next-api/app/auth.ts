import { NextAuthOptions } from 'next-auth';

import GithubProvider, { GithubProfile } from 'next-auth/providers/github';

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
      authorization: {
        params: {
          scope: undefined,
        },
      },
      profile(profile: GithubProfile) {
        return {
          id: profile.id.toString(),
          name: profile.name,
          image: profile.avatar_url,
          email: profile.login,
        };
      },
    }),
  ],
};
