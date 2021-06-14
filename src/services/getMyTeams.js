import { db } from '../utils/firebase';

export default function getMyTeams(userEmail) {
    return db.collection('users').where('email', '==', userEmail)
        .get()
        .then((querySnapshot) => {
            let teams = null;

            if (querySnapshot.empty === false) {
                querySnapshot.forEach(doc => {
                    if (doc.exists) doc = doc.data();
                    // const teams = doc.teams.sort((a,b) => {})

                    teams = doc.teams;
                });
            }

            return teams;
        });
    //!! get first 5 members from the actual tema, or have a cloud function that will update a 'membersOverview' field on the team in the user collection -> 2000 members will need to get an updated overview every time a user leaves probably; otherwise every user when logging in will have to get using .limit(5) the first memebers of every team he has ever joined
};
/* export default function getMyTeams(userEmail) {
    return db.collection('users').doc(userEmail)
        .get()
        .then((doc) => {
            if (doc.exists) {
                doc = doc.data();
                // const teams = doc.teams.sort((a,b) => {})

                return doc.teams;
            }

            return null;
        });
    //!! get first 5 members from the actual tema, or have a cloud function that will update a 'membersOverview' field on the team in the user collection -> 2000 members will need to get an updated overview every time a user leaves probably; otherwise every user when logging in will have to get using .limit(5) the first memebers of every team he has ever joined
}; */