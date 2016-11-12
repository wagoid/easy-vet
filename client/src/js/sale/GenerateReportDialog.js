import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FlatButton, Dialog, DatePicker } from 'material-ui';
import textFieldStyle from '../styles/textField';
import * as validations from '../helpers/validations';
import * as actions from './actions';
import saveAs from 'save-as'

class GenerateReportDialog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: {},
			startDate: null,
      endDate: null
		};
		this.validations = {
			startDate: { required: {}},
			endDate: { required: {}}
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.handleGenerate = this.handleGenerate.bind(this);
		this.actions = bindActionCreators(actions, this.props.dispatch);
	}

	handleChange(event, value, name) {
		this.updateField(event.target.value || value, event.target.name || name);
	}

	updateField(value, fieldName) {
		let errorText = this.getErrorText(value, fieldName);
		let data = { ...this.state, [fieldName]: value };
		let error = { ...this.state.error, [fieldName]: errorText };
		
		this.setState({
			...data,
			error
		});
	}

	getErrorText(value, fieldName, validationsDefintion = this.validations) {
		let errorText = '';

		let validation = validationsDefintion[fieldName];
		if (validation) {
			Object.keys(validation).forEach(validationName => {
				let validationParams = validations[validationName];
				if (!validations[validationName](value, validationParams)) {
					errorText = validations.DEFAULT_MESSAGES[validationName](validationParams);
				}
			});
		}

		return errorText;
	}

	handleBlur(event) {
		this.updateFieldError(event.target.value, event.target.name);
	}

	updateFieldError(value, fieldName) {
		let errorText = this.getErrorText(value, fieldName);
		let error = { ...this.state.error, [fieldName]: errorText };
		this.setState({
			error
		});
	}

	handleGenerate() {
		let error = {...this.state.error};
		error.startDate = this.getErrorText(this.state.startDate, 'startDate');
		error.endDate = this.getErrorText(this.state.endDate, 'endDate');
		let hasError = Object.keys(error).some(prop => error[prop]);

		if (hasError) {
			this.setState({
				error
			});
		} else {
      this.saveWorkSheet()
			console.log(this.props.sales)
		}
	}

  saveWorkSheet() {
    let data = [['Date', 'Product', 'Item value', 'Final value']];
    this.props.sales.forEach(sale => {
      data.push([moment(sale.Payment.Date).format('DD/MM/YYYY'), '', 1, sale.Value, ]);
    });
    const wb = new WorkBook();
    wb.SheetNames.push('Sales report');
    wb.Sheets['Sales report'] = sheetFromArrayofArrays(data)
    const wbBinary = XLSX.write(wb, {bookType:'xlsx', bookSST:true, type: 'binary'});
    saveAs(new Blob([sheetToArrayBuffer(wbBinary)],{type:"application/octet-stream"}), this.getReportFileName())
  }

  getReportFileName() {
    const startDate = moment(this.state.startDate).format('DD-MM-YYYY')
    const endDate = moment(this.state.endDate).format('DD-MM-YYYY')
    return `sales-report${mstartDate}-to-${endDate}.xlsx`
  }

  handleStartDateChange(event, startDate) {
		this.setState({...this.state, startDate});
	}

  handleEndDateChange(event, endDate) {
		this.setState({...this.state, endDate});
	}

	render() {
		let onCancel = () => this.actions.closeGenerateReportDialog(GenerateReportDialog);
		return (
			<Dialog
				title="Generate sales report"
				actions={[<FlatButton key={"generateReportCancel"} label='Cancel' onTouchTap={onCancel} />,
				<FlatButton key={"generateReportOk"} label='Generate' primary onTouchTap={this.handleGenerate} />]}
				open={this.props.open}
				onRequestClose={onCancel}
				autoScrollBodyContent
			>
        <DatePicker
					name='startDate'
					onChange={this.handleStartDateChange.bind(this)}
					autoOk
					floatingLabelText='Start date'
					value={this.state.startDate}
        />
        <DatePicker
					name='endDate'
					onChange={this.handleEndDateChange.bind(this)}
					autoOk
					floatingLabelText='Start date'
					value={this.state.endDate}
        />
			</Dialog>
		);
	}
}

 
function sheetFromArrayofArrays(data, opts) {
	var ws = {};
	var range = {s: {c:10000000, r:10000000}, e: {c:0, r:0 }};
	for(var R = 0; R != data.length; ++R) {
		for(var C = 0; C != data[R].length; ++C) {
			if(range.s.r > R) range.s.r = R;
			if(range.s.c > C) range.s.c = C;
			if(range.e.r < R) range.e.r = R;
			if(range.e.c < C) range.e.c = C;
			var cell = {v: data[R][C] };
			if(cell.v == null) continue;
			var cell_ref = XLSX.utils.encode_cell({c:C,r:R});
			
			if(typeof cell.v === 'number') cell.t = 'n';
			else if(typeof cell.v === 'boolean') cell.t = 'b';
			else cell.t = 's';
			
			ws[cell_ref] = cell;
		}
	}
	if(range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
	return ws;
}

function sheetToArrayBuffer(s) {
	const buf = new ArrayBuffer(s.length);
	const view = new Uint8Array(buf);
	for (let i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
	return buf;
}

class WorkBook {
  constructor() {
    this.SheetNames = [];
    this.Sheets = {}
  }
}

export default connect(state => ({ sales: state.sale.sales }))(GenerateReportDialog);