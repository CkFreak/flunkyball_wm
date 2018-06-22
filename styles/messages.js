window.onload = () => {
    const config = {
        apiKey: "AIzaSyA90ZP9DJ-_SPUybFQzcSEKro4XUf7ztPE\n>",
        authDomain: "flunkyball-wm.firebaseapp.com",
        databaseURL: "https://flunkyball-wm.firebaseio.com",
        projectId: "flunkyball-wm",
    };
    firebase.initializeApp(config);

    const db = firebase.database();

    db.ref("/messages").on("value", showMessages);

    const sendButton = document.getElementById("send");

    sendButton.addEventListener("click", sendMessage);
};

const weekdayMapping = {
    0: "Montag",
    1: "Dienstag",
    2: "Mittwoch",
    3: "Donnerstag",
    4: "Freitag",
    5: "Samstag",
    6: "Sonntag",
};

const monthMapping = {
    0: "Januar",
    1: "Februar",
    2: "März",
    3: "April",
    4: "Mai",
    5: "Juni",
    6: "Juli",
    7: "August",
    8: "September",
    9: "Oktober",
    10: "November",
    11: "Dezember",
};

const showMessages = (data) => {
    const messagesDiv = document.getElementById("messages");
    while (messagesDiv.firstChild) {
        messagesDiv.removeChild(messagesDiv.firstChild);
    }
    const messages = Object.values(data.val());

    for (let i = 0; i < messages.length; ++i) {
        const messageDiv = document.createElement("div");
        const messageP = document.createElement("p");
        const timeSpan = document.createElement("span");
        messageDiv.classList.add("message");
        timeSpan.classList.add("time");

        messageDiv.appendChild(messageP);
        messageDiv.appendChild(timeSpan);

        messageP.innerText = messages[i].content;
        const time = new Date(messages[i].time);
        timeSpan.innerText = weekdayMapping[time.getDay()] + " " + time.getDate() + " " + monthMapping[time.getMonth()] + " " + time.getHours() + ":" + time.getMinutes();
        messagesDiv.appendChild(messageDiv);
    }
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
};


const sendMessage = (e) => {
    const textBox = document.getElementById("text");
    if (textBox.value.length !== 0) {
        const key = firebase.database().ref().child("messages").push().key;
        console.log(key);
        const updates = {};
        updates["/messages/" + key] = {
            content: textBox.value,
            time: new Date().getTime(),
        };
        return firebase.database().ref().update(updates).then(() => {
            textBox.value = "";
        });
    }
};
