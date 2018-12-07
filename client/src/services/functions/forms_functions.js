module.exports = {
  extract_id: function(id_name){
      let pos = id_name.indexOf('-');
      return id_name.substring(0,pos);
    },
  extract_id_service_profile(name_id){
      let pos = name_id.indexOf('-');
      return name_id.substring(pos+1);
  },
  extract_id_new: function (id_name) {
      let pos = id_name.indexOf(':');
      return id_name.substring(0, pos);
  }, 
  extract_id_id_name: function (id_name) {
    let pos = id_name.indexOf(':');
    return parseInt(id_name.substring(0, pos),10);
  },
  extract_id_name_id: function (name_id) {
    let pos = name_id.indexOf(":");
    return name_id.substring(pos + 1);
  },
  extract_name_id_name: function (id_name) {
    let pos = id_name.indexOf(':');
    return id_name.substring(pos + 1);
  }
}
