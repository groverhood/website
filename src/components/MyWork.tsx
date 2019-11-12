
import React from 'react';
import Octokit from '@octokit/rest';
import ReactMarkdown from 'react-markdown';

const octokit = new Octokit();

interface MyGitHubProjectProps {
	url: string;
	name: string;
	description: string;
	id: number;
}

function MyGitHubProject(props: MyGitHubProjectProps) {
	const style: React.CSSProperties = {
		animationDelay: `${props.id * 115}ms`,
		animationDuration: '165ms',
		animationName: 'fadein',
		animationFillMode: 'backwards',
		animationTimingFunction: 'linear'
	};

	return (
		<div className="duncan-my-github-project" style={style}>
			<div className="duncan-my-github-project-title">{props.name}</div>
			<div className="duncan-my-github-project-description">{props.description}</div>
			<div className="duncan-my-github-project-url" onClick={ev => window.open(props.url)}>{props.url}</div>
		</div>
	)
}

interface MyGithubProjectsState {
	projects: MyGitHubProjectProps[];
}

class MyGithubProjects extends React.Component<{}, MyGithubProjectsState> {
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
		if (this.state.projects.length == 0) {
			return <div></div>
		}

		return (
			<div className="duncan-my-github-projects">
				<div className="duncan-my-github-projects-title">My public GitHub repos</div>
				{
					this.state.projects.map((props, key) => <MyGitHubProject url={props.url} 
																description={props.description}
																name={props.name}
																key={key} id={key} />)
				}
			</div>
		)
	}
}

interface MyWorkState {
	projects: MyGitHubProjectProps[];
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
				<MyGithubProjects />
			</div>
		)
	}
}