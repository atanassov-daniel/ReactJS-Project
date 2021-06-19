if (password.length < 6) {
    alert('The password should be at least 6 characters long!');
    return;
}
if(password.includes(' ')){
    alert('The password cannot include intervals!');
    return;
}
if (password !== repeatPass) {
    alert('Passwords don\'t match!');
    return;
}

db
.collection(`users`)
.add({
    createdAt: firestore.FieldValue.serverTimestamp(),
    email: this.state.email,
    name: this.state.name,
    createdBy: {
        email: this.props.authInfo.email,
        uid: this.props.authInfo.uid,
        name: this.props.authInfo.displayName,
        photoURL: this.props.authInfo.photoURL
    },
    members: [this.props.authInfo.email]
})