import styled from 'styled-components'

export const Input = styled.input.attrs(props => ({

    border: props.border
}))`
    background: white;
    font: 1em Helvetica, sans-serif;
    padding: 10px;
    border: ${props => props.border};
    border-radius: 5px;
    margin-top: 10px;
`
//border: 2px solid #bc5a45;

export const Text = styled.input.attrs(props => ({
    border: props.border
}))`
    background: white;
    font: 1em Helvetica, sans-serif;
    padding: 10px;
    border: ${props => props.border};
    border-radius: 5px;
    width: 500px;
    height: 300px;
    margin-top: 10px;
`
