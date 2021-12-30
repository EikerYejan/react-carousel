import Carousel from './Carousel'
import { slides } from '../mocks/slides'
import CarouselSlide from './Carousel/Slide'
import styled from 'styled-components'

const Wrapper = styled.main`
  .App {
    &-carousel {
      &-slide {
        height: 500px;
        color: white;
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
    <Wrapper className="App">
      <Carousel pagination slidesPerView={4} className="App-carousel">
        {slides.map((slide) => {
          return slide.images.map((image, i) => (
            <CarouselSlide className="App-carousel-slide" key={`slide-${slide.id}-${i}`}>
              <img alt={`slide-${i}`} src={image} loading="lazy" />
            </CarouselSlide>
          ))
        })}
      </Carousel>
    </Wrapper>
  )
}

export default App
