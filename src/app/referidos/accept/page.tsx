import { Button } from '@nextui-org/react';
import acceptImage from '../../../../public/accept.png'
import { FaFacebookSquare, FaInstagram, FaYoutube, FaLinkedin, FaTiktok } from "react-icons/fa";

const AcceptSolitudPage = () => {
  return (
    <main className="p-10 bg-zinc-50 h-screen flex items-center justify-center">
      <div className="flex flex-col items-center">
        <img src={acceptImage.src} alt="accept" className="w-60 h-40" />
        <h1 className="text-3xl font-bold text-center mt-5">Solicitud aceptada</h1>
        <p className="text-center">Tu solicitud ha sido aceptada, pronto nos pondremos en contacto contigo</p>
        <div className="flex items-center gap-3 mt-5">
          <FaFacebookSquare size={30} color="#3b5998" />
          <FaInstagram size={30} color="#C13584" />
          <FaYoutube size={30} color="#FF0000" />
          <FaLinkedin size={30} color="#0e76a8" />
          <FaTiktok size={30} color="#000000" />
        </div>
      </div>
    </main>
  )
}
export default AcceptSolitudPage