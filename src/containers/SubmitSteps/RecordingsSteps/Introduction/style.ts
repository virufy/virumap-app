import styled from 'styled-components';
import { colors } from 'theme';
import { BlackText } from 'components/Texts';

import { ReactComponent as SocialDistancingSVG } from 'assets/images/social-distancing.svg';
import { ReactComponent as InfoIconSVG } from 'assets/icons/info.svg';
import { ReactComponent as PlayIconSVG } from 'assets/icons/play.svg';
import { ReactComponent as CloseIconSVG } from 'assets/icons/cross.svg';

/* Containers */
export const MainContainer = styled.div``;

export const InstructionContainer = styled.div`
  display: flex; 
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    max-width: 470px;
    margin: auto;
    padding-left: 0px;
    padding-right: 0px;
  }
`;

export const TopImage = styled.img`
  width: 195px;
  height: 100px;
  margin: 0 auto 38px;
  display: block;

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    width: 470px;
    height: 241px;
  }
`;

export const TopImageContainerSpeech = styled.div`
  width: 100%;
  max-width: 353px;
  height: 100%;
  max-height: 153px;
  margin: 0 auto;
  display: block;

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    width: 595px;
    height: 240px;
    margin-bottom: 64px;
  }
`;

export const TopImageSpeech = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const BottomImagesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BottomImageLeft = styled.img`
  width: 45px;
  height: 67px;
  margin-right: 17px;

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    width: 108px;
    height: 161px;
  }
`;

export const BottomImageRight = styled.img`
  width: 76px;
  height: 100px;

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    width: 184px;
    height: 240px;
  }
`;

/* Bullets */

export const WelcomeBullets = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.purple_10}; 
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 18px;
`;

export const BulletIndicator = styled.p`
  color: ${({ theme }) => theme.colors.purple}; 
  font-family: Source Sans Pro;
  font-size: 20px;
  font-weight: bold;
  margin: 0px;
`;

/* Images */

export const SocialDistancing = styled(SocialDistancingSVG)`
  width: 192px;
  height: 96px;
  margin: 30px auto 37px;
  display: block;
  text-align: center;

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    width: 205px;
    height: 140px;
  }
`;

export const HoldCelImage = styled.div`
  width: 99px;
  height: 108px;
  margin: 30px auto;
  display: block;

  svg {
    height: 100%;
    width: 100%;
  }
  
  @media screen and (${props => props.theme.breakpoints.tablet}) {
    width: 126px;
    height: 158px;
  }
`;

/* Text */
export const Text = styled(BlackText).attrs({ dark: true })`
  margin-bottom: 24px;

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    margin-bottom: 40px;
    font-size: 16px;
  }
`;

export const TextSpeech = styled(Text)`
  color: ${colors.realBlack};
  text-align: left;

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    max-width: 470px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 205px;
    font-size: 16px;
  }
`;

export const StyledOverlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.7);
  top: 0;
  left: 0;
  z-index: 1;
`;

export const StyledPlayButton = styled.div`
  border-radius: 50%;
  width: 30px;
  height: 28px;
  background: ${({ theme }) => theme.colors.purple};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  display: inline-flex;
  margin-left: 10px;
`;

export const StyledCloseButton = styled(CloseIconSVG)`
  border-radius: 50%;
  width: 30px;
  height: 28px;
  background: ${({ theme }) => theme.colors.purple};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 2;
  padding: 6px;
  position: absolute;
  right: 16px;
  top: -16px;
  z-index: 4;

  path {
    width: 10px;
    height: 10px;
    fill: ${({ theme }) => theme.colors.realWhite};
  }

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    right: 16%;
  }
`;

export const StyledInfoIconSVG = styled(InfoIconSVG)`
  width: 36px;
  height: 32px;
  flex: none;
  margin-right: 12px;
  margin-left: -3px;
`;

export const StyledPlayIconSVG = styled(PlayIconSVG)`
  width: 10px;
  height: 10px;

  path {
    fill: ${({ theme }) => theme.colors.realWhite};
  }
`;

export const TutorialContainer = styled.div`
  display: flex; 
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 40px;
  
  @media screen and (${props => props.theme.breakpoints.tablet}) {
    max-width: 470px;
    margin: auto;
    padding-left: 0px;
    padding-right: 0px;
  }
`;

export const StyledVideoContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 2;

  iframe {
    position: relative;
    z-index: 3;
    max-width: 90%;
    margin-left: 5%;
    height: auto;
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    max-height: 650px;
  }

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    iframe {
      max-width: 70%;
      margin-left: 15%;
    }
  }
`;

export const StyledIframeContainer = styled.div`
  position: relative;
  z-index: 1;
  padding-bottom: 56.25%;
  height: 0;
  width: 100%;

  @media screen and (${props => props.theme.breakpoints.desktop}) {
    padding-bottom: 26.25%;
    width: 70%;
  }
`;

export const StyledSpan = styled.span`
  cursor: pointer;
`;
