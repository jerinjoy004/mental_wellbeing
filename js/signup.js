// Initialize Supabase client correctly
const supabaseUrl = 'https://gqidhzjgmgmxsxtnaofp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxaWRoempnbWdteHN4dG5hb2ZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1NjEwMjYsImV4cCI6MjA1ODEzNzAyNn0.OYa8DL6BebkNosBEjIc95P8K_xzbueL5szFg1Uz-POg'
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey)

// Utility function to show error messages
function showError(message) {
    const errorMessage = document.getElementById('error-message')
    errorMessage.textContent = message
    errorMessage.classList.remove('hidden')
}

// Sign Up Form Handler
document.addEventListener('DOMContentLoaded', () => {
    const signupFormElement = document.getElementById('signupFormElement')
    signupFormElement.addEventListener('submit', async (e) => {
        e.preventDefault()

        const name = document.getElementById('signupName').value
        const email = document.getElementById('signupEmail').value
        const password = document.getElementById('signupPassword').value
        const confirmPassword = document.getElementById('confirmPassword').value
        const termsAccepted = document.getElementById('terms').checked

        // Validation
        if (!name || !email || !password || !confirmPassword) {
            showError('Please fill in all fields')
            return
        }

        if (password !== confirmPassword) {
            showError('Passwords do not match')
            return
        }

        if (!termsAccepted) {
            showError('Please accept the Terms of Service and Privacy Policy')
            return
        }

        try {
            // Sign up the user
            const { data: authData, error: authError } = await supabaseClient.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: name
                    }
                }
            })

            if (authError) {
                // Handle specific error cases
                if (authError.message.includes('rate limit')) {
                    showError('Too many signup attempts. Please try again in a few minutes.')
                    return
                }
                throw authError
            }

            if (!authData.user) {
                showError('Signup failed. Please try again.')
                return
            }

            // After successful signup, create entry in users table
            const { error: userError } = await supabaseClient
                .from('users')
                .insert([
                    {
                        id: authData.user.id,
                        full_name: name,
                        email: email,
                        assessments_taken: 0,
                        wellness_score: 0,
                        resources_used: 0
                    }
                ])

            if (userError) throw userError

            alert('Registration successful! Please check your email for verification.')
            window.location.href = '../html/login.html'
        } catch (error) {
            console.error('Error:', error)
            if (error.message.includes('rate limit')) {
                showError('Too many signup attempts. Please try again in a few minutes.')
            } else if (error.message.includes('already registered')) {
                showError('This email is already registered. Please try logging in instead.')
            } else {
                showError('Error during registration. Please try again later.')
            }
        }
    })

    // Check for existing session on page load
    checkSession()
})

// Session Check Function
async function checkSession() {
    try {
        const { data: { session }, error } = await supabaseClient.auth.getSession()
        if (error) throw error
        if (session) {
            window.location.href = '../html/assessment.html'
        }
    } catch (error) {
        console.error('Session check error:', error)
    }
}