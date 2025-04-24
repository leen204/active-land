const form = document.querySelector('form');
const kidNameInput = document.getElementById('kidName');
const dobInput = document.getElementById('dob');
const ageInput = document.getElementById('age');
const genderSelect = document.getElementById('gender');
const weightInput = document.getElementById('weight');
const heightInput = document.getElementById('height');
const phoneInput = document.getElementById('contactPhone');
const emailInput = document.getElementById('contactEmail');
const photoInput = document.getElementById('photo');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const kidName = kidNameInput.value.trim();
    const dob = dobInput.value;
    const age = parseInt(ageInput.value);
    const gender = genderSelect.value;
    const weight = weightInput.value;
    const height = heightInput.value;
    const phone = phoneInput.value.trim();
    const email = emailInput.value.trim();

    if (!kidName || !dob || !age || !gender || !weight || !height || !phone || !email) {
        alert('Please fill in all fields.');
        return;
    }

    if (!isNaN(kidName[0])) {
        alert('Kid name must not start with a number.');
        return;
    }

    if (phone.length !== 10 || isNaN(phone)) {
        alert('Phone number must be exactly 10 digits.');
        return;
    }

    if (!email.includes('@')) {
        alert('Please enter a valid email address.');
        return;
    }

    const dobYear = new Date(dob).getFullYear();
    if (dobYear > 2020) {
        alert('DOB must not be after 2020.');
        return;
    }

    function printKid(kid) {
        const printWindow = window.open('', '', 'width=800,height=600');
        printWindow.document.write('<html><head><title>Kid Information</title></head><body>');
        printWindow.document.write(`
            <h1>Kid Information</h1>
            <img src="${kid.image ? kid.image : 'images/default.jpg'}" alt="Kid Photo" style="width:150px;height:150px;margin-bottom:15px;"><br>
            <p><strong>Name:</strong> ${kid.name}</p>
            <p><strong>Age:</strong> ${kid.age}</p>
            <p><strong>Gender:</strong> ${kid.gender}</p>
            <p><strong>Phone:</strong> ${kid.phone}</p>
            <p><strong>Email:</strong> ${kid.email}</p>
            ${kid.activities ? `<p><strong>Enrolled Activities:</strong> ${Array.isArray(kid.activities) ? kid.activities.join(", ") : kid.activities}</p>` : '<p><strong>Enrolled Activities:</strong> Not enrolled yet</p>'}
            ${kid.coach ? `<p><strong>Coach Name:</strong> ${kid.coach}</p>` : '<p><strong>Coach Name:</strong> Not assigned yet</p>'}
        `);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    }

    if (photoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function () {
            saveKidWithImage(reader.result);
        };
        reader.readAsDataURL(photoInput.files[0]);
    } else {
        saveKidWithImage(null);
    }

    function saveKidWithImage(base64Image) {
        const newKid = {
            name: kidName,
            dob: dob,
            age: age,
            gender: gender,
            weight: weight,
            height: height,
            phone: phone,
            email: email,
            activities: [],
            coach: "",
            image: base64Image
        };

        let kids = JSON.parse(localStorage.getItem('kids')) || [];
        kids.push(newKid);
        localStorage.setItem('kids', JSON.stringify(kids));
        localStorage.setItem('recentKid', JSON.stringify(newKid)); 
      alert('Kid registered successfully!');
printKid(newKid);
window.location.href = 'parent-dashboard.html';

    }
});
