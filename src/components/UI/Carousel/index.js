import { Carousel as AntCarousel, Icon } from 'antd';
import React from 'react';
import './index.less';


export const Carousel = (props) => {
	const { items, slidesToShow=3, ...otherProps } = props;
	//const slidesToShow = info.length >= limit ? limit : info.length;
	return <AntCarousel
				className={'dots-under'}
				slidesToShow={slidesToShow}
				slidesToScroll={slidesToShow}
				initialSlide={0}
				swipeToSlide={true}
				arrows={true}
				dots={true}
				centerPadding={20}
				nextArrow={<NextArrow />}
				prevArrow={<PrevArrow />} 

				{...otherProps}
				// appendDots={dots => (
				// 	<div
				// 	className={'dots-under'}
				// 	  style={{
				// 		bottom: '-15px'
				// 	  }}
				// 	>
				// 	  <ul style={{ margin: "0px" }}> {dots} </ul>
				// 	</div>
				//   )}
				// responsive={[ { breakpoint: 768, settings: { slidesToShow: 3, slidesToScroll: 3 } } ]}
			>
				{items}
			</AntCarousel>
};

const NextArrow = props => {
	const { className, style, onClick } = props;
	return <div className={className}><Icon type="right-circle" onClick={onClick} /></div>;
}
const PrevArrow = props => {
	const { className, style, onClick } = props;
	return <div className={className}><Icon type="left-circle" onClick={onClick} /></div>;
}