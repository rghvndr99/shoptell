
import React, { Suspense, useState } from 'react';
import TripInfo from '../components/tripInfo';
import CommentsList from '../components/listcomments';
import AddComment from '../components/addComment';

const TripDetail = (props) => {
    const [isFirstTabActive, setActiveTab] = useState(true);

    const tabHandler = () => {
        setActiveTab(!isFirstTabActive);
    }
    return (
        <React.Fragment>

            <TripInfo {...props} />
            <div className="container comment-section">


                <ul className="nav nav-tabs">
                    <li className="nav-item" onClick={tabHandler}>
                        <a className={`nav-link ${isFirstTabActive ? 'active' : ''}`} >Comments</a>
                    </li>
                    <li className="nav-item" onClick={tabHandler}>
                        <a className={`nav-link ${!isFirstTabActive ? 'active' : ''}`} >Add Comment</a>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className={`tab-pane fade ${isFirstTabActive ? 'show active' : ''}`} role="tabpanel" aria-labelledby="comment-tab">
                        <CommentsList {...props} />
                    </div>
                    <div className={`tab-pane fade ${!isFirstTabActive ? 'show active' : ''}`} role="tabpanel" aria-labelledby="addcomment-tab">
                        <AddComment {...props} />
                    </div>

                </div>
            </div>

        </React.Fragment>
    )
}
export default TripDetail;