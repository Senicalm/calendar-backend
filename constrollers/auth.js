const { response } = require("express");
const Usuario = require("../models/Usuario");
const bcrypt = require('bcryptjs');
const { generarJWT} = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {
  
  const { name, email, password } = req.body;

  try {

    let usuario = await Usuario.findOne({email});
    if( usuario ){
      return res.status(400).json({
        ok:false,
        msg:'Un usuario existe con ese correo.'
      })
    }

    usuario = new Usuario(req.body);
    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    //Generar JWT
    const token = await generarJWT(usuario.id,usuario.name);

    res.status(201).json({
      ok: true,
      msg: "crearUsuario",
      uid: usuario.id,
      name: usuario.name,
      token
    });

  } catch (error) {
    res.status(500).json({
      ok:false,
      msg:'Por favor hable con el administrador.'
    })
  }
};

const loginUsuario = async(req, res = response) => {
  const { email, password } = req.body;

  try {
    
    const usuario = await Usuario.findOne({email});
    if( !usuario ){
      return res.status(400).json({
        ok:false,
        msg:'El usuario no existe con ese correo.'
      })
    }

    //Confirar password
    const validPassword = bcrypt.compareSync(password,usuario.password);
    if(!validPassword){
      return res.status(400).json({
        ok:false,
        msg:'El password no es correcto'
      })
    }

    //Generar JWT
    const token = await generarJWT(usuario.id,usuario.name);

    res.status(201).json({
      ok: true,
      msg: "loginUsuario",
      uid: usuario.id,
      name: usuario.name,
      token
    });

  } catch (error) {
    res.status(500).json({
      ok:false,
      msg:'Por favor hable con el administrador.'
    })
  }
};

const revalidarToken = async(req, res = response) => {

  const uid = req.uid;
  const name = req.name;

  //RE-Generar JWT
  const token = await generarJWT(uid,name);

    res.status(201).json({
      ok: true,
      msg: "revalidarToken",
      uid,
      name,
      token
    });

};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};