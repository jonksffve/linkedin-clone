import classes from '../modules/spinner.module.css';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const Spinner = () => {
	const antIcon = <LoadingOutlined spin />;

	return (
		<div className={classes.spinner}>
			<p>Loading...</p>
			<Spin
				indicator={antIcon}
				size='large'
			/>
		</div>
	);
};

export default Spinner;
