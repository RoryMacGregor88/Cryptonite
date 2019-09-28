import React from 'react';
import {AppContext} from '../App/AppProvider';
import styled from 'styled-components';
import CoinTile from './CoinTile';

export const CoinGridStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    grid-gap: 15px;
    margin-top: 40px;
`

function getCoinsToDisplay(coinList, topSection, favourites, filteredCoins) {
    return topSection ? favourites : getLowerSectionCoins(coinList, filteredCoins);
}

function getLowerSectionCoins(coinList, filteredCoins) {
    return (
        (filteredCoins && Object.keys(filteredCoins)) ||
        Object.keys(coinList).slice(0, 100)
    )
}

export default function ({topSection}) {
    return (
        <AppContext.Consumer>
            {
                ({coinList, favourites, filteredCoins}) =>
                    <CoinGridStyled>
                        {   
                            getCoinsToDisplay(coinList,topSection, favourites, filteredCoins)
                            .map((coinKey) => {
                                return (
                                    <CoinTile 
                                        key={coinKey}
                                        coinKey={coinKey} 
                                        topSection={topSection}
                                    />
                                )
                            })
                        }
                    </CoinGridStyled>
            }
        </AppContext.Consumer>
    )
}