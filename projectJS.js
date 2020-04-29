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

// function to validate email before resume is created
function validateEmail() {

    const regEx = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (regEx.test(document.getElementById("email").value) == true) {
        return true;
    } else {
        // alert("Email address is not valid");
        return false;
    }
}

// new web page based on user input, "on the fly"
function createNewResume() {

    if (!validateEmail()) {
        alert("Email address is not valid");
        return;
    }

    const newResume = createNewPage(400, 600).document;

    newResume.write("<html>");
    newResume.write("<head>");

    writeNewStyle(newResume);

    newResume.write("</head>");
    newResume.write("<body");

    writeNewPersonalData(newResume);
    writeNewBody(newResume);

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
    const topMargin = 10;
    const leftMargin = 20;
    const marginBottom = 10;

    let styleString = "<style>";
    styleString += "body { ";
    styleString += ("font-size:" + fontSize + "pt;")
    styleString += ("font-family:" + fontFamily + ";")
    styleString += (" margin-left:" + leftMargin + "px" + ";");
    styleString += (" margin-top:" + topMargin + "px");
    styleString += " } ";
    styleString += ".column {";
    styleString += "float: left;";
    styleString += " } ";
    styleString += ".left { ";
    styleString += ("width: 25% ;");
    styleString += (" margin-bottom:" + marginBottom + "px");
    styleString += " } ";
    styleString += ".right { ";
    styleString += ("width: 75% ;")
    styleString += (" margin-bottom:" + marginBottom + "px");
    styleString += " } ";
    styleString += ".clear {";
    styleString += "clear: both;";
    styleString += " } ";
    styleString += "</style>";

    newResume.write(styleString);
}

// Write new resume user contact info
function writeNewPersonalData(newResume) {

    const inputForm = document.getElementById("resumeForm");

    let name = inputForm.name.value;
    newResume.write("<h4>" + name.toUpperCase() + "</h4>");

    let address = inputForm.streetAddress.value;
    newResume.write("<p>" + address.toUpperCase() + "</p>");

    let city = inputForm.city.value;
    let state = inputForm.state.value;
    let zipCode = inputForm.zipCode.value;
    newResume.write("<p>" + city.toUpperCase() + ", " + state.toUpperCase() + " " + zipCode + "</p>");

    let phone = inputForm.phone.value;
    newResume.write("<p>" + phone + "</p>");

    let email = inputForm.email.value;
    newResume.write("<p>" + email + "</p>");

    newResume.write("<hr>")
}

// create new resume body section
function writeNewBody(newResume) {

    const inputForm = document.getElementById("resumeForm");

    writeBodySection(newResume, "<b>Career Objectives</b>", formatTextarea(inputForm.careerObj.value));
    writeBodySection(newResume, "<b>Personal Information</b>", formatTextarea(inputForm.personalInfo.value));
    writeBodySection(newResume, "<b>Education</b>", formatTextarea(inputForm.educationData.value));
    writeBodySection(newResume, "<b>Previous Experience</b>", "");
    writeNewEmpSection(newResume);
    writeBodySection(newResume, "<b>Character References</b>", "Upon Request");
    writeBodySection(newResume, "<b>Background References</b>", formatTextarea(inputForm.businessRef.value));    
}

// write employment section
function writeNewEmpSection(newResume) {

    let prevEmp = document.getElementsByName("prevEmp");
    let startDates = document.getElementsByName("startDate");
    let endDates = document.getElementsByName("endDate");

    for (let index = 0; index < prevEmp.length; index++) {

        // if no start date don't include
        if (startDates[index].value) {

            let dateString = getDateString(startDates[index].value, endDates[index].value);
            writeBodySection(newResume, dateString, formatTextarea(prevEmp[index].value))
        }
    }
}

// add div classes to body elements for styling
function writeBodySection(newResume, left, right) {

    newResume.write("<div class=\"column left\">" + left + "</div>");
    newResume.write("<div class=\"column right\">" + right + "</div>");
    newResume.write("<div class=\"clear\"></div>");
}

// make sure new text area formatting mirrors input form
function formatTextarea(value) {

    let lines = value.split("\n");
    let string = "";
    for (var index = 0; index < lines.length; index++) {

        string += lines[index] + "<br>"

    }
    return string;
}

// format dates to MON. YYYY
function getDateString(start, end) {

    let startMonth = start.charAt(5) + start.charAt(6);
    let startYear = start.substr(0, 4);
    let dateString = getMonthString(startMonth) + " " + startYear + " - ";

    if (end) {
        let endMonth = end.charAt(5) + end.charAt(6);
        let endYear = end.substr(0, 4);
        dateString += getMonthString(endMonth) + " " + endYear;
    }
    return dateString;
}

function getMonthString(month) {
    let months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];

    return months[parseInt(month) - 1];
}

main()
