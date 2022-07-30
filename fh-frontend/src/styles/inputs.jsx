import styled from "styled-components";

export const text = styled.input`
    background-color: var(--colors-backgrounds-normal);
    border: 1px solid var(--colors-backgrounds-normal);
    border-radius: 0.5rem;
    padding: 0.25rem;
    width: 100%;

    &:focus {
        border: 1px solid var(--colors-main);
        box-shadow: 0px 0px 4px 0px var(--colors-main);
        outline: none;
    }
`;