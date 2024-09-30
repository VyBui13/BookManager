import ImageSlider from "../components/ImageSlider";
import "../styles/Home.css";
import thirdPic from "/pic/img/Slider/third.jpg";
import forthPic from "/pic/img/Slider/forth.jpg";

function Home() {
    const slides = [
        { url: thirdPic, title: "Third", description: "Third Description" },
        { url: forthPic, title: "Forth", description: "Forth Description" },
    ];

    return (
        <div id="description">
            <ImageSlider slides={slides} />
        </div>
    );
}

export default Home;