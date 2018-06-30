import Header from "./Header";

import './Header.css';

class HeaderGroup extends Header {
    constructor(props) {
        super(props);

        Object.assign(this.state, {
            isAlbum: false
        });
    }

    componentDidMount() {
        this.api.getGroupHeaderInfo();
    }
}

export default HeaderGroup;
