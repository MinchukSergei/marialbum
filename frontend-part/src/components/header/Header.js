import React, {Component} from 'react';
import {Link} from "react-router-dom";
import ApiService from '../api/APIService';

import './Header.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headerInfo: {},
            isLoading: true
        };
        this.api = new ApiService(this);
    }

    static getHeaderImageStyle(headerPhoto) {
        return {
            backgroundImage: 'url(' + headerPhoto + ')',
            backgroundSize: 'cover',
            backgroundPosition: 'center center'
        };
    }

    render() {
        const {isLoading} = this.state;
        const {headerPhoto, name, description} = this.state.headerInfo;

        return (
            <div className="header">
                {
                    isLoading ?
                        (<div className='loading-wrapper'>
                            <div className='loading'/>
                        </div>)
                        :
                        (<div className="header-image">
                            <div className="img-cover" style={Header.getHeaderImageStyle(headerPhoto)}>
                                <div className="container h-100">
                                    <div className="row h-100 align-items-center">
                                        <div className="header-caption text-center">
                                            <Link to={'/albums'}>
                                                <div className="header-blur"
                                                     style={Header.getHeaderImageStyle(headerPhoto)}/>
                                                <div className="d-flex flex-column">
                                                    <div className="header-text large">{name}</div>
                                                    <div className="offset-lg-2 col-lg-8 header-text small">{description}</div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>)
                }
            </div>
        );
    }
}

export default Header;
