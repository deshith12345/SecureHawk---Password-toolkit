# Password Security Toolkit

A comprehensive web-based tool for password security education and analysis. This project demonstrates practical cybersecurity concepts including password strength analysis, breach checking using the Have I Been Pwned API, and secure password generation.

## 🎯 Project Purpose

This project was created as a practical demonstration of cybersecurity principles for academic and portfolio purposes. It helps users understand password security through interactive tools and educational content.

## ✨ Features

### 1. Password Strength Checker
- Real-time password strength analysis
- Visual strength meter with color coding
- Detailed feedback on password weaknesses
- Entropy calculation
- Crack time estimation
- Detection of:
  - Sequential characters (123, abc)
  - Keyboard patterns (qwerty, asdf)
  - Common passwords
  - Repeating characters
  - Character variety (uppercase, lowercase, numbers, symbols)

### 2. Breach Checker
- Checks passwords against Have I Been Pwned database
- Uses k-Anonymity method for privacy protection
- Shows number of times password appeared in breaches
- Completely client-side hashing (password never leaves your browser)
- SHA-1 hashing for secure API queries

### 3. Password Generator
- Customizable password length (8-64 characters)
- Multiple character set options:
  - Uppercase letters (A-Z)
  - Lowercase letters (a-z)
  - Numbers (0-9)
  - Special symbols (!@#$%^&*)
- Option to exclude ambiguous characters
- Cryptographically secure random generation
- One-click copy to clipboard

### 4. Educational Content
- Common weak password patterns
- Crack time estimates by password length
- Understanding entropy
- Attack methods explanation
- Password best practices

## 🛠️ Technologies Used

- **HTML5** - Structure and semantic markup
- **CSS3** - Modern styling with gradients, animations, and responsive design
- **JavaScript (ES6+)** - Client-side logic and interactivity
- **Web Crypto API** - Secure password hashing
- **Have I Been Pwned API** - Breach checking
- **Font Awesome** - Icons

## 📋 Requirements

- Modern web browser with JavaScript enabled
- Internet connection (for breach checking feature)
- No server-side requirements (purely client-side)

## 🚀 Deployment Instructions for InfinityFree

### Step 1: Download Files
Download all the project files:
- `index.html`
- `style.css`
- `script.js`

### Step 2: Sign Up for InfinityFree
1. Go to [infinityfree.com](https://infinityfree.com)
2. Click "Sign Up" and create a free account
3. Verify your email address

### Step 3: Create a Website
1. Log in to your InfinityFree control panel
2. Click "Create Account"
3. Choose a subdomain (e.g., `yourname-password-toolkit.rf.gd`)
4. Complete the setup process

### Step 4: Access File Manager
1. In your control panel, click "Control Panel" for your website
2. Click on "Online File Manager" or "File Manager"
3. Navigate to the `htdocs` folder (this is your website's root directory)

### Step 5: Upload Files
1. Delete any existing files in `htdocs` (like default index.html)
2. Upload all three files:
   - `index.html`
   - `style.css`
   - `script.js`
3. Make sure all files are directly in the `htdocs` folder (not in a subfolder)

### Step 6: Set Permissions (Optional)
- Files should have 644 permissions by default
- If you encounter issues, right-click files and set permissions to 644

### Step 7: Test Your Website
1. Open your browser
2. Go to your chosen domain (e.g., `yourname-password-toolkit.rf.gd`)
3. Your Password Security Toolkit should now be live!

### Alternative: Using FTP
If you prefer FTP:
1. Get your FTP credentials from InfinityFree control panel
2. Use an FTP client like FileZilla
3. Connect to your server
4. Upload files to `/htdocs` directory

## 🔒 Security & Privacy

### Client-Side Processing
All password analysis happens in your browser. Passwords are never sent to any server except:
- The Have I Been Pwned API (using k-Anonymity method)

### k-Anonymity Method
When checking for breaches:
1. Password is hashed locally using SHA-1
2. Only the first 5 characters of the hash are sent to the API
3. API returns all hashes starting with those 5 characters
4. Matching happens locally in your browser
5. Your actual password is never transmitted

### No Data Storage
This tool does not store, log, or transmit any passwords you enter. Everything is processed client-side and forgotten when you close the page.

## 📱 Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+
- Opera 47+

## 🎓 Educational Use

This project is designed for educational purposes and can be used to:
- Demonstrate password security concepts
- Show practical implementation of security best practices
- Teach about web security and API integration
- Practice frontend development skills

## 📊 Project Structure

```
password-security-toolkit/
│
├── index.html          # Main HTML structure
├── style.css           # All styling and responsive design
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🎨 Customization

You can easily customize this project:

### Change Colors
Edit `style.css` and modify the CSS variables in `:root`:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #7c3aed;
    /* ... other colors */
}
```

### Add Features
- Modify `script.js` to add new password analysis rules
- Add new educational sections in `index.html`
- Integrate additional security APIs

### Branding
- Replace the header text in `index.html`
- Add your logo or personal branding
- Update footer with your information

## 🐛 Troubleshooting

### Website not loading
- Clear browser cache
- Check if all files are in the correct location (`htdocs`)
- Verify file names are exactly: `index.html`, `style.css`, `script.js`

### Breach checker not working
- Check browser console for errors
- Ensure you have an internet connection
- HIBP API might be temporarily down (rare)

### Styling issues
- Make sure `style.css` is in the same folder as `index.html`
- Check for browser compatibility
- Try a different browser

## 📝 Future Enhancements

Potential additions:
- Password strength history tracking (with local storage)
- Multi-language support
- Password manager integration
- Passphrase generator
- Security quiz/game
- Dark mode toggle
- Export security reports

## 👨‍💻 Author

Created by a 2nd year Cybersecurity student at SLIIT

## 📄 License

This project is free to use for educational purposes. If you use this in your portfolio or modify it, attribution is appreciated but not required.

## 🔗 Resources & References

- [Have I Been Pwned API](https://haveibeenpwned.com/API/v3)
- [OWASP Password Guidelines](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [NIST Password Guidelines](https://pages.nist.gov/800-63-3/sp800-63b.html)

## 🙏 Acknowledgments

- Troy Hunt for the Have I Been Pwned API
- Font Awesome for icons
- InfinityFree for free hosting

---

**Note for Internship Applications:**
This project demonstrates understanding of:
- Web security principles
- API integration
- Client-side cryptography
- User experience design
- Security education
- Best practices in password management
