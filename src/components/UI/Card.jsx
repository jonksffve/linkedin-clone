import classes from '../modules/card.module.css';

const Card = ({ children, customClass = '' }) => {
	let componentClasses = `${classes.card} ${customClass}`;

	return <div className={componentClasses}>{children}</div>;
};

export default Card;
