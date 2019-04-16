// import { GetBillLabels } from "./Labels";

const getTimeToNextBill = (date) => {
    let one_day=1000*60*60*24
    let date1 = new Date(date)
    let date2 = new Date()
    let diff = date2.getTime() - date1.getTime()
    let diffPositive = Math.abs(diff)
    return Math.ceil(diffPositive/one_day)
    }


export const sortDatesLowToHigh = (a, b) => {
    a = new Date(a.bill_date)
    b = new Date(b.bill_date)
    return a < b ? -1 : a > b ? 1 : 0
   }

export const sortDatesHighToLow = (a, b) => {
    a = new Date(a.bill_date)
    b = new Date(b.bill_date)
    return a > b ? -1 : a < b ? 1 : 0
   }

export const returnSeries = (data) => {
    let values = [
       0,0,0,0,0,0,0,0,0,0,0,0
    ]

    data.map(bill => {
        if (getTimeToNextBill(bill.bill_date)<324){
            let billDate = new Date(bill.bill_date)
            let billMonthInt = billDate.getMonth()
            if (billMonthInt > 6) {
                 return values[billMonthInt-12+6] = values[billMonthInt-12+6] + bill.cost
                }else{
                return values[billMonthInt+6] = values[billMonthInt+6] + bill.cost
                }
        }
    })
    let series = values.map(value => {if(value === 0 ){
        return null
    }else if(isNaN(value)) {
        return null
    }else{
        return value
    
    }})
    
    return [series]
}

export const GetMonthBillCostsAndLabels = (utilities) => {
    let costArray = []
    let billArray = []
    let today = new Date()
    let monthInt = today.getMonth()

    // only select utilities that have a bill in current month
    let filteredUtilities = utilities.filter(utility => utility.bills.map(bill => new Date(bill.bill_date).getMonth()).includes(monthInt))
    filteredUtilities.map(utility => utility.bills.map(bill => {
        if(new Date(bill.bill_date).getMonth() === monthInt) {
            bill.utility_type = utility.utility_type
            billArray = [...billArray, bill]
        } 
    }))

    // pull out the duplicate utility IDs and add together the cost
  billArray.forEach(function (a) {
  if (!this[a.utility_id]) {
      this[a.utility_id] = { utility_id: a.utility_id, utility_type: a.utility_type, cost: 0 };
      costArray.push(this[a.utility_id]);
  }
  this[a.utility_id].cost += a.cost;
}, Object.create(null));

    return costArray
}

export const GetYearBillCostsAndLabels = (utilities) => {
    let costArray = []
    let billArray = []
    let today = new Date()
    let yearInt = today.getYear()

    // only select utilities that have a bill in current month
    let filteredUtilities = utilities.filter(utility => utility.bills.map(bill => new Date(bill.bill_date).getYear()).includes(yearInt))
    filteredUtilities.map(utility => utility.bills.map(bill => {
        if(new Date(bill.bill_date).getYear() === yearInt) {
            bill.utility_type = utility.utility_type
            billArray = [...billArray, bill]
        } 
    }))

    // pull out the duplicate utility IDs and add together the cost
  billArray.forEach(function (a) {
  if (!this[a.utility_id]) {
      this[a.utility_id] = { utility_id: a.utility_id, utility_type: a.utility_type, cost: 0 };
      costArray.push(this[a.utility_id]);
  }
  this[a.utility_id].cost += a.cost;
}, Object.create(null));
   return costArray
    
}


export const GetNextMonthBillCostsAndLabels = (utilities) => {
    let costArray = []
    let billArray = []
    let today = new Date()
    let monthInt = today.getMonth()+1

    // only select utilities that have a bill in current month
    let filteredUtilities = utilities.filter(utility => utility.bills.map(bill => new Date(bill.bill_date).getMonth()).includes(monthInt))
    filteredUtilities.map(utility => utility.bills.map(bill => {
        if(new Date(bill.bill_date).getMonth() === monthInt) {
            bill.utility_type = utility.utility_type
            billArray = [...billArray, bill]
        } 
    }))

    // pull out the duplicate utility IDs and add together the cost
  billArray.forEach(function (a) {
  if (!this[a.utility_id]) {
      this[a.utility_id] = { utility_id: a.utility_id, utility_type: a.utility_type, cost: 0 };
      costArray.push(this[a.utility_id]);
  }
  this[a.utility_id].cost += a.cost;
}, Object.create(null));

    return costArray
}
