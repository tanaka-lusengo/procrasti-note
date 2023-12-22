import styled from 'styled-components';

export const ListCard = styled.li`
  display: flex;
  justify-content: flex-start;
  gap: 2rem;

  list-style: none;
  margin: 0;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 10px;
  padding: 1rem;
  width: 100%;
  max-width: 65rem;
  background-color: ${({ theme }) => theme.colors.secondary};
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  transition: 0.3s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }

  h6 {
    font-weight: normal;
    font-style: italic;
  }
`;
