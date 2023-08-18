export interface User {
  userid: string;
  email: string;
  password: string;
  token: string;
}

export interface ApiResponse {
  user: User;
}
