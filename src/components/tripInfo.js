import React, { Suspense, useState, useEffect } from 'react';
import base64 from 'base-64';
import { baseUrl } from '../configuration';
import { useAppContext } from '../context';
import images from "../components/image";

const TripInfo = (props) => {
	const [trip, setDetail] = useState({});
	const { ID } = props.match.params;

	useEffect(() => {
		fetch(baseUrl + 'products/' + ID, {
			method: 'get',
			headers: {
				"Content-Type": "application/json",
			},
			credentials: 'same-origin',
		})
			.then(res => res.json())
			.then(data => {
				setDetail(data);
			})

	}, []);

	if (!ID) return '';

	return (
		<div className="container">
			<div className="card deatils-wrapper">
				<div className="container-fliud">
					<div className="wrapper row">
						<div className="preview col-md-6">

							<div className="preview-pic tab-content">
								<div className="tab-pane active" id="pic-1">
									<img src={window.location.origin+images[1].src} alt="tsr"></img>
								</div>
							</div>

						</div>
						<div className="details col-md-6">
							<h3 className="product-title">{trip.name}</h3>
							<div className="rating">
								<span className="review-no">{trip?.comments?.length} reviews</span>
							</div>
							<p className="product-description">{trip.description}</p>
							<h4 className="price">current price: <span>${trip.price}</span></h4>
							<div className="action">
								<button className="add-to-cart btn btn-default" type="button">add to cart</button>
								<button className="like btn btn-default" type="button"><span className="fa fa-heart"></span></button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default TripInfo;