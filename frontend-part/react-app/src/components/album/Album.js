import React, {Component} from 'react';

import './Album.css';

class Album extends Component {
    constructor(props) {
        super(props);
        this.state = {
            album: props.album,
            isOdd: props.isOdd
        }
    }

    render() {
        const {isOdd, album} = this.props;

        return (
            <div className={'offset-lg-' + (isOdd ? "0" : "1") + ' col-lg-5 offset-md-1 col-md-10'}>
                <div className="album-thumb">
                    <div className="album-photo-cover">
                        <div className="album-image-overlay"/>
                        <div className="album-photo-count d-flex
                                        align-items-center justify-content-end">
                            {album.size} images
                        </div>
                        <img src={album.thumb} className="img-cover" alt="album preview"/>
                    </div>

                    <div className="album-info text-center">
                        <div className="album-info-name">
                            {album.title}
                        </div>
                        <div className="album-info-description">
                            {album.description}
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
