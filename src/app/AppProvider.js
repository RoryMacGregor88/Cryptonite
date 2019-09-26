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
            setPage: this.setPage,
            addCoin: this.addCoin,
            removeCoin: this.removeCoin,
            isInFavourites: this.isInFavourites,
            confirmFavourites: this.confirmFavourites
         }
    }

componentDidMount() {
    this.fetchCoins();
}

fetchCoins = async () => {
    let coinList = (await cc.coinList());
    this.setState({coinList: coinList.Data});
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
    })
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

render() { 
    return ( 
        <AppContext.Provider value={this.state}>
            {this.props.children}
        </AppContext.Provider>
    );
}

}