import * as yup from 'yup';

const regExpEmail = /^\S{2,}@\S{2,}\.[a-zA-Z]{2,10}$/;
const regExpPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const SchemeRegForm = yup.object().shape({
	email: yup.string().trim().required('Поле email обязательно').matches(regExpEmail, 'Неверный Email'),
	password: yup
		.string()
		.required('Поле пароль обязательно')
		.min(8, 'Пароль должен содержать минимум 8 символов')
		.matches(regExpPass, 'Пароль должен содержать латинские буквы и цифры'),
	repeatPassword: yup
		.string()
		.required('Поле повторите пароль обязательно')
		.oneOf([yup.ref('password')], 'Пароли не совпадают'),
});
