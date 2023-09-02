function nextPart(nextPartNumber) {
    const currentPart = document.getElementById(`part${nextPartNumber - 1}`);
    const nextPart = document.getElementById(`part${nextPartNumber}`);

    if (currentPart && nextPart) {
        currentPart.style.display = "none";
        nextPart.style.display = "block";
    }
}

function prevPart(prevPartNumber) {
    const currentPart = document.getElementById(`part${prevPartNumber}`);
    const prevPart = document.getElementById(`part${prevPartNumber - 1}`);

    if (currentPart && prevPart) {
        currentPart.style.display = "none";
        prevPart.style.display = "block";
    }
}
