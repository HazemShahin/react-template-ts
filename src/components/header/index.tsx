import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Icon } from '@components/icon';
import { Routes } from '@utilities/enums';
import { Button } from '@components/button';
import { AuthState } from '@containers/auth/interfaces';
import { AuthActionType } from '@containers/auth/enums';
import { history, RootStore } from '@src/store';

import './index.scss';

export const Header: React.FunctionComponent = () => {
	const dispatch = useDispatch();
	const authState: AuthState = useSelector((store: RootStore) => store.auth);

	const Nav = (): JSX.Element => (
		<nav className="c-nav">
			<ul>
				<li>
					<NavLink to={Routes.ABOUT}>About</NavLink>
				</li>

				{!!authState.token && (
					<>
						<li>
							<NavLink to={Routes.SETTINGS}>Settings</NavLink>
						</li>

						<li>
							<Button
								onClick={(): void => {
									dispatch({
										type: AuthActionType.LOGOUT_REQUEST,
										payload: {
											redirect: (): void => history.push(Routes.LOGIN)
										}
									});
								}}
								className="c-btn--outline"
							>
								Logout
							</Button>
						</li>
					</>
				)}
			</ul>
		</nav>
	);

	return (
		<header className="c-header">
			<div className="o-shell o-shell--flex">
				<Link to={Routes.BASE} className="c-logo">
					<Icon src="assets/react.svg" />
				</Link>

				<Nav />
			</div>
		</header>
	);
};

export default Header;
