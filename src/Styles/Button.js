import styled from "styled-components";

export const Button =styled.button`
  margin-top: 4px;
  background-color: var(--color-green-2);
  border: none;
  padding: 12px;
  color: white;
  font-size: 20px;
  letter-spacing: 1.1px;
  cursor: pointer;
  transition: 0.3s ease;

  &:disabled {
    background-color: var(--color-grey-4);
    cursor: not-allowed;

    &:hover {
      background-color: var(--color-grey-4);
    }
  }

  &:hover {
    background-color: var(--color-green-4);
  }
`
