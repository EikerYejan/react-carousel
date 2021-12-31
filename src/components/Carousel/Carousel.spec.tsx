import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Carousel from '.'
import CarouselSlide from './Slide'

const mockData = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

describe('Carousel', () => {
  it('Should render', () => {
    const { baseElement } = render(
      <Carousel>
        {mockData.map((i) => (
          <CarouselSlide key={i}>{`Slide ${i}`}</CarouselSlide>
        ))}
      </Carousel>,
    )

    expect(baseElement).toMatchSnapshot()
    expect(baseElement).toBeInTheDocument()
  })

  it('Should navigate with the arrows', () => {
    const { getByTestId } = render(
      <Carousel pagination>
        {mockData.map((i) => (
          <CarouselSlide key={i}>{`Slide ${i}`}</CarouselSlide>
        ))}
      </Carousel>,
    )

    const prevButton = getByTestId('navigation-prev')
    const nextButton = getByTestId('navigation-next')

    expect(prevButton).toBeInTheDocument()
    expect(nextButton).toBeInTheDocument()

    userEvent.click(nextButton)

    expect(getByTestId('carousel-inner')).toHaveStyle(
      `transform: translate3d(calc(-${1 * 100}% - ${25 * 1}px), 0, 0)`,
    )

    userEvent.click(prevButton)

    expect(getByTestId('carousel-inner')).toHaveStyle(
      `transform: translate3d(calc(-0% - 0px), 0, 0)`,
    )
  })
})
