export const consentPdf = {
  Argentina: 'https://drive.google.com/file/d/1slccHiR-vCc5mUHZgklTynejddO_IoCT/view',
  Colombia: 'https://drive.google.com/file/d/1YMtfTiFdpg9tXhdWlQF8kh8Vu4q5RL1U/view',
  Qatar: 'https://drive.google.com/file/d/1YMtfTiFdpg9tXhdWlQF8kh8Vu4q5RL1U/view',
  Japan: 'https://drive.google.com/file/d/11RTMmnHW4SqHNf7htr3xuSi-o2v2vWlp/view',
  'United States': 'https://drive.google.com/file/d/166Fu8RKluJdkRaxPDfWPyCpM7BUIzmnE/view',
  Singapore: 'https://drive.google.com/file/d/1hnxvDJ5qHBnUi7cnkNdyD4PuWMz8Ntss/view',
  Kuwait: 'https://drive.google.com/file/d/1hnxvDJ5qHBnUi7cnkNdyD4PuWMz8Ntss/view',
  'Saudi arabia': 'https://drive.google.com/file/d/1hnxvDJ5qHBnUi7cnkNdyD4PuWMz8Ntss/view',
  'United arab emirates': 'https://drive.google.com/file/d/1hnxvDJ5qHBnUi7cnkNdyD4PuWMz8Ntss/view',
  Global: 'https://drive.google.com/file/d/1hnxvDJ5qHBnUi7cnkNdyD4PuWMz8Ntss/view',
};

declare global {
  type ConsentPDFCountry = keyof typeof consentPdf;
}
