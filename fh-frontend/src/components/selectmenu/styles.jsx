import styled from "styled-components";

export const bar = styled.div`
    padding: 0.25rem;
    background-color: var(--colors-backgrounds-normal);
    border-radius: 0.5rem;
    color: var(--colors-text-muted);
    font-weight: normal;
    font-size: 14px;
`;

export const choices = styled.div`
    display: grid;
    background-color: var(--colors-backgrounds-muted);
    border-radius: 0.5rem;
    max-height: 200px;
    padding: 0.5rem;
    overflow: auto;
    gap: 0.5rem;

    &::-webkit-scrollbar {
        width: 0.4rem;
    }

    &::-webkit-scrollbar-track {
        background: var(--colors-backgrounds-normal);
        border-radius: 0.5rem;
    }

    &::-webkit-scrollbar-thumb {
        background: var(--colors-main);
        border-radius: 0.5rem;
    }
`;

export const choice = styled.div`
    display: grid;
    background-color: var(--colors-backgrounds-normal);
    border-radius: 0.5rem;
    padding: 0.25rem 0.5rem;
    font-weight: normal;
    font-size: 14px;
    gap: 1rem;
`;