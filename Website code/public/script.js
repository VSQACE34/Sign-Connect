// Function to toggle content visibility and rotate the triangle
function toggleContent(level) {
    var content = document.getElementById('content-' + level);
    var toggleBtn = content.previousElementSibling.querySelector('.toggle-btn');
    if (content.style.display === 'block') {
        content.style.display = 'none';
        toggleBtn.style.transform = 'rotate(0deg)'; // Right-pointing triangle
    } else {
        content.style.display = 'block';
        toggleBtn.style.transform = 'rotate(90deg)'; // Down-pointing triangle
    }
}

// Function to show the popup
function showPopup(number, event) {
    event.stopPropagation(); // Prevent the level from collapsing when clicking on a block
    var block = document.getElementById('block-' + number);
    if (block && !block.classList.contains('disabled')) {
        document.getElementById('popup').style.display = 'block';
        document.getElementById('sign-image').src = 'images/numberTable.jpg';
        document.getElementById('sign-video').src = 'images/' + number + '.mp4';
    }
}

// Function to close the popup
function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

// Function to test sign and move to the next
function testSign() {
    var currentBlock = document.querySelector('.block.active');
    if (currentBlock) {
        currentBlock.classList.remove('active');
        currentBlock.classList.add('completed');
        var nextBlock = currentBlock.nextElementSibling;
        if (nextBlock && nextBlock.classList.contains('disabled')) {
            nextBlock.classList.remove('disabled');
            nextBlock.classList.add('active');
        }
    }

    // Check if all blocks in the current level are completed
    var allCompleted = true;
    var blocks = currentBlock.parentNode.querySelectorAll('.block');
    blocks.forEach(function(block) {
        if (!block.classList.contains('completed')) {
            allCompleted = false;
        }
    });

    // If all blocks in the level are completed, unlock the next level
    if (allCompleted) {
        var currentLevel = currentBlock.closest('.content').id.split('-')[1];
        var nextLevel = parseInt(currentLevel) + 1;
        var nextBlocks = document.querySelectorAll('#content-' + nextLevel + ' .block');
        nextBlocks.forEach(function(block) {
            block.classList.remove('disabled');
        });
    }

    // Close the popup
    closePopup();
}

// Function to show disclaimer
function showDisclaimer(event) {
    event.stopPropagation(); // Prevent other events from triggering
    var disclaimer = document.getElementById('disclaimer');
    disclaimer.style.left = event.clientX + 'px';
    disclaimer.style.top = event.clientY + 'px';
    disclaimer.style.display = 'block';
    setTimeout(function() {
        disclaimer.style.display = 'none';
    }, 2000); // Hide the disclaimer after 2 seconds
}

// Add event listeners for the tooltip
document.querySelectorAll('.toggle-btn').forEach(function(btn) {
    btn.addEventListener('mouseover', function(event) {
        var tooltip = event.target.nextElementSibling;
        tooltip.style.display = 'block';
    });

    btn.addEventListener('mouseout', function(event) {
        var tooltip = event.target.nextElementSibling;
        tooltip.style.display = 'none';
    });
});
