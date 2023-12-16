import * as jose from "jose";
import { JWTPayload } from "jose/dist/types";
import { ResponseError } from "../error/response-error";

const makeJwt = async (data: JWTPayload, secret: string, expired: string = "") => {
    try {
        const secretEncode: Uint8Array = new TextEncoder().encode(secret);
        const alg: string = "HS256";
        let jwt;

        if (!expired) {
            jwt = await new jose.SignJWT(data).setProtectedHeader({ alg }).setIssuedAt().sign(secretEncode);
        } else {
            jwt = await new jose.SignJWT(data)
                .setProtectedHeader({ alg })
                .setIssuedAt()
                .setExpirationTime(expired)
                .sign(secretEncode);
        }

        return jwt;
    } catch (err) {
        if (err instanceof jose.errors.JOSEError) {
            throw new ResponseError(401, "Invalid token!");
        }
    }
};

const decodeJwt = async (jwt: string, secret: string) => {
    try {
        const secretEncode: Uint8Array = new TextEncoder().encode(secret);
        const { payload } = await jose.jwtVerify(jwt, secretEncode);

        return payload;
    } catch (err) {
        if (err instanceof jose.errors.JOSEError) {
            if (err?.code === "ERR_JWT_EXPIRED") {
                throw new ResponseError(401, "Token Expired!");
            }
            throw new ResponseError(401, "Invalid token!");
        }
    }
};

export { makeJwt, decodeJwt };
