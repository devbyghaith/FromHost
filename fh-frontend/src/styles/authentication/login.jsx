import styled from "styled-components";

export const container = styled.div`
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
`;

export const form = styled.div`
    background-color: var(--colors-backgrounds-muted);
    border: 3px solid var(--colors-main);
    box-shadow: 0px 0px 24px -8px #000000;
    border-radius: 0.5rem;
    width: max-content;
    min-width: 320px;
    padding: 1rem;
`;

export const header = styled.div`
    margin: 1rem;

    &:before {
        padding: 3rem;
        position: absolute;
        background: url("/logo192.png");
        background-size: cover;
        transform: translate(calc(-100% + 1.5rem), calc(-100% + 1.5rem)) rotate(340deg);
        border-radius: 50%;
        content: "";
    }
`;

export const splitter = styled.div`
    padding: 0.25rem;
    background-color: var(--colors-backgrounds-normal);
    margin: 1rem 1rem 2rem 1rem;
    border-radius: 0.25rem;
`;

export const title = styled.h2`
    text-align: center;
`;

export const buttons = styled.div`
    display: grid;
    margin: 0rem 0rem 3rem 0rem;
    grid-template-columns: auto;
    gap: 1rem;
`;

export const button = styled.button`
    background-color: var(--colors-backgrounds-normal);
    padding: 0.5rem 2rem;
    border-radius: 0.75rem;
    text-align: center;
    cursor: pointer;
    border: none;
    transition: 150ms ease-in-out;

    &:hover {
        background-color: var(--colors-main);
    }
`;

export const footer = styled.div`
    margin-top: 1rem;
    font-size: 0.75rem;
    font-weight: normal;
    text-align: center;
    color: var(--colors-text-muted)
`;