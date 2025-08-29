// 代码生成时间: 2025-08-29 17:04:22
 * Features:
 * - Basic validation checks (non-empty, email, password match)
 * - Easy to extend with more complex validation rules
 * - Error handling for invalid data
 */

class FormValidator {
  // Validates that a form field is not empty
  static validateNotEmpty(fieldValue) {
    if (!fieldValue.trim()) {
      return { isValid: false, message: 'This field cannot be empty.' };
    }
    return { isValid: true, message: '' };
  }

  // Validates that a field contains a valid email address
  static validateEmail(fieldValue) {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(fieldValue)) {
      return { isValid: false, message: 'Please enter a valid email address.' };
    }
    return { isValid: true, message: '' };
  }

  // Validates that two fields match (e.g., password and password confirmation)
  static validateMatch(firstField, secondField) {
    if (firstField !== secondField) {
      return { isValid: false, message: 'The fields do not match.' };
    }
    return { isValid: true, message: '' };
  }

  // Validates the entire form
  static validateForm(formData) {
    const errors = [];

    // Validate non-empty fields
    Object.keys(formData).forEach(field => {
      const validationResult = FormValidator.validateNotEmpty(formData[field]);
      if (!validationResult.isValid) {
        errors.push({ field, message: validationResult.message });
      }
    });

    // Validate email format
    const emailResult = FormValidator.validateEmail(formData.email);
    if (!emailResult.isValid) {
      errors.push({ field: 'email', message: emailResult.message });
    }

    // Validate password match
    if (formData.password && formData.confirmPassword) {
      const matchResult = FormValidator.validateMatch(formData.password, formData.confirmPassword);
      if (!matchResult.isValid) {
        errors.push({ field: 'confirmPassword', message: matchResult.message });
      }
    }

    return errors.length > 0 ? { isValid: false, errors } : { isValid: true, errors: [] };
  }
}

// Example usage:
// const formData = { name: 'John Doe', email: 'john.doe@example.com', password: 'securePass123', confirmPassword: 'securePass123' };
// const validationResult = FormValidator.validateForm(formData);
// if (validationResult.isValid) {
//   console.log('Form is valid!');
// } else {
//   console.error('Form validation errors:', validationResult.errors);
// }