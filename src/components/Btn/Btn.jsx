import styles from './Btn.module.css';

export const Btn = ({ type, disabled, ref, className, value }) => {
	return (
		<>
			<button className={`${styles.btn} ${className}`} ref={ref} type={type} disabled={disabled}>
				{value}
			</button>
		</>
	);
};
