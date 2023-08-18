export interface User {
  userid: string;
  // id_user: string;
  email: string;
  password: string;
  token: string;
}

export interface ApiResponse {
  user: User;
}
