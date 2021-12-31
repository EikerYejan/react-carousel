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
  flex-wrap: wrap;

  .App {
    &-carousel {
      &-controls {
        width: 100%;

        &-inner {
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          flex-direction: column;
          margin: auto;
          width: fit-content;
        }

        label {
          display: flex;
          align-items: center;

          span {
            width: 150px;
            display: block;
          }

          input {
            margin: 8px 12px;
            padding: 4px 10px;
            border-radius: 6px;
            border: 1px solid ${themeColor('dark')};
          }
        }
      }

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

const isMobile = window.innerWidth < 768

const App = () => {
  const [slides, setSlides] = useState<SlideData[]>([])
  const [loading, setLoading] = useState(true)

  const [slidesPerView, setSlidesPerView] = useState(isMobile ? 1 : 4)
  const [transitionDuration, setTransitionDuration] = useState(0.75)
  const [activeSlide, setActiveSlide] = useState(1)
  const [enableNavigation, setEnableNavigation] = useState(true)
  const [enableBullets, setEnableBullets] = useState(true)

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
        <CarouselSlide className="App-carousel-slide" key={`slide-${slide.id}-${i}`}>
          <img alt={`slide-${i}`} src={image} loading="lazy" />
        </CarouselSlide>
      ))
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <Wrapper className="App">
        <div className="App-carousel-controls">
          <div className="App-carousel-controls-inner">
            <label htmlFor="slidesPerView">
              <span>Slides Per View</span>
              <input
                name="slidesPerView"
                type="number"
                value={slidesPerView}
                min={1}
                onChange={(e) => setSlidesPerView(Number(e.currentTarget.value))}
              />
            </label>
            <label htmlFor="transitionDuration">
              <span>Transition Duration</span>
              <input
                name="transitionDuration"
                type="number"
                value={transitionDuration}
                min={0.01}
                step={0.15}
                onChange={(e) => setTransitionDuration(Number(e.currentTarget.value))}
              />
            </label>
            <label htmlFor="activeSlide">
              <span>Active Slide</span>
              <input
                name="activeSlide"
                type="number"
                value={activeSlide}
                min={1}
                step={1}
                onChange={(e) => setActiveSlide(Number(e.currentTarget.value))}
              />
            </label>
            <label htmlFor="navigation">
              <span>Navigation</span>
              <input
                name="navigation"
                type="checkbox"
                checked={enableNavigation}
                onChange={(e) => setEnableNavigation(e.currentTarget.checked)}
              />
            </label>
            <label htmlFor="bullets">
              <span>Bullets</span>
              <input
                name="bullets"
                type="checkbox"
                checked={enableBullets}
                onChange={(e) => setEnableBullets(e.currentTarget.checked)}
              />
            </label>
            <label htmlFor="loading">
              <span>Loading</span>
              <input
                name="loading"
                type="checkbox"
                checked={loading}
                onChange={(e) => setLoading(e.currentTarget.checked)}
              />
            </label>
          </div>
        </div>
        <Carousel
          pagination={enableBullets}
          navigation={enableNavigation}
          transitionDuration={transitionDuration}
          slidesPerView={slidesPerView}
          initialActiveIndex={activeSlide}
          className="App-carousel"
        >
          {renderContent()}
        </Carousel>
      </Wrapper>
    </ThemeProvider>
  )
}

export default App
