import sgMail from '@sendgrid/mail';

// Initialize SendGrid with your API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req, res) => {
    // Parse the request body
    const { type, user_id, message } = req.body;

    if (type === 'email') {
        // Fetch user email from Supabase
        const { data: user, error } = await supabase
            .from('users')
            .select('email')
            .eq('id', user_id)
            .single();

        if (error) {
            return res.status(400).json({ error: 'User not found' });
        }

        // Send email using SendGrid
        const msg = {
            to: user.email, // Recipient email
            from: 'your-email@example.com', // Use a verified sender email in SendGrid
            subject: 'Mental Health Alert',
            text: message,
        };

        try {
            await sgMail.send(msg);
            return res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            console.error('SendGrid error:', error);
            return res.status(500).json({ error: 'Failed to send email' });
        }
    }

    return res.status(400).json({ error: 'Invalid trigger type' });
};