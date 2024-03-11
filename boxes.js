
    // Array of strings
const promo = ["FVD22", "PKT54", "JSK23", "FTP98", "KDN52", "GVN00", "RTP23", "GGT51", "0OPT4", "9PDR4" ];
const sums = ["0.012 BTC", "0.032 BTC", "0.018 BTC", "0.049 BTC", "0.014 BTC", "0.065 BTC", "0.037 BTC", "0.039 BTC", "0.024 BTC", "0.055 BTC"]
// Function to generate a random string from the array

const randomIndex = Math.floor(Math.random() * promo.length);


// Generate a random string
const promoString = promo[randomIndex];
const sumString = sums[randomIndex];

// Your sentence with the random string
const sentence = `Congratulations! You won <b>${sumString}</b>! To collect the prize use a promocode <b>${promoString}</b> at:` ;
const message = `You won ${sumString}!`
// Log the result
//console.log(sentence);

    // Function to shuffle an array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Paths to your images for closed and opened states
    const closedImage = 'img/closed.png';
    const openedImage = 'img/open.webp';

    // Array to represent the boxes
    const boxStates = Array(9).fill(false); // Initially, all boxes are closed

    // Shuffle the box states
    shuffleArray(boxStates);

    // Counter to keep track of user clicks
    let clickCount = 0;
    let victoryAchieved = false;

    // Function to handle box click
    function boxClick(boxIndex) {
        if (!victoryAchieved && !boxStates[boxIndex]) {            
            const box = document.getElementById(`box${boxIndex}`);
            box.style.backgroundImage = `url(${closedImage})`;
            box.style.transform = 'rotateY(90deg)'; // Rotate the box for animation
            boxStates[boxIndex] = true; // Mark the box as opened

            clickCount++;

            // Check if the user has won every third click
            if (clickCount % 3 === 0) {
                swal({
                    title: "Congratulations!",
                    text: message,                    
                    imageUrl: "img/open.webp",
                    confirmButtonText: "Claim",
                    confirmButtonColor: "#74c7aa",
                    closeOnConfirm: false
                    
                  },
                  function(isConfirm){
                    if (isConfirm) {
                        swal({
                            title: promoString,
                            text: "is your promocode to enter at Gainex.io",                    
                            confirmButtonText: "Confirm",
                            confirmButtonColor: "#74c7aa"
                          });
                    }}
                  );
                  
                victoryAchieved = true;
                box.style.transform = 'rotateY(360deg)';
                box.style.backgroundImage = `url(${openedImage})`;
                disableBoxes(); // Disable further clicks on boxes
                displayVictoryMessage(); // Display victory message
            }
            else {
                swal({
                    title: "Empty!",
                    text: "Try again",                    
                    confirmButtonText: "Ok",
                    confirmButtonColor: "#74c7aa"
                  });
            }
        }
    }

    // Function to disable further clicks on boxes
    function disableBoxes() {
        const boxes = document.querySelectorAll('.box');
        boxes.forEach(box => {
            box.onclick = null; // Remove the click event
            box.style.cursor = 'not-allowed'; // Change cursor style
        });
    }

    // Function to display victory message
    function displayVictoryMessage() {
        const victoryMessage = document.getElementById('victoryMessage');
        const victoryButton = document.getElementById('VicButton');
        victoryButton.style.display = 'inline';
        victoryMessage.style.display = 'block';
        victoryMessage.innerHTML = sentence;
    }

    // Dynamically generate boxes with images in a 3x3 grid
    const boxesContainer = document.getElementById('boxes');
    for (let i = 0; i < 9; i++) {
        const box = document.createElement('div');
        box.className = 'box';
        box.id = `box${i}`;
        box.style.backgroundImage = `url(${closedImage})`;
        box.onclick = () => boxClick(i);

        boxesContainer.appendChild(box);

        // Add a clear element after every third box to create rows
        if ((i + 1) % 3 === 0) {
            const clearElement = document.createElement('div');
            clearElement.className = 'row';
            boxesContainer.appendChild(clearElement);
        }
    }