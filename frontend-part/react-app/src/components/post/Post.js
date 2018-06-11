import React, {Component} from 'react';

import likeImg from './assets/like.svg';
import unlikeImg from './assets/unlike.svg';
import pinImg from './assets/pin.svg';

import './Post.css';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: props.image,
            isOdd: props.isOdd,
            isPortrait: false
        };
        this.onImgLoad = this.onImgLoad.bind(this);
    }

    onImgLoad({currentTarget: img}) {
        let h = img.clientHeight,
            w = img.clientWidth;
        if (w / h < 1.4) {
            this.setState({isPortrait: true});
        }
    }

    render() {
        return (
            <div className="col-lg-7 mx-auto">
                <div className="post-thumb">
                    <div className="post-name">
                        Duis aute irure dolor
                    </div>
                    <div className="row">
                        <div className="post-date col-12">
                            12 January 2013
                        </div>
                    </div>
                    <div className="post-photo-cover">
                        <img onLoad={this.onImgLoad} src={this.state.image} alt="post"
                             className={'post-photo mx-auto d-block ' + (this.state.isPortrait ? 'portrait' : '')}/>
                    </div>

                    <div className="post-footer">
                        <div className="post-location col-12 text-right">
                            <span className="post-location-pin">
                                <img src={pinImg} alt={'pin'}/>
                            </span>
                            Cicero in 45 BC
                    </div>
                        <div className="post-description">
                            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
                            sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                        </div>
                        <div className="post-like">
                            <div className="row justify-content-center">
                                <div className="post-like-heart d-flex align-items-center">
                                    <img src={this.state.isOdd ? likeImg : unlikeImg} alt={'heart'}/>
                                </div>
                                <div className="post-like-count d-flex align-items-center">34</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Post;
