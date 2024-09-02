document.addEventListener('DOMContentLoaded', () => {
    const barAlphabet = document.querySelector('#bar-content-alphabet');
    const barNumbers = document.querySelector('#bar-content-numbers');
    const tableAlphabet = document.querySelector('bar-table-alphabet');
    const tableNumbers = document.querySelector('bar-table-numbers');
    const contentAlphabet = document.getElementById('content-alphabet');
    const contentNumbers = document.getElementById('content-numbers');
    const selectedImageAlphabet = document.getElementById('selected-image-alphabet');
    const videoLinkAlphabet = document.getElementById('video-link-alphabet');
    const selectedImageNumbers = document.getElementById('selected-image-numbers');
    const videoLinkNumbers = document.getElementById('video-link-numbers');
    const lessons = document.querySelectorAll('#bar-content-alphabet button');
    const videoContainer = document.getElementById('video-link-alphabet');
    const testHandSignButton = document.getElementById('test-hand-sign-button');

    // Hide image from start
    contentAlphabet.style.display = 'none';
    contentNumbers.style.display = 'none';

    // Toggle bar visibility
    document.querySelector('#bar-alphabet').addEventListener('click', () => {
        toggleBar(barAlphabet, contentAlphabet);
    });
    document.querySelector('#bar-numbers').addEventListener('click', () => {
        toggleBar(barNumbers, contentNumbers);
    });

    // Button click event for alphabet bar
    barAlphabet.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const letter = event.target.getAttribute('data-letter');
            updateContent(letter, null, 'alphabet');
        }
    });

    // Button click event for numbers bar
    barNumbers.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const number = event.target.getAttribute('data-number');
            updateContent(null, number, 'numbers');
        }
    });

    // Hide image and video when bar is collapsed
    function toggleBar(bar, content) {
        const isVisible = bar.style.display === 'block';
        bar.style.display = isVisible ? 'none' : 'block';
        content.style.display = 'none';
    }
    
    // Select all tabs and apply the constant blue glow
    const tabs = document.querySelectorAll('.bar');
    tabs.forEach(tab => {
        tab.classList.add('blue-glow');
    });

    // Apply the pulsating glow to the first tab initially
    const alphabetTab = document.getElementById('bar-alphabet');
    alphabetTab.classList.add('pulsating-glow');

    const lessonButtonsAlphabet = document.querySelectorAll('#bar-content-alphabet button');
    const lessonButtonsNumbers = document.querySelectorAll('#bar-content-numbers button');

    // Tracking lesson completion
    const completedLessons = {
        alphabet: new Set(),
        numbers: new Set()
    };

    // Add event listeners to lesson buttons for the alphabet tab
    lessonButtonsAlphabet.forEach(button => {
        button.addEventListener('click', () => {
            const lesson = button.getAttribute('data-letter');
            completedLessons.alphabet.add(lesson);
            checkCompletion('alphabet');
        });
    });

    // Add event listeners to lesson buttons for the numbers tab
    lessonButtonsNumbers.forEach(button => {
        button.addEventListener('click', () => {
            const lesson = button.getAttribute('data-number');
            completedLessons.numbers.add(lesson);
            checkCompletion('numbers');
        });
    });

    let currentLessonIndex = 0;

    // Initialize the first lesson to glow
    lessons[currentLessonIndex].classList.add('active-lesson');

    // Add event listeners to all lesson buttons
    lessons.forEach((lesson, index) => {
        lesson.addEventListener('click', () => {
            if (index === currentLessonIndex) {
                // Simulate video play
                const letter = lesson.getAttribute('data-letter');
                const videoUrl = `videos/${letter}.mp4`;

                videoContainer.innerHTML = `<iframe width="560" height="315" src="${videoUrl}" frameborder="0" allowfullscreen></iframe>`;

                // Mark the lesson as completed
                lesson.classList.remove('active-lesson');
                lesson.classList.add('completed-lesson');

                // Show "Check Sign Accuracy" button
                showCheckSignAccuracy();

                // Move to the next lesson
                if (currentLessonIndex < lessons.length - 1) {
                    currentLessonIndex++;
                    lessons[currentLessonIndex].classList.add('active-lesson');
                }
            }
        });
    });

    // Function to handle the "Check Sign Accuracy" button click
    function showCheckSignAccuracy() {
        testHandSignButton.addEventListener('click', () => {
            alert('This will test your hand sign using the ML model.');
            // Redirect to the actual page or model when ready
            // window.location.href = 'path_to_your_ml_model_page';
        });
    }

    function checkCompletion(tabType) {
        let isCompleted = false;

        if (tabType === 'alphabet') {
            isCompleted = completedLessons.alphabet.size === lessonButtonsAlphabet.length;
            if (isCompleted) {
                alphabetTab.classList.remove('pulsating-glow');
                const numbersTab = document.getElementById('bar-numbers');
                numbersTab.classList.add('pulsating-glow');
            }
        } else if (tabType === 'numbers') {
            isCompleted = completedLessons.numbers.size === lessonButtonsNumbers.length;
            if (isCompleted) {
                const numbersTab = document.getElementById('bar-numbers');
                numbersTab.classList.remove('pulsating-glow');
                // Apply the pulsating-glow to the next tab if any
            }
        }
    }

    function updateContent(letter, number, type) {
        if (type === 'alphabet') {
            const imageUrl = `images/${letter}.jpg`;
            const videoUrl = `images/${letter}.mp4`;
            
            selectedImageAlphabet.src = imageUrl;
            selectedImageAlphabet.style.display = 'block';
            videoLinkAlphabet.innerHTML = `<iframe width="560" height="315" src="${videoUrl}" frameborder="0" allowfullscreen></iframe>`;
            contentAlphabet.style.display = 'block';            
        } else if (type === 'numbers') {
            const imageUrl = `images/numberTable.jpg`;
            const videoUrl = `images/${number}.mp4`;

            selectedImageNumbers.src = imageUrl;
            selectedImageNumbers.style.display = 'block';
            videoLinkNumbers.innerHTML = `<iframe width="560" height="315" src="${videoUrl}" frameborder="0" allowfullscreen></iframe>`;
            contentNumbers.style.display = 'block';
        }
    }
});
