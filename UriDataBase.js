const URI = 'http://192.168.0.104:3000/users';
const URI_GET_ALL_POTS = 'http://192.168.0.104:3000/pots/';
const URI_GET_DATA_CATEGORY = 'http://192.168.0.104:3000/theloai'; 
const URI_Pots = 'http://192.168.0.104:3000/pots?_expand=user'; 
const URI_GET_DATA_POTS_NEWS ='http://192.168.0.104:3000/pots?_sort=id&_order=desc&_expand=theloai&_expand=user&theloaiId=2'

const URI_GET_DATA_POTS_FUNNYS ='http://192.168.0.104:3000/pots?_sort=id&_order=desc&_expand=theloai&_expand=user&theloaiId=1'
const URI_Commnets ='http://192.168.0.104:3000/commnets?_expand=pot&_expand=user&potId=';
const URI_POST_Commnets = 'http://192.168.0.104:3000/commnets';
const URI_GET_ALLPOTS_BY_ID_USER = 'http://192.168.0.104:3000/pots?_expand=user&userId=';
export {
   URI,
   URI_GET_ALL_POTS,
   URI_GET_DATA_CATEGORY,
   URI_Pots,
   URI_GET_DATA_POTS_NEWS,
   URI_Commnets,
   URI_GET_DATA_POTS_FUNNYS,
   URI_POST_Commnets,
   URI_GET_ALLPOTS_BY_ID_USER
}