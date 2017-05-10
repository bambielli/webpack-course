import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200
  },
  youdidit: {
    textAlign: 'center',
    paddingTop: 50
  }
};

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleDateChange = this.handleDateChange.bind(this);
    this.state = {};
  }

  handleDateChange (_, date) {
    this.setState({date});
  }

  render() {
    const YouDidIt = () => (
      <h1 style={styles.youdidit} className={"rotator"}>You Did it!</h1>
    );
    return (
      <MuiThemeProvider>
        <div>
          <div style={styles.container}>
            <h1>Pick a Date</h1>
            <DatePicker
              hintText="Choose a Date"
              onChange={this.handleDateChange} />
          </div>
          {this.state.date ? <YouDidIt /> : null}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
