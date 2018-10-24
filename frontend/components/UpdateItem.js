import React, {Component} from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;
const UPDATE_ITEM_MUTATION = gql`
    mutation UPDATE_ITEM_MUTATION(
    $id: ID!, $title: String, $description: String, $price: Int
    ) {
        updateItem(
            id: $id, title: $title, description: $description, price: $price
        ) {
            id
            title
            description
            price
        }
    }
`;

class UpdateItem extends Component {
  state = {};

  hanleChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  render() {
    return (
      <Query
        query={SINGLE_ITEM_QUERY}
        variables={{
          id: this.props.id,
        }}
      >
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (!data.item) return <p>No Item Found for ID {this.props.id}</p>;
          return (
            <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
        {(updateItem, { loading, error }) => {
          return (
            <Form onSubmit={ async e=> {
              e.preventDefault();
              const res = await updateItem({
                variables: {
                  id: this.props.id,
                  ...this.state,
                },
              });
              // change them to the single item page
              console.log(res);
              Router.push({
                pathname: '/item',
                query: { id: res.data.updateItem.id },
              });
            }}>
              <p>Update an Item</p>
              <Error error={error}></Error>
              <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor="title">
                  Title
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Title"
                    required
                    defaultValue={data.item.title}
                    onChange={this.hanleChange}
                  />
                </label>
                <label htmlFor="price">
                  Price
                  <input
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Price"
                    required
                    defaultValue={data.item.price}
                    onChange={this.hanleChange}
                  />
                </label>
                <label htmlFor="description">
                  Description
                  <textarea
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Description"
                    required
                    defaultValue={data.item.description}
                    onChange={this.hanleChange}
                  />
                </label>
                <button type="submit">Updat{loading ? 'ing' : 'e'}</button>
              </fieldset>
            </Form>
          )
        }}
      </Mutation>
          );
        }}
      </Query>
    );
  }
}


export default UpdateItem;
