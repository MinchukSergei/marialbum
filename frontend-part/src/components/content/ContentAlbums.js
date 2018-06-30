import React from 'react';

import Album from '../album/Album';
import Content from "./Content";

class ContentAlbums extends Content {
    constructor(props) {
        super(props);

        Object.assign(this.state, {
            isAlbum: false
        });
    }

    componentDidMount() {
        this.api.getAlbums();
    }

    render() {
        const {isLoading, contentItems} = this.state;

        return (
            <div className="container main-content">
                {
                    isLoading ?
                        (<div className='loading-wrapper'>
                            <div className='loading'/>
                        </div>)
                        :
                        (<div className="row">
                            {
                                (contentItems.map((contentItem, i) => {
                                    return <Album key={'album' + i} album={contentItem} isOdd={i % 2}/>;
                                }))
                            }
                        </div>)
                }
            </div>
        );
    }
}

export default ContentAlbums;
