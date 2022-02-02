"use strict";

const jwt = require("jsonwebtoken");

const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.JWT_Key, {
            expiresIn: "48h"
        }, (err, token) => {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
};

module.exports = {
    generarJWT
};
