import React, {PureComponent} from 'react';
import style from './style.css';

class Fingerprint extends PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <h2>
                {this.props.fingerprint &&
                <span> Fingerprint: {this.props.fingerprint}                </span>
                }

            </h2>
        )
    }
}

export default Fingerprint;
