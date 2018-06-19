import React, {Component} from 'react';

import Header from './components/header/Header';
import Content from './components/content/Content';
import Footer from './components/footer/Footer';
import ApiService from './components/api/APIService';

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mainGroupInfo: {
                isLoading: true
            },
            contentData: {
                isLoading: true
            }
        };
        this.api = new ApiService(this);
    }

    componentDidMount() {
        this.api.load();
    }

    render() {
        return (
            <div>
                <Header mainGroupInfo={this.state.mainGroupInfo}/>
                <Content contentData={this.state.contentData}/>
                <Footer/>
            </div>
        );
    }
}

export default App;
