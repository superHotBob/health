/**
 * Created by Pavel on 20.12.2017.
 */
import React from 'react';
import ReactPlaceholder from 'react-placeholder';
import {TextBlock, MediaBlock, TextRow, RectShape, RoundShape} from 'react-placeholder/lib/placeholders';
import {Layout,Button, List,Collapse} from 'antd';
import Filters from '../../Filters/components'
const {  Sider } = Layout;
const Panel = Collapse.Panel;

export class PlanstoreLayout extends React.Component {

    constructor(props){
        super(props);
    }

    changePage = (page) => {
        this.props.loadMoreEntries(page)
    }

    /**
     * Updates filter by type (category, price, etc)
     * @param filter
     * @param values
     */

    render() {
        const {loading, filters, activeFilters,onSuccess} = this.props;
        const pageOpts = {onChange: this.changePage, total: 50};
        const siderPlaceholder = [];
        for(var i=0; i<4; i++) {
            siderPlaceholder.push(  {
                item:   <div  className='my-awesome-placeholder'>
                    <RectShape color='#888888'  style={{width: 199, height: 20}}/>
                    <TextRow color='#E0E0E0' style={{width: 170, height: 15}}/>
                    <TextRow color='#E0E0E0' style={{width: 170, height: 15}}/>
                    <TextRow color='#E0E0E0' style={{width: 170, height: 15}}/>
                    <TextRow color='#E0E0E0' style={{width: 170, height: 15}}/>
                </div>
            })
        }
        if (loading) {
            return (


                        <Sider width={200} style={{background: '#fff', borderRight: '1px solid'}} breakpoint="xs"
                               collapsedWidth="0">
                            <List
                                grid={{gutter: 5, md: 1}}
                                dataSource={siderPlaceholder}
                                renderItem={item => (
                                    <List.Item>
                                        {item.item}
                                    </List.Item>
                                )}
                            />
                        </Sider>

               )
        }


        return (
           <div>
                <Sider width={200} style={{background: '#fff', borderRight: '1px solid'}} breakpoint="xs"
                       collapsedWidth="0">
                    <Filters filters={filters} activeFilters={activeFilters} onSuccess={onSuccess} />
                    <Button onClick={this.updateZeroFilters}>Clean filter</Button>
                </Sider>
               </div>
        )

    }
}

export default PlanstoreLayout