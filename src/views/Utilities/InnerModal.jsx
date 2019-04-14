import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import API from '../../adapters/API'
import Datetime from "react-datetime";
import FormControl from "@material-ui/core/FormControl";


const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class InnerModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      bill_date: "",
      cost: ""
    };
  }


  handleSubmit = () => {
    const bill = {
        bill_date: this.state.bill_date,
        cost: this.state.cost,
        id: this.props.billData.id,
        utility_id: this.props.billData.utility_id
    }
    API.updateBill(bill).then(data => {
        if (data.error) {
          alert("something is wrong!");
        } else {
          alert("Bill Updated!")
        }
    })  
    this.props.updateBillLocal(bill)
    this.props.handleClose()
  };



  formatDate = (date) => {
         const formatDate = date
      .split("T")[0]
      .split("-")
      .reverse()
      .join("/")
    return formatDate
   }

componentDidMount(){
    this.setState({
        bill_date: this.props.billData.bill_date,
        cost: this.props.billData.cost
    })
}

handleFirstDate = (date) => {
    this.setState({
        bill_date: date,
    })
}

handleChange = event =>
this.setState({ [event.target.name]: event.target.value });


  render(){
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>

          <GridItem xs={12} sm={12} md={12}>
            <Card>
            <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Edit Bill</h4>
          </CardHeader>
              <CardBody>
              <GridContainer>
                    <GridItem xs={12} sm={12} md={12} >
                    <FormControl fullWidth style={{paddingTop: 10 +'px'}}>
                      <Datetime
                        onChange={date => this.handleFirstDate(date)}
                        timeFormat={false}
                        defaultValue= {this.formatDate(this.props.billData.bill_date)}
                        // value= {this.formatDate(this.props.billData.bill_date)}
                        inputProps={{
                          placeholder: "Payment Date",
                          name: "bill_date",
                        //   defaultValue: this.formatDate(this.props.billData.bill_date),
                        //   value: this.formatDate(this.props.billData.bill_date)
                        }}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Cost"
                    id="cost"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      defaultValue: this.props.billData.cost,
                      name: "cost",
                      onChange: this.handleChange,
                      type: "number",
                      step: "0.01",
                      min: 0
                    }}
                  />
                </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={this.handleSubmit}>Confirm</Button>
                <Button color="info" onClick={() => this.props.handleClose()}>Cancel</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }

}

export default withStyles(styles)(InnerModal);
