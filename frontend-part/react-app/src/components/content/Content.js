import React, {Component} from 'react';

import img1 from './images/1.jpg';
import img2 from './images/2.jpg';
import img3 from './images/3.jpg';
import img4 from './images/4.jpg';
import img5 from './images/5.jpg';
import img6 from './images/6.jpg';
import img7 from './images/7.jpg';
import img8 from './images/8.jpg';
import Album from "../album/Album";
import Post from "../post/Post";

let imgPathArray = [img1, img2, img3, img4, img5, img6, img7, img8];
let isAlbum = true;

class Content extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    {
                        imgPathArray.map((img, i) => {
                            return isAlbum ?
                                <Post key={'post' + i} image={img} isOdd={i % 2}/> :
                                <Album key={'album' + i} image={img} isOdd={i % 2}/>;
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Content;
