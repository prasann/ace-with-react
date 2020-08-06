import * as jwt from "jsonwebtoken";

const validateToken = (request, response, next) => {
    const secureToken = request.cookies.secureToken;
    try {
        jwt.verify(secureToken, "secret-key");
    }catch (e) {
        response.status(401).send({message: "Not authenticated"})
    }
    next();
}

export {validateToken}