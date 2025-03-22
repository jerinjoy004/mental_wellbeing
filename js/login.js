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

// Login Form Handler
document.addEventListener('DOMContentLoaded', () => {
    const loginFormElement = document.getElementById('loginFormElement');
    loginFormElement.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            const { data, error } = await supabaseClient.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            // Check if user has a profile
            const { data: profile, error: profileError } = await supabaseClient
                .from('profiles')
                .select('*')
                .eq('id', data.user.id)
                .single();

            if (profileError && profileError.code !== 'PGRST116') {
                throw profileError;
            }

            // Redirect based on profile existence
            if (!profile) {
                window.location.href = '../html/profile.html';
            } else {
                window.location.href = '../html/assessment.html';
            }
        } catch (error) {
            showError('Error during login: ' + error.message);
        }
    });

    // Password Reset Handler
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    forgotPasswordLink.addEventListener('click', async (e) => {
        e.preventDefault();
        const email = prompt('Please enter your email address:');

        if (email) {
            try {
                const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
                    redirectTo: `${window.location.origin}/mental_wellbeing/reset-password.html`,
                });

                if (error) throw error;
                alert('Password reset instructions have been sent to your email.');
            } catch (error) {
                showError('Error sending reset instructions: ' + error.message);
            }
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