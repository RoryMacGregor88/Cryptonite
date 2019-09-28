import React, { Component } from 'react';
import _ from 'lodash';

const cc = require('cryptocompare');
const maxFavourites = 10;

export const AppContext = React.createContext();

export class AppProvider extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            page: 'Settings',
            favourites: [
                'BTC', 
                'ETH', 
                'XMR', 
                'DOGE'
            ],
            ...this.savedSettings(),
            addCoin: this.addCoin,
            setPage: this.setPage,
            removeCoin: this.removeCoin,
            isInFavourites: this.isInFavourites,
            setFilteredCoins: this.setFilteredCoins,
            confirmFavourites: this.confirmFavourites
         }
    }

componentDidMount() {
    this.fetchCoins();
    this.fetchPrices();
}

fetchCoins = async () => {
    let coinList = (await cc.coinList());
    this.setState({coinList: coinList.Data});
}

fetchPrices = async () => {
    if(this.state.firstVisit) {
        return;
    }
    let prices = await this.prices();
    this.setState({
        prices
    })
}

prices = async () => {
    let returnData = [];
    const favourites = this.state.favourites;

    for (let i = 0; i < favourites.length; i++) {
        try {
            let priceData = await cc.priceFull(favourites[i], 'GBP');
            returnData.push(priceData);
        } catch(err) {
            console.warn("Fetch price error", err)
        }
    }
    return returnData;
}

addCoin = (key) => {
    let favourites = [...this.state.favourites];
    if(favourites.length < maxFavourites) {
        favourites.push(key);
        this.setState({
            favourites
        })
    }
}

removeCoin = (key) => {
    let favourites = [...this.state.favourites];
    this.setState({
        favourites: _.pull(favourites, key)
    })
}

isInFavourites = (key) => {
   return  _.includes(this.state.favourites, key);
}

confirmFavourites = () => {
    this.setState({
        firstVisit: false,
        page: 'Dashboard'
    },
        () => {this.fetchPrices()}
    )

    localStorage.setItem('cryptonite', JSON.stringify({
        favourites: this.state.favourites
    }))
}

savedSettings() {
    let cryptoniteData = JSON.parse(localStorage.getItem('cryptonite'))
    if(!cryptoniteData) {
        return {
                page: 'Settings', 
                firstVisit: true
               }
    }
    let {favourites} = cryptoniteData;
    return {
        favourites
    }
}

setPage = (page) => { 
    this.setState({page}) 
}

setFilteredCoins = (filteredCoins) => {
    this.setState({
        filteredCoins
    })
}

render() { 
    return ( 
        <AppContext.Provider value={this.state}>
            {this.props.children}
        </AppContext.Provider>
    );
}

}