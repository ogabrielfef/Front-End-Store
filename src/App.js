import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './Component/Header';
import Cart from './Component/Cart';

class App extends React.Component {
  state = {
    ready: false,
  }

  searchItems = () => {
    this.setState({ ready: true });
  }

  render() {
    const { ready } = this.state;
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ App } />
            <Route path="/cart" component={ Cart } />
          </Switch>
        </BrowserRouter>
        <Header />
        <input type="text" />
        <button type="button" onClick={ this.searchItems }>Pesquisar</button>
        { !ready && (
          <p
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>) }
      </div>
    );
  }
}

export default App;
