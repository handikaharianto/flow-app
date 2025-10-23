export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type SignInUserResponse = {
  success: boolean;
  message: string;
};
