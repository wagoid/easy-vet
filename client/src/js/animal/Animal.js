import React, { Component, PropTypes } from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class Animal extends Component {

	constructor(...args) {
		super(...args);
		this.handleClick = this.handleClick.bind(this);
	}

	getStyles() {
		return {
			card: {
				cursor: 'pointer',
				width: '100%',
				minWidth: '300px',
				maxWidth: '1000px',
				margin: '5px auto 0px auto'
			},
			cardText: {
				display: 'inline-block'
			},
			addressCardText: {
				paddingTop: 0
			}
		};
	}

	handleClick() {
		if (this.props.onClick) {
			this.props.onClick(this.props.animal);
		}
	}

	render() {
		let { animal, keyReplacements, valueMasks } = this.props;
		let styles = this.getStyles();
		let animalTypeMask = valueMasks.Type;
		
		let keysToShow = Object.keys(animal).filter(prop => !~[ 'Id', 'Name', 'RowVersion', 'Type' ].indexOf(prop));

		var cardTexts = keysToShow.map((key, index) => {
			let keyText = keyReplacements[key] || key;
			
				let valueMask = valueMasks[key];
				return (
					<CardText key={index} style={styles.cardText}>
						{keyText}: {valueMask? valueMask.func(animal[key], valueMask.mask) : animal[key]}
					</CardText>
				);
			
		});

		return (
			<Card onClick={this.handleClick} style={styles.card}>
				<CardHeader
					title={animal.Name}
					subtitle={ animalTypeMask? animalTypeMask.func(animal.Type) : animal.Type }
				/>

				{cardTexts}
			</Card>
		);
	}
}

Animal.defaultProps = {
	valueMasks: {},
	keyReplacements: {}
}

Animal.propTypes = {
	Animal: PropTypes.object.isRequired,
	keyReplacements: PropTypes.object.isRequired,
	valueMasks: PropTypes.object.isRequired,
	onClick: PropTypes.func,
	style: PropTypes.object
}

export default Animal;