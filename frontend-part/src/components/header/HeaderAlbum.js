import Header from "./Header";

import './Header.css';

class HeaderAlbum extends Header {
    constructor(props) {
        super(props);

        Object.assign(this.state, {
            isAlbum: true
        });
    }

    componentDidMount() {
        this.api.getAlbumHeaderInfo(this.props.match.params.albumId);
    }
}

export default HeaderAlbum;
