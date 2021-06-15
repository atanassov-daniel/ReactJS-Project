import { db } from '../utils/firebase';

export default function getTeam(teamKey) {
    return db
        .collection('teams').doc(teamKey)
        .get()
        .then((doc) => {
            if (doc.exists) {
                doc = doc.data();
                doc.key = teamKey;
                // if (!doc.name) doc.name = teamName;

                const createdAt = doc.createdAt.toDate();
                const hours = createdAt.getHours().toString();
                const date = `${hours.length === 1 ? 0 + hours : hours}:${createdAt.getMinutes()}, ${createdAt.toDateString().split(' ').splice(1, 2).reverse().join(' ')} ${createdAt.getFullYear()}`;
                doc.createdAt = date;

                return doc;
            }

            return null;
        });
};
/* export default function getTeam(teamName) {
    return db.collection('teams')
        .where("name", "==", teamName)
        .get()
        .then((doc) => {
            if (doc.exists) {
                doc = doc.data();

                if (!doc.name) doc.name = teamName;

                const createdAt = doc.createdAt.toDate();
                const hours = createdAt.getHours().toString();
                const date = `${hours.length === 1 ? 0 + hours : hours}:${createdAt.getMinutes()}, ${createdAt.toDateString().split(' ').splice(1, 2).reverse().join(' ')} ${createdAt.getFullYear()}`;
                doc.createdAt = date;

                return doc;
            }

            return null;
        });
}; */

/*
.get()
        .then((querySnapshot) => {
            let teamDoc = null;

            if (querySnapshot.empty === false) {
                querySnapshot.forEach(doc => {
                    if (doc.exists) doc = doc.data();

                    if (!doc.name) doc.name = teamKey;
                    const createdAt = doc.createdAt.toDate();
                    const hours = createdAt.getHours().toString();
                    const date = `${hours.length === 1 ? 0 + hours : hours}:${createdAt.getMinutes()}, ${createdAt.toDateString().split(' ').splice(1, 2).reverse().join(' ')} ${createdAt.getFullYear()}`;
                    doc.createdAt = date;

                    teamDoc = doc;
                });
            }

            return teamDoc;
        }); */