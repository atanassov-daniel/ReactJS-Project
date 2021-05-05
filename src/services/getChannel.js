import { db } from '../utils/firebase';

export default function getChannel(teamName, channelName) {
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
};