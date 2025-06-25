let qrtext = document.getElementById('qr-text');
let sizes = document.getElementById('sizes');
let generatebtn = document.getElementById('generatebtn');
let qrContainer = document.querySelector('.qr-body');
let downloadbtn = document.getElementById('downloadbtn');

generatebtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (isEmptyInput()) {
        generateQRCode();
    }
});

sizes.addEventListener('change', () => {
    if (isEmptyInput()) {
        generateQRCode();
    }
});

downloadbtn.addEventListener('click', () => {
    let img = document.querySelector('.qr-body img');
    if (img !== null) {
        let imgAttr = img.getAttribute('src');
        downloadbtn.setAttribute("href", imgAttr);
    }
});

function isEmptyInput() {
    if (qrtext.value.trim().length === 0) {
        alert("Please enter some text");
        return false;
    }
    return true;
}

function generateQRCode() {
    let size = parseInt(sizes.value);
    qrContainer.innerHTML = "";

    // Create a temporary container to generate the QR code
    let tempDiv = document.createElement('div');
    qrContainer.appendChild(tempDiv);

    new QRCode(tempDiv, {
        text: qrtext.value,
        width: size,
        height: size,
        colorDark: "#000000",
        colorLight: "#ffffff"
    });

    // Delay to wait for QR code to render
    setTimeout(() => {
        let qrImg = tempDiv.querySelector('img') || tempDiv.querySelector('canvas');
        if (qrImg) {
            let canvas = document.createElement('canvas');
            let padding = 20;
            let newSize = size + padding * 2;
            canvas.width = newSize;
            canvas.height = newSize;

            let ctx = canvas.getContext('2d');
            ctx.fillStyle = "#ffffff"; // padding/background color
            ctx.fillRect(0, 0, newSize, newSize);

            let image = new Image();
            image.src = qrImg.src;
            image.onload = () => {
                ctx.drawImage(image, padding, padding, size, size);
                qrContainer.innerHTML = '';
                let finalImg = document.createElement('img');
                finalImg.src = canvas.toDataURL("image/png");
                qrContainer.appendChild(finalImg);
            };
        }
    }, 100);
}f
