import { defineStore } from "pinia"; // Importing defineStore from Pinia

// Define a new store named "translation"
export const useTranslationStore = defineStore("translation", {
  state: () => ({
    // State containing words in multiple languages
    words: {
      en: {
        // English words
        hello: "hello",
        world: "world",
        cat: "cat",
        dog: "dog",
        car: "car",
        house: "house",
        tree: "tree",
        sky: "sky",
        water: "water",
        fire: "fire",
        book: "book",
        phone: "phone",
        computer: "computer",
        music: "music",
        city: "city",
        food: "food",
        sun: "sun",
        moon: "moon",
        star: "star",
        flower: "flower",
        mountain: "mountain",
        river: "river",
        friend: "friend",
        love: "love",
        school: "school",
        teacher: "teacher",
        student: "student",
        family: "family",
        happiness: "happiness",
        sadness: "sadness",
        peace: "peace",
        war: "war",
        light: "light",
        dark: "dark",
      },
      ar: {
        // Arabic words
        hello: "مرحبا",
        world: "عالم",
        cat: "قطة",
        dog: "كلب",
        car: "سيارة",
        house: "بيت",
        tree: "شجرة",
        sky: "سماء",
        water: "ماء",
        fire: "نار",
        book: "كتاب",
        phone: "هاتف",
        computer: "حاسوب",
        music: "موسيقى",
        city: "مدينة",
        food: "طعام",
        sun: "شمس",
        moon: "قمر",
        star: "نجمة",
        flower: "زهرة",
        mountain: "جبل",
        river: "نهر",
        friend: "صديق",
        love: "حب",
        school: "مدرسة",
        teacher: "معلم",
        student: "طالب",
        family: "عائلة",
        happiness: "سعادة",
        sadness: "حزن",
        peace: "سلام",
        war: "حرب",
        light: "ضوء",
        dark: "ظلام",
      },
      ru: {
        // Russian words
        hello: "здравствуйте",
        world: "мир",
        cat: "кошка",
        dog: "собака",
        car: "машина",
        house: "дом",
        tree: "дерево",
        sky: "небо",
        water: "вода",
        fire: "огонь",
        book: "книга",
        phone: "телефон",
        computer: "компьютер",
        music: "музыка",
        city: "город",
        food: "еда",
        sun: "солнце",
        moon: "луна",
        star: "звезда",
        flower: "цветок",
        mountain: "гора",
        river: "река",
        friend: "друг",
        love: "любовь",
        school: "школа",
        teacher: "учитель",
        student: "студент",
        family: "семья",
        happiness: "счастье",
        sadness: "печаль",
        peace: "мир",
        war: "война",
        light: "свет",
        dark: "тьма",
      },
    },
    currentLanguage: "en", // Default current language
  }),
  getters: {
    // Function to get the first 10 words based on the selected language
    limitedWords: (state) => {
      const wordList = Object.keys(state.words[state.currentLanguage]); // Get the list of words for the current language
      return wordList.slice(0, 10); // Return the first 10 words
    },
  },
  actions: {
    // Set the current language
    setLanguage(language) {
      this.currentLanguage = language; // Update the current language
    },
    // Get the translation of a given word
    getTranslation(word) {
      return this.words[this.currentLanguage][word]; // Return the translation for the word in the current language
    },
  },
});
