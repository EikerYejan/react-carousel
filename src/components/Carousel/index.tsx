import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { themeColor } from '../../theme'

export type CarouselOptions = {
  /**
   * Distance between slides in px.
   * @default 25
   */
  spaceBetween?: number

  /**
   * Duration of transition in seconds.
   * @default 0.25
   */
  transitionDuration?: number

  /**
   * The initial slide to display
   * @default 0
   */
  initialActiveIndex?: number

  /**
   *  Number of slides per view (slides visible at the same time on slider's container)
   * @default 1
   */
  slidesPerView?: number

  /**
   * Show navigation arrows
   * @default true
   */
  navigation?: boolean

  /**
   * Show pagination bullets
   * @default false
   */
  pagination?: boolean

  /**
   * Callback function to be called when the active slide changes
   * @param {number} index
   * @returns {void} void
   */
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
      background: none;
      border: none;
      outline: none;
      cursor: pointer;
      font-size: 18px;
      font-weight: bold;
      position: absolute;
      z-index: 1;
      color: ${themeColor('white')};
      width: 45px;
      height: 45px;
      top: calc(50% - 45px);
      padding: 0;
      transition: 0.5s;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: invert(1);
      }

      &.next {
        right: 30px;
      }

      &.prev {
        left: 30px;
      }

      &:disabled {
        opacity: 0.35;
        cursor: not-allowed;
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
        min-width: 14px;
        min-height: 14px;
        height: 14px;
        display: block;
        padding: 0;
        background-color: ${themeColor('primary')};
        border: none;
        border-radius: 50%;
        opacity: 0.2;
        transition: 0.5s;
        cursor: pointer;
        flex-wrap: wrap;

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
  const slidesCount = Math.ceil(React.Children.count(children) / slidesPerView) ?? 0

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
    if (initialActiveIndex) {
      if (initialActiveIndex >= slidesCount) setActiveIndex(slidesCount - 1)
      else setActiveIndex(initialActiveIndex)
    }
  }, [initialActiveIndex, slidesCount])

  useEffect(() => {
    if (onChangeSlide) onChangeSlide(activeIndex)
  }, [activeIndex, onChangeSlide])

  return (
    <Wrapper {...styleProps}>
      <div
        style={{ transform: translateStyles }}
        className="carousel-inner"
        data-testid="carousel-inner"
      >
        {React.Children.map(children, (child) => {
          return React.cloneElement(child as React.ReactElement, {
            style: { minWidth: slideWidth, width: slideWidth, maxWidth: slideWidth },
          })
        })}
      </div>
      {pagination && (
        <div className="carousel-pagination">
          {Array(slidesCount)
            .fill(0)
            .map((_, i) => (
              <button
                type="button"
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
        <>
          <button
            data-testid="navigation-prev"
            className="carousel-navigation prev"
            disabled={prevButtonIsDisabled}
            onClick={() => (!prevButtonIsDisabled ? updateIndex(activeIndex - 1) : null)}
            title="Previous"
            type="button"
          >
            <img src="/images/chevron-back.svg" alt="prev" />
          </button>
          <button
            data-testid="navigation-next"
            className="carousel-navigation next"
            disabled={nextButtonIsDisabled}
            onClick={() => updateIndex(activeIndex + 1)}
            title="Next"
            type="button"
          >
            <img src="/images/chevron-forward.svg" alt="next" />
          </button>
        </>
      )}
    </Wrapper>
  )
}

export default Carousel
