import styled from 'styled-components'

export const Margin = styled.div`
    background: #8d9db6;
    height: 40px;
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
    border: 2px solid lightgrey;
    background: white;
    
    max-width: 300px;
    height: 100px;
    border-radius: 5px;
    padding: 30px;

    margin: 10px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    white-space: nowrap;    
    text-overflow: ellipsis;
    overflow: hidden;

`
//#618685 vihreä
export const StyledTask = styled.div`
    border: 2px solid  lightgrey;
    background: white;
    width: 300px;
    height: 300px;
    border-radius: 5px;
    margin: 10px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    white-space: nowrap;    
    text-overflow: ellipsis;
    overflow: hidden;

`
export const StyledTextContainer = styled.div`
    padding: 40px;
    margin: 10px;
    border: 2px solid  #618685;
    background: white;
    border-radius: 15px;
`
export const ErrorMessage = styled.div`
    color: #bc5a45;
    font: 15px Verdana, sans-serif;
    background: #F7F7F7;
    height: 30px;
    border-bottom: 2px solid white;
    padding: 5px;

    display: flex;
    justify-content: center;
    align-items: center;
    
`
export const NotificationMessage = styled.div`
    color: #618685;
    font: 15px Verdana, sans-serif;
    background: #F7F7F7;
    height: 30px;
    border-bottom: 2px solid white;
    padding: 5px;

    display: flex;
    justify-content: center;
    align-items: center;
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
    justify-content: center;
    
`

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    
`
export const Column = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`

export const Borderline = styled.div`
    background: #bc5a45;
    width: 30px;
`


