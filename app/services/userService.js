import Fingerprint2 from "fingerprintjs2";

export const getFingerprintPromise = () => new Promise(resolve => Fingerprint2.get(function (components) {
        // filter out unstable components
        components = components.filter((e) => {
            return e.key != 'adBlock';
        });
        const currentFP = components.map(function (pair) {
            return pair.key + ':' + pair.value
        }).join('\n');
        const fpId = Fingerprint2.x64hash128(currentFP, 31);
        resolve(fpId);

        const lastID = localStorage.getItem('FINGERPRINT_ID');
        if (lastID != fpId) {
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
            localStorage.setItem('FINGERPRINT_ID', fpId);
        }
    })
);

