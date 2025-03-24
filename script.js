// تسجيل الدخول
function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === "admin" && password === "admin") {
        window.location.href = "dashboard.html"; // الانتقال للوحة التحكم
    } else {
        document.getElementById("error-message").innerText = "بيانات غير صحيحة!";
    }
}

// إنشاء تصريح جديد
function createPermit() {
    let fullName = document.getElementById("fullName").value;
    let idNumber = document.getElementById("idNumber").value;
    let gender = document.getElementById("gender").value;
    let nationality = document.getElementById("nationality").value;
    let dob = document.getElementById("dob").value;
    let uniqueId = document.getElementById("uniqueId").value;

    if (fullName && idNumber && gender && nationality && dob && uniqueId) {
        let expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 30); // صلاحية 30 يومًا

        let permit = {
            fullName,
            idNumber,
            gender,
            nationality,
            dob,
            uniqueId,
            expiryDate: expiryDate.toISOString()
        };

        localStorage.setItem(uniqueId, JSON.stringify(permit));

        document.getElementById("p_fullName").innerText = fullName;
        document.getElementById("p_idNumber").innerText = idNumber;
        document.getElementById("p_nationality").innerText = nationality;
        document.getElementById("p_gender").innerText = gender;
        document.getElementById("p_dob").innerText = dob;
        document.getElementById("p_expiryDate").innerText = expiryDate.toDateString();

        let qr = new QRious({
            element: document.getElementById("qrcode"),
            value: uniqueId,
            size: 100
        });

        document.getElementById("permitMessage").innerText = "تم إنشاء التصريح!";
    } else {
        document.getElementById("permitMessage").innerText = "الرجاء ملء جميع الحقول!";
    }
}

// تحميل التصريح كصورة
function downloadPermit() {
    let permitCard = document.getElementById("permitCard");

    html2canvas(permitCard).then(canvas => {
        let link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "تصريح.png";
        link.click();
    });
}
