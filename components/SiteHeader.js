import React from 'react';
import { Layout, Icon, Menu } from "antd";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toggleSidebar } from '../lib/store';

const { Header } = Layout;

class SiteHeaderComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    toggle = () => {
        const { toggleSidebar } = this.props;
        toggleSidebar();
    };

    render() {
        const { collapsedSidebar } = this.props;
        return (
            <Header style={{ background: '#fff', padding: 0, position: 'fixed', zIndex: 1, width: '100%' }}>
                <Menu
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item>
                        <Icon
                            className="trigger"
                            type={collapsedSidebar ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Menu.Item>
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
            </Header>
        )
    }
}


function mapToComponentProps(state) {
    const { collapsedSidebar } = state;
    return { collapsedSidebar }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ toggleSidebar }, dispatch);
}

const SiteHeader = connect(
    mapToComponentProps,
    mapDispatchToProps
)(SiteHeaderComponent);


export default SiteHeader;
