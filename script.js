const resultImages = document.querySelectorAll('.result-box img');
const betCounts = document.querySelectorAll('.count');
const quayButton = document.querySelector('.button-box:first-child');
const datLaiButton = document.querySelector('.button-box:last-child');
const resultMessage = document.getElementById('result-message');  // Target the result message element

let totalBets = 0;
let isSpinning = false;

// Possible images for the results
const images = [
    { src: 'image/bau.jpg', name: 'Bầu' },
    { src: 'image/cua.jpg', name: 'Cua' },
    { src: 'image/tom.jpg', name: 'Tôm' },
    { src: 'image/ca.jpg', name: 'Cá' },
    { src: 'image/cop.jpg', name: 'Hổ' },
    { src: 'image/ga.jpg', name: 'Gà' }
];

// Initialize the bet counts
let betValues = [0, 0, 0, 0, 0, 0];

// Event listener for the "Quay" button
quayButton.addEventListener('click', () => {
    if (!isSpinning) {
        isSpinning = true;
        let count = 0;
        let finalResults = [0, 0, 0, 0, 0, 0];  // Array to store the results

        const spinInterval = setInterval(() => {
            resultImages.forEach((img, index) => {
                const randomImage = images[Math.floor(Math.random() * images.length)];
                img.src = randomImage.src;
                finalResults[index] = randomImage.name;  // Store the result name
            });
            count++;
            if (count >= 100) {  // Stop after 100 randomizations
                clearInterval(spinInterval);
                isSpinning = false;
                checkResult(finalResults);  // Check the player's bets against the result
            }
        }, 50);  // Change image every 50ms for spinning effect
    }
});

// Event listener for betting (clicking on the images in the play section)
document.querySelectorAll('.choose-box').forEach((button, index) => {
    button.addEventListener('click', () => {
        if (totalBets < 3 && !isSpinning && betValues[index] < 3) {
            betValues[index]++;
            totalBets++;
            betCounts[index].textContent = betValues[index];  // Update the count shown on the image
        }
    });
});

// Event listener for the "Đặt lại" button to reset all bets
datLaiButton.addEventListener('click', () => {
    if (!isSpinning) {
        totalBets = 0;
        betValues.fill(0);  // Reset all bet values to 0
        betCounts.forEach(count => count.textContent = '0');  // Update the displayed bet counts
        resultMessage.textContent = '';  // Clear the result message
    }
});

// Function to compare the final results and the player's bets
function checkResult(finalResults) {
    let finalCount = { 'Bầu': 0, 'Cua': 0, 'Tôm': 0, 'Cá': 0, 'Hổ': 0, 'Gà': 0 };
    
    // Count how many times each result appears
    finalResults.forEach(result => {
        finalCount[result]++;
    });

    // Compare with player's bets
    let correct = true;
    for (let i = 0; i < betValues.length; i++) {
        const imageName = images[i].name;
        if (betValues[i] !== finalCount[imageName]) {
            correct = false;
            break;
        }
    }

    // Display the result message
    if (correct) {
        resultMessage.innerHTML = `<strong style="color: red; font-size:40px">Bạn đã đoán đúng với kết quả: ${formatResult(finalCount)}</strong>`;
    } else {
        resultMessage.innerHTML = `<strong style="color: red; font-size:30px">Bạn đã đoán sai với kết quả: ${formatResult(finalCount)}</strong>`;
    }
}

// Function to format the result into a readable string
function formatResult(finalCount) {
    let resultStr = '';
    for (let [key, value] of Object.entries(finalCount)) {
        if (value > 0) {
            resultStr += `${key} ${value} `;
        }
    }
    return resultStr.trim();
}
