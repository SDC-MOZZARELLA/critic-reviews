import React from 'react';
import ReviewSource from './ReviewSource.jsx';
import ViewAll from './ViewAll.jsx';
import CReview from './CReview.jsx';
import { Cr_reviews, Top_critic, } from './Styles.jsx';

const ReviewList = (props) => {
    // console.log("RL",props)
    let currtList;
    props.extent ? currtList = props.list.concat(props.extList) : currtList = props.list;
    // console.log("currentList", currtList)
    return(
        <Cr_reviews className="review_container">
        {
            currtList.map((item, index) => (
                <ul key={index}>
                    <Top_critic className="single_review" index={index}>
                        <CReview item={item} index={index} />
                        <ReviewSource photo={item.user_photo} username={item.user_name} publication={item.publication} topCritic={item.rank}/>
                    </Top_critic>
                </ul>
            ))
        }

        <ViewAll extendAR={props.extendAR} extent={props.extent}/>

        </Cr_reviews>
    )
}

export default ReviewList;