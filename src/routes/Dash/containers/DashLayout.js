import { connect } from 'react-redux'
import DashLayout from '../components/DashLayout'

/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {

    return {
        current_role: 'user'//for now state.network.current_role
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashLayout);