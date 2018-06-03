import React, {Component} from 'react';

import './Album.css';

class Album extends Component {
    render() {
        return (
            <div className="offset-lg-1 col-lg-5 offset-md-1 col-md-10">
                <div className="thumb-photo crop-center-photo">
                    <div className="photo-cover">
                        <div className="photo-count d-flex align-items-center justify-content-end">
                            25 images
                        </div>
                        <img src="../images/1.jpg" alt="Responsive image"/>
                    </div>

                    <div className="thumb-info text-center">
                        <div className="thumb-info-name text-truncate">
                            Get Started with Your Forum
                        </div>
                        <div className="thumb-info-description">
                            Вот это жесть dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                        </div>
                        <div className="thumb-info-button mx-auto d-flex align-items-center justify-content-center">
                            View
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Album;
