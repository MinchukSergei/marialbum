import React, {Component} from 'react';

import Album from "../album/Album";
import Post from "../post/Post";

let isAlbum = true;

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentData: props.contentData
        }
    }

    render() {
        const {isLoading, contentItems} = this.props.contentData;

        return (
            <div className="container">
                <div className="row">
                    {
                        isLoading ?
                            (<div>Loading</div>) :
                            (contentItems.map((contentItem, i) => {
                                return isAlbum ?
                                    <Post key={'post' + i} post={contentItem}/> :
                                    <Album key={'album' + i} album={contentItem} isOdd={i % 2}/>;
                            }))
                    }
                </div>
            </div>
        );
    }
}

export default Content;
