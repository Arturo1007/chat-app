export type AuthUserType = {
  id: string;
  fullname: string;
  username: string;
  profilePic: string;
};

export type NewUserType = {
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
  gender: string;
}