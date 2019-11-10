
import React from 'react';
import Octokit from '@octokit/rest';

const octokit = new Octokit();

interface MyWorkEntryProps {
	url: string;
	topics: string[];
	name: string;
	description: string
}

function MyWorkEntry(props: MyWorkEntryProps) {
	return (
		<div className="duncan-my-work-entry">
			<div className="duncan-my-work-entry-title">{props.name}</div>
			<div className="duncan-my-work-entry-description">{props.description}</div>
			<div className="duncan-my-work-entry-topic-container">
				{props.topics.map(topic => <div className="duncan-my-work-entry-topic">{topic}</div>)}
			</div>
			<div className="duncan-my-work-entry-url">{props.url}</div>
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
		let projects = this.state.projects;
		
		octokit
		.repos
		.listForUser({ username: 'groverhood' })
		.then(({ data }) =>
			setState({ projects: [...projects, {
				url: data.html_url,
				topics: data.topics,
				name: data.name,
				description: data.description,
			}]})
		);
	}

	public render() {
		return (
			<div className="duncan-my-work">
				{
					this.state.projects.map((props, key) => <MyWorkEntry url={props.url} 
																topics={props.topics} 
																description={props.description}
																name={props.name}
																key={key}/>)
				}
			</div>
		)
	}
}