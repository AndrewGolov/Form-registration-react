import { useState, useRef, useEffect } from 'react';
import styles from './Form.module.css';
import { Field } from '../Field/Field.jsx';
import { Btn } from '../Btn/Btn.jsx';
import { emailValidation } from '../../Validators/email-validation.js';
import { passwordValidation } from '../../Validators/password-validation.js';

const sendData = (data) => {
	if (!data) {
		console.error('Ошибка данных');
		return;
	} else {
		console.log(data);
	}
};

export function Form(props) {
	const [dataForm, setDataForm] = useState({
		email: { value: '', isEdit: false, errors: [] },
		password: { value: '', isEdit: false, errors: [] },
		repeatPassword: { value: '', isEdit: false, errors: [] },
	});
	const submitBtnRegFormRef = useRef(null);

	const onChangeField =
		(fieldName) =>
		({ target }) =>
			setDataForm((prev) => ({
				...prev,
				[fieldName]: { ...prev[fieldName], value: target.value, isEdit: true, errors: [] },
			}));
	const onBlurField = (fieldName) => () => {
		if (!dataForm[fieldName].isEdit) return;
		if (fieldName === 'email') {
			const validEmail = emailValidation(dataForm.email.value);
			validEmail !== null
				? setDataForm((prev) => ({ ...prev, email: { ...prev.email, errors: [...validEmail] } }))
				: setDataForm((prev) => ({ ...prev, email: { ...prev.email, errors: [] } }));
		}
		if (fieldName === 'password') {
			const validPassword = passwordValidation(dataForm.password.value);

			validPassword !== null
				? setDataForm((prev) => ({ ...prev, password: { ...prev.password, errors: [...validPassword] } }))
				: setDataForm((prev) => ({ ...prev, password: { ...prev.password, errors: [] } }));
		}
		if (fieldName === 'repeatPassword') {
			const validPassword = passwordValidation(dataForm.repeatPassword.value);
			validPassword !== null || dataForm.repeatPassword.value !== dataForm.password.value
				? setDataForm((prev) => ({
						...prev,
						repeatPassword: { ...prev.repeatPassword, errors: ['Пароли не совпадают '] },
					}))
				: setDataForm((prev) => ({ ...prev, repeatPassword: { ...prev.repeatPassword, errors: [] } }));
		}
	};

	const onSubmitRegForm = (event) => {
		event.preventDefault();
		sendData({ email: dataForm.email.value, password: dataForm.password.value });
		setDataForm({
			email: { value: '', isEdit: false, errors: [] },
			password: { value: '', isEdit: false, errors: [] },
			repeatPassword: { value: '', isEdit: false, errors: [] },
		});
	};

	const isValidForm =
		dataForm.email.value &&
		dataForm.password.value &&
		dataForm.repeatPassword.value &&
		dataForm.email.errors.length === 0 &&
		dataForm.password.errors.length === 0 &&
		dataForm.repeatPassword.value === dataForm.password.value &&
		dataForm.repeatPassword.errors.length === 0;
	useEffect(() => {
		if (isValidForm) {
			submitBtnRegFormRef.current.focus();
		}
	}, [isValidForm]);

	return (
		<div className={styles.regFormWrapper}>
			<form className={styles.regForm} onSubmit={onSubmitRegForm}>
				<h2 className={styles.regFormTitle}>{props.title}</h2>

				<Field
					type="email"
					name="email"
					placeholder="Введите email"
					onChange={onChangeField('email')}
					onBlur={onBlurField('email')}
					value={dataForm.email.value}
					newErrors={dataForm.email.errors}
				/>
				<Field
					type="password"
					name="password"
					placeholder="Введите пароль"
					onChange={onChangeField('password')}
					onBlur={onBlurField('password')}
					value={dataForm.password.value}
					newErrors={dataForm.password.errors}
				/>
				<Field
					type="password"
					name="repeatPassword"
					placeholder="Повторите пароль"
					onChange={onChangeField('repeatPassword')}
					onBlur={onBlurField('repeatPassword')}
					value={dataForm.repeatPassword.value}
					newErrors={dataForm.repeatPassword.errors}
				/>

				<Btn
					ref={submitBtnRegFormRef}
					type="submit"
					disabled={!isValidForm}
					value={props.submitText}
					className={styles.submitBtn}
				/>
			</form>
		</div>
	);
}
