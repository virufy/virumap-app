import React, {
  useEffect, useCallback, useState, memo,
} from 'react';
import { useHistory } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { useStateMachine } from 'little-state-machine';

// Components
import StayInTouch from 'components/StayInTouch';
import SocialIcons from 'components/SocialIcons';
import CreatedBy from 'components/CreatedBy';

// Utils
import { resetStore } from 'utils/wizard';

// Helper
import { scrollToTop } from 'helper/scrollHelper';

// Hooks
import useHeaderContext from 'hooks/useHeaderContext';

import {
  BeforeSubmitText,
  SubmissionIdBox,
  ThankYouLayout,
  ThankYouTitle,
} from './style';

interface ThankYouLocation {
  submissionId: string;
  patientId?: string;
}

const ThankYou = (p: Wizard.StepProps) => {
  // Hooks
  const { t } = useTranslation();
  const { setDoGoBack, setTitle, setType } = useHeaderContext();
  const { action } = useStateMachine(resetStore());
  const history = useHistory();

  // States
  const [, setActiveStep] = useState(true);

  // Callbacks
  const handleDoBack = useCallback(() => {
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
    setTitle('');
    setType('tertiary');
    setDoGoBack(null);
  }, [handleDoBack, setDoGoBack, setTitle, setType]);

  useEffect(() => {
    action({});
  }, [action]);

  return (
    <ThankYouLayout>
      <ThankYouTitle>{t('thankyou:title')}</ThankYouTitle>
      <BeforeSubmitText>{t('thankyou:paragraph1')}</BeforeSubmitText>

      <SubmissionIdBox>
        <Trans i18nKey="thankyou:submissionId">
          Your unique submission ID:
          <br />
          <strong>{{ submissionId: Math.floor(100000 + Math.random() * 900000) }}</strong>
        </Trans>
      </SubmissionIdBox>

      <BeforeSubmitText>
        <Trans i18nKey="thankyou:paragraph2" components={{ 1: <br /> }}>
          Make sure to safeguard this submission ID, as you will need it
          to request Virufy to delete your anonymized data in the future.
          If you later develop symptoms such as cough, fever, or shortness
          of breath, please come back to resubmit your latest cough sounds.
        </Trans>
      </BeforeSubmitText>

      <StayInTouch />

      <SocialIcons />

      <CreatedBy inline={false} mt="72px" />

    </ThankYouLayout>
  );
};

export default memo(ThankYou);
