let llp = [];
let powers = [0.0001, 0.001, 0.0256, 0.256, 6.5536, 65.536];

let final = convert_lat_long_to_llp(10.718555646692444,- 61.671114563941956, powers); ////---------------------------------------
console.log(final);

function convert_lat_long_to_llp(lat, lng, powers) {
  lat = convert_to_llp_location(lat, powers);
  lng = convert_to_llp_location(lng, powers);
  console.log(lat + lng);
  return lat + lng;
}

function convert_to_llp_location(x, powers) {
  if (x > 0) {
    x = divide(x, powers[5], 5);
    x = divide(x, powers[4], 4);
    x = divide(x, powers[3], 3);
    x = divide(x, powers[2], 2);
    x = divide(x, powers[1], 1);
    x = divide(x, powers[0], 0);
    return `${llp[5]}${llp[4]}, ${llp[3]}${llp[2]}, ${llp[1]}${llp[0]}, `;
  } else if (x < 0) {
    x = x * -1;
    x = divide(x, powers[5], 5);
    x = divide(x, powers[4], 4);
    x = divide(x, powers[3], 3);
    x = divide(x, powers[2], 2);
    x = divide(x, powers[1], 1);
    x = divide(x, powers[0], 0);
    let str = `${llp[5]}${llp[4]}, ${llp[3]}${llp[2]}, ${llp[1]}${llp[0]},`;
    console.log(str);
    let position;
    let y = [];
    let nibble = [];
    let hex = []; //final set of 6 numbers to return
    let j = 0; //counter to split up the bytes into nibbles
    let start_position = 0;
    for (let i = 0; i < 3; i++) {
      position = str.indexOf(",", start_position);
      y[i] = str.slice(start_position, position); //extract the whole number part of the result
      console.log(y[i], " Decimal");
      y[i] = parseInt(y[i], 10); //convert the string back to a number
      y[i] = y[i] ^ 255;
      start_position = position + 2;
      let bir = dec2bin(y[i]); //binary flipped numbers
      bir = byte_length_is_8(bir);
      console.log("HERE" + bir);
      console.log(bir, " Binary");
      nibble[j] = bir.slice(0, 4);
      hex[j] = nibble_to_hex(nibble[j]);
      console.log(nibble[j], " Nibble 1");
      console.log(hex[j], " Int 1");
      j = j + 1;
      nibble[j] = bir.slice(4);
      hex[j] = nibble_to_hex(nibble[j]);
      console.log(nibble[j], " Nibble 2");
      console.log(hex[j], " Int 2");
      j = j + 1;
    }

    let value = `${hex[0]}${hex[1]}, ${hex[2]}${hex[3]}, ${hex[4]}${hex[5]},`;

    return hex_to_final(value);;
  }
}

function divide(x, power, i) {
  let y = x / power;
  y = y.toPrecision(5);
  y = y.toString(); //convert to string so we can search for decimal point
  let position = y.indexOf(".");
  y = y.slice(0, position); //extract the whole number part of the result
  y = parseInt(y, 10); //convert the string back to a number
  if (y > 0) {
    llp[i] = y;
    x = x - y * power;
  } else {
    llp[i] = 0;
  }

  return x;
}
function dec2bin(dec) {
  return (dec >>> 0).toString(2);
}


function nibble_to_hex(nibble) {
  switch (nibble) {
    case "0000":
      return 0;
      break;
    case "0001":
      return 1;
      break;
    case "0010":
      return 2;
      break;
    case "0011":
      return 3;
      break;
    case "0100":
      return 4;
      break;
    case "0101":
      return 5;
      break;
    case "0110":
      return 6;
      break;
    case "0111":
      return 7;
      break;
    case "1000":
      return 8;
      break;
    case "1001":
      return 9;
      break;
    case "1010":
      return "a";
      break;
    case "1011":
      return "b";
      break;
    case "1100":
      return "c";
      break;
    case "1101":
      return "d";
      break;
    case "1110":
      return "e";
      break;
    case "1111":
      return "f";
      break;
    default:
      return "NAN";
  }
}

function hex_to_final(value) {
  let result = [];
  result[0] = value.slice(0, 2);
  console.log(result[0]);
  result[0] = parseInt(`${result[0]}`, 16);

  result[1] = value.slice(4, 6);
  console.log(result[1]);
  result[1] = parseInt(`${result[1]}`, 16);

  result[2] = value.slice(9, 11);
  console.log(result[2]);
  result[2] = parseInt(`${result[2]}`, 16);
  return (`${result[0]}, ${result[1]}, ${result[2]},`);
}

function byte_length_is_8(byte) {
  var length = byte.length;
  switch (length) {
    case 1:
      return "0000000" + byte;
      break;
    case 2:
      return "000000" + byte;
      break;
    case 3:
      return "00000" + byte;
      break;
    case 4:
      return "0000" + byte;
      break;
    case 5:
      return "000" + byte;
      break;
    case 6:
      return "00" + byte;
      break;
    case 7:
      return "0" + byte;
      break;
    case 8:
      return byte;
      break;
  }
}
