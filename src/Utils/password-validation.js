export const passwordValidation = (value) => {
	const isPasswordErrors = [];
	if (value.length < 8) {
		isPasswordErrors.push('Длина пароля должна быть не меньше 8 символов. ');
	}
	if (!/^\S+$/.test(value)) {
		isPasswordErrors.push('Пароль не должен содержать пробелов. ');
	}
	if (!/[a-zA-Z]+/.test(value)) {
		isPasswordErrors.push('Пароль должен иметь хоть один латинский символ строчный или заглавный. ');
	}

	return isPasswordErrors.length > 0 ? isPasswordErrors : null;
};
