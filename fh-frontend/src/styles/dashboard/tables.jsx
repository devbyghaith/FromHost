import styled from "styled-components";

export const container = styled.div`
    background-color: var(--colors-backgrounds-muted);
    border-radius: 0.5rem;
`;

export const header = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: var(--colors-backgrounds-dark);
    border-radius: 0.5rem 0.5rem 0rem 0rem;
    // color: var(--colors-main);
    border-bottom: 1px solid var(--colors-main);
    padding: 1rem;
`;

export const content = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.5rem;
`;

export const table = styled.table`
    width: 100%;
    text-align: center;
`;

export const tableRow = styled.tr`

`;

export const tableHeader = styled.th`
    color: var(--colors-main);
`;

export const tableData = styled.td`
    color: var(--colors-text-muted);
    ${(props) => props.editAble ? (`
        cursor: pointer;
    `) : ""}
    ${(props) => props.flexRow ? (`
        display: grid;
        grid-template-columns: 60% 20% 20%;
        gap: 1rem;
    `) : ""}

    &:hover {
        color: var(--colors-text-normal)
    }
`;