import { useState } from 'react';
import '../styles/Slider.css';

function ImageSlider({ slides }) {
    const [current, setCurrent] = useState(0);

    const sliderStyle = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${slides[current].url})`,
    };

    const nextSlide = () => {
        setCurrent(current === slides.length - 1 ? 0 : current + 1);
    }

    const prevSlide = () => {
        setCurrent(current === 0 ? slides.length - 1 : current - 1);
    }

    return (
        <>
            <div className="arrow arrow--left">
                <i onClick={prevSlide} class="fa-solid fa-arrow-left"></i>
            </div>
            <div className="arrow arrow--right">
                <i onClick={nextSlide} class="fa-solid fa-arrow-right"></i>
            </div>
            <div className="slider" style={sliderStyle}>
                <div className="slider__title">
                    <div className="slider__title-text">
                        {slides[current].title}
                    </div>
                </div>

                <div className="slider__description">
                    <div className="slider__description-text">
                        {slides[current].description}
                    </div>
                </div>

            </div>
        </>
    );
};

export default ImageSlider;