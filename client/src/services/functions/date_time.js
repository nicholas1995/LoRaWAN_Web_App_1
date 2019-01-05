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
  },
  convert_picker_date_to_UTC: function (date) {
    date = new Date(date);
    let month = this.add_zero(date.getUTCMonth() + 1); //returns the month in 3 letters
    let day = this.add_zero(date.getUTCDate()); //Need to minus one cause for some reason UTCDay adds one to the day
    let year = date.getUTCFullYear(); //converts the full year to 2 digits 
    let hour = this.add_zero(date.getUTCHours());
    let minutes = this.add_zero(date.getUTCMinutes());
    let seconds = this.add_zero(date.getUTCSeconds());
    console.log(day);
    let full_date = year + "-" + month + "-" + day + "T" + hour + ":" + minutes + ":" + seconds + "Z";
    return (full_date);
  }
}