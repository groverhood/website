
import React from 'react';

interface BlogProps {
	date: Date;
	location: string;
	content: string;
}

function Blog(props: BlogProps) {
	return (
		<div className="duncan-home-blog-post">
			<div className="duncan-home-blog-post-header">
				<div className="duncan-home-blog-post-header-date">{props.date.toUTCString()}</div>
			</div>
		</div>
	)
}

interface HomeState {
	posts: BlogProps[]
}

export default class Home extends React.Component<{}, HomeState> {
	public constructor(props) {
		super(props);

		this.state = { posts: [] };
	}

	public render() {
		return (
			<div className="duncan-home">
				<div className="duncan-home-blog">
					{this.state.posts.map(Blog)}
				</div>
			</div>
		)
	}
}