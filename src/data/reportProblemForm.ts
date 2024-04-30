export const reportProblemForm = {
  es: 'https://docs.google.com/forms/d/1svBSWjeLzFKpOuuau5RrdSO3jCiT-SCi-I02DxkNoEw/viewform',
};

declare global {
  type ReportProblemLanguage = keyof typeof reportProblemForm;
}
