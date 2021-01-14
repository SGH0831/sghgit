/**
 *
 */
/*
var array = new array(); //배열생성 방법1
array[0]=52;
array[1]=273;
array[2]=103;
array[3]=57;
array[4]=32;

var array2 = new array(5); //배열생성 방법2(효율적)
array2[0]=52;
array2[1]=273;
array2[2]=103;
array2[3]=57;
array2[4]=32;

//선언과 동시에 초기화 작업 
var array3= new Array(52,273,103,57,32);//방법1

var array4=[52,273,103,57,32] //방법2

*/

//concat()

var array1=['a','b','c'];
var array2=['d','e','f'];
var array3=['a','b','c','d','e','f','g','h','i']
var concat=array1.concat(array2);

//alert(concat);

//join()

var join=array1.join("-");
//alert(join);

//reverse()

var reverse=array1.reverse();
//alert(reverse)

//slice()

var slice=array3.slice(1,5);
alert(slice)





