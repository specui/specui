import axios from 'axios';

import { CreatePostRequest, CreatePostResponse } from '@/lib/schemas/createPostSchema';

import { GetPostRequest, GetPostResponse } from '@/lib/schemas/getPostSchema';

export type Call = <T>(method: string, data: any) => Promise<T>;

export const call: Call = async (method, data) => {
  const res = await axios({
    method: 'POST',
    headers:
      typeof localStorage !== 'undefined' && localStorage.getItem('accessToken')
        ? {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          }
        : {},
    url: `/api${method}`,
    data: data || {},
  });

  return res.data;
};

export const createPost = async (req?: CreatePostRequest) => {
  return await call<CreatePostResponse>('/createPost', req);
};

export const getPost = async (req?: GetPostRequest) => {
  return await call<GetPostResponse>('/getPost', req);
};
