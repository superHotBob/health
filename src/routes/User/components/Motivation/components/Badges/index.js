/**
 * Created by Павел on 12.02.2018.
 */
import React, { PropTypes } from 'react';
import {Avatar,Popover,Col,List, Card } from 'antd';
import BadgesListItem from './components/BadgesListItem';
class Badges extends React.Component {

    constructor(props) {
        super(props);
    }
        render()
        {
            const {info, loading} = this.props;

            if (loading) {
                return <Card loading>
                    Loading</Card>;
            }
            const {badges} = info;
            const {totalCount, edges} = badges;
            return (
                <Card title="My Badges">

                    <List
                        split={false}
                        loading={loading}
                        grid={{gutter: 10, xs: 1, sm: 2, md: 3, lg: 6, xl: 6}}
                        dataSource={edges}
                        renderItem={item => (
                            <BadgesListItem item={item}/>
                        )}
                    />
                </Card>

            );
        }
}
export default Badges;