import ImageSlider from "../components/ImageSlider";
import "../styles/Home.css";
import firstPic from "/pic/img/Slider/first.png";
import secondPic from "/pic/img/Slider/second.jpg";
import thirdPic from "/pic/img/Slider/third.jpg";
import forthPic from "/pic/img/Slider/forth.jpg";

function Home() {
    const slides = [
        { url: firstPic, title: "First", description: "First Description" },
        { url: secondPic, title: "Second", description: "Second Description" },
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