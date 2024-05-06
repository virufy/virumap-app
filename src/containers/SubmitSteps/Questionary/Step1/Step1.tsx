import React, {
  memo, useCallback, useEffect, useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import usePortal from 'react-useportal';
import { useTranslation } from 'react-i18next';

// Form
import { useForm, Controller } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import { yupResolver } from '@hookform/resolvers';
import { ErrorMessage } from '@hookform/error-message';
import * as Yup from 'yup';

// Update Action
import { updateAction } from 'utils/wizard';

// Header Control
import useHeaderContext from 'hooks/useHeaderContext';

// Utils
import { scrollToTop } from 'helper/scrollHelper';

// Components
import OptionList from 'components/OptionList';
import WizardButtons from 'components/WizardButtons';

// Styles
import {
  QuestionText,
  MainContainer,
  QuestionNote,
  QuestionInput,
  InputLabel,
} from '../style';

const schema = Yup.object({
  illStatus: Yup.string().oneOf(['yes', 'no', 'unsure']).required(),
  zipCode: Yup.string().required(),
}).defined();

type Step1Type = Yup.InferType<typeof schema>;

const Step2 = ({
  previousStep,
  nextStep,
  storeKey,
  metadata,
}: Wizard.StepProps) => {
  // Hooks
  const { Portal } = usePortal({
    bindTo: document && document.getElementById('wizard-buttons') as HTMLDivElement,
  });
  const {
    setDoGoBack, setTitle, setType, setSubtitle,
  } = useHeaderContext();
  const history = useHistory();
  const { t } = useTranslation();
  const { state, action } = useStateMachine(updateAction(storeKey));
  const {
    control, handleSubmit, formState,
  } = useForm({
    mode: 'onChange',
    defaultValues: state?.[storeKey],
    resolver: yupResolver(schema),
  });
  const { errors, isValid } = formState;

  // States
  const [activeStep, setActiveStep] = useState(true);

  // Callbacks
  const handleDoBack = useCallback(() => {
    setActiveStep(false);
    if (previousStep) {
      history.push(previousStep);
    } else {
      history.goBack();
    }
  }, [history, previousStep]);

  const onSubmit = async (values: Step1Type) => {
    if (values) {
      action(values);
      if (nextStep) {
        setActiveStep(false);
        history.push(nextStep);
      }
    }
  };

  // Effects
  useEffect(() => {
    scrollToTop();
    setTitle(`${t('questionary:headerQuestions')}`);
    setType('primary');
    setDoGoBack(() => handleDoBack);
    setSubtitle('');
  }, [handleDoBack, setDoGoBack, setTitle, setType, metadata, t, setSubtitle]);

  const illOptions = [
    {
      value: 'yes',
      label: t('questionary:step1.options.yes'),
    },
    {
      value: 'no',
      label: t('questionary:step1.options.no'),
    },
    {
      value: 'unsure',
      label: t('questionary:step1.options.unsure'),
    },
  ];

  return (
    <MainContainer>
      <QuestionText extraSpace first>{t('questionary:step1.question1')}
      </QuestionText>
      <Controller
        control={control}
        name="illStatus"
        defaultValue={undefined}
        render={({ onChange, value }) => (
          <OptionList
            singleSelection
            value={{ selected: value ? [value] : [] }}
            onChange={v => onChange(v.selected[0])}
            items={illOptions}
          />
        )}
      />
      <ErrorMessage
        errors={errors}
        name="illStatus"
        render={({ message }) => (
          <p>{message}</p>
        )}
      />

      <QuestionText hasNote>
        {t('questionary:step1.question2')}
      </QuestionText>
      <QuestionNote>{t('questionary:step1.caption2')}</QuestionNote>
      <Controller
        control={control}
        name="zipCode"
        defaultValue=""
        render={({ onChange, value, name }) => (
          <>
            <InputLabel>{t('questionary:step1.zipCodeLabel')}</InputLabel>
            <QuestionInput
              name={name}
              value={value}
              onChange={onChange}
              type="text"
              placeholder={t('questionary:step1.zipCodePlaceholder')}
              autoComplete="Off"
            />
          </>
        )}
      />
      <ErrorMessage
        errors={errors}
        name="zipCode"
        render={({ message }) => (
          <p>{message}</p>
        )}
      />
      {/* Bottom Buttons */}
      {activeStep && (
        <Portal>
          <WizardButtons
            leftLabel={t('questionary:submit')}
            leftDisabled={!isValid}
            leftHandler={handleSubmit(onSubmit)}
            invert
          />
        </Portal>
      )}
    </MainContainer>
  );
};

export default memo(Step2);
