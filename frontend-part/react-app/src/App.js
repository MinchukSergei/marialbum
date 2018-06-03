import React, {Component} from 'react';

import Header from "./components/header/Header";
import Content from "./components/content/Content";
import Footer from './components/footer/Footer';

import './App.css';

class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Content/>
                <Footer/>
            </div>
        );
    }
}

export default App;
