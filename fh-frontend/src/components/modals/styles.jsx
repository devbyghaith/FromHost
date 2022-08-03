import styled from "styled-components";

export const backdrop = styled.div`
    display: flex;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.6);
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
`;

export const container = styled.div`
    display: grid;
    padding: 1rem;
    z-index: 1000;
    background-color: var(--colors-backgrounds-dark);
    border-radius: 0.5rem;
    min-width: 350px;
    gap: 1rem;
`;

export const title = styled.div`
    font-size: 1.25rem;
`;