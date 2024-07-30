"use server";
import nodemailer from "nodemailer";

// Configurar el transporter con las variables de entorno
const transporter = nodemailer.createTransport({
  host: process.env.MAILER_HOST,
  port: parseInt(process.env.MAILER_PORT || "0", 10),
  secure: true, // true para 465, false para otros puertos
  auth: {
    user: process.env.MAILER_AUTH,
    pass: process.env.MAILER_PASSWORD,
  },
});

export const sendEmailReferToAdmin = async (to: string, emailUser: string) => {
  // Configurar las opciones del correo electrónico
  const mailOptions = {
    from: process.env.MAILER_AUTH,
    to,
    subject: "Bienvenido a la plataforma de referidos de Contactamericas",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>HTML5 Email Template Practice</title>
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap" rel="stylesheet">
   <style>
      body {
         margin: 0;
         background-color: #D8DBDB;
         padding: 20px;
         font-family: 'Roboto', Arial, sans-serif; /* Google Font, Web Safe Font, sans-serif */
         font-size: 18px;
         color: #565859;
      }
      .wrapper {
         background-color: #f6faff;
         max-width: 700px;
         margin: 0 auto;
         box-shadow: 0 0 10px #616e79;
         border-top: 10px solid #1d4ed8;
         border-radius: 5px 5px 10px 10px;
      }
      .logo {
         text-align: center;
         padding: 1% 0;
      }
      .logo img {
         max-width: 250px;
      }
      img {
         max-width: 100%;
      }
      .three-columns {
         width: 29.3%;
         padding: 5% 2% 6%;
         text-align: center;
         float: left;
         margin: 15px 0 32px;
      }
      .three-columns img {
         max-width: 135px;
      }
      h2 {
         font-weight: 700;
         font-size: 28px;
         letter-spacing: 1px;
         margin: 20px 0 8px;
      }
      p {
         line-height: 26px;
         padding-bottom: 15px;
      }
      .btn {
         background-color: #1d4ed8;
         color: #fff;
         text-decoration: none;
         padding: 10px 14px;
         font-size: 20px;
         font-weight: 600;
         letter-spacing: 1px;
         border-radius: 6px;
         box-shadow: 0 5px 10px rgba(0, 0, 0, .2);
         transition: .4s;
      }
      .btn:hover {
         background-color: #1d4ed8;
         color: #fff;
      }
      hr.orange {
         border: 1px solid #1d4ed8;
         width: 96%;
         margin: 15px auto;
      }
      .two-columns {
         float: left;
         width: 46%;
         padding: 5% 2%;
         margin: 10px 0 26px;
      }
      .two-columns h2 {
         margin: 0;
      }
      ul.social {
         list-style-type: none;
         text-align: center;
         padding: 10px;
         margin: 20px 0 5px;
         width: 96%;
      }
      ul.social li {
         display: inline;
      }
      .social img {
         max-width: 40px;
      }
      .contact {
         text-align: center;
         color: #1d4ed8;
         font-weight: 500;
         line-height: 30px;
         padding-bottom: 6%;
      }
      .contact a {
         color: #1d4ed8;
         text-decoration: none;
         transition: .2s;
      }
      .contact a:hover {
         color: #fe6b58;
      }
      @media (max-width: 600px) {
         body {
            padding: 5px;
         }
         .banner {
            margin-bottom: 20px;
         }
         .three-columns, .two-columns {
            width: 96%;
            margin: 0 0 35px;
         }
         .three-columns img {
            max-width: 155px;
         }
         hr.orange {
            margin-bottom: 30px;
         }
         .two-columns.second {
            padding-left: 15px;
            padding-bottom: 30px;
         }
      }
   </style>
</head>
<body>

   <div class="wrapper">
      
      <div class="logo">
         <a href="https://example.com" target="_blank"><img src="https://res.cloudinary.com/da0d2neas/image/upload/v1710485097/logocontact-removebg-preview.png" alt="HTML5 Logo" title="HTML5 Logo"></a>
      </div>

      <!-- <a href="https://example.com" target="_blank"><img src="https://i.ibb.co/zQ558kP/banner.png" alt="Banner" title="Banner" class="banner"></a> -->

      <!-- <div class="three-columns">
         <a href="https://example.com" target="_blank"><img src="https://i.ibb.co/tHQy3gL/mouse.png" alt="Mouse" title="Mouse"></a>
         <h2>Email Development</h2>
         <p>There are many different email clients to consider when developing your email template.</p>
         <div class="button-holder">
            <a href="https://example.com" target="_blank" class="btn">Learn More</a>
         </div>
      </div>

      <div class="three-columns">
         <a href="https://example.com" target="_blank"><img src="https://i.ibb.co/42MJn1V/phone.png" alt="Phone" title="Phone"></a>
         <h2>Mobile Friendly</h2>
         <p>Most emails are opened on mobile devices today, so make sure your design is mobile friendly.</p>
         <div class="button-holder">
            <a href="https://example.com" target="_blank" class="btn">HTML Email</a>
         </div>
      </div>

      <div class="three-columns">
         <a href="https://example.com" target="_blank"><img src="https://i.ibb.co/RD0sR6V/computer.png" alt="Computer" title="Computer"></a>
         <h2>Desktop Clients</h2>
         <p>For desktop email clients like Outlook, we'll need to pay special attention once we use tables.</p>
         <div class="button-holder">
            <a href="https://example.com" target="_blank" class="btn">Development</a>
         </div>
      </div> -->

      

      <div class="two-columns">
         <a href="https://example.com" target="_blank"><img src="https://res.cloudinary.com/da0d2neas/image/upload/v1722358495/pie-chart.png" alt="Pie Chart" title="Pie Chart"></a>
      </div>

      <div class="two-columns second">
         <h2>Bienvenido ${emailUser}, a la plataforma de referidos de Contactamericas</h2>
         <p>Podrás dar seguimiento del estado de tus referidos en el dashboard que construimos para ti con la transparencia que nos caracteriza.</p>
         <div class="button-holder">
            <a href="https://example.com" target="_blank" class="btn">Ir al dashboard</a>
         </div>
      </div>

     

      <ul class="social">
         <li><a href="https://example.com" target="_blank"><img src="https://i.ibb.co/5cp6Gtb/facebook.png" alt="Facebook" title="Facebook"></a></li>
         <li><a href="https://example.com" target="_blank"><img src="https://i.ibb.co/m4PgXq6/twitter.png" alt="Twitter" title="Twitter"></a></li>
         <li><a href="https://example.com" target="_blank"><img src="https://i.ibb.co/Ttf0YmH/youtube.png" alt="YouTube" title="YouTube"></a></li>
         <li><a href="https://example.com" target="_blank"><img src="https://i.ibb.co/8brZJJt/instagram.png" alt="Instagram" title="Instagram"></a></li>
         <li><a href="https://example.com" target="_blank"><img src="https://i.ibb.co/3zn6mW3/linkedin.png" alt="Linkedin" title="Linkedin"></a></li>
      </ul>

      <p class="contact">
         <a href="https://contactamericas.com/" target="_blank">https://contactamericas.com/</a><br>
         <a href="tel:+18005555555">1-800-555-5555</a><br>
       
         
      </p>

   </div> <!-- End of Wrapper -->
   
</body>
</html>


<!-- https://w3newbie.imgbb.com/
https://i.ibb.co/JtckNqn/logo.png
https://i.ibb.co/zQ558kP/banner.png

https://i.ibb.co/tHQy3gL/mouse.png
https://i.ibb.co/42MJn1V/phone.png
https://i.ibb.co/RD0sR6V/computer.png
https://i.ibb.co/NKdYy92/pie-chart.png

https://i.ibb.co/5cp6Gtb/facebook.png
https://i.ibb.co/m4PgXq6/twitter.png
https://i.ibb.co/Ttf0YmH/youtube.png
https://i.ibb.co/8brZJJt/instagram.png
https://i.ibb.co/3zn6mW3/linkedin.png
-->
`,
  };

  try {
    // Enviar el correo electrónico
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
