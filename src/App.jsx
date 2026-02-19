import './App.css';
import { Form } from './components/Form/Form';
import { RegForm } from './components/RegForm/RegForm';

export function App() {
	return (
		<div>
			<Form title="Регистрация" submitText="Зарегистрироваться" />
			<RegForm title="Форма регистрация" submitText="Зарегистрироваться" />
		</div>
	);
}
