import React, {Component} from 'react';

import youtubeIcon from './images/youtube.svg';
import instagramIcon from './images/instagram.svg';
import vkIcon from './images/vk.svg';

import './Footer.css';

class Footer extends Component {
    render() {
        return (
            <div className="footer d-flex align-items-center">
                <div className="container">
                    <div className="row">
                        <div className="offset-lg-1 col-lg-10">
                            <div className="row d-flex align-items-center">
                                <div className="offset-lg-1 col-lg-4 col-md-5 col-sm-5 col-5
                                                d-inline-block align-middle">
                                    Subscribe me everywhere
                                </div>

                                <div className="offset-lg-3 offset-md-3 offset-sm-3 offset-1
                                                col-lg-3 col-md-4 col-sm-4 col-6 text-right">
                                    <div className="d-flex justify-content-end">
                                        <div className="social-icon d-inline-block">
                                            <img src={youtubeIcon}/>
                                        </div>
                                        <div className="social-icon d-inline-block">
                                            <img src={instagramIcon}/>
                                        </div>
                                        <div className="social-icon d-inline-block">
                                            <img src={vkIcon}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;
