"use server";
import { User } from "@prisma/client";
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

export const sendEmailForgetPasswordUser = async (to: string, user: User) => {
  // Configurar las opciones del correo electrónico
  const mailOptions = {
    from: process.env.MAILER_AUTH,
    to,
    subject: "Bienvenido a la plataforma de referidos de Contactamericas",
    html: `<!DOCTYPE html>
<html lang="en" dir="ltr" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes">
   <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no">
   <meta name="x-apple-disable-message-reformatting">
   <meta name="color-scheme" content="light dark">
   <meta name="supported-color-schemes" content="light dark">
	<title>Password Reset Practice Activity</title>
   <!--[if mso]>
      <noscript>
         <xml>
            <o:OfficeDocumentSettings>
            <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
         </xml>
      </noscript>
   <![endif]-->
   <style type="text/css">
      table {
			border-spacing: 0;
         border-collapse: collapse;
		}
      td {
         padding: 0;
      }
      p {
         font-size: 16px;
      }
      img {
         border: 0;
      }
      a {
         text-decoration: none;
         color: #000;
      }
      .content {
         line-height: 20px;
         font-size: 16px;
      }

      u + .body .gmail-blend-screen { background:#000; mix-blend-mode:screen; }
		u + .body .gmail-blend-difference { background:#000; mix-blend-mode:difference; }

      .ExternalClass {
         width: 100%;
      }

		.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
         line-height: 100%;
      }

      a[x-apple-data-detectors=true]{
         color: inherit !important;
         text-decoration: inherit !important;
      }

      span.Object {
         color: inherit !important;
      }
      span.Object-hover {
         color: inherit !important;
         text-decoration: none !important;
      }

      @media screen and (max-width: 599.98px) {

      }
      @media screen and (max-width: 399.98px) {

      }

      :root {
         color-scheme: light dark;
         supported-color-schemes: light dark;
      }
      @media (prefers-color-scheme: dark) {
         body, table {
            background: #2d2d2d !important;
            color: #ffffff !important;
         }
         [data-ogsc] body, table {
            background: #2d2d2d !important;
            color: #ffffff !important;
         }
      }

   </style>
   
	<!--[if mso]>
		<style type="text/css">
			body {background-color: #dde0e1 !important;}
         body, table, td, p, a {font-family: Arial, Helvetica, sans-serif !important;}
         table {border-spacing: 0 !important;border-collapse: collapse !important;}
		</style>
	<![endif]-->
	
</head>
<body class="body" xml:lang="en" style="margin:0;padding:0;min-width:100%;background-color:#dde0e1;">

   <div style="width: 100%; table-layout:fixed; background-color: #dde0e1; color:#242424; font-family: Arial, Helvetica, sans-serif; font-size: 16px; margin: 0 auto 40px;">
      <div style="max-width: 600px; background-color: #fafdfe; color:#242424; font-family: Arial, Helvetica, sans-serif; font-size: 16px; box-shadow: 0 0 10px rgba(0, 0, 0, .2);margin: 0 auto;">

         <div style="font-size: 0px; color: #fafdfe; mso-line-height-rule: exactly; line-height: 0px; display: none; max-width: 0px; max-height: 0px; opacity: 0; overflow: hidden; mso-hide:all;">
            This is our preheader text which can be 35-190 characters but 85-100 is recommended.
            &zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;
         </div>
      
         <!--[if mso]>
            <table width="600" align="center" style="border-spacing: 0; border-collapse:collapse; color: #3d3d3d;" role="presentation">
            <tr>
            <td style="padding:0;">
         <![endif]-->

         <table align="center" style="border-spacing:0; border-collapse: collapse; color:#242424; font-family: Arial, Helvetica, sans-serif; font-size: 16px; background-color: #fafdfe; margin: 0 auto; padding:0; width: 100%; max-width: 600px;" role="presentation">


            <tr>
               <td style="padding: 0;">
                  <table width="100%" style="border-spacing: 0;" role="presentation">

                     <tr>
                        <td style="padding: 4px; background-color: #d5f3f4;">
                           <div style="font-size: 0; mso-line-height-rule:exactly; line-height: 0; display: none; mso-hide: all;">
                              &zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;
                           </div>
                        </td>
                     </tr>

                     <tr>
                        <td style="padding: 14px 0 10px 0; text-align: center; background-color: #fff; ">
                           <a href="https://example.com" target="_blank">
                              <img src="https://res.cloudinary.com/da0d2neas/image/upload/v1710485097/logocontact-removebg-preview.png" alt="Logo" width="190" style="border: 0;">
                           </a>
                        </td>
                     </tr>

                     <tr>
                        <td style="padding: 0 0 20px 0;">
                           <a href="https://example.com/1" target="_blank">
                              <img src="https://mcusercontent.com/474f5b70c3b324277323d4c42/images/80657041-e007-7e23-37ed-2e10ac4f5cac.jpg" alt="Password Reset Banner" width="600" style="border: 0; width: 100%;">
                           </a>
                        </td>
                     </tr>

                     <tr>
                        <td style="padding: 5px 25px 5px 25px; text-align: center;">
                           <h1 style="font-size: 25px;">¿Olvidaste tu contraseña?</h1>
                           <h2 style="font-size: 20px;">No hay problema!</h2>
                           <p style="font-size: 16px; line-height: 20px;">Hola, ${user.name} ${user.lastname}!</p>
                           <p style="font-size: 16px; line-height: 20px;">¡Hubo una solicitud para cambiar su contraseña!</p>
                           <p style="font-size: 16px; line-height: 20px;">Si usted no realizó esta solicitud, ignore este email. De lo contrario, porfavor presiona el botón que está debajo para cambiar su password:</p>
                        </td>
                     </tr>

                     <tr>
                        <td style="padding: 10px 0 30px 0; text-align: center;">
                           <a href="${process.env.NEXTAUTH_URL}/auth/forgetpassword/${user.id}" target="_blank">
                              <img src="https://mcusercontent.com/474f5b70c3b324277323d4c42/images/0f63e7e6-d834-2e03-a0f8-17b043f7763e.png" alt="Reset Your Password" title="Reset Your Password" width="160" style="border: 0;">
                           </a>
                        </td>
                     </tr>

                     <tr>
                        <td style="padding: 20px 0 30px 0; text-align: center; background-color: #d5f3f4;">
                           <p style="font-size: 16px;color: #000;"><a href="https://example.com/4" style="color: #000; text-decoration: none;color: inherit;">https://contactamericas.com/</a></p>
                           <p style="font-size: 16px; padding: 5px 0 5px 0; color: #000;">123&#8203; Street Road, City, State 55555</p>
                        </td>
                     </tr>

                  </table>
               </td>
            </tr>


         </table>

         <!--[if mso]>
            </td>
            </tr>
            </table>
         <![endif]-->
      
      </div>
   </div>

</body>
</html>
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
