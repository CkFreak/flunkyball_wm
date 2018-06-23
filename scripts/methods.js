window.onload = () => {
    const config = {
        apiKey: "AIzaSyA90ZP9DJ-_SPUybFQzcSEKro4XUf7ztPE\n>",
        authDomain: "flunkyball-wm.firebaseapp.com",
        databaseURL: "https://flunkyball-wm.firebaseio.com",
        projectId: "flunkyball-wm",
    };
    firebase.initializeApp(config);

    const db = firebase.database();

    db.ref("/scores").on("value", createTable)
};

const createTable = (data) => {
    const contentNode = document.getElementById("content");
    while (contentNode.firstChild) {
        contentNode.removeChild(contentNode.firstChild);
    }

    const keys = Object.keys(data.val());
    const values = Object.values(data.val());
    const table = document.createElement("TABLE");
    table.style.margin = "60px auto";
    table.id = "table";
    const tableBody = document.createElement("tbody");
    const header = document.createElement("tr");
    const keyHeader = document.createElement("th");
    const valHeader = document.createElement("th");
    header.appendChild(keyHeader);
    header.appendChild(valHeader);
    table.appendChild(header);
    keyHeader.innerHTML = "Team";
    valHeader.innerHTML = "Score";
    table.appendChild(tableBody);
    for (let i = 0; i < keys.length; ++i) {
        const tableRow = document.createElement("tr");
        const key = document.createElement("td");
        const val = document.createElement("td");
        const iTag = document.createElement("i");
        const currentClasses = keys[i].split(" ");
        for (let j = 0; j < currentClasses.length; ++j) {
            iTag.classList.add(currentClasses[j]);
        }

        key.appendChild(iTag);
        val.appendChild(document.createTextNode(values[i]));
        tableRow.appendChild(key);
        tableRow.appendChild(val);
        tableBody.appendChild(tableRow);
    }

    contentNode.appendChild(table);
    sortTableSlow();
};

const sortTableSlow = () => {
    const table = document.getElementById("table");
    let rows;
    let switching = true;
    let i = 0;
    let y = 0;
    let x = 0;
    let shouldSwitch = false;

    while (switching) {
        switching = false;
        rows = table.getElementsByTagName("TR");

        for (i = 1; i < rows.length - 1; ++i) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[1];
            y = rows[i + 1].getElementsByTagName("TD")[1];
            console.log(x, y);
            if (x && y) {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    console.log(x, y, "Are switching");
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
};
