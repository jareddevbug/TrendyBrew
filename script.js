function changeBackground() {
    var select = document.getElementById("tableNumber");
    var selectedValue = select.options[select.selectedIndex].value;

    // Update the section background image based on the selected table number
    var section = document.getElementById("book-form");

    switch (selectedValue) {
        case "1":
            section.style.backgroundImage = "url('img/citylightsview.jpg')";
            break;
        case "2":
            section.style.backgroundImage = "url('img/culinaryview.jpg')";
            break;
        case "3":
            section.style.backgroundImage = "url('img/natureview.jpg')";
            break;
        default:
            // Reset to default background image
            section.style.backgroundImage = "url('default-background.jpg')";

            alert("Background changed to " + section.style.backgroundImage);
    }
}

function checkDate() {
    var selectedDate = document.getElementById("date").value;
    var currentDate = new Date().toISOString().split('T')[0];

    if (selectedDate < currentDate) {
        alert("Please select a date from today onwards.");
    } else {
        alert("Date is valid!");
        // Call additional functions or perform other actions here
    }
}