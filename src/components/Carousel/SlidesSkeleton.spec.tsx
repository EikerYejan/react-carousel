import { render } from '@testing-library/react'
import SlideSkeleton from './SlideSkeleton'

describe('SlideSkeleton', () => {
  it('Should render', () => {
    const { baseElement } = render(<SlideSkeleton />)

    expect(baseElement).toMatchSnapshot()
    expect(baseElement).toBeInTheDocument()
  })
})
