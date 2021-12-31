import { render } from '@testing-library/react'
import Slide from './Slide'

describe('Slide', () => {
  it('renders correctly', () => {
    const { baseElement } = render(
      <Slide>
        <h1>TEST</h1>
      </Slide>,
    )

    expect(baseElement).toMatchSnapshot()
    expect(baseElement).toBeInTheDocument()
    expect(baseElement).toHaveTextContent('TEST')
  })
})
