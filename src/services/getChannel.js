import { db } from '../utils/firebase';

export default function getChannel(teamKey, channelKey) { // channelName
    return db
        .collection('teams').doc(teamKey).collection('channels').doc(channelKey)
        .get()
        .then((doc) => {
            if (doc.exists) {
                doc = doc.data();
                doc.key = channelKey;
                // if (!doc.name) doc.name = channelName;
                console.log(doc);
                return doc;
            }

            return null;
        });
    /* return db
        .collection('teams').doc(teamKey).collection('channels')
        .where('name', '==', channelName)
        .get()
        .then((querySnapshot) => {
            let channelDoc = null;

            if (querySnapshot.empty === false) {
                querySnapshot.forEach(doc => {
                    if (doc.exists) doc = doc.data();

                    channelDoc = doc;
                });
            }

            return channelDoc;
        }); */
};
/* export default function getChannel(teamName, channelName) {
    return db
        .collection('teams').doc(teamName).collection('channels').doc(channelName)
        .get()
        .then((doc) => {
            if (doc.exists) {
                doc = doc.data();

                if (!doc.name) doc.name = channelName;

                return doc;
            }

            return null;
        });
}; */