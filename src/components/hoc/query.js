import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const LoadingComponent = () => (<View><Text>Loading...</Text></View>);
const ErrorComponent = () => (<View><Text>Error :(</Text></View>);

const QueryHOC = ({
  query, variables, renderCallback, loadingComp: LoadingComp, errorComp: ErrorComp,
}) => {
  const gqlQuery = gql`${query}`;
  return (
  <Query query={gqlQuery} variables={variables}>
    {({ loading, error, data }) => {
      if (loading) return <LoadingComp /> || <LoadingComponent />;
      if (error) {
        console.log(error);
        return <ErrorComp /> || <ErrorComponent />;
      }
      return renderCallback(data);
    }}
  </Query>);
};

export default QueryHOC;
