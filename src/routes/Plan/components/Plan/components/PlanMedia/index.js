import React from 'react'
import PropTypes from 'prop-types'

import {Card, Icon, Tooltip} from 'antd';


export default class PlanMedia extends React.PureComponent {
    constructor(props) {
        super(props);
    };
    static propTypes = {
        reportValue: PropTypes.number
    };

    render() {
        const {item} = this.props;
        console.log(item);
        const {label, type, url, embedHtml} = item;

        //console.log(marks);
        switch(type) {
            case 'image':
                return <Card
                             cover={<img alt={label} src={url} />}
                ><Card.Meta
                    avatar={<Icon type="picture" />}
                    title={label}

                /></Card>;
                break;
            case 'import':
            case 'audio':
                return <Card
                             cover={<div dangerouslySetInnerHTML={{__html: embedHtml}}></div>}
                ><Card.Meta
                    avatar={<Icon type="play-circle-o" />}
                    title={label}
                /></Card>;//<Slider marks={marks}    />
                break;
            default:
                let icon = '';
                if (type == 'presentation') {
                    icon = <Icon type="file-ppt" />;
                } else {
                    icon = <Icon type="file-pdf" />;
                }
                return <Card hoverable ><a href={item.url} target="_blank"><Card.Meta
                    avatar={icon}
                    title={<Tooltip title="Will be pened in a new tab">{item.label}</Tooltip>}
                    description="Will be opened in a new tab"
                /></a></Card>;//<Slider marks={marks}    />
                break;
        }


    }
}