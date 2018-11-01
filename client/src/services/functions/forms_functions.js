module.exports = {
    extract_id: function(id_name){
        let pos = id_name.indexOf('-');
        return id_name.substring(0,pos);
      },
      extract_id_service_profile(name_id){
        let pos = name_id.indexOf('-');
          return name_id.substring(pos+1);
      }
}
