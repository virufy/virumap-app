import React, {
  useEffect, useCallback, useState, memo,
} from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import usePortal from 'react-useportal';
import { isMobile } from 'react-device-detect';

// Header Control
import useHeaderContext from 'hooks/useHeaderContext';

// Components
import WizardButtons from 'components/WizardButtons';
import { BlackText } from 'components/Texts';
import LinkPurple from 'components/LinkPurple';

// Utils
import { scrollToTop } from 'helper/scrollHelper';

// Styles
import {
  ContainerShapeDown,
  InnerContainerShapeDown,
  WelcomeContent,
  WelcomeStyledFormAlternative,
  AboutUsSVG,
} from '../style';

const Step3 = (p: Wizard.StepProps) => {
  // Hooks
  const { Portal } = usePortal({
    bindTo: document && document.getElementById('wizard-buttons') as HTMLDivElement,
  });
  const {
    setType, setDoGoBack, setLogoSize, setSubtitle,
  } = useHeaderContext();
  const { t } = useTranslation();
  const history = useHistory();

  // States
  const [activeStep, setActiveStep] = useState(true);

  // Callbacks
  const handleNext = useCallback(() => {
    if (p.nextStep) {
      history.push(p.nextStep);
    }
  }, [history, p.nextStep]);

  const doBack = useCallback(() => {
    if (p.previousStep) {
      setActiveStep(false);
      history.push(p.previousStep);
    } else {
      history.goBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Effects
  useEffect(() => {
    scrollToTop();
    setDoGoBack(() => doBack);
    setLogoSize('regular');
    setSubtitle(t('helpVirufy:title'));
    setType('secondary');
  }, [doBack, setDoGoBack, setLogoSize, setType, setSubtitle, t]);

  return (
    <WelcomeStyledFormAlternative>
      <ContainerShapeDown isMobile={isMobile}>
        <InnerContainerShapeDown>
          <AboutUsSVG />
        </InnerContainerShapeDown>
      </ContainerShapeDown>
      <WelcomeContent maxWidth={470} mt={0}>
        <BlackText>
          <Trans i18nKey="helpVirufy:aboutParagraph">
            <p>
              Virufy is a <strong>nonprofit organization</strong> that is working
              to develop the means to use
              <strong> artificial intelligence (Al) to screen for COVID-19 from cough patterns</strong>
              rapidly and at no cost through use of a smartphone for the benefit of low-income countries.
            </p>
            <p>
              Our team includes researchers from over <strong>25 countries</strong>.
              <LinkPurple to="https://virufy.org/es/our-approach" target="_blank"> Our research</LinkPurple> has shown that Al technology may be able to identify COVID&apos;s unique coug signature.
            </p>
            <p>
              By collecting <strong>coughs recordings</strong> from people around the world,
              Virufy is improving the robustness of its AI algorithm in recognizing COVID&apos;s
              unique sound pattern.
            </p>
            <p>
              <strong>You have the power</strong>to help benefit millions of
              people across the globe by <strong>contributing your cough</strong> in our study.
            </p>
          </Trans>
        </BlackText>
      </WelcomeContent>

      {activeStep && (
        <Portal>
          <WizardButtons
            invert
            leftLabel={t('helpVirufy:nextButton')}
            leftHandler={handleNext}
          />
        </Portal>
      )}

    </WelcomeStyledFormAlternative>
  );
};

export default memo(Step3);
