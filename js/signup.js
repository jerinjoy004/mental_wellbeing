// Initialize Supabase client correctly
const { createClient } = supabase;
const supabaseUrl = 'https://gqidhzjgmgmxsxtnaofp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxaWRoempnbWdteHN4dG5hb2ZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1NjEwMjYsImV4cCI6MjA1ODEzNzAyNn0.OYa8DL6BebkNosBEjIc95P8K_xzbueL5szFg1Uz-POg';
const supabaseClient = createClient(supabaseUrl, supabaseKey);

// Utility function to show error messages
function showError(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

// Sign Up Form Handler
document.addEventListener('DOMContentLoaded', () => {
    const signupFormElement = document.getElementById('signupFormElement');
    signupFormElement.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const termsAccepted = document.getElementById('terms').checked;

        // Validation
        if (!name || !email || !password || !confirmPassword) {
            showError('Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            showError('Passwords do not match');
            return;
        }

        if (!termsAccepted) {
            showError('Please accept the Terms of Service and Privacy Policy');
            return;
        }

        try {
            const { data, error } = await supabaseClient.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: name,
                    },
                },
            });

            if (error) throw error;

            alert('Registration successful! Please check your email for verification.');
            window.location.href = '../html/login.html';
        } catch (error) {
            showError('Error during registration: ' + error.message);
        }
    });

    // Check for existing session on page load
    checkSession();
});

// Session Check Function
async function checkSession() {
    const { data: { session }, error } = await supabaseClient.auth.getSession();
    if (session) {
        // If user is already logged in, redirect to dashboard
        window.location.href = '../html/assessment.html';
    }
}