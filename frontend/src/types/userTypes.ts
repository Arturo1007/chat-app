export type AuthUserType = {
  id: string;
  fullName: string;
  username: string;
  gender: string;
  profilePic: string;
};

export type SideBarUserType = {
  id: string;
  fullName: string;
  profilePic: string;
}

export type LoginUserType = {
  username: string,
  password: string,
}

export type NewUserType = {
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
  gender: string;
}