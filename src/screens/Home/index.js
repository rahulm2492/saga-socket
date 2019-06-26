import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Table, Dropdown, Header } from 'semantic-ui-react';
import { createOptionList } from '../../utils/common';
import Grid from '../Grid';

import { getInstrumentsListSaga, getData } from '../../actions';

// import styles from './styles';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      options: [], 
      selectedInstrument: null,
      orderBookLoad: false,
      prevInstrument: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleBtnOnClick = this.handleBtnOnClick.bind(this);
  }

  componentDidMount() {
    this.props.getInstrumentsList();
  }

 
  componentWillReceiveProps(nextProps) {
    if (nextProps.instrumentsOptions !== this.props.instrumentsOptions) {
      const createOptions = createOptionList(nextProps.instrumentsOptions);
      this.setState({ options: createOptions });
    }
  }

  handleChange(e, data) {
    const { selectedInstrument } = this.state;
    if (data.value !== selectedInstrument) {
      this.setState({ selectedInstrument: data.value, orderBookLoad: true, prevInstrument: selectedInstrument });
    }
  }

  handleBtnOnClick() {
    const { selectedInstrument, prevInstrument } = this.state;
   this.setState({ orderBookLoad: false });
   this.props.getOrderBook({ selectedInstrument, prevInstrument });
  }


  render() {
    const { bids, asks } = this.props;
    const { options, orderBookLoad } = this.state;
    return (
      <div>
        <Header as="h3">Search or Select Instrument</Header>
        <Dropdown
          placeholder="Select Instrument"
          fluid
          search
          selection
          options={options}
          className="dropdown"
          onChange={this.handleChange}
        />

        <Button
          disabled={!orderBookLoad}
          color="teal"
          onClick={this.handleBtnOnClick}
        >
          Load Order Book
        </Button>
        <div className="table-fix">
          {bids.length > 0
            && (
            <Grid values={bids} />
            )
          }
          {asks.length > 0
            && (
            <Grid values={asks} />
            )
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  bids: state.usersReducer.bids,
  asks: state.usersReducer.asks,
  instrumentsOptions: state.usersReducer.instruments
});

const mapDispatchToProps = dispatch => ({
  getOrderBook: option => dispatch(getData(option)),
  getInstrumentsList: () => dispatch(getInstrumentsListSaga())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
