import { db } from '../utils/firebase';

export default function getTeam(teamName) {
    return db.collection('teams').doc(teamName)
        .get()
        .then((doc) => {
            if (doc.exists) {
                doc = doc.data();
                // const teams = doc.teams.sort((a,b) => {})

                return doc;
            }

            return null;
        });
};