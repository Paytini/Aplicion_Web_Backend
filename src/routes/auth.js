const express = require('express');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const router = express.Router();
const CLIENT_ID = '367614727092-f066mdrrg0cknv2u558b2u3l808p828j.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);
require('dotenv').config();

router.post('/google-login', async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { sub, email, name, picture } = payload;
    const jwtToken = jwt.sign(
      {
        id: sub,
        email,
        name,
        picture,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    console.log('Token JWT generado:', jwtToken);

    console.log('Nombre:', name);
    console.log('Email:', email);
    console.log('ID:', sub);
    console.log('Imagen:', picture);

    res.status(200).json({
      success: true,
      message: 'Inicio de sesión exitoso',
      jwt: jwtToken,
    });
  } catch (error) {
    console.error('Error al verificar el token de Google:', error);
    res.status(401).json({
      success: false,
      message: 'Token inválido o expirado',
    });
  }
});

module.exports = router;
