import Carousel from './Carousel'
import { slides } from '../mocks/slides'
import CarouselSlide from './Carousel/Slide'
import styled, { ThemeProvider } from 'styled-components'
import { theme, themeColor } from '../theme'

const Wrapper = styled.main`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .App {
    &-carousel {
      &-slide {
        height: 500px;
        color: ${themeColor('white')};
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 40px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
`

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Wrapper className="App">
        <Carousel pagination transitionDuration={0.65} slidesPerView={4} className="App-carousel">
          {slides.map((slide) => {
            return slide.images.map((image, i) => (
              <CarouselSlide className="App-carousel-slide" key={`slide-${slide.id}-${i}`}>
                <img alt={`slide-${i}`} src={image} loading="lazy" />
              </CarouselSlide>
            ))
          })}
        </Carousel>
      </Wrapper>
    </ThemeProvider>
  )
}

export default App
