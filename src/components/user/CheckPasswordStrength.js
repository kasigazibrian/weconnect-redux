const checkPasswordStrength = score => {
  let cssClass = "";
  let message = "";

  switch (score) {
    case 0:
      return {
        cssClass: "weak",
        message: "Weak"
      };
    case 1:
      return {
        cssClass: "fair",
        message: "Fair"
      };
    case 2:
      return {
        cssClass: "good",
        message: "Good"
      };
    case 3:
      return {
        cssClass: "strong",
        message: "Strong"
      };
    case 4:
      return {
        cssClass: "very-strong",
        message: "Very Strong"
      };
    default:
      return {
        cssClass: cssClass,
        message: message
      };
  }
};

export default checkPasswordStrength;
