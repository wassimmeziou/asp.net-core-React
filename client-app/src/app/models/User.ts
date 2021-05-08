export interface User {
  userName: string;
  displayName: string;
  token: string;
  image: string;
}

export interface UserFormValues {
  email: string;
  displayName?: string;
  userName?: string;
  password: string;
}
