var currencyGlobal = {
  'PENNY':	.01,
  'NICKEL': .05,
  'DIME': 0.10,
  'QUARTER':	0.25,
  'ONE'	: 1.00,
  'FIVE' : 5.00,
  'TEN' : 10.00,
  'TWENTY' : 20.00,
  'ONE HUNDRED' : 100
}

// declare both as global var

let totalCashCid = 0;
let cidObj = {} // a mutable copy of cid; we will not manipulate cid param after vals are copied

tallyCid = (cid) => {
  for (let c of cid) {
    console.log("c[0]: " + c[0]);
    console.log("c[1]: " + c[1]);
    totalCashCid += c[1]; // add up all bills and coins in the cid and store in a global var
    cidObj[c[0]] = c[1]; // copy cid to cidObj
  }
}

checkExactChange = (cashRemainder) => {
  if (cashRemainder === totalCashCid) {
    return true;
  }
  return false
}

checkCashRegister = (price, cash, cid) => {
  let cashReturn = []; // this arr to be returned after operations
  const cashDiff = cash - price; // the amount of change due
  
  let cashRemainder = cashDiff; // we will increment this var; we leave cashDiff as an immutable var
  
  tallyCid(cid); // updates totalCashCid and cidObj
  console.log(cidObj);
  
  totalCashCid = parseFloat((totalCashCid).toFixed(2));
  console.log("total cash in cid: " + totalCashCid);
  
  if (checkExactChange(cashRemainder) === true) {
    return {'status' : 'CLOSED', 'change' :  cid}
  }
  if (cashRemainder > totalCashCid) {
    console.log("Insufficent Amount!")
    console.log({'status' : 'INSUFFICIENT_FUNDS', 'change' :  []})
    return {'status' : 'INSUFFICIENT_FUNDS', 'change' :  []}
  }
  console.log("cid param in new obj: ")
  console.log(cidObj); // easier lookup of # of bills in cid

 
  // divisible by hundred's bill
  if (cashRemainder / 100 > 0) {
    let hundredDollar = parseInt(cashRemainder / 100);
    console.log("hundredDollar: " + hundredDollar)
    let avaliableCash = cidObj['ONE HUNDRED'] / 100;
    console.log("avaliable cash: " + avaliableCash);
    if (avaliableCash < hundredDollar) { // hun bill fits in, but not enough bills in register to give full amount ie. 300 % 3 One Hundred bills gives 3 One Hundred bills, but only 2 One Hundred bills avaliable, so simply give 2 One hundred bills, because its as close as we can get to close the negative balance
      hundredDollar = avaliableCash;
    }
    console.log("hundredDollar: ");
    let hundredRecord = ['ONE HUNDRED', hundredDollar * 100];
    console.log(hundredRecord)
    if (hundredRecord[1] !== 0) {
      cashReturn.push(hundredRecord)
    }
    cashRemainder = parseFloat((cashRemainder - (100 * hundredDollar)).toFixed(2));; // b/c in this if statement, assume at least 1 One hundred bill was added to the cashReturn arr
    console.log("cash remainder: " + cashRemainder)
  }

  // divisible by twenty's bill
  if (cashRemainder / 20 > 0) {
    let twentDollar = parseInt(cashRemainder / 20);
    console.log(twentDollar);
    let avaliableCash = cidObj['TWENTY'] / 20;
    console.log(avaliableCash);
    if (avaliableCash < twentDollar) {
      twentDollar = avaliableCash;
    }
    console.log(twentDollar);
    let twentRecord = ['TWENTY', twentDollar * 20];
    console.log(twentRecord)
    if (twentRecord[1] !== 0) {
      cashReturn.push(twentRecord)
    }
    console.log(20 * twentDollar)
    console.log(cashRemainder)
    cashRemainder = parseFloat((cashRemainder - (20 * twentDollar)).toFixed(2));
    console.log(cashRemainder)
  }

  // divisible by ten's bill
  if (cashRemainder / 10 > 0) {
    let tenDollar = parseInt(cashRemainder / 10);
    console.log(tenDollar);
    let avaliableCash = cidObj['TEN'] / 10;
    console.log(avaliableCash);
    if (avaliableCash < tenDollar) {
      tenDollar = avaliableCash;
    }
    let tenRecord = ['TEN', tenDollar * 10];
    console.log(tenRecord)
    if (tenRecord[1] !== 0) {
      cashReturn.push(tenRecord)
    }
    cashRemainder = parseFloat((cashRemainder - (10 * tenDollar)).toFixed(2));
    console.log(cashRemainder)
  }

  // divisible by five's bill
  if (cashRemainder / 5 > 0) {
    let fiveDollar = parseInt(cashRemainder / 5);
    console.log(fiveDollar);
    let avaliableCash = cidObj['FIVE'] / 5;
    console.log(avaliableCash);
    if (avaliableCash < fiveDollar) {
      fiveDollar = avaliableCash;
    }
    let fiveRecord = ['FIVE', fiveDollar * 5];
    console.log(fiveRecord)
    if (fiveRecord[1] !== 0) {
      cashReturn.push(fiveRecord)
    }
    cashRemainder = parseFloat((cashRemainder - (5 * fiveDollar)).toFixed(2));
    console.log(cashRemainder)
  }

  // divisible by one's bill
  if (cashRemainder / 1 > 0) {
    let oneDollar = parseInt(cashRemainder / 1);
    console.log(oneDollar)
    let avaliableCash = cidObj['ONE'] / 1;
    console.log(avaliableCash);
    if (avaliableCash < oneDollar) {
      oneDollar = avaliableCash;
    }
    let oneRecord = ['ONE', oneDollar * 1];
    console.log(oneRecord)
    if (oneRecord[1] !== 0) {
      cashReturn.push(oneRecord)
    }
    cashRemainder = parseFloat((cashRemainder - (1 * oneDollar)).toFixed(2));
    console.log(cashRemainder)
  }

  // divisible by quarter
  if (cashRemainder / .25 > 0) {
    let numQuart = parseInt(cashRemainder / .25);
    console.log(numQuart)
    let avaliableCash = cidObj['QUARTER'] / .25;
    console.log(avaliableCash);
    if (avaliableCash < numQuart) {
      numQuart = avaliableCash;
    }
    let quarterRecord = ['QUARTER', numQuart * .25];
    console.log(quarterRecord)
    if (quarterRecord[1] !== 0) {
      cashReturn.push(quarterRecord)
    }
    cashRemainder = parseFloat((cashRemainder - (.25 * numQuart)).toFixed(2));
    console.log(cashRemainder)
    
  }
  // divisible by dime
  if (cashRemainder / .10 > 0) {
    let numDime = parseInt(cashRemainder / .10);
    console.log(numDime);
    let avaliableCash = cidObj['DIME'] / .10;
    console.log(avaliableCash);
    if (avaliableCash < numDime) {
      numDime = avaliableCash;
    }
    let dimeRecord = ['DIME', numDime * .10];
    console.log(dimeRecord)
    if (dimeRecord[1] !== 0) {
      cashReturn.push(dimeRecord)
    }
    cashRemainder = parseFloat((cashRemainder - (.10 * numDime)).toFixed(2));
    console.log(cashRemainder)
  }

  // divisible by nickel's
  if (cashRemainder / .05 > 0) {
    let numNick = parseInt(cashRemainder / .05);
    console.log(numNick);
    let avaliableCash = cidObj['NICKEL'] / .05;
    console.log(avaliableCash);
    if (avaliableCash < numNick) {
      numNick = avaliableCash;
    }
    let nickRecord = ['NICKEL', numNick * .05];
    console.log(nickRecord)
    if (nickRecord[1] !== 0) {
      cashReturn.push(nickRecord)
    }
    cashRemainder = parseFloat((cashRemainder - (.05 * numNick)).toFixed(2));
    console.log(cashRemainder)
  }
  // divisible by pennie's
  if (cashRemainder / .01 > 0) {
    let numPenn = parseInt(cashRemainder / .01);
    console.log(numPenn);
    let avaliableCash = cidObj['PENNY'] / .01;
    console.log(avaliableCash);
    if (avaliableCash < numPenn) {
      numPenn = avaliableCash;
    }
    let pennRecord = ['PENNY', (numPenn * .01)]; // +.04 account for rounding error
    console.log(numPenn)
    if (pennRecord[1] !== 0) {
      cashReturn.push(pennRecord)
    }
    cashRemainder = parseFloat((cashRemainder - (.01 * numPenn)).toFixed(2));
    console.log(cashRemainder);
  }
  // * calc new cashRemainder ie. cashRemainder % 100

  // surgecal site
  console.log("Final Section: ")
  let totalInCashReturn = 0;
  for (let cash of cashReturn) {
    console.log("first elem: " + cash[0]);
    console.log("second elem: " + cash[1]);
    totalInCashReturn += cash[1];
  }

  console.log("cashReturn: ");
  console.log(cashReturn);
  console.log("cashDiff: ");
  console.log(cashDiff);
  console.log("totalInCashReturn: ");
  totalInCashReturn = parseFloat((totalInCashReturn).toFixed(2));
  console.log(totalInCashReturn)
  if (cashDiff % totalInCashReturn !== 0 ){
    console.log("Insufficent 2!")
    return {'status' : 'INSUFFICIENT_FUNDS', 'change' :  []}
  }
  return {status: "OPEN", change: cashReturn}
}


console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]))

/*
checkCashRegister(3.26, 353.50, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 200], ["ONE HUNDRED", 200]])
*'/'
/*
checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])
*/
/*
checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
*/

/*
checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
*/

/*
checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
*/
/*
checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])
*/