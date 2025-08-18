export interface CreateUserDto {
  name: string;
  username: string;
  password: string;
  role?: "user" | "admin";
}
