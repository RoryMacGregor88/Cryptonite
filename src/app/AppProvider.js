import React, { Component } from 'react';

const cc = require('cryptocompare');

export const AppContext = React.createContext();

export class AppProvider extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            page: 'dashboard',
            ...this.savedSettings(),
            setPage: this.setPage,
            confirmFavourites: this.confirmFavourites
         }
    }

componentDidMount() {
    this.fetchCoins();
}

fetchCoins = async () => {
    let coinList = (await cc.coinList().Data);
    this.setState({coinList});
}

confirmFavourites = () => {
    this.setState({
        firstVisit: false,
        page: 'dashboard'
    })
    localStorage.setItem('cryptonite', JSON.stringify({
        test: 'hello there'
    }))
}

savedSettings() {
    let cryptoniteData = JSON.parse(localStorage.getItem('cryptonite'))
    if(!cryptoniteData) {
        return {
                page: 'settings', 
                firstVisit: true
                }
    }
    return {}
}

setPage = (page) => { this.setState({page}) }

render() { 
    return ( 
        <AppContext.Provider value={this.state}>
            {this.props.children}
        </AppContext.Provider>
        );
}
}