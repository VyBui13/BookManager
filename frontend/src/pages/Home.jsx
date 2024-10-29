
import "../styles/Home.css";

function Home() {
    return (
        <div className="home">
            <div className="home__header">

                <div className="home__title">
                    <p>Book Management</p>
                    <h1>Dashboard</h1>
                </div>

                <div className="home__feature">
                    <div className="home__search">
                        <input type="text" placeholder="Search" />
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>

                    <div className="home__profile">
                        <i class="fa-solid fa-user-tie"></i>
                    </div>
                </div>

            </div>
        </div>


    );
}

export default Home;