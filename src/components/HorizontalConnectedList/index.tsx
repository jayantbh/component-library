import React, { HTMLAttributes, ReactNode } from 'react';
import cls from 'classnames';
import css from './styles.module.scss';

export type Item = {
  icon: ReactNode;
  content?: ReactNode;
  contentSecondary?: ReactNode;
  id: string;
  borderStyle?: string;
};

const Item = ({
  item,
  showLeftConnector,
  showRightConnector,
  leftConnectorBorder = 'solid',
  rightConnectorBorder = 'solid',
  classes = {},
}: {
  item: Item;
  showLeftConnector: boolean;
  showRightConnector: boolean;
  leftConnectorBorder: string;
  rightConnectorBorder: string;
  classes?: {
    list?: string;
    listItem?: string;
    icon?: string;
    connector?: string;
  };
}) => {
  return (
    <div className={cls(css.item, classes.listItem)}>
      <div className={cls(css.icon, classes.icon)}>
        <div
          className={cls(
            css.connector,
            classes.connector,
            !showLeftConnector && css.hide,
            css[`border-${leftConnectorBorder}`]
          )}
        />
        <div>{item.icon}</div>
        <div
          className={cls(
            css.connector,
            classes.connector,
            !showRightConnector && css.hide,
            css[`border-${rightConnectorBorder}`]
          )}
        />
      </div>
    </div>
  );
};

export type Props = HTMLAttributes<HTMLDivElement> & {
  items: Array<Item>;
  classes?: {
    list?: string;
    listItem?: string;
    steps?: string;
    content?: string;
    contentSecondary?: string;
  };
};

export const HorizontalConnectedList = ({ items, classes = {}, ...props }: Props) => {
  return (
    <div className={cls(css.list, classes.list)} {...props}>
      <div className={cls(css['content-secondary'], classes.contentSecondary)}>
        {items.map((item, i) => (
          <div key={i}>{item.contentSecondary}</div>
        ))}
      </div>
      <div className={cls(css.steps, classes.steps)}>
        {items.map((item, index) => {
          const leftConnectorBorder = index > 0 ? items[index - 1].borderStyle || 'solid' : item.borderStyle || 'solid';
          return (
            <Item
              key={item.id}
              item={item}
              classes={classes}
              showLeftConnector={index !== 0}
              showRightConnector={index !== items.length - 1}
              leftConnectorBorder={leftConnectorBorder}
              rightConnectorBorder={item.borderStyle || 'solid'}
            />
          );
        })}
      </div>
      <div className={cls(css.content, classes.content)}>
        {items.map((item, i) => (
          <div key={i}>{item.content}</div>
        ))}
      </div>
    </div>
  );
};
