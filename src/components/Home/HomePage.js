import videoHomepage from "../../assets/video-homepage.mp4";

function HomePage() {
    return (
        <div className="homepage-container">
            <video width="750" height="500" autoPlay muted loop>
                <source src={videoHomepage} type="video/mp4" />
            </video>
            <div className="homepage-content">
                <div className="title-1">
                    Get to know your customers with forms worth filling out
                </div>
                <div className="title-2">
                    Collect all the data you need to understand customers with
                    forms designed to be refreshingly different.
                </div>
                <div className="title-3">
                    <button>Get started. It's free</button>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
