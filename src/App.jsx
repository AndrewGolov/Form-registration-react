import './App.css';
import { Form } from './components/Form/Form';
import { FormPack } from './components/FormPack/FormPack';

export function App() {
	return (
		<div>
			<Form title="Регистрация" submitText="Зарегистрироваться" />
			<FormPack title="Форма регистрация" submitText="Зарегистрироваться повторно" />
		</div>
	);
}
