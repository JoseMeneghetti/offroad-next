import styled from 'styled-components'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export const ProductSummaryContainer = styled.div`
  width: 90%;
  display: flex;
  align-items: start;
  flex-direction: column;
  border: 1px solid ${props => props.theme.colors.text};
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin: 1rem;
  cursor: pointer;
  @media (min-width: 769px) {
    max-width: 250px;
    margin: 1rem 0;
  }
  @media (min-width: 1024px) {
    max-width: 275px;
  }
`

export const ImageContainer = styled.div`
  width: 100%;
  height: 300px;
  margin-bottom: 0.5rem;
  div {
    height: 100%;
    max-height: 300px;
  }
  .slick-next,
  .slick-prev {
    width: 30px;
    height: 30px;
    z-index: 1;
    &::before {
      font-size: 30px;
    }
  }

  .slick-prev {
    left: 0;
  }
  .slick-next {
    right: 0;
  }
`

export const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 0.2rem;
`

export const YearContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
`

export const LocationContainer = styled.div`
  width: 100%;
  border-top: 1px solid ${props => props.theme.colors.secundary};
  padding-top: 0.5rem;
  span {
    ::before {
      content: '';
      padding: 5px 10px 0px 15px;
      background-repeat: no-repeat;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='24px' height='24px' viewBox='0 0 24 24' version='1.1'%3E%3C!-- Generator: Sketch 52.3 (67297) - http://www.bohemiancoding.com/sketch --%3E%3Ctitle%3EIcons/Pin Copy%3C/title%3E%3Cdesc%3ECreated with Sketch.%3C/desc%3E%3Cdefs%3E%3Cpath d='M12,11 C11.449,11 11,10.551 11,10 C11,9.449 11.449,9 12,9 C12.551,9 13,9.449 13,10 C13,10.551 12.551,11 12,11 M12,2.0004 C16.411,2.0004 20,5.5884 20,10.0004 C20,16.4404 12.884,21.5974 12.581,21.8144 C12.407,21.9384 12.204,22.0004 12,22.0004 C11.796,22.0004 11.593,21.9384 11.419,21.8144 C11.116,21.5974 4,16.4404 4,10.0004 C4,5.5884 7.589,2.0004 12,2.0004 Z M12,19.7334 C13.609,18.4224 18,14.4384 18,10.0004 C18,6.6914 15.309,4.0004 12,4.0004 C8.691,4.0004 6,6.6914 6,10.0004 C6,14.4384 10.391,18.4224 12,19.7334 Z M12,7 C13.654,7 15,8.346 15,10 C15,11.654 13.654,13 12,13 C10.346,13 9,11.654 9,10 C9,8.346 10.346,7 12,7 Z' id='path-1'/%3E%3C/defs%3E%3Cg id='Icons/Pin-Copy' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cmask id='mask-2' fill='white'%3E%3Cuse xlink:href='%23path-1'/%3E%3C/mask%3E%3Cuse id='Combined-Shape' fill='%23000000' xlink:href='%23path-1'/%3E%3Cg id='Colors/Grey/Grey-2' mask='url(%23mask-2)' fill='%23696977'%3E%3Crect id='Rectangle' x='0' y='0' width='24' height='24'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    }
  }
`
