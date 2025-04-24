const kidsList = document.getElementById('kids-list');
const sortSelect = document.getElementById('age-select');

function loadKids() {
    const kids = JSON.parse(localStorage.getItem('kids')) || [];
    displayKids(kids);
}

function displayKids(kidsArray) {
    kidsList.innerHTML = '';
    kidsArray.forEach(kid => {
        const kidCard = document.createElement('div');
        kidCard.className = 'kid-card';
        kidCard.innerHTML = `
            <div class="kid-image-container">
                <img src="${kid.image ? kid.image : 'images/default.jpg'}" alt="${kid.name}'s Image" class="kid-image">
            </div>
            <div class="kid-info">
                <p><strong>Kid Name:</strong> ${kid.name}</p>
                <p><strong>Age:</strong> ${kid.age}</p>
                <p><strong>Gender:</strong> ${kid.gender}</p>
                <p><strong>Enrolled Activities:</strong> ${kid.activities ? kid.activities.join(", ") : 'Not enrolled yet'}</p>
                <p><strong>Coach Name:</strong> ${kid.coach ? kid.coach : 'Not assigned yet'}</p>
                <button onclick="deleteKid('${kid.name}')" class="delete-button">🗑️ Delete</button>
            </div>
        `;
        kidsList.appendChild(kidCard);
    });
}

function deleteKid(name) {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
        let kids = JSON.parse(localStorage.getItem("kids")) || [];

        // نحذف الطفل اللي اسمه مطابق
        const updatedKids = kids.filter(kid => kid.name !== name);

        // نحدث التخزين
        localStorage.setItem("kids", JSON.stringify(updatedKids));

        // نعيد التحميل الكامل من التخزين عشان الترتيب ما ينخرب
        loadKids();
    }
}


sortSelect.addEventListener('change', () => {
    let kids = JSON.parse(localStorage.getItem('kids')) || [];
    const sortType = sortSelect.value;

    if (sortType === 'name-asc') {
        kids.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortType === 'name-desc') {
        kids.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortType === 'age-asc') {
        kids.sort((a, b) => a.age - b.age);
    } else if (sortType === 'age-desc') {
        kids.sort((a, b) => b.age - a.age);
    }

    displayKids(kids);
});

window.addEventListener('load', () => {
    let kids = JSON.parse(localStorage.getItem('kids'));

    // ✅ إذا localStorage فاضي، نحط 3 أطفال افتراضيين
    if (!kids || kids.length === 0) {
        kids = [
            {
                name: "Sara",
                age: 9,
                gender: "Female",
                phone: "0500000001",
                email: "sara@example.com",
                activities: ["Art"],
                coach: "Maha",
                image: "images/Sara.jpeg"
            },
            {
                name: "Nawaf",
                age: 10,
                gender: "Male",
                phone: "0500000002",
                email: "nawaf@example.com",
                activities: ["Football"],
                coach: "Khalid",
                image: "images/Nawaf.jpeg"
            },
            {
                name: "Reema",
                age: 6,
                gender: "Female",
                phone: "0500000003",
                email: "reema@example.com",
                activities: ["Swimming"],
                coach: "Emily",
                image: "images/Reema.jpeg"
            }
        ];
        localStorage.setItem('kids', JSON.stringify(kids));
    }

    loadKids();

    const recentKid = JSON.parse(localStorage.getItem('recentKid'));
    if (recentKid) {
        setTimeout(() => {
            printKidInfo(recentKid);
            localStorage.removeItem('recentKid'); 
        }, 500);
    }
});


function printKidInfo(kid) {
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write('<html><head><title>Kid Info</title></head><body>');
    printWindow.document.write(`
        <h1>Kid Information</h1>
        <p><strong>Name:</strong> ${kid.name}</p>
        <p><strong>Age:</strong> ${kid.age}</p>
        <p><strong>Gender:</strong> ${kid.gender}</p>
        <p><strong>Phone:</strong> ${kid.phone}</p>
        <p><strong>Email:</strong> ${kid.email}</p>
        ${kid.activities && kid.activities.length > 0 ? `<p><strong>Enrolled Activities:</strong> ${kid.activities.join(", ")}</p>` : ''}
        ${kid.coach ? `<p><strong>Coach Name:</strong> ${kid.coach}</p>` : ''}
        <br>
        <img src="${kid.image ? kid.image : 'images/kids-profile.jpeg'}" alt="Kid Photo" style="width:150px;height:150px;margin-top:10px;">
    `);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}