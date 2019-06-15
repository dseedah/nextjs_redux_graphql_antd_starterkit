import React from 'react';
import Head from 'next/head';
import { Layout, Menu, Icon, message, Breadcrumb } from 'antd';
const { Sider, Content } = Layout;

import "antd/dist/antd.css";
import "../static/custom.css";

import SiteHeader from './SiteHeader';
import SideBar from './SideBar';

const isIE = typeof window !== "undefined" ? !!window.document.documentMode : false;

export default class SiteLayout extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <Layout>
                {isIE ? (
                    message.warning('For best user experience, it is recommended you use one of the following web browsers: Google Chrome, Microsoft Edge or Mozilla Firefox', 60)
                ) : ""}
                <Head>
                    <title>{this.props.pageTitle}</title>
                    <meta charSet="utf-8" />
                    <meta
                        name="viewport"
                        content="initial-scale=1.0, width=device-width"
                    />
                </Head>
                <SideBar />
                <Layout>
                    <SiteHeader />
                    <Content
                        style={{
                            margin: '5rem 2rem',
                            padding: 24,
                            background: '#fff',
                            minHeight: 280,
                        }}
                    >
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
