export interface IUserDto {
  email: string;
  password: string;
  username: string;
  nickname: string;
}

export interface IUser {
  u_id: number;
  email: string;
  passhash: string;
  username: string;
  nickname: string;
}
