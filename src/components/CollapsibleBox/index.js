import React, { Component } from 'react';
import { translate } from 'react-i18next';
import cls from 'classnames';

import ModularBox from 'components/ModularBox';

import css from './styles.module.css';

export class CollapsibleBox extends Component {
	constructor() {
		super();

		this.state = {
			isExpanded: false
		}
	}

	toggleExpansion() {
		this.setState({ isExpanded: !this.state.isExpanded });
	}

	render() {
		/**
		 * mode: fully | partially
		 * collapsed: fully | partially
		 */
		let { header, children: body, footer, expanded = 'partially', collapsed = 'partially' } = this.props;
		let { isExpanded } = this.state;

		footer = <div className={cls('component--collapsible-box--footer')} onClick={() => this.toggleExpansion()}>{footer}</div>;

		let expansionStateClass;
		if (isExpanded) {
			if (expanded === 'fully') expansionStateClass = css.expanded;
			else if (expanded === 'partially') expansionStateClass = css['expanded-partially'];
		}
		else if (collapsed === 'fully') expansionStateClass = css[ 'collapsed-fully' ];

		return (
			<ModularBox
				className={cls(css.container, collapsed === 'fully' ? css['fully-collapsible'] : '', expansionStateClass)}
				header={header}
				footer={footer}
				bodyClassName={cls(css.body, expansionStateClass)}
				footerClassName={cls(collapsed === 'fully' && !isExpanded ? css['footer-no-border'] : '')}
			>
				{body}
			</ModularBox>
		)
	}
}

export default translate()(CollapsibleBox);
