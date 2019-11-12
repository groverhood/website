import React from 'react';

export type Option = typeof React.Component | (() => JSX.Element) | ((props: any) => JSX.Element)

function formatOptionName(option: Option) {
	return option.name.replace(/(\w)([A-Z])/g, '$1 $2');
}

export interface MenuOptionProps {
	name: string;
	onClick: () => void;
}

export function MenuOption(props: MenuOptionProps) {
	return (
		<div className="duncan-menu-option" onClick={props.onClick}>
			<span className="duncan-menu-option-text">{props.name}</span>
		</div>
	);
}

export interface MenuBarProps {
	onOptionSelect: (o: Option) => void;
	options: Option[];
}

export class MenuBar extends React.Component<MenuBarProps> {
	public render() {
		return (
			<div className="duncan-menu-bar">
				<div className="duncan-menu-bar-region">
					{
						this.props.options.map(
							(opt, key) => <MenuOption 	name={formatOptionName(opt)}
														onClick={() => this.props.onOptionSelect(opt)}
														key={key} />
						)
					}	
				</div>
			</div>
		)
	}
}