import React, { useEffect, useState } from 'react'
import Swiper, { Autoplay, Navigation, Pagination } from 'swiper'
import 'swiper/css/bundle'
import 'swiper/css/pagination'
import { SliderContainer } from './style'

Swiper.use([Autoplay, Navigation, Pagination])

function Slider(props: any) {
  const { bannerList } = props
  const [sliderSwiper, setSliderSwiper] = useState<Swiper | null>(null)

  useEffect(() => {
    if (bannerList.length && !sliderSwiper) {
      const sliderSwiper = new Swiper('.slider-container', {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true,
        },
      })
      setSliderSwiper(sliderSwiper)
    }
  }, [bannerList.length, sliderSwiper])

  return (
    <SliderContainer>
      <div className="before"></div>
      <div className="slider-container">
        <div className="swiper-wrapper">
          {bannerList.map((slider: any) => {
            return (
              <div className="swiper-slide" key={slider.imageUrl}>
                <div className="slider-nav">
                  <img
                    src={slider.imageUrl}
                    width="100%"
                    height="100%"
                    alt="推荐"
                  />
                </div>
              </div>
            )
          })}
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </SliderContainer>
  )
}

export default React.memo(Slider)
