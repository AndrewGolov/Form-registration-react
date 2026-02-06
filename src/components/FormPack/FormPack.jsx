import { Field } from '../Field/Field';
import { Btn } from '../Btn/Btn';

export const FormPack = ({ title, submitText }) => {
	return (
		<div>
			<form>
				<h2>{title}</h2>

				<Field
					type="email"
					name="email"
					placeholder="Введите email"
					onChange={() => console.log('Измененние поля emal')}
					onBlur={() => console.log('Утерян фокус поля emal')}
				/>
				<Field type="password" name="password" placeholder="Введите пароль" />
				<Field type="password" name="repeatPassword" placeholder="Повторите пароль" />

				<Btn type="submit" value={submitText} />
			</form>
		</div>
	);
};
