function main() {
    // Add name and course elements at the top of the webpage
    const body = document.body;
    body.insertBefore(nameElement(), body.childNodes[0]);
    body.insertBefore(courseElement(), body.childNodes[1]);

    // Add event handler to input form submit button
    const inputForm = document.getElementById("resumeForm");
    inputForm.createResume.addEventListener("click", createNewResume);
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
    const regEx = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (regEx.test(document.getElementById("email").value) == true) {
        //console.log("valid email");
        return true;
    } else {
        alert("Email address is not valid");
        return false;
        
    }
}

// new web page based on user input, "on the fly"
function createNewResume() {

    if (!validateEmail()) {
        alert("Email address is not valid");
        return;
    }

    const newResume = createNewPage(600, 900).document;

    newResume.write("<html>");
    newResume.write("<head>");

    writeNewStyle(newResume);

    newResume.write("</head>");
    newResume.write("<body");

    writeNewHeader(newResume);
    // writeNewBody(newResume);

    newResume.write("</body");
    newResume.write("/html");
}

// create new web page
function createNewPage(height, width) {
    let size = "height" + height + ", width=" + width;
    return window.open("", "", size);
}

// new resume style to the document header
function writeNewStyle(newResume) {
    const fontSize = 12;
    const fontFamily = "Courier, Monaco, monospace";
    const leftMargin = 20;
    const bottomMargin = "10px";

    let styleString = "<style>";
    styleString += "body { ";
    styleString += ("font-size:" + fontSize + "pt;")
    styleString += ("font-family:" + fontFamily + ";")
    styleString += " } ";
    styleString += "#left { ";
    styleString += ("float: left; width: " + (leftMargin - 2) + "%");
    styleString += ("margin-bottom:" + bottomMargin + ";");
    styleString += " } ";
    styleString += "#right { ";
    styleString += ("margin-left:" + leftMargin + "%");
    styleString += ("margin-bottom:" + bottomMargin + ";");
    styleString += " } ";
    styleString += ".clear {";
    styleString += "clear: both;";
    styleString += " } ";
    styleString += "</style>";

    newResume.write(styleString);
}

// Write users contact info
function writeNewHeader(newResume) {
    const inputForm = document.getElementById("resumeForm");

    let name = inputForm.name.value;
    newResume.write("<h4>" + name.toUpperCase() + "</h4>");

    let address = inputForm.streetAddress.value;
    newResume.write("<p>" + address + "</p>");

    let city = inputForm.city.value;
    let state = inputForm.state.value;
    let zipCode = inputForm.zipCode.value;
    newResume.write("<p>" + city + ", " + state.toUpperCase() + " " + zipCode + "</p>");

    let phone = inputForm.phone.value;
    newResume.write("<p>" + phone + "</p>");

    let email = inputForm.email.value;
    newResume.write("<p>" + email + "</p>");
}

main()
