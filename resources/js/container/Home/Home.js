import React from "react";
import Autocomplete from "../../components/InputFields/Autocomplete";
import { connect } from "react-redux";
import Cover from "./Cover/Cover";
import Aux from "../../hoc/Aux/Aux";
import Grid from "@material-ui/core/Grid";
import HowItWorks from "./HowItWorks/HowItWorks";
import Slogan from "./Cover/Slogan";
import Suggestions from "./Cover/Suggestions";
import Testimonials from "./Testimonials/Testimonials";
import Footer from "./Footer/Footer";

class Home extends React.Component {
    render() {
        return (
            <Aux>
                <Slogan />
                <Autocomplete />
                <Cover />
                <Suggestions />

                <HowItWorks />
                <Testimonials />
                <Footer />
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth.auth
    };
};
export default connect(
    mapStateToProps,
    null
)(Home);
