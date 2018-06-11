import React, {Component} from 'react';

import './Album.css';

class Album extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: props.image,
            isOdd: props.isOdd
        }
    }

    render() {
        return (
            <div className={'offset-lg-' + (this.state.isOdd ? "0" : "1") + ' col-lg-5 offset-md-1 col-md-10'}>
                <div className="album-thumb">
                    <div className="album-photo-cover">
                        <div className="album-image-overlay"/>
                        <div className="album-photo-count d-flex
                                        align-items-center justify-content-end">
                            25 images
                        </div>
                        <img src={this.state.image} className="img-cover" alt="album preview"/>
                    </div>

                    <div className="album-info text-center">
                        <div className="album-info-name">
                            Get Started with Your Forum
                        </div>
                        <div className="album-info-description">
                            Вот это жесть dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                        </div>
                        <div className="album-info-button mx-auto d-flex
                                        align-items-center justify-content-center">
                            View
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Album;
