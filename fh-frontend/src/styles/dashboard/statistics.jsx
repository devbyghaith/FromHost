import styled from "styled-components";

export const container = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    margin-bottom: 1rem;
    gap: 1rem;
`;

export const card = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--colors-backgrounds-dark);
    padding: 1rem;
    border-radius: 0.5rem;
`;

export const title = styled.div`
    color: var(--colors-main);
    font-size: 1.25rem;
`;

export const value = styled.div`
    color: var(--colors-main);
    font-size: 2rem;
`;

export const description = styled.div`
    color: var(--colors-text-muted);
    font-size: 14px;
`;