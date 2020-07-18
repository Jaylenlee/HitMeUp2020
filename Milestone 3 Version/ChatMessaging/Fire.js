import firebase from 'firebase';

class Fire {
    constructor() {
        this.init()
        this.checkAuth()
    }

    init = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: "AIzaSyDIyoxcCcHG-0NAWXZfJRECqoMZPJMLYlg",
                authDomain: "hitmeup-demo.firebaseapp.com",
                databaseURL: "https://hitmeup-demo.firebaseio.com",
                projectId: "hitmeup-demo",
                storageBucket: "hitmeup-demo.appspot.com",
                messagingSenderId: "922579664426",
                appId: "1:922579664426:web:7c83835eead15186ee0d53"
            });
        }
    };

    checkAuth = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                firebase.auth().signInAnonymously();
            }
        });
    };

    send = messages => {
        messages.forEach(item => {
            const message = {
                text: item.text,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: item.user
            };

            this.db.push(message);
        });
    };

    parse = message => {
        const { user, text, timestamp } = message.val();
        const { key: _id } = message;
        const createdAt = new Date(timestamp);

        return {
            _id,
            createdAt,
            text,
            user
        };
    };

    get = callback => {
        this.db.on("child_added", snapshot => callback(this.parse(snapshot)));
    };
    off() {
        this.db.off();
    };
    get db() {
        return firebase.database().ref("messages").child("Gerald");
    };
    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    };
};

export default new Fire();