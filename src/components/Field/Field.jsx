import styles from './Field.module.css';

export const Field = ({ newError, ...props }) => {
	const errorElements = Array.isArray(newError)
		? newError.map((er, i) => (
				<div key={i} className={styles.error}>
					{er}
				</div>
			))
		: null;

	return (
		<div className={styles.fieldWrapper}>
			<input className={styles.inputEl} {...props} />
			{errorElements}
		</div>
	);
};
