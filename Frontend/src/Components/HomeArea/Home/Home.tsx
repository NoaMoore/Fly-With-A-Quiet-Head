import "./Home.css";
import useTitle from "../../../Utils/UseTitle";
import { CardHeader } from "@mui/material";

function Home(): JSX.Element {
  useTitle("Home");

  return (
    <div className="Home">
            <div className="content">
            <span className="highlighted-title">Looking for the perfect overseas vacation? You've come to the right place!</span>
              <CardHeader className="text"
                        // title={`Looking for the perfect overseas vacation? You've come to the right place!`}
                        subheader= {`We are an experienced and reputable travel agency with a proven track record of creating dream vacations for our clients. We offer a wide range of services, including:
                        
                        Flights: We work with all major airlines worldwide and offer a wide variety of flights to destinations all over the globe.
                        Hotels: We offer a wide range of hotels at all price points, from luxury boutique hotels to affordable family-friendly hotels.
                        Vacation Packages: We offer vacation packages that include flights, hotels, and airport transfers.
                        Organized Tours: We offer organized tours to destinations all over the world, on a variety of themes and budgets.
                        Travel Insurance: We offer comprehensive travel insurance at competitive prices.
                        We believe that a vacation should be an unforgettable experience, so we emphasize personal and professional service throughout the entire process. Our team of experienced travel agents will be happy to consult with you and create the perfect vacation for you.
                        
                        Why Choose Us?
                        
                        Experience and Expertise: We are an experienced and reputable travel agency with a proven track record of creating dream vacations for our clients.
                        Wide Range of Services: We offer a wide range of services so you can find everything you need for the perfect vacation with us.
                        Competitive Prices: We offer competitive prices on all of our services.
                        Personal and Professional Service: We emphasize personal and professional service throughout the entire process.
                        Reliability: We are a reliable and well-known company, and we are committed to providing you with the best possible service.
                        Contact us today and start planning your dream vacation!`}/>
                                <span className="highlighted-text">Contact us today and start planning your dream vacation!</span>
                                </div>
                            </div>
  );
}

export default Home;
