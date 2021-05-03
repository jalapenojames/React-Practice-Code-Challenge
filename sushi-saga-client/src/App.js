import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3001/sushis"

class App extends Component {

  state = {
    sushis: [],
    panel: 0,
    budget: 100
  }

  handleMoreButtonClick = () => {
    const newPanel = this.state.panel+4
    this.setState({
      panel: newPanel
    })
  }

  handleSushiClick = (event, id) => {
    const budget = this.state.budget
    const sushiPrice = this.state.sushis[id-1].price
    const remainingBudget = budget - sushiPrice

    // Deduct price of sushi from budget
    // only if there's enough budget remaining
    if(budget >= sushiPrice) {

      // Make 'eaten' = true for sushi we clicked
      this.setState(state => {
        state.sushis[id-1].eaten = true
        return state
      })

      // Change budget
      this.setState(state => {
        state.budget = remainingBudget
        return state
      })
    }
  }

  componentDidMount() {

    fetch(API)
      .then(res => res.json())
      .then(data => {
        // Add eaten into data
        const makeEaten = data.map(sushi => ({...sushi, eaten: false}))

        // Combine with state
        this.setState({sushis: makeEaten})
      })
  }

  render() {
    return (
      <div className="app">
        <SushiContainer
          sushis={this.state.sushis} 
          panel={this.state.panel}
          buttonClick={this.handleMoreButtonClick}
          sushiClick={this.handleSushiClick}/>
        <Table budget={this.state.budget}/>
      </div>
    );
  }
}

export default App;