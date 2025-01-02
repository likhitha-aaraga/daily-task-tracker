import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRouter from "./AppRouter";
import "./global.scss";

function App() {
    return (
        <div className="App">
            <Header />
            <AppRouter />
            <Footer />
        </div>
    );
}

export default App;
