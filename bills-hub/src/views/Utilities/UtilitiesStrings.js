

export const paymentTypeArray = ["Direct Debit", "Credit Card", "Debit Card", "Cash", "Payment Meter"]

export const paymentFreqArray = ["Daily", "Weekly", "Bi-Weekly", "Monthly", "Quarterly", "Yearly"]


// table headers would be : 
// Utility Type; House Size?; Location?; Age?;

export const BillRequirements = [
    ["Car Insurance", false, true, true],
    ["Car Tax", false, false, false],
    ["Contents Insurance", false, false, false] ,
    ["Council Tax", true, true, false] ,
    ["Electric", true, false, false ],
    ["Gas", true, false, false],
    ["Gas & Electric", true, false, false],
    ["Home Phone", false, false, false],
    ["Internet", false, false, false],
    ["Mobile Phone Contract" , false, false, false],
    ["Mobile Phone Insurance", false, false, true],
    ["MOT", false, false, false], 
    ["Mortgage",true, true, false],
    ["Rent", true, true, false],
    ["Travel Insurance", false, false, true],
    ["TV License", false, false, false],
    ["Water", true, false, false]
]

export const logoImageStyle = {
    WebkitBorderRadius: '4px',
    MozBorderRadius: '4px',
    OBorderRadius: '4px',
    MsBorderRadius: '4px',
    borderRadius: '4px',
    width: '128px',
    height: 'auto'
  }
  
  export const logoStyle={
    width: "138px",
    height: "138px",
    margin: "0px auto 0 auto",
    border:' 5px solid #fff',
    WebkitBoxShadow:' 0px 1px 4px 0px rgba(0,0,0,0.18)',
    MozBoxShadow:' 0px 1px 4px 0px rgba(0,0,0,0.18)',
    OBoxShadow:' 0px 1px 4px 0px rgba(0,0,0,0.18)',
    MsBoxShadow:' 0px 1px 4px 0px rgba(0,0,0,0.18)',
    BoxShadow:' 0px 1px 4px 0px rgba(0,0,0,0.18)',
    WebkitBorderRadius:' 4px',
    MozBorderRadius:' 4px',
    OBorderRadius:' 4px',
    MsBorderRadius:' 4px',
    borderRadius:' 4px',
    position:' relative',
    // display:'-webkit-flex',
    display:' flex',
    WebkitFlexDirection: 'column',
    MozFlexDirection: 'column',
    OFlexDirection: 'column',
    MsFlexDirection: 'column',
    flexDirection: 'column',
    WebkitJustifyContent: 'center',
    MozJustifyContent: 'center',
    OJustifyContent: 'center',
    MsJustifyContent: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  }