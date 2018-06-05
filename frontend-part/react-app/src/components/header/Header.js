import React, {Component} from 'react';

import headerImage from './images/headerImage.jpg';

import './Header.css';

class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="header-image">
                    <img src={headerImage} className="img-cover" alt="header preview"/>
                    <div className="container">
                        <div className="row">
                            <div className="header-caption text-center">
                                <div className="header-text large">Maria Album</div>
                                <div className="header-text small">Lorem ipsum dolor sit amet, fuisset argumentum proid</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
