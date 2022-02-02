"use strict";
const jwt = require("jsonwebtoken");

const validarJWT = (req, res, next) => {
    const token = req.header("x-token");
    if (!token) {
        res.status(401).send({
            ok: false,
            msg: "No hay token en la petición"
        });
    }
    try {
        const { uid } = jwt.verify(token, process.env.JWT_Key);
        req.uid = uid;
        next();
    } catch (error) {
        res.status(401).send({
            ok: false,
            msg: "No hay token en la petición"
        });
    };
};

module.exports = {
    validarJWT
};
