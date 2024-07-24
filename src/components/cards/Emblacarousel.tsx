"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}

const infoCard = [
  {
    id: 1,
    title: '¡Bienvenido!',
    description: "Refiere y gana hasta S/ 100 soles por referido en cash o una gift card de Starbucks"
  },
  {
    id: 2,
    title: '',
    description: 'Si trabajas en Contact Americas se te abonará directamente, si NO trabajas en Contact Americas se te otorgará una gift card.',
  },
  {
    id: 3,
    title: '',
    description: '¿Por qué referirnos? Somos una empresa peruana formal con más de 12 años de trayectoria, que apuesta por la diversidad y equidad de oportunidades para todos. Estamos en constante crecimiento y nos encanta el trabajo en equipo. ',
  }

]


const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 5000 })
  ])
  const [isPlaying, setIsPlaying] = useState(false)

  

  const onButtonAutoplayClick = useCallback(
    (callback: () => void) => {
      const autoplay = emblaApi?.plugins()?.autoplay
      if (!autoplay) return

      const resetOrStop =
        autoplay.options.stopOnInteraction === true
          ? autoplay.reset
          : autoplay.stop

      resetOrStop()
      callback()
    },
    [emblaApi]
  )

  const toggleAutoplay = useCallback(() => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const playOrStop = autoplay.isPlaying() ? autoplay.stop : autoplay.play
    playOrStop()
  }, [emblaApi])

  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    setIsPlaying(autoplay.isPlaying())
    emblaApi
      .on('autoplay:play', () => setIsPlaying(true))
      .on('autoplay:stop', () => setIsPlaying(false))
      .on('reInit', () => setIsPlaying(autoplay.isPlaying()))
  }, [emblaApi])

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {infoCard.map((index) => (
            <div className="embla__slide" key={index.id}>
              <div className="embla__content ">
              <h1 className="text-2xl text-blue-800 text-center font-bold">{index.title}</h1>
                <p className="text-gray-500 mt-3">{index.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel
