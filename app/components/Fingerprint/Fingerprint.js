import React, {PureComponent} from 'react';
import style from './style.css';

class Fingerprint extends PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <h2>
                Fingerprint: {this.props.fingerprint}
            </h2>
        )
    }
}

export default Fingerprint;
