<template>
  <div class="translation-container">
    <h1>Word Translation App</h1>

    <div class="language-selector">
      <!-- Language selection dropdown -->
      <label for="language">Select Language:</label>
      <select id="language" v-model="selectedLanguage" @change="changeLanguage">
        <option value="en">English</option>
        <option value="ar">Arabic</option>
        <option value="ru">Russian</option>
      </select>
    </div>

    <div class="word-list">
      <ul>
        <!-- List of words with their translations -->
        <li v-for="word in paginatedWords" :key="word">
          <span class="word">{{ word }}</span>
          <!-- Display the word -->
          <span class="translation">{{ translateWord(word) }}</span>
          <!-- Display the translation -->
          <button
            @click="speak(translateWord(word), selectedLanguage)"
            aria-label="Speak {{ translateWord(word) }}"
          >
            <!-- Button to speak the translated word -->
            <i class="fas fa-volume-up"></i>
          </button>
        </li>
      </ul>
    </div>

    <div class="pagination-controls">
      <!-- Pagination controls for navigating through pages -->
      <button
        @click="goToFirstPage"
        :disabled="currentPage === 1"
        aria-label="Go to first page"
      >
        <i class="fas fa-angle-double-left"></i> First
      </button>
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        aria-label="Go to previous page"
      >
        <i class="fas fa-angle-left"></i> Previous
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <!-- Display current page number -->
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        aria-label="Go to next page"
      >
        Next <i class="fas fa-angle-right"></i>
      </button>
      <button
        @click="goToLastPage"
        :disabled="currentPage === totalPages"
        aria-label="Go to last page"
      >
        Last <i class="fas fa-angle-double-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue"; // Importing reactive references and computed properties from Vue
import { useTranslationStore } from "../stores/translationStore"; // Importing the translation store

export default {
  setup() {
    const selectedLanguage = ref("en"); // Reactive reference for the selected language
    const currentPage = ref(1); // Reactive reference for the current page
    const wordsPerPage = 6; // Number of words to display per page
    const translationStore = useTranslationStore(); // Accessing the translation store

    // Compute total pages based on the number of words
    const totalPages = computed(() => {
      const totalWords = Object.keys(
        translationStore.words[selectedLanguage.value]
      ).length;
      return Math.ceil(totalWords / wordsPerPage); // Calculate total pages
    });

    // Change the selected language and reset the current page to 1
    const changeLanguage = () => {
      translationStore.setLanguage(selectedLanguage.value);
      currentPage.value = 1;
    };

    // Translate a word using the translation store
    const translateWord = (word) => {
      return translationStore.getTranslation(word);
    };

    // Compute the words to be displayed on the current page
    const paginatedWords = computed(() => {
      const wordList = Object.keys(
        translationStore.words[selectedLanguage.value]
      );
      const start = (currentPage.value - 1) * wordsPerPage; // Calculate start index
      const end = start + wordsPerPage; // Calculate end index
      return wordList.slice(start, end); // Return sliced array of words
    });

    // Navigate to the next page if available
    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    // Navigate to the previous page if available
    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    // Go to the first page
    const goToFirstPage = () => {
      currentPage.value = 1;
    };

    // Go to the last page
    const goToLastPage = () => {
      currentPage.value = totalPages.value;
    };

    // Speak the translated word using the Web Speech API
    const speak = (text, lang) => {
      const utterance = new SpeechSynthesisUtterance(text); // Create a new utterance for speech synthesis
      switch (lang) {
        case "en":
          utterance.lang = "en-US"; // Set language for English
          break;
        case "ar":
          utterance.lang = "ar-SA"; // Set language for Arabic
          break;
        case "ru":
          utterance.lang = "ru-RU"; // Set language for Russian
          break;
        default:
          utterance.lang = "en-US"; // Default to English
      }
      window.speechSynthesis.speak(utterance); // Speak the utterance
    };

    return {
      selectedLanguage,
      currentPage,
      totalPages,
      paginatedWords,
      changeLanguage,
      translateWord,
      nextPage,
      prevPage,
      goToFirstPage,
      goToLastPage,
      speak,
    };
  },
};
</script>

<style scoped lang="scss">
.translation-container {
  display: flex; /* Use flexbox for layout */
  flex-direction: column; /* Arrange children in a column */
  align-items: center; /* Center items horizontally */
  justify-content: center; /* Center items vertically */
  background-color: #ffffff; /* Change background to white for better contrast */
  padding: 30px; /* Padding around the container */
  border-radius: 15px; /* Rounded corners */
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15); /* Soft shadow effect */
  max-width: 80%; /* Max width of the container */
  margin: 50px auto; /* Center the container with margin */
  animation: fadeIn 1.5s ease-in-out; /* Fade-in animation */

  h1 {
    font-family: "Roboto", sans-serif; /* Font styling for the title */
    font-size: 28px; /* Title font size */
    color: #2d3748; /* Dark color for title for better contrast */
    margin-bottom: 20px; /* Space below the title */

    animation: slideDown 1.5s ease-in-out; /* Slide-down animation for title */
  }

  @media (max-width: 768px) {
    padding: 20px; /* Reduced padding for smaller screens */
    max-width: 90%; /* Adjust max width */
  }

  @media (max-width: 480px) {
    padding: 15px; /* Further reduced padding */
    max-width: 95%; /* Further adjust max width */
  }
}

.language-selector {
  display: flex; /* Use flexbox for layout */
  align-items: center; /* Align items vertically centered */
  flex-direction: column; /* Stack items vertically */
  margin-bottom: 30px; /* Space below the selector */
  gap: 15px; /* Space between elements */
  animation: fadeInUp 1s ease-in-out; /* Fade-in-up animation */

  label {
    font-family: "Roboto", sans-serif; /* Font for the label */
    font-size: 20px; /* Label font size */
    color: #4a5568; /* Dark color for the label for better contrast */
  }

  select {
    padding: 10px; /* Padding inside the select box */
    font-size: 16px; /* Font size for the select box */
    border: 2px solid #63b3ed; /* Border color */
    border-radius: 8px; /* Rounded corners */
    transition: border-color 0.3s ease; /* Smooth transition for border color */
    background-color: #ffffff; /* White background for better contrast */
    cursor: pointer; /* Pointer cursor on hover */

    &:focus {
      border-color: #3182ce; /* Change border color when focused */
    }

    &:hover {
      border-color: #2b6cb0; /* Change border color on hover */
    }

    @media (max-width: 480px) {
      font-size: 14px; /* Smaller font size for mobile */
      padding: 8px; /* Smaller padding for mobile */
    }
  }
}

.word-list {
  ul {
    list-style: none; /* Remove default list styling */
    padding: 0; /* Remove default padding */
    width: 100%; /* Full width for the list */
    display: flex; /* Use flexbox for layout */
    flex-direction: column; /* Stack list items vertically */
    gap: 15px; /* Space between list items */
    animation: fadeIn 1s ease-in-out; /* Fade-in animation */
  }

  li {
    display: flex; /* Use flexbox for list items */
    justify-content: center; /* Center content horizontally */
    align-items: center; /* Center content vertically */
    flex-direction: column; /* Stack content vertically */
    padding: 15px; /* Padding inside list items */
    background-color: #ffffff; /* White background for list items */
    border-radius: 12px; /* Rounded corners */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Soft shadow effect */
    transition: transform 0.5s, box-shadow 0.5s; /* Smooth transition for hover effect */
    gap: 25px; /* Space between content elements */
    width: 200px;

    &:hover {
      transform: translateY(-5px); /* Lift effect on hover */
      box-shadow: 0 6px 20px rgba(100, 149, 237, 0.3); /* Shadow effect on hover */
    }

    @media (max-width: 480px) {
      padding: 10px; /* Reduced padding for mobile */
    }
  }

  .word {
    font-family: "Roboto", sans-serif; /* Font for the word */
    font-size: 18px; /* Font size for the word */
    color: #2d3748; /* Dark color for the word for better contrast */
    cursor: pointer; /* Pointer cursor on hover */
    transition: color 0.3s, transform 0.3s; /* Smooth transition for hover effect */

    &:hover {
      color: #e53e3e; /* Change color on hover */
      transform: scale(1.05); /* Scale effect on hover */
    }

    @media (max-width: 480px) {
      font-size: 16px; /* Smaller font size for mobile */
    }
  }

  .translation {
    font-family: "Roboto", sans-serif; /* Font for the translation */
    font-size: 18px; /* Font size for the translation */
    color: #63b3ed; /* Light color for translation - consider darkening for better contrast */

    @media (max-width: 480px) {
      font-size: 16px; /* Smaller font size for mobile */
    }
  }

  button {
    background: none; /* No background for button */
    border: none; /* No border for button */
    font-size: 24px; /* Font size for button */
    cursor: pointer; /* Pointer cursor on hover */
    color: #4299e1; /* Color for button - consider darkening for better contrast */
    transition: color 0.3s, transform 0.3s; /* Smooth transition for hover effect */

    &:hover {
      color: #e53e3e; /* Change color on hover */
      transform: scale(1.1); /* Scale effect on hover */
    }

    @media (max-width: 480px) {
      font-size: 20px; /* Smaller font size for mobile */
    }
  }
}

.pagination-controls {
  display: flex; /* Use flexbox for layout */
  justify-content: center; /* Center controls horizontally */
  align-items: center; /* Align items vertically centered */
  gap: 10px; /* Space between controls */
  margin-top: 25px; /* Space above pagination controls */
  flex-wrap: wrap; /* Allow wrapping of controls on smaller screens */

  button {
    background-color: #4299e1; /* Background color for buttons */
    color: #ffffff; /* Text color for buttons - consider a darker text color */
    border: none; /* No border for buttons */
    padding: 8px 12px; /* Padding inside buttons */
    border-radius: 8px; /* Rounded corners */
    font-size: 14px; /* Font size for buttons */
    cursor: pointer; /* Pointer cursor on hover */
    transition: background-color 0.3s, transform 0.3s; /* Smooth transition for hover effect */

    &:hover {
      background-color: #2b6cb0; /* Change background color on hover */
      transform: scale(1.05); /* Scale effect on hover */
    }

    &:disabled {
      background-color: #a0aec0; /* Background color for disabled buttons */
      cursor: not-allowed; /* Not-allowed cursor for disabled buttons */
    }

    i {
      margin-right: 5px; /* Space between icon and text */
    }

    @media (max-width: 480px) {
      font-size: 12px; /* Smaller font size for mobile */
      padding: 6px 10px; /* Smaller padding for mobile */
    }
  }

  span {
    font-family: "Roboto", sans-serif; /* Font for page indicator */
    font-size: 16px; /* Font size for page indicator */
    color: #4a5568; /* Dark color for page indicator for better contrast */
  }
}

/* Keyframe animations for various effects */
@keyframes fadeIn {
  0% {
    opacity: 0; /* Start fully transparent */
  }
  100% {
    opacity: 1; /* End fully opaque */
  }
}

@keyframes fadeInUp {
  0% {
    opacity: 0; /* Start fully transparent */
    transform: translateY(20px); /* Start below */
  }
  100% {
    opacity: 1; /* End fully opaque */
    transform: translateY(0); /* End in original position */
  }
}

@keyframes slideDown {
  0% {
    opacity: 0; /* Start fully transparent */
    transform: translateY(-50px); /* Start above */
  }
  100% {
    opacity: 1; /* End fully opaque */
    transform: translateY(0); /* End in original position */
  }
}
</style>
