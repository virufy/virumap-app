import styled from 'styled-components';

export const WizardContainer = styled.div`
  display: flex;
  flex-direction:column;

  height:100%;
`;

export const StepContainer = styled.div`
  height: 100%;

  &.overflowVisible {
    > div {
      overflow: visible;
    }
  }
`;

export const WizardNavControlPortal = styled.div`
  margin-bottom: 24px;

  .text-center {
    text-align: center;
    margin-bottom: 20px;
  }
`;
