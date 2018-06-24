import React from 'react';

import Post from '../post/Post';
import Content from "./Content";

class ContentPosts extends Content {
    constructor(props) {
        super(props);

        Object.assign(this.state, {
            isAlbum: true
        });
    }

    componentDidMount() {
        this.api.getPosts(this.props.match.params.albumId);
    }

    render() {
        const {isLoading, contentItems} = this.state;

        return (
            <div className="container content">
                <div className="row">
                    {
                        true ?
                            (
                                <div className='loading-wrapper'>
                                    <div className='loading'/>
                                </div>
                            ) :
                            (
                                contentItems.map(
                                    (contentItem, i) => {
                                        return <Post key={'album' + i} post={contentItem}/>;
                                    }
                                )
                            )
                    }
                </div>
            </div>
        );
    }
}

export default ContentPosts;
