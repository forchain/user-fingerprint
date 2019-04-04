import React, {PureComponent} from 'react';
import Fingerprint2 from 'fingerprintjs2'
import style from './style.css';

class Fingerprint extends PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        const fp = Fingerprint2.get(function (components) {
            const fp = Fingerprint2.x64hash128(components.map(function (pair) {
                return pair.value
            }).join(), 31);
            return fp;
        });
        return (
            <h2>
                {fp}
            </h2>
        )
    }
}

export default Fingerprint;
