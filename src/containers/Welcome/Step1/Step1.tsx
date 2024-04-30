import React, {
  memo, useEffect, useRef, useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { useStateMachine } from 'little-state-machine';
import usePortal from 'react-useportal';

// Form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as Yup from 'yup';

// Assets
import HeaderSplash from 'assets/images/baseLogoSplash.png';

// Components
import CreatedBy from 'components/CreatedBy';
import WizardButtons from 'components/WizardButtons';
import Link from 'components/Link';

// Update Action
import { updateAction, resetStore } from 'utils/wizard';

// Header Control
import useHeaderContext from 'hooks/useHeaderContext';

// Data
import { languageData } from 'data/lang';
import {
  countryData, CountryDataProps, supportedCountries,
} from 'data/country';
import { timeZones } from 'data/timeZones';

// Helper
import { scrollToTop } from 'helper/scrollHelper';

// Styles
import {
  WelcomeContent, WelcomeStyledForm,
  BoldBlackText, WelcomeSelect,
  HeaderImageContainer,
  HeaderImage,
  LogoWhiteBG,
  WelcomeNote,
  BoldBlackTextPrivacy,
} from '../style';

declare interface OptionsProps {
  label: string;
  value: string;
}

const invalidCountries = ['India', 'France', 'Italy', 'Netherlands', 'Belgium', 'Luxembourg', 'Germany', 'Pakistan'];

const schema = Yup.object().shape({
  country: Yup.string().required().notOneOf(invalidCountries),
  language: Yup.string().required(),
}).defined();

type Step1Type = Yup.InferType<typeof schema>;

/**
 * The function `getCountry` makes an asynchronous request to retrieve the country information based on
 * the user's IP address.
 * @returns The `getCountry` function is returning the country code of the user's IP address location.
 */
const getCountry = async () => {
  const res = await fetch('https://ipwho.is/');
  const data = await res.json();

  return data.country;
};

/**
 * The function `getCountryInfo` retrieves information about a country based on its name from a data
 * source.
 * @param {string} countryName - countryName is a parameter of type string that represents the name of
 * the country for which you want to retrieve information. The function `getCountryInfo` takes this
 * country name as input and searches for the corresponding country data in the `countryData` array. If
 * a match is found based on the country
 * @returns The function `getCountryInfo` is returning the country object that matches the provided
 * `countryName` from the `countryData` array.
 */
const getCountryInfo = (countryName: string) => {
  const countrySelected = countryData.find(country => country.label === countryName);

  return countrySelected;
};

const Step1 = (p: Wizard.StepProps) => {
  // Refs
  const resetExecuted = useRef(false);

  // Hooks
  const { Portal } = usePortal({
    bindTo: document && document.getElementById('wizard-buttons') as HTMLDivElement,
  });
  const { t, i18n } = useTranslation();
  const { state, actions } = useStateMachine({ update: updateAction(p.storeKey), reset: resetStore() });
  const {
    setType, setDoGoBack, setLogoSize,
  } = useHeaderContext();
  const history = useHistory();
  const store = state?.[p.storeKey];
  const {
    control,
    formState,
    handleSubmit,
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: store,
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const { isValid } = formState;
  const lang = watch('language');

  // States
  const [activeStep, setActiveStep] = useState(true);
  const [supportedLang, setSupportedLang] = useState<{ value: string; label: string; }[]>([]);
  const [ipLimit, setIpLimit] = useState(false);

  // Callbacks
  const onSubmit = async (values: Step1Type) => {
    if (values) {
      actions.update(values);
      if (p.nextStep) {
        setActiveStep(false);
        history.push(p.nextStep);
      }
    }
  };

  /**
   * The function `getOptionsCountry` filters and formats country data based on supported countries and
   * returns the formatted options.
   * @returns An array of objects with the properties from the `supportedCountriesOp` array, where each
   * object also has a `label` property that is derived from the translation key
   * `main:countries.${current.value}`.
   */
  const getOptionsCountry = () => {
    const supportedCountriesOp = countryData.filter(op => supportedCountries.includes(op.value));
    const formattedOptions = supportedCountriesOp.reduce((acc: CountryDataProps[], current) => {
      acc.push({ ...current, label: t(`main:countries.${current.value}`) });
      return acc;
    }, []);
    return formattedOptions;
  };

  // Effects
  /* This `useEffect` hook is responsible for resetting the form values when the component mounts or
  when the `store` state changes. Here's a breakdown of what it does: */
  useEffect(() => {
    if (resetExecuted.current) {
      resetExecuted.current = false;
      reset(store);
    }
  }, [store, reset]);

  useEffect(() => {
    scrollToTop();
    // Hide back arrow in header if neccesary
    setDoGoBack(null);
    setLogoSize('regular');
    setType('null');
  }, [setDoGoBack, setLogoSize, setType]);

  useEffect(() => {
    i18n.changeLanguage(lang);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n, lang]);

  /* This `useEffect` hook is responsible for initializing the form values for the country and language
  fields when the component mounts. Here's a breakdown of what it does: */
  useEffect(() => {
    const localStorageCountry = localStorage.getItem('countryResult');
    const virufyWizard = localStorage.getItem('virumap-app-wizard');
    if (virufyWizard) {
      const parsedVirufyWizard = JSON.parse(virufyWizard);
      setValue('country', parsedVirufyWizard.welcome.country);
      setValue('language', parsedVirufyWizard.welcome.language);
      if (localStorageCountry) {
        setSupportedLang(JSON.parse(localStorageCountry)?.supported);
      }
    } else if (localStorageCountry) {
      const parsedLocalStorageCountry = JSON.parse(localStorageCountry);
      setValue('country', parsedLocalStorageCountry.country);
      setValue('language', parsedLocalStorageCountry.lang[0].value);
      setSupportedLang(parsedLocalStorageCountry.supported);
    } else {
      getCountry()
        .then(countryName => {
          const countryInfo = getCountryInfo(countryName);
          const countryDataLS = {
            country: countryName,
            lang: countryInfo?.defaultLang,
            supported: countryInfo?.supportedLang,
          };
          localStorage.setItem('countryResult', JSON.stringify(countryDataLS));
          setValue('country', countryName);
          if (countryInfo) {
            setValue('language', countryInfo.defaultLang[0].value);
            setSupportedLang(countryInfo.supportedLang);
          }
          setIpLimit(false);
        })
        .catch(error => {
          console.error(error);
          setIpLimit(true);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* This `useEffect` hook is checking the `ipLimit` state variable and the availability of the `Intl`
  object. If `ipLimit` is true and `Intl` is available, it proceeds to get the user's time zone
  using `Intl.DateTimeFormat().resolvedOptions().timeZone`. It then extracts the user's city from
  the time zone information and looks up the corresponding country in the `timeZones` object. */
  useEffect(() => {
    if (ipLimit && Intl) {
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const tzArr = userTimeZone.split('/');
      const userCity = tzArr[tzArr.length - 1];
      const userCountry = timeZones[userCity];
      const countryInfo = getCountryInfo(userCountry);
      setValue('country', userCountry);
      if (countryInfo) {
        setValue('language', countryInfo.defaultLang[0].value);
        setSupportedLang(countryInfo.supportedLang);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ipLimit]);

  return (
    <>
      <WelcomeStyledForm>
        <HeaderImageContainer>
          <HeaderImage
            src={HeaderSplash}
          />
          <LogoWhiteBG />
        </HeaderImageContainer>
        <WelcomeContent mt={4}>
          <BoldBlackText>
            {t('main:selectYourLanguage', 'Language')}
          </BoldBlackText>

          {/* Language */}
          <Controller
            control={control}
            name="language"
            defaultValue={languageData[0].value}
            render={({ onChange, value: valueController }) => (
              <WelcomeSelect
                placeholder={t('main.selectYourLanguage', 'Language')}
                options={supportedLang}
                onChange={(e: any) => { onChange(e?.value); }}
                value={languageData.filter(({ value }) => value === valueController)}
                className="custom-select"
                classNamePrefix="custom-select"
                isDisabled={supportedLang?.length <= 1}
              />
            )}
          />

          <BoldBlackText>
            {t('main:selectLocation', 'Location')}
          </BoldBlackText>

          <Controller
            control={control}
            name="country"
            defaultValue=""
            render={({ onChange, value: valueController }) => (
              <WelcomeSelect
                placeholder={t('main:selectCountry', 'Select country')}
                options={getOptionsCountry()}
                onChange={(e: any) => {
                  onChange(e?.value);
                  const cInfo = getCountryInfo(e.value);
                  if (cInfo) {
                    setSupportedLang(cInfo.supportedLang);
                    setValue('language', cInfo.defaultLang[0].value);
                  }
                }}
                value={getOptionsCountry().filter(({ value }) => value === valueController)}
                className="custom-select"
                classNamePrefix="custom-select"
                noOptionsMessage={({ inputValue }) => (
                  !inputValue ? `${t('main:noOptionsError')}` : `${t('main:noValueError')}`
                )}
              />
            )}
          />

          <WelcomeNote>
            <Trans i18nKey="main:note">
              <strong>Please note:</strong> This form is for data collection only.
              It will not predict or diagnose any disease, disorder, or other health condition.
              Virufy is conducting research and will use the information you provide for research.
              The Virufy app doesn’t replace a doctor.
              Remember that it is your responsibility to seek medical advice from your doctor.
            </Trans>
          </WelcomeNote>

          <BoldBlackTextPrivacy>
            <Trans i18nKey="main:privacyPolicy">
              By proceeding you accept the terms of our <Link to="https://virufy.org/privacy_policy" target="_blank">Privacy Policy</Link>
            </Trans>
          </BoldBlackTextPrivacy>

          {
            activeStep && (
              <Portal>
                <WizardButtons
                  invert
                  leftDisabled={!isValid}
                  leftLabel={t('helpVirufy:nextButton')}
                  leftHandler={handleSubmit(onSubmit)}
                />
                <CreatedBy inline />
              </Portal>
            )
          }
        </WelcomeContent>
      </WelcomeStyledForm>
    </>
  );
};

export default memo(Step1);
