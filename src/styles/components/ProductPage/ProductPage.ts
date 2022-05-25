import styled from 'styled-components'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export const ProductPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .containers {
    width: 70%;
    display: flex;
    position: absolute;
    top: 480px;
  }
  .simple-description {
    padding: 0 2rem;
    display: flex;
    flex-direction: column;
    .label {
      font-size: 0.75rem;
      font-weight: 400;
      color: ${props => props.theme.colors.secundary};
      margin-bottom: 0.5rem;
    }
    .text {
      font-size: 1rem;
      font-weight: 600;
      color: ${props => props.theme.colors.text};
    }
  }

  .title-container {
    padding: 2rem 2rem;
    .brand {
      font-size: 1.875rem;
      font-weight: 700;
      color: ${props => props.theme.colors.text};
      text-transform: capitalize;
    }
    .model {
      font-size: 1.875rem;
      font-weight: 700;
      color: ${props => props.theme.colors.primary};
      text-transform: capitalize;
    }
  }

  .phone {
    display: flex;
    align-items: center;
    svg {
      cursor: pointer;
    }
  }

  #ReactSimpleImageViewer {
    z-index: 2;
  }
  @media screen and (max-width: 768px) {
    .containers {
      width: 100%;
    }
    .simple-description {
      padding: 1rem 0;
      .label {
        font-size: 12px;
      }
      .text {
        font-size: 14px;
      }
    }
    .title-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0 ;
      .brand {
        font-size: 1.375rem;
      }
      .model {
        font-size: 1.375rem;
      }
      .price {
        font-size: 1.375rem;
        font-weight: 700;
        color: ${props => props.theme.colors.text};
        text-transform: capitalize;
      }
    }
  }
`

export const ImageContainer = styled.div`
  width: 50%;
  height: auto;
  div {
    height: 100%;
    max-height: 500px;
  }
  .slick-next,
  .slick-prev {
    width: 70px;
    height: 70px;
    z-index: 1;
    &::before {
      font-size: 4.375rem;
      color: ${props => props.theme.colors.secundary};
    }
  }
  .slick-prev {
    left: -95px;
  }
  .slick-next {
    right: -95px;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    .slick-prev {
      left: 0;
    }
    .slick-next {
      right: 0;
    }
    .slick-next,
    .slick-prev {
      width: 50px;
      height: 50px;
      z-index: 1;
      &::before {
        font-size: 3.125rem;
        color: ${props => props.theme.colors.secundary};
      }
    }
  }
`

export const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 0.2rem;
  height: 480px;
  cursor: pointer;
`
export const DescriptionContainer = styled.div`
  width: 70%;
  z-index: 1;
  background-color: ${props => props.theme.colors.background_2};
  border-radius: 0.5rem;
  height: auto;
  box-shadow: rgba(133, 109, 190, 0.12) 0px 2px 4px 0px,
    rgba(133, 109, 190, 0.32) 0px 2px 16px 0px;
  margin-right: 0.5rem;
  margin-bottom: 1rem;

  .row-1 {
    display: flex;
    justify-content: space-between;
  }
  .row-2 {
    margin: 3rem 0;
  }
`
export const RightDescriptionContainer = styled.div`
  width: 30%;
  z-index: 1;
  background-color: ${props => props.theme.colors.background_2};
  border-radius: 0.5rem;
  height: auto;
  box-shadow: rgba(133, 109, 190, 0.12) 0px 2px 4px 0px,
    rgba(133, 109, 190, 0.32) 0px 2px 16px 0px;
  margin-bottom: 1rem;
  .price {
    padding: 2rem 2rem 1.35rem 2rem;
    span {
      font-size: 2.5rem;
      font-weight: 500;
      color: ${props => props.theme.colors.text};
    }
  }
  .seller-info {
    display: flex;
    flex-direction: column;
    .right {
      margin: 0.5rem 0;
      flex-direction: row;
      align-items: center;
      .label {
        margin: 0 0.5rem 0 0;
      }
    }
    .seller-label {
      font-size: 0.75rem;
      font-weight: 400;
      color: ${props => props.theme.colors.secundary};
      margin-bottom: 0.5rem;
      text-align: center;
    }
  }
`
export const DescriptionMonileContainer = styled.div`
  width: 100%;
  z-index: 1;
  background-color: ${props => props.theme.colors.background_2};
  border-radius: 0.5rem;
  height: auto;
  box-shadow: rgba(133, 109, 190, 0.12) 0px 2px 4px 0px,
    rgba(133, 109, 190, 0.32) 0px 2px 16px 0px;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;

  .seller-mobile-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .bike-info-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`
