import React, {Component} from 'react';

// import img1 from './images/1.jpg';
// import img2 from './images/2.jpg';
// import img3 from './images/3.jpg';
// import img4 from './images/4.jpg';
// import img5 from './images/5.jpg';
// import img6 from './images/6.jpg';
// import img7 from './images/7.jpg';
// import img8 from './images/8.jpg';
import Album from "../album/Album";
import Post from "../post/Post";

// let imgPathArray = [img1, img2, img3, img4, img5, img6, img7, img8];
let isAlbum = false;

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentData: props.contentData
        }
    }

    render() {
        const {isLoading, albums} = this.props.contentData;

        return (
            <div className="container">
                <div className="row">
                    {
                        isLoading ?
                            (<div>Loading</div>) :
                            (
                                albums.map((album, i) => {
                                    return isAlbum ?
                                        <Post key={'post' + i} image={album} isOdd={i % 2}/> :
                                        <Album key={'album' + i} album={album} isOdd={i % 2}/>;
                                })
                            )
                    }
                </div>
            </div>
        );
    }
}

export default Content;
