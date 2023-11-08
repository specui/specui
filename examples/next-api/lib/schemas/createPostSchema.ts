import { z } from 'zod';

export const createPostSchema = {
  request: z.object({
    name: z.string(),
  }),

  response: z.object({}),
};

export type CreatePostRequest = z.infer<typeof createPostSchema.request>;

export type CreatePostResponse = z.infer<typeof createPostSchema.response>;
