import styles from './Fields.module.css';

export const Fields = ({ error, ...props }) => {
	return (
		<>
			<div className={styles.fieldsWrapper}>
				<input className={styles.inputEl} {...props} />
			</div>
			<div className={styles.error}>{error}</div>
		</>
	);
};
