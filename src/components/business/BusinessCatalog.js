import React from "react";
import { Container } from "reactstrap";
import "rc-pagination/assets/index.css";
import Select from "rc-select";
import Pagination from "rc-pagination";
import localeInfo from "rc-pagination/lib/locale/en_US";
import BusinessCards from "./BusinessCards";
import { connect } from "react-redux";
import { getBusinesses } from "../../actions/businessActions";

class BusinessCatalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
      isAuthenticated: false,
      isActive: 1,
      count: 1,
      perPage: 6,
    };
  }
  // Get the new business list on pagination change
  onChange = (page, pageSize) => {
    this.props.getBusinesses(page, pageSize, this.props.data.businessName,
      this.props.data.category, this.props.data.location);
  };
  // Get the new businesses on businesses per page change
  onShowSizeChange = (page, pageSize) => {
    this.props.getBusinesses(page, pageSize, this.props.data.businessName,
      this.props.data.category, this.props.data.location);
  };

  componentDidMount() {
    // Function to obtain paginated businesses
    console.log(this.props.data);
    if(!this.props.data.searchComplete){
      this.props.getBusinesses(this.state.isActive, this.state.perPage,
        this.props.data.businessName, this.props.data.category, this.props.data.location);
    }

  }
  // Function to return the total count of businesses on the page
  showTotal = total => `Total ${total} Businesses`;

  // Function to render the component
  render() {
    const { businesses, count, isActive, perPage } = this.props.data;
    return (
      <div>
        <Container fluid>
          <Pagination
            current={isActive}
            selectComponentClass={Select}
            total={count}
            onChange={this.onChange}
            defaultPageSize={perPage}
            showSizeChanger
            showLessItems
            pageSizeOptions={["6", "12", "18", "24"]}
            style={{ marginTop: "15px" }}
            showTitle={false}
            locale={localeInfo}
            onShowSizeChange={this.onShowSizeChange}
            showTotal={this.showTotal}
          />
          <BusinessCards businesses={businesses} />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.businessReducer.data
  };
};

export default connect(
  mapStateToProps,
  { getBusinesses }
)(BusinessCatalog);
