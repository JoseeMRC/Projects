const nodemailer = require('nodemailer');
require('dotenv').config();


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: process.env.KAKEIBO_EMAIL,
    pass: process.env.KAKEIBO_PASS
  }
})

const sendMail = (name, email, tokenEmail, msgType) => {
  let msgBody = "";
  if (msgType == "register") {
    msgBody = 
      `<div class="cuerpo">
          <h1>Bienvenid@ a nuestra web ${name}!</h1>
          <h3>Te has registrado correctamente</h3>
          <hr>
          <p>Para validar tu correo pulsa <a href="http://localhost:5173/users/verify/${tokenEmail}"> aquí</a> y activa tu cuenta.</p>  
      </div>`
  }
  else if (msgType == "changePass") {
    msgBody = 
      `<div class="cuerpo">
          <h1>Hola ${name}!</h1>
          <h3>Has solicitado un cambio de contraseña</h3>
          <hr>
          <p>Para volver a Kakeibo y cambiar tu contraseña haz click <a href="http://localhost:5173/users/changePass/${tokenEmail}"> aquí</a></p>  
      </div>`
  }


  let msgHTML = `<!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Correo de KAKEIBO</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .cuerpo {
        background-color: #ffffff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        margin: 20px auto;
        width: 90%;
        max-width: 600px;
        border: 1px solid #e1e1e1;
      }
      .cuerpo h1 {
        color: #333333;
      }
      .cuerpo p {
        color: #555555;
        font-size: 16px;
        line-height: 1.6;
      }
      .cuerpo a {
        color: #1e90ff;
        text-decoration: none;
      }

      .cuerpo hr {
        border: 0;
        height: 5px;
        background-color: #2E5239;
        margin: 20px 0;
      }
      .cuerpo a:hover {
        text-decoration: underline;
      }
      .footer {
        text-align: center;
        padding: 10px;
        font-size: 12px;
        color: #888888;
      }
      .logo {
        text-align: center;
      }
      .logo img {
        border-radius: 50%;
        width: 150px;
      }
    </style>
  </head>
  <body>
  ${msgBody}
  <div class="logo">
    <img src="cid:logoKakeibo" alt="KAKEIBO Logo">
  </div>
    <div class="footer">
      <p>&copy; 2024 KAKEIBO. Todos los derechos reservados.</p>
    </div>
  </body>
  </html>`;
  transporter.verify().then(console.log()).catch(console.error)

  const info = transporter.sendMail({
    from: `"KAKEIBO" <${process.env.KAKEIBO_EMAIL}>`,
    to: email,
    subject: msgType === 'register' ? "Bienvenid@" : "Cambio de contraseña",
    text: msgType === 'register' ? "Te has registrado a nuestra web" : "Solicitud de restablecimiento de contraseña",
    html: msgHTML,
    attachments: [
      {
        filename: "logoKakeibo.png",
        path: "./public/images/logoKakeibo.png",
        cid: 'logoKakeibo'
      }
    ]
  })
}

module.exports = sendMail;