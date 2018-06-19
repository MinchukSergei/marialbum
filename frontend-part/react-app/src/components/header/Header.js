import React, {Component} from 'react';

import './Header.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mainGroupInfo: props.mainGroupInfo
        };
    }

    render() {
        const {isLoading, headerPhoto, name, description} = this.props.mainGroupInfo;
        const headerImageStyle = {
            backgroundImage: 'url(' + headerPhoto + ')',
            backgroundSize: 'cover',
            backgroundPosition: 'center center'
        };

        return (
            <div className="header">
                {
                    isLoading ?
                        (<div>Loading</div>) :
                        (<div className="header-image">
                            <div className="img-cover" style={headerImageStyle}>
                                <div className="container h-100">
                                    <div className="row h-100 align-items-center">
                                        <div className="header-caption text-center">
                                            <div className="header-blur" style={headerImageStyle}/>
                                            <div className="header-text large">{name}</div>
                                            <div className="header-text small">{description}</div>
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
