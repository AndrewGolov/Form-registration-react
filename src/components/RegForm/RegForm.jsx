import styles from './RegForm.module.css';
import { useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Fields } from '../Fields/Fields';
import { Btn } from '../Btn/Btn';
import { SchemeRegForm } from '../../scheme/SchemeRegForm';

const schema = SchemeRegForm;

export const RegForm = ({ title, submitText }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm({
		mode: 'onBlur',
		reValidateMode: 'onChange',
		defaultValues: {
			email: '',
			password: '',
			repeatPassword: '',
		},
		resolver: yupResolver(schema),
	});
	const submitBtnRegFormRef = useRef(null);

	const sendData = (data) => {
		console.log(data);
		reset();
	};

	useEffect(() => {
		if (isValid) {
			submitBtnRegFormRef.current.focus();
		}
	}, [isValid]);

	return (
		<div className={styles.regFormWrapper}>
			<form onSubmit={handleSubmit(sendData)}>
				<h2 className={styles.regFormTitle}>{title}</h2>

				<Fields
					type="email"
					name="email"
					{...register('email')}
					error={errors.email?.message}
					placeholder="Введите email"
				/>

				<Fields
					type="password"
					name="password"
					{...register('password')}
					error={errors.password?.message}
					placeholder="Введите пароль"
				/>

				<Fields
					type="password"
					name="repeatPassword"
					{...register('repeatPassword')}
					error={errors.repeatPassword?.message}
					placeholder="Повторите пароль"
				/>

				<Btn type="submit" value={submitText} ref={submitBtnRegFormRef} disabled={!isValid} />
			</form>
		</div>
	);
};
