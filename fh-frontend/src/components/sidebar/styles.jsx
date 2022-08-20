import styled from "styled-components";

export const sidebar = styled.div`
    // padding: 1rem;
    background-color: var(--colors-backgrounds-muted);
    width: fit-content;
    min-width: 240px;
    height: 100vh;
`;

export const brand = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem;
`;

export const brandIcon = styled.div`
    padding: 1.5rem;
    background: url("/logo192.png");
    background-size: cover;
    border-radius: 50%;
`;

export const brandName = styled.div`
    display: flex;
    align-items: center;
`;

export const splitter = styled.div`
    padding: 0.2rem;
    background-color: var(--colors-backgrounds-normal);
    margin: 1rem;
    border-radius: 0.25rem;
`;

export const sections = styled.div`
    display: grid;
    grid-template-columns: 100%;
    gap: 1.5rem;
`;

export const section = styled.div`
    padding: 0rem 0rem 0rem 1rem;
`;

export const sectionName = styled.div`
    text-transform: uppercase;
    color: var(--colors-main);
    letter-spacing: 0.66px;
    text-align: center;
`;

export const choices = styled.div`
    display: grid;
    grid-template-columns: 100%;
    gap: 0.75rem;
`;

export const choice = styled.div`
    background-color: var(${(props) => props.isActive ? "--colors-main" : "--colors-backgrounds-normal"});
    // border-left: 3px solid var(--colors-main);
    transition: 150ms ease-in-out;
    border-radius: 1.5rem 0rem 0rem 1.5rem;
    padding: 0.75rem;
    cursor: pointer;
    font-size: 14px;

    &:hover {
        background-color: var(--colors-main);
    }
`;