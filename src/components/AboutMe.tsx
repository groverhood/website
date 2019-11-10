
import React from 'react';
import Markdown from 'react-markdown';

const port = 4040;

interface AboutMeState {
	markdown: string;
}

export class AboutMe extends React.Component<{}, AboutMeState> {
	public constructor(props) {
		super(props);

		this.state = { markdown: '' };
	}

	public componentDidMount() {
		let fr = new FileReader();
		let setState = this.setState.bind(this);

		fetch(`http://localhost:${port}/info/about.md`).then(res => res.text()).then(md => setState({ markdown: md }));
	}

	public render() {
		return (
			<div className="duncan-about-me">
				<Markdown className="duncan-about-me-text" source={this.state.markdown}/>
			</div>
		)
	}
}