import React, { Component } from 'react';
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuider'

class App extends Component {
  render(){
      return (
        <div className="App">
          <Layout>
           
            <BurgerBuilder />
          </Layout>
        </div>
      );
  }
}

export default App;
