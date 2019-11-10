
import React from 'react';
import Octokit from '@octokit/rest';

const octokit = new Octokit();

interface MyWorkEntryProps {
	url: string;
	name: string;
	description: string;
	id: number;
}

function MyWorkEntry(props: MyWorkEntryProps) {
	const style: React.CSSProperties = {
		animationDelay: `${props.id * 115}ms`,
		animationDuration: '165ms',
		animationName: 'fadein',
		animationFillMode: 'backwards',
		animationTimingFunction: 'linear'
	};

	return (
		<div className="duncan-my-work-entry" style={style}>
			<div className="duncan-my-work-entry-title">{props.name}</div>
			<div className="duncan-my-work-entry-description">{props.description}</div>
			<div className="duncan-my-work-entry-url" onClick={ev => window.open(props.url)}>{props.url}</div>
		</div>
	)
}

interface MyWorkState {
	projects: MyWorkEntryProps[];
}

export default class MyWork extends React.Component<{}, MyWorkState> {
	public constructor(props) {
		super(props);

		this.state = {
			projects: []
		};
	}

	public componentDidMount() {
		let setState = this.setState.bind(this);
		
		octokit
		.repos
		.listForUser({ username: 'groverhood' })
		.then(({ data }) =>
			setState({ projects: data.map(repo => ({
				url: repo.html_url,
				name: repo.name,
				description: repo.description,
			}))})
		);
	}

	public render() {
		return (
			<div className="duncan-my-work">
				{
					this.state.projects.map((props, key) => <MyWorkEntry url={props.url} 
																description={props.description}
																name={props.name}
																key={key} id={key} />)
				}
			</div>
		)
	}
}