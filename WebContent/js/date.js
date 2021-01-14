/**
 * 
 */

/*
//Date 객체
var date= new Date(); //현 날짜
alert(date)

var date= new Date(2010,10,01,10,05,0);
alert(date);
*/

//상품을 구매하면 자동으로 +2일
var date= new Date();
date.setDate(date.getDate()+2)
alert(date)