/* pages/index.js */
import React from 'react';
import { Button, Alert, Carousel, Layout, Card, Row, Col, Icon } from "antd";
import { connect } from 'react-redux';

import SiteLayout from '../components/SiteLayout';

const { Header, Content, Footer } = Layout;
const { Meta } = Card;

class HomeComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { loading } = this.props;
        return (
            <SiteLayout pageTitle="Welcome to Country Explorer">
                Hello World
            </SiteLayout>
        );
    }
};

function mapReduxStateToComponentProps(state) {
    const { loading } = state;
    return { loading }
}

const HomePage = connect(
    mapReduxStateToComponentProps,
    null
)(HomeComponent);

export default HomePage;