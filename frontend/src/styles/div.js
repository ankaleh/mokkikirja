import styled from 'styled-components'

export const Margin = styled.div`
    background: #8d9db6;
    height: 35px;
    border-bottom: 2px solid white;

    display: flex;
    justify-content: center;
`//#bc5a45

export const Navigation = styled.div`
    background: #b7d7e8;
    padding: 10px;
    border-bottom: 2px solid white;
    height: 60px;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;

`
export const AccountInfo = styled.div`
    background: #b7d7e8;
    padding: 10px;
    border-bottom: 2px solid white;
    height: 60px;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;

`
export const Page = styled.div.attrs(props => ({
    flexDirection: props.flexDirection,
    justifyContent: props.justifyContent,
    alignItems: props.alignItmes
}))`
    background: #F7F7F7;
    padding: 50px;
    
    display: flex;
    flex-direction:  ${props => props.flexDirection};
    justify-content: ${props => props.justifyContent};
    align-items: ${props => props.alignItems};
`
export const StyledPost = styled.div`
    padding: 10px;
    border: 2px solid #bc5a45;
    background: white;
    width: 250px;
    height: 100px;
    border-radius: 15px;

    margin: 10px;

    display: flex;
    flex-direction: column;
    align-items: center;

`
export const StyledTask = styled.div`
    padding: 10px;
    border: 2px solid  #618685;
    background: white;
    width: 250px;
    height: 100px;
    border-radius: 15px;
`
export const StyledTextContainer = styled.div`
    padding: 40px;
    margin: 10px;
    border: 2px solid  #bc5a45;
    background: white;
    border-radius: 15px;
`
export const ErrorMessage = styled.div`
    color: red;
    background: lightgrey;
    height: 35px;
    border-bottom: 2px solid white;
    padding: 10px;

    display: flex;
    justify-content: center;
    
`
export const NotificationMessage = styled.div`
    color: green;
    background: lightgrey;
    height: 35px;
    border-bottom: 2px solid white;
    padding: 10px;

    display: flex;
    justify-content: center;
`
export const Info = styled.div`
    padding: 20px;
    border: 2px solid #bc5a45;
    background: white;
    width: 300px;
    height: 100px;
    border-radius: 5px;
    
    display: flex;
    flex-direction: column;
    
    text-align: center;
`
export const Space = styled.div`
    height: 50px;
`
export const Row = styled.div`
    display: flex;
    flex-direction: row;
    
`
export const Column = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
`

