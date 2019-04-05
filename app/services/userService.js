import Fingerprint2 from "fingerprintjs2";

export const getFingerprint = (callback) => {
    Fingerprint2.get(function (components) {
        // filter out unstable components
        components = components.filter((e) => {
            return e.key != 'adBlock';
        });
        const currentFP = components.map(function (pair) {
            return pair.key + ':' + pair.value
        }).join('\n');
        const fpID = Fingerprint2.x64hash128(currentFP, 31);

        const lastID = localStorage.getItem('FINGERPRINT_ID');
        if (lastID != fpID) {
            const lastFP = localStorage.getItem('FINGERPRINT_COMPONENTS');
            if (lastID != null) {
                const pairs = lastFP.split('\n');

                for (let i = 0; i < components.length; ++i) {
                    const c = components[i];
                    const pair = c.key + ':' + c.value;
                    if (pair != pairs[i]) {
                        alert('fingerprint changed:' + c.key);
                        console.debug('last:', pair);
                        console.debug('current:', pairs[i]);
                    }
                }
            }
            localStorage.setItem('FINGERPRINT_COMPONENTS', currentFP);
            localStorage.setItem('FINGERPRINT_ID', fpID);
        }
        callback(fpID);
        // actions.change_fingerprint(fpID);
    });

};
