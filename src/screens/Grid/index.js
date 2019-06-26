

import React from 'react';
import { Table } from 'semantic-ui-react';


export default ({ values }) => (

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
      {values.map((val, i) => (
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

);
