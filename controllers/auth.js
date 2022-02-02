"use strict";
const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/json");

// Metodo para crear usuarios
async function crearUsuario (req, res = response) {
    const usuario = new Usuario(req.body);
    const { email, password } = req.body;
    try {
        const existeCorreo = await Usuario.findOne({ email });
        if (existeCorreo) {
            return res.status(400).send({
                ok: false,
                msg: "Correo ya existe"
            });
        }

        // encriptamos password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        await usuario.save();
        // generar json web token
        const token = await generarJWT(usuario.id);
        res.status(200).send({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            msg: "hable con el admin."
        });
    }
}

async function login (req, res = response) {
    const { email, password } = req.body;
    try {
        // comprobamos si el correo existe
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            res.status(404).send({
                ok: false,
                msg: "Email no encontrado"
            });
        }

        // comprobamos si el password es correcto
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            res.status(404).send({
                ok: false,
                msg: "password incorrecto"
            });
        }

        // generamos el jwt
        const token = await generarJWT(usuario.id);
        res.status(200).send({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        res.status(500).send({
            ok: false,
            msg: error
        });
    }
}

async function renewToken (req, res = response) {
    try {
        const uid = req.uid;
        const token = await generarJWT(uid);
        const usuario = await Usuario.findById(uid);
        if (!usuario) {
            res.status(404).send({
                ok: false,
                msg: "Usuario no existe"
            });
        }
        // console.log(usuario);
        res.status(200).send({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            msg: error
        });
    }
}

module.exports = {
    crearUsuario,
    login,
    renewToken
};
