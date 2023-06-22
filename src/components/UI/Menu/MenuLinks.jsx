import classes from '../../modules/navbar.module.css';
import {
	AiOutlineSearch,
	AiOutlineHome,
	AiOutlineBell,
	AiOutlineUserSwitch,
} from 'react-icons/ai';
import { BsBriefcase, BsChatDots } from 'react-icons/bs';
import { TbGridDots } from 'react-icons/tb';
import { ImNewspaper } from 'react-icons/im';
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import * as helper from '../../../helpers/config';
import MenuSearch from './MenuSearch';

const MenuLinks = () => {
	const [isSearching, setIsSearching] = useState(false);

	return (
		<Fragment>
			{isSearching && <MenuSearch onClose={setIsSearching} />}
			{!isSearching && (
				<div>
					<ul className={classes.links}>
						<li className={classes.link}>
							<AiOutlineSearch
								onClick={() => setIsSearching(true)}
								size={30}
								className={classes.icon}
							/>
						</li>
						<li className={classes.link}>
							<Link to={helper.ROUTE_HOME}>
								<AiOutlineHome
									size={30}
									className={classes.icon}
								/>
							</Link>
						</li>
						<li className={classes.link}>
							<Link to={helper.ROUTE_CONNECTIONS}>
								<AiOutlineUserSwitch
									size={30}
									className={classes.icon}
								/>
							</Link>
						</li>
						<li className={classes.link}>
							<Link to={''}>
								<BsBriefcase
									size={30}
									className={classes.icon}
								/>
							</Link>
						</li>
						<li className={classes.link}>
							<Link to={''}>
								<BsChatDots
									size={30}
									className={classes.icon}
								/>
							</Link>
						</li>
						<li className={classes.link}>
							<Link to={''}>
								<TbGridDots
									size={30}
									className={classes.icon}
								/>
							</Link>
						</li>

						<li className={classes.link}>
							<Link to={''}>
								<AiOutlineBell
									size={30}
									className={classes.icon}
								/>
							</Link>
						</li>
						<li className={classes.link}>
							<Link to={''}>
								<ImNewspaper
									size={30}
									className={classes.icon}
								/>
							</Link>
						</li>
					</ul>
				</div>
			)}
		</Fragment>
	);
};

export default MenuLinks;
