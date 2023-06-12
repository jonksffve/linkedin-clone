import classes from '../modules/card.module.css';

const Card = ({ children, customClass }) => {
	const classList = `${classes.card} ${customClass}`;

	return <div className={classList}>{children}</div>;
};

export default Card;
