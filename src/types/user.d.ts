export type RegisterUserType = {
    name: string;
    email: string;
    password: string;
};

export type LoginUserType = {
    email: string;
    password: string;
};

export type LogoutUserType = {
    email: string;
    token: string;
};
