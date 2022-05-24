import React from 'react';
import './App.css';

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
