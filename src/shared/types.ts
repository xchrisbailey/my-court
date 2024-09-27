export type ActionState<T> = {
  error?: string;
  errors?: T;
  success?: string;
  [key: string]: any;
};
