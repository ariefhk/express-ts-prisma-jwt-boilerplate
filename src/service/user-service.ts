import prisma from "../application/database";
import { ResponseError } from "../error/response-error";
import bcrypt from "bcrypt";
import { makeJwt } from "../utils/jwt";
import { validate } from "../validation/validation";
import { v4 as uuidv4 } from "uuid";
import { RegisterUserType, LoginUserType, LogoutUserType } from "../types/user";
import { registerUserValidation, loginUserValidation, logoutUserValidation } from "../validation/user-validation";

const register = async (registerUser: RegisterUserType) => {
    const validatedRegisterUser: RegisterUserType = validate(registerUserValidation, registerUser);

    const countUser = await prisma.user.count({
        where: {
            email: validatedRegisterUser.email,
        },
    });

    if (countUser === 1) {
        throw new ResponseError(400, "Username already exists");
    }

    validatedRegisterUser.password = await bcrypt.hash(validatedRegisterUser.password, 10);

    return prisma.user.create({
        data: {
            id: uuidv4(),
            name: validatedRegisterUser.name,
            email: validatedRegisterUser.email,
            password: validatedRegisterUser.password,
        },
        select: {
            name: true,
            email: true,
        },
    });
};

const login = async (loginUser: LoginUserType) => {
    const validatedLoginUser: LoginUserType = validate(loginUserValidation, loginUser);

    const userExist = await prisma.user.findUnique({
        where: {
            email: validatedLoginUser.email,
        },
        select: {
            name: true,
            email: true,
            password: true,
        },
    });

    if (!userExist) {
        throw new ResponseError(401, "Username or password wrong");
    }

    const validatedPassword = await bcrypt.compare(validatedLoginUser.password, userExist.password);

    if (!validatedPassword) {
        throw new ResponseError(401, "Username or password wrong");
    }

    const token = await makeJwt(
        {
            name: userExist.name,
            email: userExist.email,
        },
        "6h"
    );

    return prisma.user.update({
        data: {
            token: token,
        },
        where: {
            email: userExist.email,
        },
        select: {
            name: true,
            email: true,
            token: true,
        },
    });
};

const logout = async (logoutUser: LogoutUserType) => {
    const validatedLogoutUser: LogoutUserType = validate(logoutUserValidation, logoutUser);

    return prisma.user.update({
        where: {
            email: validatedLogoutUser.email,
        },
        data: {
            token: null,
        },
    });
};

export default { register, login, logout };
