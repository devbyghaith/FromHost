import styled from "styled-components";

export const page = styled.div`
    display: flex;
`;

export const content = styled.div`
    width: 100%;
    // display: grid;
    // grid-template-columns: 100%;
    // gap: 1rem;
`;

export const dashboard = styled.div`
    padding: 1rem;
    width: 100%;
    display: grid;
    grid-template-columns: 100%;
    overflow: auto;
`;

export const contentSection = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    margin: 1rem;
    gap: 1rem;
`;

export const footer = styled.div`
    padding: 0.5rem;
    font-size: 14px;
    color: var(--colors-text-muted);
    background-color: var(--colors-backgrounds-dark);
    border-radius: 0.5rem;
    margin-top: auto;
    font-weight: normal;
`;