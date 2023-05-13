let myFormEl = document.getElementById("myForm");

let nameEl = document.getElementById("name");
let nameErrMsgEl = document.getElementById("nameErrMsg");

let emailEl = document.getElementById("email");
let emailErrMsgEl = document.getElementById("emailErrMsg");

let formData = {
    name: "",
    email: "",
    status: "Active",
    gender: "Male"
};

let workingStatusEl = document.getElementById("status");
workingStatusEl.addEventListener("change", function(event) {
    formData.status = event.target.value;
    // console.log(formData.status);
});

let genderMaleEl = document.getElementById("genderMale");
genderMaleEl.addEventListener("change", function(event) {
    formData.gender = event.target.value;
    // console.log(formData.gender);
});

let genderFemaleEl = document.getElementById("genderFemale");
genderFemaleEl.addEventListener("change", function(event) {
    formData.gender = event.target.value;
    // console.log(formData.gender);
});

nameEl.addEventListener("change", function(event) {
    if (event.target.value === "") {
        nameErrMsgEl.textContent = "Required*";
    } else {
        nameErrMsgEl.textContent = "";
    }
    formData.name = event.target.value;
});

emailEl.addEventListener("change", function(event) {
    if (event.target.value === "") {
        emailErrMsgEl.textContent = "Required*";
    } else {
        emailErrMsgEl.textContent = "";
    }
    formData.email = event.target.value;
});

function validataFormData(formData) {
    let {
        name,
        email
    } = formData;
    if (name === "") {
        nameErrMsgEl.textContent = "Required*";
    }
    if (email === "") {
        emailErrMsgEl.textContent = "Required*";
    }
}

function submitFormData(formData) {
    let url = "https://gorest.co.in/public-api/users";
    let options = {
        method: "POST",
        headers: {
            "content-type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer 00f3f8fde06120db02b587cc372c3d85510896e899b45774068bb750462acd9f"
        },
        body: JSON.stringify(formData)
    };
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            console.log(jsonData);
            if (jsonData.code === 422) {
                if (jsonData.data[0].message = "has already been taken") {
                    emailErrMsgEl.textContent = "Email already exists";
                }
            }
        })
}

myFormEl.addEventListener("submit", function(event) {
    event.preventDefault();
    validataFormData(formData);
    submitFormData(formData);
});