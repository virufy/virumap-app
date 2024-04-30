import React, {
  memo,
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

// Form
import { useStateMachine } from 'little-state-machine';

// Header Control
import useHeaderContext from 'hooks/useHeaderContext';

// Components
import { BlackText } from 'components/Texts';

// Utils
import { scrollToTop } from 'helper/scrollHelper';
import { updateAction } from 'utils/wizard';

// Images
import { ReactComponent as ImageCoughSVG } from 'assets/images/cough-left.svg';
import { ReactComponent as ImageVoiceSVG } from 'assets/images/voice-right.svg';
import { ReactComponent as ImageBreathSVG } from 'assets/images/breath-right.svg';

import Record from './Record';

// Styles
import {
  MainContainer,
  InstructionContainer,
  WelcomeBullets,
  BulletIndicator,
  HoldCelImage,
  SocialDistancing,
  StyledOverlay,
  StyledVideoContainer,
  StyledCloseButton,
  StyledIframeContainer,
  StyledSpan,
} from './style';

const Introduction = ({
  previousStep,
  nextStep,
  // otherSteps,
  metadata,
  storeKey,
}: Wizard.StepProps) => {
  // Hooks
  const { state, action } = useStateMachine(updateAction(storeKey));
  const {
    setDoGoBack, setTitle, setType, setSubtitle,
  } = useHeaderContext();
  const history = useHistory();
  const location = useLocation<{ isShortAudioCollection: boolean }>();
  const { t } = useTranslation();

  const isCoughLogic = useMemo(
    () => (metadata ? metadata.currentLogic === 'recordYourCough' : false),
    [metadata],
  );
  const isBreathLogic = useMemo(
    () => (metadata ? metadata.currentLogic === 'recordYourBreath' : false),
    [metadata],
  );
  const
    isShortAudioCollection = location?.state?.isShortAudioCollection || false;

  // States
  const [showVideo, setShowVideo] = useState(false);

  // Handlers
  const handleDoBack = useCallback(() => {
    if (previousStep) {
      history.push(previousStep);
    } else {
      history.goBack();
    }
  }, [history, previousStep]);

  // const handleManualUpload = React.useCallback(() => {
  //   if (otherSteps && otherSteps.manualUploadStep) {
  //     history.push(otherSteps.manualUploadStep, { isShortAudioCollection });
  //   }
  // }, [otherSteps, history, isShortAudioCollection]);

  const handleNext = useCallback(
    values => {
      if (nextStep) {
        action({
          [metadata?.currentLogic]: {
            recordingFile: values.recordingFile,
            uploadedFile: null,
          },
        });
        history.push(nextStep, { from: 'step-record', isShortAudioCollection });
      }
    },
    [nextStep, action, metadata, history, isShortAudioCollection],
  );

  const handlePlayVideo = useCallback(() => {
    setShowVideo(true);
  }, []);

  // Effects
  useEffect(() => {
    scrollToTop();
    if (isCoughLogic) {
      setTitle(t('recordingsIntroduction:recordCough.header'));
    } else if (isBreathLogic) {
      setTitle(t('recordingsIntroduction:recordBreath.header'));
    } else {
      setTitle(t('recordingsIntroduction:recordSpeech.header'));
    }
    setType('primary');
    setSubtitle(t('recordingsIntroduction:recordCough:title'));
    setDoGoBack(() => handleDoBack);
  }, [isCoughLogic, isBreathLogic, setTitle, setSubtitle, setType, handleDoBack, setDoGoBack, t]);

  const [renderInstrucion2, renderImage2, renderInstrucion3] = useMemo(() => {
    if (isCoughLogic) {
      return ([
        <Trans i18nKey="recordingsIntroduction:recordCough.intro2Cough">
          <strong>Wear a surgical or cloth mask</strong> and hold your device two hands-length away from your face.
        </Trans>,
        <ImageCoughSVG />,
        <>
          <Trans i18nKey="recordingsRecord:textCough">
            Click the record button below and
            <strong>cough intentionally three times with a deep breath between each cough</strong>.
            When you are done, tap the stop button
          </Trans>
          <StyledSpan onClick={handlePlayVideo}>
            <Trans i18nKey="recordingsRecord:seeExample">(see <u>exmaple</u>)</Trans>
          </StyledSpan>
        </>,
      ]);
    }
    if (isBreathLogic) {
      return ([
        <Trans i18nKey="recordingsIntroduction:recordCough.intro2Breath">
          Hold your device <strong>1-2 ft (30-60 cm)</strong>
          away from your mouth and <strong>do not obstruct</strong>
          or cover your device with plastic. Do not breathe violently or too forcefully.
        </Trans>,
        <ImageBreathSVG />,
        <Trans i18nKey="recordingsRecord:textBreath">
          Tap the record button and
          <strong> breathe deeply and loudly </strong> with your mouth into the bottom of your phone
          <strong> 3 times</strong>, leaving a space between each breath. When you are done, tap the stop button.
        </Trans>,
      ]);
    }
    return ([
      <Trans i18nKey="recordingsIntroduction:recordCough.intro2Speech">
        Hold your device <strong>1-2 ft (30-60 cm)</strong>
        away from your mouth and <strong>do not obstruct</strong>
        or cover your device with plastic. Do not speak violently or too forcefully.
      </Trans>,
      <ImageVoiceSVG />,
      <Trans i18nKey="recordingsRecord:textSpeech">
        Tap the record button below, inhale deeply, and then
        <strong> say a sustained ‘aaaaah’ for at least 5 seconds.</strong>
        When you are done, tap the stop button.
      </Trans>,

    ]);
  }, [isCoughLogic, isBreathLogic, handlePlayVideo, t]);

  return (
    <MainContainer>
      <InstructionContainer>
        <WelcomeBullets>
          <BulletIndicator>1</BulletIndicator>
        </WelcomeBullets>
        <BlackText>
          <Trans i18nKey="recordingsIntroduction:recordCough.intro1">
            Find a <strong>quiet environment</strong> that is <strong>20 feet away</strong> from those around you.
          </Trans>
        </BlackText>
      </InstructionContainer>
      <SocialDistancing />
      <InstructionContainer>
        <WelcomeBullets>
          <BulletIndicator>2</BulletIndicator>
        </WelcomeBullets>
        <BlackText>
          {renderInstrucion2}
        </BlackText>
      </InstructionContainer>
      <HoldCelImage>
        {renderImage2}
      </HoldCelImage>
      <InstructionContainer>
        <WelcomeBullets>
          <BulletIndicator>3</BulletIndicator>
        </WelcomeBullets>
        <BlackText>
          {renderInstrucion3}
        </BlackText>
      </InstructionContainer>
      {
          showVideo && (
            <StyledVideoContainer>
              <StyledOverlay onClick={() => setShowVideo(false)} />
              <StyledIframeContainer>
                <StyledCloseButton onClick={() => setShowVideo(false)} />
                <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/Pk0gwtR6JLw" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
              </StyledIframeContainer>
            </StyledVideoContainer>
          )
        }
      <Record
        // isCoughLogic={isCoughLogic}
        defaultValues={state?.[storeKey]?.[metadata?.currentLogic]}
        // onManualUpload={handleManualUpload}
        onNext={handleNext}
        currentLogic={metadata?.currentLogic || ''}
        // action={action}
        isShortAudioCollection={isShortAudioCollection}
      />

      <InstructionContainer>
        <WelcomeBullets>
          <BulletIndicator>4</BulletIndicator>
        </WelcomeBullets>
        <BlackText>
          <Trans i18nKey="recordingsRecord:textNext">
            Click continue to proceed.
          </Trans>
        </BlackText>
      </InstructionContainer>

    </MainContainer>
  );
};

export default memo(Introduction);
