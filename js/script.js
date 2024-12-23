// data fetch function 
function fetchData() {
    let tablebody = document.getElementById("table-body");
    $.ajax({
        url: "http://localhost/rest_api/all-data-file.php",
        type: "GET",
        success: function (response) {
            tablebody.innerHTML = "";
            response.forEach(function (value, key) {
                tablebody.innerHTML += `
            <tr>
                <td>${value.id}</td>
                <td>${value.name}</td>
                <td>${value.email}</td>
                <td>${value.company}</td>
                <td>${value.designation}</td>
                <td>
                    <button class="btn-update" data-id="${value.id}" onclick="updaterow(this)">Update</button>
                    <button class="btn-delete" data-id="${value.id}" onclick="deleteRow(this)">Delete</button>
                </td>
            </tr>`;
            });
        }
    });
}
fetchData();

// Popup function 
function updaterow(btn) {
    document.getElementById("popup").style.display = "block";
    let update_id = btn.getAttribute("data-id");

    $.ajax({
        url: "http://localhost/rest_api/single-data-file.php",
        type: "POST",
        data: JSON.stringify({
            student_id: update_id
        }),
        success: function (response) {
            document.getElementById("popup-id").value = response[0].id;
            document.getElementById("popup-name").value = response[0].name;
            document.getElementById("popup-email").value = response[0].email;
            document.getElementById("popup-company").value = response[0].company;
            document.getElementById("popup-designation").value = response[0].designation;
        }
    });
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

// Update Detail Function 
function updateDetails() {
    let update_id = document.getElementById("popup-id").value;
    let update_name = document.getElementById("popup-name").value;
    let update_email = document.getElementById("popup-email").value;
    let update_company = document.getElementById("popup-company").value;
    let update_designation = document.getElementById("popup-designation").value;

    $.ajax({
        url: "http://localhost/rest_api/api-update.php",
        type: "POST",
        data: JSON.stringify({
            id: update_id,
            name: update_name,
            email: update_email,
            company: update_company,
            designation: update_designation
        }),
        success: function (response) {
            closePopup();
            fetchData();
        }
    });
}

// Delete Function 

function deleteRow(btn) {
    let delete_id = btn.getAttribute("data-id");

    $.ajax({
        url: "http://localhost/rest_api/api-delete.php",
        type: "POST",
        data: JSON.stringify({
            student_id: delete_id
        }),
        success: function (response) {
            fetchData();
        }
    });
}

// Data Insert Function 

function addRow() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let company = document.getElementById("company").value;
    let designation = document.getElementById("designation").value;

    if (name == "" || email == "" || company == "" || designation == "") {
        alert("Please fill all fields");
        return false;
    }

    $.ajax({
        url: "http://localhost/rest_api/api-insert.php",
        type: "POST",
        data: JSON.stringify({
            name: name,
            email: email,
            company: company,
            designation: designation
        }),
        success: function (response) {
            fetchData();
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("company").value = "";
            document.getElementById("designation").value = "";
        }
    });
}

// Search Query Function 

function searchFunction() {
    let search = document.getElementById("search_input").value;

    $.ajax({
        url: "http://localhost/rest_api/api-search-data.php",
        type: "POST",
        data: JSON.stringify({
            search: search
        }),
        success: function (response) {
            let tablebody = document.getElementById("table-body");
            tablebody.innerHTML = "";
            response.forEach(function (value, key) {
                tablebody.innerHTML += `
                    <tr>
                        <td>${value.id}</td>
                        <td>${value.name}</td>
                        <td>${value.email}</td>
                        <td>${value.company}</td>
                        <td>${value.designation}</td>
                        <td>
                            <button class="btn-update" data-id="${value.id}" onclick="updaterow(this)">Update</button>
                            <button class="btn-delete" data-id="${value.id}" onclick="deleteRow(this)">Delete</button>
                        </td>
                    </tr>`;
            });
        }
    });
}