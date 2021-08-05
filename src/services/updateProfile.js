import { auth } from '../../utils/firebase';

export default function updateUserAttributes(attributes) {
    auth.currentUser?.updateProfile({
        displayName: "Jane Q. User",
        photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(function () {
        // Profile updated successfully!
        const displayName = auth.currentUser.displayName;
        const photoURL = auth.currentUser.photoURL;

        //TODO call the function which has to save the profileInfo to the state
    }, function (error) {
        // An error happened.
        alert('There was a problem with updating your profile. Please try again! ' + error.message);
    });

    // Passing a null value will delete the current attribute's value, but not
    // passing a property won't change the current attribute's value:
    // Let's say we're using the same user than before, after the update.
    auth.currentUser.updateProfile({ photoURL: null }).then(function () {
        // "Jane Q. User", hasn't changed.
        var displayName = user.displayName;
        // Now, this is null.
        var photoURL = user.photoURL;
    }, function (error) {
        // An error happened.
    });
}