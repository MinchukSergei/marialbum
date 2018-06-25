import React, {Component} from 'react';

import youtubeIcon from './assets/youtube.svg';
import instagramIcon from './assets/instagram.svg';
import vkIcon from './assets/vk.svg';

import './Footer.css';

class Footer extends Component {
    render() {
        return (
            <div className="footer d-flex align-items-center">
                <div className="container">
                    <div className="row">
                        <div className="offset-lg-3 col-lg-6">
                            <div className="d-flex justify-content-around">
                                <div className="d-flex align-items-center">
                                    Follow me in socials
                                </div>
                                <div className="socials">
                                    <div className="social-icon">
                                        <a href="https://www.youtube.com"
                                           rel="noopener noreferrer"
                                           target="_blank">
                                            <img src={youtubeIcon} alt="youtube icon"/>
                                        </a>
                                    </div>
                                    <div className="social-icon">
                                        <a href="https://www.instagram.com/maria_schneerson/"
                                           rel="noopener noreferrer"
                                           target="_blank">
                                            <img src={instagramIcon} alt="instagram icon"/>
                                        </a>
                                    </div>
                                    <div className="social-icon">
                                        <a href="https://vk.com/schneerson"
                                           rel="noopener noreferrer"
                                           target="_blank">
                                            <img src={vkIcon} alt="vk icon"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright d-flex justify-content-center">
                    <span className="footer-source">
                        © 2018 Maria Album
                    </span>
                    <a href="https://github.com/MinchukSergei/marialbum"
                       rel="noopener noreferrer"
                       target="_blank">
                        <span className="fab fa-github"/>
                    </a>
                </div>
            </div>
        );
    }
}

export default Footer;
