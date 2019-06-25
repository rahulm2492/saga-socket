import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Table, Dropdown } from 'semantic-ui-react';
import { createOptionList } from '../../utils/common';

import { getInstrumentsListSaga, getData } from '../../actions';

import styles from './styles';

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
        
        {bids.length > 0
          && (
          <Table
            striped
          >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan="2">Bids</Table.HeaderCell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>Quantity</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {bids.map((val, i) => (
                <Table.Row key={i}>
                  <Table.Cell>
                    {val[1]}
                  </Table.Cell>
                  <Table.Cell>
                    {val[0]}
                  </Table.Cell>
                </Table.Row>))}
            </Table.Body>
          </Table>
          )
        }

        {asks.length > 0
          && (
          <Table
            striped
          >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan="2">Asks</Table.HeaderCell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>Quantity</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {asks.map((val, i) => (
                <Table.Row key={i}>
                  <Table.Cell>
                    {val[1]}
                  </Table.Cell>
                  <Table.Cell>
                    {val[0]}
                  </Table.Cell>
                </Table.Row>))}
            </Table.Body>
          </Table>
          )
        }

        
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
