/**
 * 문서객체를 만들어보자
 * createElement(tagName) : 자바 스크립트에서 HTML에 태그를 생성
 * createTextNode(text) :자바 스크립트의 HTML에 TextNode 생성
 * appendChild(node) : 객체에 node를 연결
 * setAttribute(name,value) :객체의 속성의 값을 저장
 * getAttribute(name) :객체의 속성을 가져온다
 */ 

onload=function(){
var header=document.createElement("h1");
var textNode=document.createTextNode("Hello");
//body태그안 태그중 id값이 img인 것을 선택하여 img변수에 적장
var img=document.getElementById("img");
//alert(img.getAttribute('src'));
//img.width="200"
img.setAttribute("width",200)
img.setAttribute("height",400)

header.appendChild(textNode);
document.body.appendChild(header);

//js를이용하여 css적용 하면 조건에 따라 css를 다르게 적용할 수 있는 이점이 있다

var header=document.getElementById('header')

//h1 태그에 테두리 적용
header.style.border="2px solid black";

//h1태그에 글자색 적용
header.style.color="red";

//h1태그에 글꼴 적용
header.style.fontFamily="궁서체"









}
