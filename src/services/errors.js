const VError = require("verror");


module.exports = {
  error_message: function(current_error_message, previous_error) {
    let error = new VError("%s : %s", current_error_message, previous_error);
    return error;
  }
};