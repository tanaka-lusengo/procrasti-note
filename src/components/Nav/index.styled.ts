import styled from 'styled-components';

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  padding: 2rem 0;

  h1 {
    margin: 0 2rem 2rem 0;
    font-family: ${({ theme }) => theme.typography.fontFamily.ultra};
    font-size: ${({ theme }) => theme.typography.fontSize.h4}rem;
  }

  ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  div {
    display: flex;
    align-items: center;
  }

  li {
    margin: 0 1rem;
    list-style: none;
  }

  a {
    font-weight: bold;
    transition: 0.3s ease-in-out;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  button {
    background-color: ${({ theme }) => theme.colors.tertiaryDark};
  }

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    flex-direction: row;

    h1 {
      width: 35rem;
      margin-bottom: 0;
    }
  }
`;
