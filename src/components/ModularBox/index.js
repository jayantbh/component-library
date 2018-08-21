import React, { Component } from 'react';
import { translate } from 'react-i18next';
import cls from 'classnames';

import Box from 'components/Box';

import css from './styles.module.css';

export class ModularBox extends Component {
	render() {
		let { header, children: body, footer, className, headerClassName, bodyClassName, footerClassName } = this.props;

		header = header ? <div className={cls(css.header, css['box-module'], 'component--modular-box--header', 'component--modular-box--box-module', headerClassName)}>{header}</div> : '';
		footer = footer ? <div className={cls(css.footer, css['box-module'], 'component--modular-box--footer', 'component--modular-box--box-module', footerClassName)}>{footer}</div> : '';
		body = <div className={cls(css.body, css['box-module'], 'component--modular-box--body', 'component--modular-box--box-module', bodyClassName)}>{body}</div>;

		return (
			<Box className={cls(css.container, className)}>
				{header}
				{body}
				{footer}
			</Box>
		)
	}
}

export default translate()(ModularBox);