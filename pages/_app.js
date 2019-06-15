/*
@see https://codesandbox.io/s/vnr2lqvrm0
@see https://codesandbox.io/s/7361k9q6w
*/
// NPM Imports
global.fetch = require('node-fetch');
import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'react-redux';
import withReduxStore from '../lib/appWithRedux';
import { ApolloProvider } from "react-apollo";
import ApolloClient from 'apollo-client';
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
// App Imports
import { Layout } from "antd";

const AUTH_TOKEN = "auth-token";

const httpLink = new createHttpLink({
    uri: "https://countries.trevorblades.com/",
    opts: {
        // credentials: "same-origin" // Additional fetch() options like `credentials` or `headers`
    }
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(AUTH_TOKEN);

    if (!token) {
        return {
            headers
        };
    }

    return {
        headers: {
            ...headers,
            authorization: `Bearer ${token}`
        }
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

class MyApp extends App {

    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        return { pageProps };
    }

    render() {
        const { Component, pageProps, reduxStore } = this.props;
        return (
            <Container>
                <ApolloProvider client={client}>
                    <Provider store={reduxStore}>
                        <Layout {...pageProps}>
                            <Component {...pageProps} />
                        </Layout>
                    </Provider>
                </ApolloProvider>
            </Container>
        )
    }
}

export default withReduxStore(MyApp);