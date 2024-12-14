import nodemailer from 'nodemailer';

// Configure the transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Use TLS
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

// Utility function to send emails
export const sendMail = async (to, subject, htmlContent) => {
  try {
    const mailOptions = {
      from: '"Your App Name" <your-email@gmail.com>',
      to,
      subject,
      html: htmlContent,
    };

    if (to || !to) return;
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.messageId}`);
  } catch (error) {
    console.error(`Error sending email: ${error.message}`);
  }
};

// Template for new job application notification
export const jobApplicationTemplate = (applicantName, jobTitle) => `
  <h1>New Job Application</h1>
  <p>Dear Employer,</p>
  <p>${applicantName} has applied for the job position <strong>${jobTitle}</strong> that you posted.</p>
  <p>Click <a href="https://your-app.com/job/${jobTitle}">here</a> to view the application details.</p>
  <br>
  <p>Best regards,</p>
  <p>Your App Team</p>
`;

// Template for new job invitation notification
export const jobInvitationTemplate = (employerName, jobTitle) => `
  <h1>Job Invitation</h1>
  <p>Dear Applicant,</p>
  <p>${employerName} has invited you to apply for the job position <strong>${jobTitle}</strong>.</p>
  <p>Click <a href="https://your-app.com/job/${jobTitle}">here</a> to view the job details and apply.</p>
  <br>
  <p>Best regards,</p>
  <p>Your App Team</p>
`;

/* export const notif = async () => {
  // Send a job application notification
  const applicantName = 'John Doe';
  const jobTitle = 'Software Engineer';
  await sendMail(
    'employer-email@example.com',
    'New Job Application Received',
    jobApplicationTemplate(applicantName, jobTitle),
  );

  // Send a job invitation notification
  const employerName = 'TechCorp';
  await sendMail(
    'applicant-email@example.com',
    'Job Invitation Received',
    jobInvitationTemplate(employerName, jobTitle),
  );
};
 */
