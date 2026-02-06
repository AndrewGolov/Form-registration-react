import { useState, useRef } from 'react';
import styles from './Form.module.css';
import { Field } from '../Field/Field.jsx';
import { Btn } from '../Btn/Btn.jsx';
import { emailValidation } from '../../Utils/email-validation.js';
import { passwordValidation } from '../../Utils/password-validation.js';

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

	const onChangeEmail = ({ target }) =>
		setDataForm((prev) => ({ ...prev, email: { ...prev.email, value: target.value, isEdit: true, errors: [] } }));

	const onChangePassword = ({ target }) =>
		setDataForm((prev) => ({
			...prev,
			password: { ...prev.password, value: target.value, isEdit: true, errors: [] },
		}));

	const onChangeRepeatPassword = ({ target }) =>
		setDataForm((prev) => ({
			...prev,
			repeatPassword: { ...prev.repeatPassword, value: target.value, isEdit: true, errors: [] },
		}));

	const onBlurEmail = () => {
		const newErrMailArr = [];
		const validEmail = emailValidation(dataForm.email.value);

		if (dataForm.email.isEdit) {
			if (validEmail !== null) {
				newErrMailArr.push(validEmail);
			}
			setDataForm((prev) => ({ ...prev, email: { ...prev.email, errors: newErrMailArr } }));
		} else setDataForm((prev) => ({ ...prev, email: { ...prev.email, errors: [] } }));
	};
	const onBlurPassword = () => {
		const newErrPasswordArr = [];
		const validPassword = passwordValidation(dataForm.password.value);

		if (dataForm.password.isEdit) {
			if (validPassword !== null) {
				newErrPasswordArr.push(validPassword);
			}
			setDataForm((prev) => ({ ...prev, password: { ...prev.password, errors: newErrPasswordArr } }));
		} else setDataForm((prev) => ({ ...prev, password: { ...prev.password, errors: [] } }));
	};
	const onBlurRepeatPassword = () => {
		const newErrRepeatPasswordArr = [];

		if (dataForm.repeatPassword.isEdit) {
			if (dataForm.repeatPassword.value !== dataForm.password.value) {
				newErrRepeatPasswordArr.push('Пароли не совпадают ');
			}
			setDataForm((prev) => ({
				...prev,
				repeatPassword: { ...prev.repeatPassword, errors: newErrRepeatPasswordArr },
			}));
		} else {
			setDataForm((prev) => ({ ...prev, repeatPassword: { ...prev.repeatPassword, errors: [] } }));
			submitBtnRegFormRef.current.focus();
		}
		submitBtnRegFormRef.current.focus();
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
		dataForm.repeatPassword.errors.length === 0;

	const isError = (data, nameField) =>
		data[nameField].isEdit && data[nameField].errors.length > 0 ? data[nameField].errors : null;

	return (
		<div className={styles.regFormWrapper}>
			<form className={styles.regForm} onSubmit={onSubmitRegForm}>
				<h2 className={styles.regFormTitle}>{props.title}</h2>

				<Field
					type="email"
					name="email"
					placeholder="Введите email"
					onChange={onChangeEmail}
					onBlur={onBlurEmail}
					value={dataForm.email.value}
					newError={isError(dataForm, 'email')}
				/>
				<Field
					type="password"
					name="password"
					placeholder="Введите пароль"
					onChange={onChangePassword}
					onBlur={onBlurPassword}
					value={dataForm.password.value}
					newError={isError(dataForm, 'password')}
				/>
				<Field
					type="password"
					name="repeatPassword"
					placeholder="Повторите пароль"
					onChange={onChangeRepeatPassword}
					onBlur={onBlurRepeatPassword}
					value={dataForm.repeatPassword.value}
					newError={isError(dataForm, 'repeatPassword')}
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
