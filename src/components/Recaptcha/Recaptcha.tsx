import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTranslation } from 'react-i18next';

// Sentry
import * as Sentry from '@sentry/react';

// Style
import { RecaptchaContainer } from './style';

const recaptchaKey = process.env.REACT_APP_RECAPTCHA_KEY || '';

interface RecaptchaProps {
  onChange(token: string | null): void;
  setRecaptchaAvailable(state: boolean): void;
}

const Recaptcha = ({ onChange, setRecaptchaAvailable }: RecaptchaProps) => {
  const { i18n } = useTranslation();
  const [loadingRecaptcha, setLoadingRecaptcha] = React.useState(true);

  const mObserver = React.useCallback(r => {
    if (r && r.captcha) {
      // Select the node that will be observed for mutations
      const targetNode = r.captcha;

      // Options for the observer (which mutations to observe)
      const config = { childList: true, subtree: true };

      // Callback function to execute when mutations are observed
      const callback = (mutationList: any, observer: MutationObserver) => {
        // eslint-disable-next-line no-restricted-syntax
        for (const mutation of mutationList) {
          if (mutation.type === 'childList') {
            if (targetNode.childNodes[0].children.length > 1) {
              setLoadingRecaptcha(false);
              observer.disconnect();
            }
          }
        }
      };

      // Create an observer instance linked to the callback function
      const observer = new MutationObserver(callback);

      // Start observing the target node for configured mutations
      observer.observe(targetNode, config);
    }
  }, []);

  if (!recaptchaKey) return null;

  return (
    <RecaptchaContainer>
      {
        loadingRecaptcha && (
          <div className="text-center">Cargando, por favor espere...</div>
        )
      }
      <ReCAPTCHA
        ref={mObserver}
        sitekey={process.env.REACT_APP_RECAPTCHA_KEY || ''}
        onChange={onChange}
        onErrored={() => { setRecaptchaAvailable(false); Sentry.captureException('Error on ReCAPTCHA'); }}
        hl={i18n.language}
        size="compact"
      />
    </RecaptchaContainer>
  );
};

export default Recaptcha;
