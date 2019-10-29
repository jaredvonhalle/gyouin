import Config from './Config'

export function validatePersonalBet(bet) {
  let rtnObj = {
    "isValid":true,
    "msg":""
  }
  //validate players
  let playersInd = validatePersonalPlayers(bet.challenger, bet.accepter)
  if (!playersInd) {
    rtnObj.isValid = false;
    rtnObj.msg = "Cannot save. Player name is invalid.";
    return rtnObj;
  }
  //validate odds
  let oddsInd = validateOdds(bet.odds)
  if (!oddsInd) {
    rtnObj.isValid = false;
    rtnObj.msg = "Cannot save. Odds must be in the format #:#";
    return rtnObj;
  }
  //validate amount
  let amountInd = validateAmount(bet.amount)
  if (!amountInd) {
    rtnObj.isValid = false;
    rtnObj.msg = "Cannot save. Amount must be a positive whole or decimal number";
    return rtnObj;
  }
  //validate createDate
  let createDateInd = validateDate(bet.createDate)
  if (!createDateInd) {
    rtnObj.isValid = false;
    rtnObj.msg = "Cannot save. Create Date must be in the form YYYY-MM-DD";
    return rtnObj;
  }
  //validate endDate
  let endDateInd = validateDate(bet.endDate)
  if (!endDateInd) {
    rtnObj.isValid = false;
    rtnObj.msg = "Cannot save. End Date must be in the form YYYY-MM-DD";
    return rtnObj;
  }
  return rtnObj;
}


export function validateGroupBet(bet) {
  let rtnObj = {
    "isValid":true,
    "msg":""
  }
  //validate players
  let playersInd = validateGroupPlayers(bet.players)
  if (!playersInd) {
    rtnObj.isValid = false;
    rtnObj.msg = "Cannot save. Player name is invalid.";
    return rtnObj;
  }
  //validate amount
  let amountInd = validateAmount(bet.amount)
  if (!amountInd) {
    rtnObj.isValid = false;
    rtnObj.msg = "Cannot save. Amount must be a positive whole or decimal number";
    return rtnObj;
  }
  //validate createDate
  let createDateInd = validateDate(bet.createDate)
  if (!createDateInd) {
    rtnObj.isValid = false;
    rtnObj.msg = "Cannot save. Create Date must be in the form YYYY-MM-DD";
    return rtnObj;
  }
  //validate endDate
  let endDateInd = validateDate(bet.endDate)
  if (!endDateInd) {
    rtnObj.isValid = false;
    rtnObj.msg = "Cannot save. End Date must be in the form YYYY-MM-DD";
    return rtnObj;
  }
  return rtnObj;
}


function validatePersonalPlayers(challenger, accepter) {
  let rtnInd = true;
  let a = Config;
  let allowedPlayers = a.players;
  if(!allowedPlayers.includes(challenger)) {
    rtnInd = false;
  }
  if(!allowedPlayers.includes(accepter)) {
    rtnInd = false;
  }
  return rtnInd
}

function validateGroupPlayers(players) {
  let rtnInd = true;
  let a = Config;
  let allowedPlayers = a.players;
  players.forEach(function(player) {
    if(!allowedPlayers.includes(player)) {
      rtnInd = false;
    }
  })
  return rtnInd
}

function validateOdds(odds) {
  let rtnInd = true;
  if (!odds.match(/^\d+:\d+$/)) {
    rtnInd = false;
  }
  return rtnInd;
}

function validateAmount(amount) {
  if (!parseFloat(amount)) {
    return false;
  }
  if (amount <= 0) {
    return false;
  }
  return true;
}

function validateDate(date) {
  let rtnInd = true;
  if (!date.match(/^\d{4}-\d{2}-\d{2}$/)) {
    rtnInd = false;
  }
  return rtnInd;
}
