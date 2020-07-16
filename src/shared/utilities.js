export const updateObject = (oldObj, updatedProps) => {
  return {
    ...oldObj,
    ...updatedProps,
  };
};

export const validate = (value, rules) => {
  let isValid = true;

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }
  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }
  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }
  if (rules.isEmail) {
    isValid = value.includes("@");
  }
  return isValid;
};
