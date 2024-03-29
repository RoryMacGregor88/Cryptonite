import React from 'react';
import styled, {css} from 'styled-components';
import {AppContext} from './AppProvider';

const Bar = styled.div`
    display: grid;
    grid-template-columns: 180px auto 100px 100px;
    margin-bottom: 40px;
`

const Logo = styled.div`
    font-size: 1.5em;
`

const ControlButtonElem = styled.div`
    cursor: pointer;
    ${props => props.active && css`
        text-shadow: 0px 0px 60px #03ff03
    `}
`

function ControlButton({name, active}) {
    return (
        <AppContext.Consumer>
            { ({page, setPage}) => (
                <ControlButtonElem 
                    active={page === name}
                    onClick={() => setPage(name)}
                >
                    {name}
                </ControlButtonElem>
                )
            } 
        </AppContext.Consumer>
    )
}

export default function() {
    return( 
    <Bar> 
        <Logo> CRYPTONITE </Logo>
        <div/>
        <ControlButton active name="Dashboard"/>
        <ControlButton name="Settings"/>
    </Bar> 
    )
}