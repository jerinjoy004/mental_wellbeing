const SUPABASE_URL = 'https://gqidhzjgmgmxsxtnaofp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxaWRoempnbWdteHN4dG5hb2ZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1NjEwMjYsImV4cCI6MjA1ODEzNzAyNn0.OYa8DL6BebkNosBEjIc95P8K_xzbueL5szFg1Uz-POg'; 

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Signup
document.getElementById('signup-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  const { user, error } = await supabase.auth.signUp({ email, password });
  if (error) alert(error.message);
  else {
    alert('Signup successful! Please login.');
    window.location.href = '../html/profile2.html';
  }
});

// Login
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const { user, error } = await supabase.auth.signIn({ email, password });
  if (error) alert(error.message);
  else window.location.href = '../html/profile2.html';
});

// Profile Form Submission
document.getElementById('profile-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const dob = document.getElementById('dob').value;
  const lifelineName = document.getElementById('lifeline-name').value;
  const lifelineEmail = document.getElementById('lifeline-email').value;

  const { data: { user } } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from('users')
    .upsert([
      {
        id: user.id,
        email: user.email,
        name,
        dob,
        lifeline_name: lifelineName,
        lifeline_email: lifelineEmail,
      },
    ]);

  if (error) alert(error.message);
  else {
    alert('Profile updated successfully!');
    loadProfileData();
  }
});

// Load Profile Data
async function loadProfileData() {
  const { data: { user } } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) alert(error.message);
  else if (data) {
    document.getElementById('profile-data').innerHTML = `
      <p>Name: ${data.name}</p>
      <p>DOB: ${data.dob}</p>
      <p>Lifeline Name: ${data.lifeline_name}</p>
      <p>Lifeline Email: ${data.lifeline_email}</p>
    `;
  }
}

// Redirect to Assessment Page
document.getElementById('assessment-button').addEventListener('click', () => {
  window.location.href = '../html/assessment.html';
});

// Check if user is logged in
async function checkAuth() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) window.location.href = 'index.html';
}

// Run on profile page load
if (window.location.pathname.includes('../html/profile2.html')) {
  checkAuth();
  loadProfileData();
}