import imageBg from '@/../../public/bgauthsecondary.png'
import Image from 'next/image';
import imageAnimate from '@/../../public/personanimate2.png'
import { EmblaOptionsType } from 'embla-carousel'


import CardInfo1 from '../../components/cards/CardInfo1';
import EmblaCarousel from '../../components/cards/Emblacarousel';

const OPTIONS: EmblaOptionsType = { loop: true }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const LayoutAuth = ({children}: any) => {
  return (
    <div className="grid grid-cols-12  md:h-screen min-h-screen h-auto ">
      <div className="col-span-full mt-20 md:mt-0 order-2 md:order-1 md:col-span-5 h-full flex justify-center items-center md:bg-gradient-to-r md:from-blue-600 md:to-violet-600">
          <div className="">
            <div className="p-5 bg-white  rounded-lg relative border-2 border-blue-500 shadow-lg">
            {/* <Image src={imageAnimate} alt="bg" className="absolute -top-44 " height={280} width={150} />
            <CardInfo1 />
            
             */}
             <Image src={imageAnimate} alt="bg" className="absolute -top-44 " height={280} width={150} />
              <EmblaCarousel slides={SLIDES} options={OPTIONS} />
            </div>
          </div>
      </div>
      <div className="md:col-span-7 order-1 md:order-2 col-span-full ">
      {children}
      </div>
    </div>
  )
}
export default LayoutAuth