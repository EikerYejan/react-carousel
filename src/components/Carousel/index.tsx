import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

export type CarouselOptions = {
  spaceBetween?: number
  transitionDuration?: number
  initialActiveIndex?: number
  slidesPerView?: number
  navigation?: boolean
  pagination?: boolean
  onChangeSlide?: (index: number) => void
}

type Props = CarouselOptions & {
  children: React.ReactNode[]
  className?: string
}

type StyleProps = Pick<CarouselOptions, 'spaceBetween' | 'transitionDuration'>

const Wrapper = styled.div<StyleProps>`
  width: auto;
  overflow: hidden;
  position: relative;

  .carousel- {
    &inner {
      transition: transform ${({ transitionDuration }) => `${transitionDuration}s`};
      display: flex;
      flex-wrap: nowrap;
      gap: ${({ spaceBetween }) => `${spaceBetween}px`};
    }

    &navigation {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 25px 0;

      button {
        background: none;
        border: none;
        outline: none;
        cursor: pointer;
        font-size: 18px;
        font-weight: bold;
      }
    }

    &pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 25px 0;
      gap: 5px;

      &-bullet {
        font-size: 0;
        width: 14px;
        height: 14px;
        display: block;
        padding: 0;
        background-color: #333;
        border: none;
        border-radius: 50%;
        opacity: 0.35;
        transition: 0.5s;
        cursor: pointer;

        &.is-active {
          opacity: 1;
        }
      }
    }
  }
`

const Carousel = ({
  children,
  initialActiveIndex,
  slidesPerView = 1,
  spaceBetween = 25,
  transitionDuration = 0.25,
  navigation = true,
  pagination = false,
  className = '',
  onChangeSlide,
}: Props) => {
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex ?? 0)
  const slidesCount = Math.ceil(React.Children.count(children) / slidesPerView)

  const updateIndex = (i: number) => {
    let newIndex = i

    if (i < 0) newIndex = 0
    else if (newIndex >= slidesCount) newIndex = slidesCount - 1

    setActiveIndex(newIndex)
  }

  const prevButtonIsDisabled = activeIndex <= 0
  const nextButtonIsDisabled = activeIndex >= slidesCount - 1

  const styleProps = { spaceBetween, transitionDuration, className }
  const translateStyles = `translate3d(calc(-${activeIndex * 100}% - ${
    spaceBetween * activeIndex
  }px), 0, 0)`
  const slidesGap = spaceBetween * (slidesPerView - 1)
  const slideWidth = `calc((100vw - ${slidesGap}px) / ${slidesPerView})`

  useEffect(() => {
    if (onChangeSlide) onChangeSlide(activeIndex)
  }, [activeIndex, onChangeSlide])

  return (
    <Wrapper {...styleProps}>
      <div style={{ transform: translateStyles }} className="carousel-inner">
        {React.Children.map(children, (child) => {
          return React.cloneElement(child as React.ReactElement, {
            style: { minWidth: slideWidth, width: slideWidth, maxWidth: slideWidth },
          })
        })}
      </div>
      {pagination && (
        <div className="carousel-pagination">
          {Array(slidesCount ?? 0)
            .fill(0)
            .map((_, i) => (
              <button
                className={`carousel-pagination-bullet ${i === activeIndex ? 'is-active' : ''}`}
                onClick={() => updateIndex(i)}
                key={`bullet-${i}`}
              >
                {i + 1}
              </button>
            ))}
        </div>
      )}
      {navigation && (
        <div className="carousel-navigation">
          <button
            disabled={prevButtonIsDisabled}
            onClick={() => (!prevButtonIsDisabled ? updateIndex(activeIndex - 1) : null)}
            title="Previouse"
            type="button"
          >
            Prev
          </button>
          <button
            disabled={nextButtonIsDisabled}
            onClick={() => updateIndex(activeIndex + 1)}
            title="Next"
            type="button"
          >
            Next
          </button>
        </div>
      )}
    </Wrapper>
  )
}

export default Carousel
