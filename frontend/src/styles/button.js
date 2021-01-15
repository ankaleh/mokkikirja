import styled from 'styled-components'

export const Button = styled.button.attrs(props => ({

    background: props.background
}))`
    background: ${props => props.background};
    font: 1em Verdana, sans-serif;
    color: white;
    padding: 10px;
    border: 2px solid white;
    border-radius: 5px;
    margin: 5px;
`
//background: #bc5a45;