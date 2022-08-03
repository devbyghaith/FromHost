import styled from "styled-components";

export const main = styled.button`
    background-color: var(--colors-main);
    border-radius: 0.5rem;
    padding: 0.25rem 1rem;
    cursor: pointer;
    border: none;

    &:disabled {
        background-color: var(--colors-backgrounds-normal);
        cursor: not-allowed
    }
`;

export const success = styled.button`
    background-color: var(--colors-types-success);
    border-radius: 0.5rem;
    padding: 0.25rem 1rem;
    cursor: pointer;
    border: none;

    &:disabled {
        background-color: var(--colors-backgrounds-normal);
        cursor: not-allowed
    }
`;

export const danger = styled.button`
    background-color: var(--colors-types-danger);
    border-radius: 0.5rem;
    padding: 0.25rem 1rem;
    cursor: pointer;
    border: none;

    &:disabled {
        background-color: var(--colors-backgrounds-normal);
        cursor: not-allowed
    }
`;