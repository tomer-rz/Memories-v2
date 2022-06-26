import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500; // if token's length is below 500 its a custom token. else, it's google's
        let decodedData;
        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, "topSecretSecret");
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub; // sub - google's term for specific user id
        }
        next();
    } catch (error) {
        console.log(error);
    }
};

export default auth;
