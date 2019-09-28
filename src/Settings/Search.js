import React from 'react';
import styled from 'styled-components';
import { backgroundColor2, fontSize2} from '../Shared/Styles';
import {AppContext} from '../App/AppProvider';
import _ from 'lodash';
import fuzzy from 'fuzzy';

const SearchGrid = styled.div`
    display: grid;
    grid-template-columns: 200px 1fr;
`

const SearchInput = styled.input`
    ${backgroundColor2}
    ${fontSize2}
    border: 1px solid;
    height: 25px;
    color: #1163c9;
    place-self: center left;
`
const handleFilter = _.debounce(
    (inputValue, coinList, setFilteredCoins) => {
        let coinSymbols = Object.keys(coinList);
        let coinNames = coinSymbols.map((sym) => coinList[sym].CoinName);
        let allStringsToSearch = coinSymbols.concat(coinNames);
        let fuzzyResults = fuzzy
            .filter(inputValue, allStringsToSearch, {})
            .map((res) => res.string);
        let filteredCoins = _.pickBy(coinList, (result, symKey) => {
            let coinName = result.CoinName;
            return(
                _.includes(fuzzyResults, symKey) || _.includes(fuzzyResults, coinName)
            )
        })
        setFilteredCoins(filteredCoins);
    }, 500

)

function filterCoins(evt, setFilteredCoins, coinList) {
    let inputValue = evt.target.value;
    if(!inputValue) {
        setFilteredCoins(null)
        return;
    }
    handleFilter(inputValue, coinList, setFilteredCoins);
}

export default function() {
    return (
        <AppContext.Consumer>
            {
                ({setFilteredCoins, coinList}) =>
                    <SearchGrid>
                        <h2>
                            Search all coins
                        </h2>
                        <SearchInput onKeyUp={(evt) => 
                                            filterCoins(evt, setFilteredCoins, coinList)
                                     }/>
                    </SearchGrid>
            }
        </AppContext.Consumer>
    )
}