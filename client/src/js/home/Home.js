import React, { Component } from 'react';

class Home extends Component {
	constructor() {
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleSubmit (e) {
		e.preventDefault();
		this.context.router.push({pathname: `/${this._input.value}`});
	}

	render() {
		return (
			<section className="container home">
				<form
					className="form-inline"
					role="form"
					onSubmit={this.handleSubmit}
				>
					<div className="form-group">
						<div className="input-group">
							<input
								type="text"
								placeholder="Enter a GitHub user..."
								className="form-control"
								ref={ref => (this._input = ref)}
							/>
						</div>
					</div>
					<button type="submit" className="btn btn-primary">
						Go
					</button>
				</form>
			</section>
		);
	}
}

export default Home;