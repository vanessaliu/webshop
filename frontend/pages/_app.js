import React from 'react';
import App, { Container } from 'next/app';
import Page from '../components/Page';

class myApp extends App {
  render() {
    const {Component} = this.props;
    return (
      <Container>
        <Page>
        <p>Hey I am on each page!</p>
        <Component/>
        </Page>
      </Container>
    );
  }
}

export default myApp;