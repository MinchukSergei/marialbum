import {Component} from 'react';

import ApiService from "../api/APIService";
import './Content.css';

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentItems: {},
            isLoading: true
        };
        this.api = new ApiService(this);
    }
}

export default Content;
