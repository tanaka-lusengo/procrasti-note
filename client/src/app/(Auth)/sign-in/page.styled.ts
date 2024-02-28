import styled from 'styled-components';

export const Title = styled.h2`
  margin: 1rem 0 2rem;
  text-align: center;
`;

export const UpperButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    transition: 0.3s ease-in-out;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const Text = styled.p`
  margin: 3rem 0;
  text-align: center;
`;

export const SocialContainer = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
`;

export const LowerButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;

  a {
    font-size: ${({ theme }) => theme.typography.fontSize.h5}rem;
    font-weight: bold;
    transition: 0.3s ease-in-out;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;
