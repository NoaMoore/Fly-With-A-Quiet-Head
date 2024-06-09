import Copyrights from "../Copyrights/Copyrights";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {
    return (
        <div className="layout">
            <header className="header">
            <Header />
            </header>
            <nav className="nav">
            <Navbar/>
            </nav>
            <main className="routing">
            <Routing />
            </main>
            <footer className="footer">
            <Copyrights />
            </footer>
        </div>
    );
}

export default Layout;
