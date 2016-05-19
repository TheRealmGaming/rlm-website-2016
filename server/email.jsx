Accounts.emailTemplates.siteName = "The Realm Gaming";
Accounts.emailTemplates.from     = "The Realm Gaming <admin@the-realm-gaming.co.uk>";

Accounts.emailTemplates.verifyEmail = {
  subject() {
    return "[The Realm Gaming] Verify Your Email Address";
  },
  text( user, url ) {
    let emailAddress   = user.emails[0].address,
        urlWithoutHash = url.replace( '#/', '' ),
        supportEmail   = "admin@the-realm-gaming.co.uk",
        emailBody      = `To verify your email address (${emailAddress}) visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;

    return emailBody;
  }
};
