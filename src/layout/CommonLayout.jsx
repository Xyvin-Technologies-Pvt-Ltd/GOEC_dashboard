import React from 'react'
import styled from 'styled-components';
import StyledDivider from '../ui/styledDivider'; 
import { ReactComponent as CloseCircle } from '../assets/icons/close-circle.svg';

const StyledLayout = styled.div`
width: 100%;
// height: 609px;
border-radius: var(--borderRadius, 4px);
background: #27292F;
position:relative;
border-bottom-left-radius: var(--borderRadius, 0px);
border-bottom-right-radius: var(--borderRadius, 0px);

`;

const StyledLayout2 = styled.div`
display: flex;
width: 100%;
flex-direction: column;
align-items: center;
//gap: 32px;
flex-shrink: 0;
border-radius: 8px;
background: #27292F;
`;
const HeaderContainer = styled.div`
padding: 15px 32px 15px 32px;
display: flex;
justify-content: space-between;
align-items: center;
align-self: stretch;
color: #B5B8C5;
font-feature-settings: 'clig' off, 'liga' off;
font-family: Inter;
font-size: 18px;
font-style: normal;
font-weight: 700;
line-height: 32px; /* 177.778% */
`;
const MiddleContainer = styled.div`
display: flex;
width: 100%;
padding: 15px 32px 24px 32px;
flex-direction: column;
gap: 22px;
flex-shrink: 0;
border-radius: 8px;
background: #27292F;
`;
const FooterContainer = styled.div`
display: inline-flex;
padding: 20px 25.506px 20px 467.494px;
justify-content: flex-end;
align-items: center;
background: #1C1D22;
width:100%;
bottom: 0;
border-bottom-left-radius: var(--borderRadius, 4px);
border-bottom-right-radius: var(--borderRadius, 4px);
`;


const CommonLayout = ({ header, children,onClick }) => {
     
    return (
      <>
       <StyledLayout  >
            <StyledLayout2>
                {header && 
                <>
                    <HeaderContainer>{header}<CloseCircle onClick={onClick} style={{cursor:'pointer'}}/></HeaderContainer>
                    <StyledDivider/>
                </>
                }
                <MiddleContainer> {children}</MiddleContainer>
               
            </StyledLayout2>
            {/* {button &&
             <>
                <FooterContainer>
                    <StyledButton variant='secondary' width='103' mr='20'>Cancel</StyledButton>
                    <StyledButton variant='primary' width='160'>{button}</StyledButton>
                </FooterContainer>
            </>
            } */}
        </StyledLayout>
        
        
        </>
    );
};


export default CommonLayout
