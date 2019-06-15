
import React from 'react';
import { Layout, Icon, Menu, Skeleton, List } from "antd";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import gql from "graphql-tag";
import { graphql } from "react-apollo";

import { getCountryDetails } from '../lib/store';

const { Sider } = Layout;
const { SubMenu } = Menu; 


class Emoji extends React.Component {
    render() {
        const { title, code } = this.props;
        return <span className="emoji" title={title} dangerouslySetInnerHTML={{ __html: code }} />
    }
}

class SideBarComponent extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        const { collapsedSidebar } = this.props; // Redux
        const { data: { loading, error, continents } } = this.props; // GraphQL
        // const { data: { loading, error, continents }, collapsedSidebar } = this.props; // Redux + GraphQL

        if (error) return error + "Error loading country list";

        if (loading) return (<Skeleton active />);

        if (continents && continents.length) {
            return (
                <Sider trigger={null} collapsible collapsed={collapsedSidebar}>
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['AF']} mode="inline">
                        {continents.map(continent =>
                            <SubMenu
                                key={continent.code}
                                title={
                                    <span>{continent.name}</span>
                                }>
                                {continent.countries.map(country =>
                                    <Menu.Item key={country.code}>{country.name}</Menu.Item>
                                )}>
                            </SubMenu>
                        )};
                    </Menu>
                </Sider>
            )
        }
    }
}


function mapToComponentProps(state) {
    const { collapsedSidebar } = state;
    return { collapsedSidebar }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getCountryDetails }, dispatch);
}

const SideBar = connect(
    mapToComponentProps,
    mapDispatchToProps
)(SideBarComponent);


const query = gql`
{
continents {
    name
    code
    countries {
        name
        code
        emoji
        emojiU
        languages {
                code
                name
            }
        }
    }
}`;


export default graphql(query, {
    props: ({ data }) => ({ data })
})(SideBar);
