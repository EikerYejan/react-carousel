import styled from 'styled-components'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode
}

const Wrapper = styled.div`
  height: 100%;
  display: inline-flex;
`

const CarouselSlide = ({ children, ...restProps }: Props) => {
  return <Wrapper {...restProps}>{children}</Wrapper>
}

export default CarouselSlide
