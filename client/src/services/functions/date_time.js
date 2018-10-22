


module.exports = {
//This function takes the month in numerical form from 0:11 and reutrn the first 3 letters of the month
return_month: function(month){
  switch(month){
    case 0:
      return 'Jan';
      break;
    case 1:
      return 'Feb';
      break;
    case 2:
      return 'Mar';
      break;
    case 3:
      return 'Apr';
      break;
    case 4:
      return 'May';
      break;
    case 5:
      return 'Jun';
      break;
    case 6:
      return 'Jul';
      break;
    case 7:
      return 'Aug';
      break;
    case 8:
      return 'Sep';
      break;
    case 9:
      return 'Oct';
      break;
    case 10:
      return 'Nov';
      break;
    case 11:
      return 'Dec';
      break;
    default:
      return 'NA';
      break;
    }
  },
//This function ensures that the digit returned has 2 digits (eg 1-> 01)
add_zero: function(i){
  if(i < 10){
    i = "0" + i;
  }
    return i;
}
}