const validateName = (name, errors) => {
  if (!name || name.trim() === "") {
    errors.push("Full name is required");
  } else {
    const parts = name.trim().split(" ");

    if (parts.length < 2) {
      errors.push("Enter full name (First and Last name)");
    } else {
      for (let i = 0; i < parts.length; i++) {
        const word = parts[i];

        if (word.length < 3) {
          errors.push("Each name should be at least 3 letters");
        }

        if (word[0] !== word[0].toUpperCase()) {
          errors.push("First letter of each name must be capital");
        }
      }
    }
  }
};

const validateEmail = (email, errors) => {
  if (!email || email.trim() === "") {
    errors.push("Email is required");
  } else {
    if (!email.includes("@") || !email.includes(".")) {
      errors.push("Email must contain @ and .");
    }
  }
};

const validatePhone = (phone, errors) => {
  if (!phone || phone.trim() === "") {
    errors.push("Phone is required");
  } else {
    const cleanPhone = phone.replace(/\s+/g, "");

    if (!cleanPhone.startsWith("+91")) {
      errors.push("Phone must start with +91");
    } else {
      const numberPart = cleanPhone.slice(3);

      if (numberPart.length !== 10) {
        errors.push("Phone must be 10 digits after +91");
      }

      for (let i = 0; i < numberPart.length; i++) {
        if (isNaN(numberPart[i])) {
          errors.push("Phone must contain only numbers");
          break;
        }
      }
    }
  }
};

const validateCompany = (company, errors) => {
  if (company) {
    const value = company.trim();

    if (value.length < 3) {
      errors.push("Company name must be at least 3 characters");
    }

    let onlyNumbers = true;

    for (let i = 0; i < value.length; i++) {
      if (isNaN(value[i])) {
        onlyNumbers = false;
        break;
      }
    }

    if (onlyNumbers) {
      errors.push("Company name cannot be only numbers");
    }
  }
};

const validateStatus = (status, errors) => {
  const validStatus = ["New", "Contacted", "Qualified", "Converted", "Lost"];

  if (status) {
    let found = false;

    for (let i = 0; i < validStatus.length; i++) {
      if (status === validStatus[i]) {
        found = true;
        break;
      }
    }

    if (!found) {
      errors.push("Invalid status value");
    }
  }
};

const validateNotes = (notes, errors) => {
  if (notes) {
    if (notes.length > 500) {
      errors.push("Notes should be less than 500 characters");
    }
  }
};

export const validateLead = (data) => {
  let errors = [];

  validateName(data.name, errors);
  validateEmail(data.email, errors);
  validatePhone(data.phone, errors);
  validateCompany(data.company, errors);
  validateStatus(data.status, errors);
  validateNotes(data.notes, errors);

  if (errors.length > 0) {
    return errors;
  } else {
    return null;
  }
};
