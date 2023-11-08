import { z } from 'zod';

export const getPostSchema = {
  request: z.object({
    id: z.string(),
  }),

  response: z.object({}),
};

export type GetPostRequest = z.infer<typeof getPostSchema.request>;

export type GetPostResponse = z.infer<typeof getPostSchema.response>;
