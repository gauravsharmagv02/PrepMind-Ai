function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim().toLowerCase());
}

function validateRegisterInput({ name, email, password }) {
  const errors = [];
  if (!name || typeof name !== 'string' || !name.trim()) {
    errors.push('Full name is required.');
  }
  if (!email || !isValidEmail(email)) {
    errors.push('A valid email address is required.');
  }
  if (!password || typeof password !== 'string' || password.length < 6) {
    errors.push('Password must be at least 6 characters long.');
  }
  return {
    isValid: errors.length === 0,
    errors
  };
}

function validateLoginInput({ email, password }) {
  const errors = [];
  if (!email || !isValidEmail(email)) {
    errors.push('A valid email address is required.');
  }
  if (!password || typeof password !== 'string' || !password.trim()) {
    errors.push('Password is required.');
  }
  return {
    isValid: errors.length === 0,
    errors
  };
}

module.exports = {
  isValidEmail,
  validateRegisterInput,
  validateLoginInput
};
