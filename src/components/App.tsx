import { useEffect, useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import Carousel from './Carousel'
import CarouselSlide from './Carousel/Slide'
import SlideSkeleton from './Carousel/SlideSkeleton'
import { theme, themeColor } from '../theme'
import { fetchSlides } from '../services/SlidesApi'
import { SlideData } from '../services/SlidesApi/types'

const Wrapper = styled.main`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .App {
    &-carousel {
      &-slide,
      &-skeleton {
        height: 500px;
        border-radius: 14px;
      }

      &-slide {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 40px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          background: ${themeColor('dark')};
          border-radius: inherit;
        }
      }
    }
  }
`

const App = () => {
  const [slides, setSlides] = useState<SlideData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      const data = await fetchSlides()

      setTimeout(() => {
        setSlides(data)
        setLoading(false)
      }, 1500)
    }

    fetchData()
  }, [])

  const renderContent = () => {
    if (loading)
      return Array(16)
        .fill(0)
        .map((_, i) => <SlideSkeleton className="App-carousel-skeleton" key={i} />)

    return slides.map((slide) => {
      return slide.images.map((image, i) => (
        <CarouselSlide className="App-carousel-slide" key={`slide-${slide.id}-${image}`}>
          <img alt={`slide-${i}`} src={image} loading="lazy" />
        </CarouselSlide>
      ))
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <Wrapper className="App">
        <Carousel pagination transitionDuration={0.65} slidesPerView={4} className="App-carousel">
          {renderContent()}
        </Carousel>
      </Wrapper>
    </ThemeProvider>
  )
}

export default App
