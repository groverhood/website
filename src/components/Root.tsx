import React from 'react';
import { MenuBar, Option } from './MenuBar';
import { AboutMe } from './AboutMe';
import MyWork from './MyWork';
import Contact from './Contact';
import Home from './Home';
import Header from './Header';

export interface RootState {
	selectedOption: Option
}

export class Root extends React.Component<{}, RootState> {
	private static readonly options: Option[] = [
		Home,
		AboutMe,
		MyWork,
		Contact
	];

	public constructor(props) {
		super(props);

		this.state = {
			selectedOption: Home
		}
	}

	public render() {
		const SelectedOption = this.state.selectedOption;

		return (
			<div className="duncan-root">
				<Header />
				<MenuBar onOptionSelect={opt => this.switchPage(opt)}
						 options={Root.options} />
				<div className="duncan-main">
					<div className="duncan-main-region">
						<SelectedOption />
					</div>
				</div>
			</div>
		)
	}

	private switchPage(option: Option) {
		this.setState({ selectedOption: option });
	}
}
