export const emailValidation = (value) =>
	/^\S{2,}@\S{2,}\.[a-zA-Z]{2,10}$/.test(value) ? null : ['Неправильный Email'];
