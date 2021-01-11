import styled from 'styled-components'

export const Top = styled.div`
    background: #8d9db6;
    padding: 10px;
    min-height: 30px;
    border-bottom: 2px solid white;

    display: flex;
    justify-content: flex-end;
`//#bc5a45

export const Navigation = styled.div`
    background: #b7d7e8;
    padding: 20px;
    border-bottom: 2px solid white;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;

`
export const Page = styled.div`
    background: #F7F7F7;
    padding: 10px;
    text-align: center;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
export const StyledBlog = styled.div`
    padding: 10px;
    border: 2px solid #bc5a45;
    background: white;
    width: 250px;
    height: 100px;
    border-radius: 15px;

    margin: 10px;

`
export const StyledTask = styled.div`
    padding: 10px;
    border: 2px solid #b7d7e8;
    background: white;
    width: 250px;
    height: 100px;
    border-radius: 15px;
`