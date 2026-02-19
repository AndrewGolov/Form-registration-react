import styles from './Field.module.css';

export const Field = ({ newErrors, ...props }) => {
	const errorElements =
		newErrors && newErrors !== null
			? newErrors.map((err, i) => (
					<div key={i} className={styles.error}>
						{err}
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
