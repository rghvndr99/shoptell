import React from 'react';


const AboutUs = (props) => {
    return (
        <React.Fragment>
            <div className="about-section">
                <h1>About Us Page</h1>
                <p>Some text about who we are and what we do.</p>
                <p>Resize the browser window to see that this page is responsive by the way.</p>
            </div>

            <h2 style={{textAlign:"center"}}>Our Team</h2>
            <div className="container-fluid">
            <div className="row profile-wrap">
                <div className="column profile-container">
                    <div className="card">
                        <img src="https://via.placeholder.com/100x100" alt="Jane" className="profile-img" />
                        <div className="container">
                            <h2>Jane Doe</h2>
                            <p className="title">CEO & Founder</p>
                            <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                            <p>jane@example.com</p>
                            <p><button className="button">Contact</button></p>
                        </div>
                    </div>
                </div>

                <div className="column profile-container">
                    <div className="card">
                        <img src="https://via.placeholder.com/100x100" alt="Mike" className="profile-img"  />
                        <div className="container">
                            <h2>Mike Ross</h2>
                            <p className="title">Art Director</p>
                            <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                            <p>mike@example.com</p>
                            <p><button className="button">Contact</button></p>
                        </div>
                    </div>
                </div>

                <div className="column profile-container">
                    <div className="card">
                        <img src="https://via.placeholder.com/100x100" alt="John" className="profile-img" />
                        <div className="container">
                            <h2>John Doe</h2>
                            <p className="title">Designer</p>
                            <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                            <p>john@example.com</p>
                            <p><button className="button">Contact</button></p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </React.Fragment>
    )
}

export default AboutUs;