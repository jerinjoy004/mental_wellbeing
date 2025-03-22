// Sample suggestions data
const suggestions = [
  "Try a 10-minute mindfulness meditation to reduce stress.",
  "Take a short walk outside to clear your mind.",
  "Write down three things you’re grateful for today.",
  "Practice deep breathing exercises for 5 minutes.",
  "Connect with a friend or loved one for a quick chat."
];

// Sample resources data
const resources = [
  { name: "National Tele Mental Health Programme of India", url: "https://telemanas.mohfw.gov.in/home" },
  { name: "National Health Mission", url: "https://arogyakeralam.gov.in/" },
  { name: "Kerala State Mental Health Authority", url: "http://www.ksmha.org/index.html" }
];

// Detailed content for each feature
const featureDetails = {
  "exercise": {
      title: "How Does Exercise Improve Mental Health?",
      content: `
          <p>Exercise is not just about aerobic capacity and muscle size. Sure, exercise can improve your physical health and your physique, trim your waistline, improve your sex life, and even add years to your life. But that’s not what motivates most people to stay active.</p>
          <p>People who exercise regularly tend to do so because it gives them an enormous sense of well-being. They feel more energetic throughout the day, sleep better at night, have sharper memories, and feel more relaxed and positive about themselves and their lives. And it’s also a powerful medicine for many common mental health challenges.</p>
          <p>Regular exercise can have a profoundly positive impact on depression, anxiety, and ADHD. It also relieves stress, improves memory, helps you sleep better, and boosts your overall mood. And you don’t have to be a fitness fanatic to reap the benefits. Research indicates that modest amounts of exercise can make a real difference.</p>
          <p>No matter your age or fitness level, you can learn to use exercise as a powerful tool to deal with mental health problems, improve your energy and outlook, and get more out of life.</p>
      `
  },
  "yoga": {
      title: "How Does Yoga Improve Mental Health?",
      content: `
          <p>Yoga is a mind-body practice that combines physical poses, controlled breathing, and meditation or relaxation. It’s much more than just a workout—it’s a holistic approach to improving mental and emotional well-being.</p>
          <p>Practicing yoga regularly can significantly reduce stress by lowering cortisol levels, the stress hormone. It promotes relaxation by activating the parasympathetic nervous system, which helps you feel calm and centered. Yoga also enhances mindfulness, encouraging you to stay present in the moment, which can reduce symptoms of anxiety and depression.</p>
          <p>Additionally, yoga improves emotional resilience by fostering a deeper connection between mind and body. It can help you manage negative emotions, improve self-awareness, and cultivate a sense of inner peace. The meditative aspects of yoga also enhance focus and concentration, making it easier to handle daily challenges.</p>
          <p>Whether you’re a beginner or an experienced practitioner, yoga offers a gentle yet powerful way to support your mental health, improve your mood, and find balance in your life.</p>
      `
  },
  "healthy-eating": {
      title: "How Does Healthy & Mindful Eating Improve Mental Health?",
      content: `
          <p>What you eat doesn’t just affect your physical health—it has a profound impact on your mental well-being. A balanced diet rich in nutrients can support brain function, stabilize mood, and reduce the risk of mental health disorders.</p>
          <p>Eating foods high in omega-3 fatty acids (like salmon and walnuts), antioxidants (like berries), and B vitamins (like leafy greens) can enhance cognitive function and protect against depression. A diet low in processed foods and sugar helps prevent mood swings by stabilizing blood sugar levels. Mindful eating—paying attention to what and how you eat—can also reduce stress by fostering a healthier relationship with food.</p>
          <p>Healthy eating supports the gut-brain axis, a communication network between your gut and brain. A balanced gut microbiome, nurtured by foods like yogurt, fiber-rich vegetables, and whole grains, can positively influence mood and reduce anxiety. Conversely, poor dietary choices can lead to inflammation, which is linked to depression and other mental health issues.</p>
          <p>By choosing nutrient-dense foods and eating mindfully, you can nourish your body and mind, improve emotional stability, and enhance your overall mental health.</p>
      `
  },
  "meditation": {
      title: "How Does Meditation Improve Mental Health?",
      content: `
          <p>Meditation is a practice that involves focusing the mind to achieve a state of calm and clarity. It’s a powerful tool for improving mental health, offering benefits that can transform your emotional and psychological well-being.</p>
          <p>Regular meditation reduces stress by lowering cortisol levels and activating the body’s relaxation response. It can significantly decrease symptoms of anxiety and depression by helping you develop a more positive outlook and greater emotional resilience. Meditation also improves focus and concentration by training your mind to stay present, which can enhance productivity and reduce feelings of overwhelm.</p>
          <p>One of the key benefits of meditation is its ability to increase self-awareness. By observing your thoughts without judgment, you can gain insight into your emotions and thought patterns, making it easier to manage negative feelings. Meditation also promotes better sleep by calming the mind and reducing insomnia, which is often linked to stress and anxiety.</p>
          <p>Even just 5-10 minutes of daily meditation can make a difference. Whether through mindfulness, guided sessions, or breathing exercises, meditation offers a simple yet effective way to support your mental health and find inner peace.</p>
      `
  }
};

// Suggestions functionality
let currentSuggestionIndex = 0;
const suggestionText = document.getElementById('suggestion-text');
const prevSuggestionBtn = document.getElementById('prev-suggestion');
const nextSuggestionBtn = document.getElementById('next-suggestion');

function displaySuggestion() {
  suggestionText.textContent = suggestions[currentSuggestionIndex];
}

prevSuggestionBtn.addEventListener('click', () => {
  currentSuggestionIndex = (currentSuggestionIndex - 1 + suggestions.length) % suggestions.length;
  displaySuggestion();
});

nextSuggestionBtn.addEventListener('click', () => {
  currentSuggestionIndex = (currentSuggestionIndex + 1) % suggestions.length;
  displaySuggestion();
});

// Resources functionality
const resourcesList = document.getElementById('resources-list');

resources.forEach(resource => {
  const li = document.createElement('li');
  li.innerHTML = `<a href="${resource.url}" target="_blank">${resource.name}</a>`;
  resourcesList.appendChild(li);
});

// Initialize suggestion
displaySuggestion();

// Learn More Modal functionality
const learnMoreModal = document.getElementById('learn-more-modal');
const modalTitle = document.getElementById('modal-title');
const modalContentText = document.getElementById('modal-content-text');
const closeModal = document.getElementById('close-modal');
const learnMoreButtons = document.querySelectorAll('.learn-more-btn');

learnMoreButtons.forEach(button => {
  button.addEventListener('click', () => {
      const feature = button.getAttribute('data-feature');
      const details = featureDetails[feature];
      if (details) {
          modalTitle.textContent = details.title;
          modalContentText.innerHTML = details.content;
          learnMoreModal.style.display = 'block';
      }
  });
});

closeModal.addEventListener('click', () => {
  learnMoreModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === learnMoreModal) {
      learnMoreModal.style.display = 'none';
  }
});