export interface ApiResponse<T> {
  error: string[] | null;
  result: boolean;
  data: T;
  message: string;
}
