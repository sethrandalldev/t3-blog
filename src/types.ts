export type Post = {
  id: number;
  name: string;
  body: string;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
};

export type User = {
  name: string | null;
  email?: string;
  id?: string;
  image?: string;
};
