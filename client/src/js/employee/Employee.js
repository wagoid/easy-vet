import React, { Component, PropTypes } from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class Employee extends Component {

	getStyles() {
		return {
			card: {
				cursor: 'pointer',
				width: '50%',
				minWidth: '300px',
				margin: '5px auto 0px auto'
			},
			cardText: {
				display: 'inline-block'
			},
			addressCardText: {
				paddingTop: 0
			}
		}
	}

	render() {
		let { employee, keyReplacements, valueMasks } = this.props;
		let address = employee.Address;
		let styles = this.getStyles();

		let keysToShow = Object.keys(employee).filter(prop => !~['Id', 'Name', 'Specialty', 'RowVersion', 'Password'].indexOf(prop));

		var cardTexts = keysToShow.map((key, index) => {
			let keyText = keyReplacements[key] || key;
			if (key === 'Address') {
				return (
					<CardText key={index} style={styles.addressCardText}>
						{`${address.StreetType} ${address.StreetName}, nº ${address.Number} - ${address.Neighbourhood}`}
					</CardText>
				);
			} else {
				let valueMask = valueMasks[key];
				return (
					<CardText key={index} style={styles.cardText}>
						{keyText}: {valueMask? valueMask.func(employee[key], valueMask.mask) : employee[key]}
					</CardText>
				)
			}
			
		});

		return (
			<Card style={styles.card}>
				<CardHeader
					title={employee.Name}
					subtitle={employee.Specialty}
				/>

				{cardTexts}
			</Card>
		);
	}
}

Employee.propTypes = {
	employee: PropTypes.object.isRequired,
	keyReplacements: PropTypes.object.isRequired,
	valueMasks: PropTypes.object.isRequired
}

export default Employee;