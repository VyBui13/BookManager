
function CardDetail({ book }) {
    return (
        <>
            <div className="body-description">
                <div className="feature">
                    <div className="icon-feature">01</div>

                    <div className="header-feature">
                        Personal Touch
                    </div>

                    <div className="body-feature">
                        Add your own photos, messages to make each card truly one-of-a-kind.
                    </div>

                    <div className="btn-feature">
                        <a href="">Read More</a>
                    </div>
                </div>

                <div className="feature">
                    <div className="icon-feature">02</div>
                    <div className="header-feature">
                        Easy to Use
                    </div>
                    <div className="body-feature">
                        Our user-friendly design tools make it simple to create the perfect card in minutes.
                    </div>

                    <div className="btn-feature">
                        <a href="">Read More</a>
                    </div>
                </div>

                <div className="feature">
                    <div className="icon-feature">03</div>
                    <div className="header-feature">
                        Print & Share
                    </div>
                    <div className="body-feature">
                        Download your card for printing or share it instantly via email and social media.
                    </div>

                    <div className="btn-feature">
                        <a href="">Read More</a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CardDetail;