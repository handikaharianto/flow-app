export type ActionResponse = {
  success: boolean;
  message: string;
};

export type ErrorResponse = ActionResponse & {
  errors?: Record<string, string>[];
};
