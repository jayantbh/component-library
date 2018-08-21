import React, { Component } from 'react';
import { connect } from 'react-redux';
import { parse } from 'query-string';
import { withRouter, Route } from 'react-router-dom';
import { translate } from 'react-i18next';

import { ROUTES } from 'routes';
import { SESSION_FETCH_REQUEST } from './session-actions';
import { SESSION_STATE } from './session-reducer';

import PrimaryLayout from 'views/PrimaryLayout';

import css from './styles.module.css';


type Props = {
	sessionStatus: string
}

export class component extends Component<Props> {
	componentDidMount() {
		let { authToken } = parse(window.location.search);
		this.props.checkAuthentication(authToken);
	}

	render() {
		const { t } = this.props;

		switch(this.props.sessionStatus) {
			case SESSION_STATE.AUTHENTICATED:
				return (
					<div className={css['routes-wrapper']}>
						<Route path={ROUTES.BASE} render={() => <PrimaryLayout />}/>
					</div>
				);
			case SESSION_STATE.AUTH_FAILED:
				return (<h3>{t('auth-failed-msg')}<br />{t('re-auth-needed')}</h3>);
			default:
				return (t('auth-pending-msg'));
		}
	}
}

const mapStateToProps = ({ session: { status } }) => {
  return { sessionStatus: status };
}

const mapDispatchToProps = dispatch => {
	return {
		checkAuthentication: (token) => { dispatch(SESSION_FETCH_REQUEST({ token })) }
	}
}

export default translate()(withRouter(connect(mapStateToProps, mapDispatchToProps)(component)));