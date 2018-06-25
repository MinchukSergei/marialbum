import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import HeaderAlbum from './components/header/HeaderAlbum';
import HeaderGroup from './components/header/HeaderGroup';
import Footer from './components/footer/Footer';

import ContentAlbums from "./components/content/ContentAlbums";
import ContentPosts from "./components/content/ContentPosts";

import './App.css';


class App extends Component {
    render() {
        return (
            <div className="main-wrapper">
                <Switch>
                    <Route exact path='/(albums)*'
                           render={(props) => <HeaderGroup {...props}/>}/>
                    <Route path='/album/:albumId'
                           render={(props) => <HeaderAlbum {...props}/>}/>
                    <Redirect exact to="/albums"/>
                </Switch>
                <Switch>
                    <Route exact path='/(albums)*'
                           render={(props) => <ContentAlbums {...props}/>}/>
                    <Route path='/album/:albumId'
                           render={(props) => <ContentPosts {...props}/>}/>
                </Switch>
                <Footer/>
            </div>
        );
    }
}

export default App;
