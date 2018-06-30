import React, {Component} from 'react';
import Moment from 'moment';

import likeImg from './assets/like.svg';
import './Post.css';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: props.post
        };
    }

    static isVisible(param) {
        return {
            display: param === undefined ? 'none' : 'block'
        }
    }

    render() {
        const {post} = this.props;

        return (
            <div className="col-lg-7 mx-auto">
                <div className="post-thumb">
                    <div className="row post-header">
                        <div className="post-name col-12" style={Post.isVisible(post.title)}>
                            {post.title}
                        </div>
                        <div className="post-date col-12">
                            {Moment.unix(post.date).format('D MMMM YYYY | HH:mm')}
                        </div>
                    </div>
                    <img src={post.image} alt="post" className="img-contain post-photo mx-auto d-block"/>
                    <div className="post-footer">
                        {/*<div className="post-location col-12 text-right">*/}
                        {/*<span className="post-location-pin">*/}
                        {/*<img src={pinImg} alt={'pin'}/>*/}
                        {/*</span>*/}
                        {/*Cicero in 45 BC*/}
                        <div className="post-description" style={Post.isVisible(post.description)}>
                            {post.description}
                        </div>
                        <div className="post-like">
                            <div className="row justify-content-center">
                                <div className="post-like-heart d-flex align-items-center">
                                    <img src={likeImg} alt={'heart'}/>
                                </div>
                                <div className="post-like-count d-flex align-items-center">
                                    {post.likes}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Post;
