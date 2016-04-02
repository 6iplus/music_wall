'use strict';
var data=[];//partid : { playlist}
//var data= {partyId:[], partyId2:[]};  return showSucc(data[partyId])
//datq=[][{}] 
var newId = 1;
var stamp = function () {
	return newId++;
};

function showSucc(data){
    return {status: "success", msg: "ok" , "data": data};
}
function showError(msg){
    return {status: "error", "msg": msg};
}
module.exports = {
	get: function (partyId, id) {
        if(!partyId || !id || data[partyId] == undefined){
            throw Error("error get id :"+ id+ "or partyid:"+ partyId);
        }
        
		for (var i = 0, l = data[partyId].length; i < l; i++) {
			if (data[partyId][i].id == id) {
				return data[partyId][i];
			}
		}
        
        return showError("not found");
	},

	create: function (partyId,songName,url,owner) {
		if(!partyId || !songName || !url || !owner){
            throw Error("one of ur param is null partyId: "+ partyId +"songName:"+songName +"url:"+url+"owner:"+owner);
        } 
            
            var myData = {
				'id':stamp(),
				'partyId': partyId,
				'songName': songName, 
				'url': url,
				'owner': owner
			};
            
			data[partyId].push(myData);
            console.log(data);
			return showSucc(myData);
		
	},

	delete: function (partyId, id) {
        if(!partyId || !id || data[partyId] == undefined){
            throw Error("error get id :"+ id+ "or partyid:"+ partyId);
        }
		for (var i = 0, l = data[partyId].length; i < l; i++) {
			if (data[partyId][i].id == id) {
                var tmp = data[partyId][i];
				data[partyId].splice(i,1);
                console.log(data);
				return showSucc(tmp);
			}			
		}
        
        return showError("not found");
	},
    getAllByPartyId: function(partyId){
        //todo
        return showSucc(data[partyId]); 
    }
    ,createParty:function (partyId) {
        //todo
        data[partyId] = [];
        return showSucc(partyId);
    }
}