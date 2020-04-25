function main() {
    // Add name and course elements at the top of the webpage
    const body = document.body;
    body.insertBefore(nameElement(), body.childNodes[0]);
    body.insertBefore(courseElement(), body.childNodes[1]);
}

function nameElement() {
    // write my name with the following formatting: H1 header, red, Tahoma, centered
    
    let nameElem = document.createElement("h1");
    nameElem.style.color = "red";
    nameElem.style.fontFamily = "Tahoma";
    nameElem.style.textAlign = "center";

    let nameText = document.createTextNode("Steven Murphy");
    nameElem.appendChild(nameText);

    return nameElem;
}

function courseElement() {
    // write my course info with the following formatting: H2 header, red, Garamond, italic, centered

    let courseElem = document.createElement("h2");
    courseElem.style.color = "red";
    courseElem.style.fontFamily = "Garamond";
    courseElem.style.fontStyle = "italic";
    courseElem.style.textAlign = "center";

    let courseText = document.createTextNode("WEB-115 Section-0001");
    courseElem.appendChild(courseText);

    return courseElem;
}

function validateEmail() {
    var regEx = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (regEx.test(document.getElementById("email").value) != true) {
        alert("Email address is not valid")
    }
}

main()
document.getElementById("validateEmail").addEventListener("click", validateEmail)