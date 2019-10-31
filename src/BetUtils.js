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


export function getUpdatedStats(bets) {
  let baseObject = {
    "name":"",
    "winnings":0,
    "exposure":0,
    "totalBet":0,
    "numberComplete":0,
    "numberOngoing":0,
    "challenges":0,
    "acceptances":0
  }

  let stats = {}

  let a = Config;
  a.players.forEach(function(player) {
    stats[player] = {...baseObject};
    stats[player].name = player;
  })
  
  Object.values(bets).forEach(function(bet) {

    if (bet.isComplete) {
      bet.results.forEach(function(result) {
        let currPlayer = result.player;
        let currAmount = result.amount;
          //winnings
          stats[currPlayer].winnings += currAmount;
          //number complete
          stats[currPlayer].numberComplete += 1;
      })
      if(bet.type == "PERSONAL") {
        stats[bet.challenger].totalBet += bet.amount;
        stats[bet.accepter].totalBet += bet.amount;
      } else {
        bet.players.forEach(function(player) {
          stats[player].totalBet += bet.amount;
        })
      }
    } else {
      //exposure
      if (bet.type == "PERSONAL") {
        let oddsSplit = bet.odds.split(":");
        let giving = oddsSplit[0];
        let getting = oddsSplit[1];
        
        if (giving > getting) {
          let oddsRatio = parseFloat(giving)/parseFloat(getting);
          stats[bet.accepter].exposure += (bet.amount * oddsRatio);
          stats[bet.challenger].exposure += bet.amount;
        } else if (getting > giving) {
          let oddsRatio = parseFloat(getting)/parseFloat(giving);
          stats[bet.challenger].exposure += (bet.amount * oddsRatio);
          stats[bet.accepter].exposure += bet.amount;
        } else {
          stats[bet.challenger].exposure += bet.amount;
          stats[bet.accepter].exposure += bet.amount;
        }

        stats[bet.challenger].numberOngoing += 1;
        stats[bet.accepter].numberOngoing += 1;
        
      } else {
        bet.players.forEach(function(player) {
          stats[player].exposure += bet.amount;
          stats[player].numberOngoing += 1;
        })
      }
    }
    if(bet.type == "PERSONAL") {
      //challenges
      stats[bet.challenger].challenges += 1
      //acceptances
      stats[bet.accepter].acceptances += 1
    }
  })

  return stats;
  //this.props.dispatch({type:'SET_STATISTICS', stats:stats})

}