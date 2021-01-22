# GP project
<img src="https://user-images.githubusercontent.com/77423948/105048569-113e3c00-5aaf-11eb-80f5-0d7790f43d79.png" width="350" height="350px">

### 목록
- [기획 의도](#1-기획의도)  
- [개발 환경](#2-개발-환경)  
- [UI 설계](#3-ui-설계)  
- [DB 설계](#4-db-설계)  
- [기술 상세](#5-기술-상세)  
## 1 기획의도

<img src="https://user-images.githubusercontent.com/77423948/105108845-87b65a80-5afe-11eb-8eeb-1e15fc56dec5.jpg" width="400" >  
1인가구가 계속 증가하는 추세이다
각자의 요리법을 공유하여 끼니를 거르지 말자..

## 2 개발 환경

  OS:window10  
  IDE:Eclipse  
  Server:Apache tomcat 8.5  
  DB:MySQL  
  Language:JAVA,JSP,JavaScropt(jquery)  
  framework:Spring,bootstrap  
  ORM:MyBatis  
  <img src="https://user-images.githubusercontent.com/77423948/105124624-db846c00-5b1d-11eb-9955-d955587b1156.png" width="40" height="40">
  <img src="https://user-images.githubusercontent.com/77423948/105126605-7d0dbc80-5b22-11eb-8887-e156ee018c1a.png" width="40" height="40">
  <img src="https://user-images.githubusercontent.com/77423948/105126629-86972480-5b22-11eb-8b07-a889d011ce45.png" width="40" height="40">
  <img src="https://user-images.githubusercontent.com/77423948/105126805-dece2680-5b22-11eb-984c-fb84306a77f5.png" width="40" height="40">
  <img src="https://user-images.githubusercontent.com/77423948/105126585-72532780-5b22-11eb-9cbb-c8f7a3eacc97.png" width="40" height="40">
  <img src="https://user-images.githubusercontent.com/77423948/105126648-9151b980-5b22-11eb-81bd-e79e213bd53d.png" width="40" height="40">
  <img src="https://user-images.githubusercontent.com/77423948/105126667-99a9f480-5b22-11eb-92cf-64792537919f.png" width="40" height="40">
  
## 3 UI 설계

<img src="https://user-images.githubusercontent.com/77423948/105132821-e98eb880-5b2e-11eb-9e3e-2e04267932b9.PNG">


## 4 DB 설계
**board**  
  <img src="https://user-images.githubusercontent.com/77423948/105127601-9283e600-5b24-11eb-8834-9a202dd12038.PNG">  
**attach**  
  <img src="https://user-images.githubusercontent.com/77423948/105127678-b515ff00-5b24-11eb-9738-97522299e81e.PNG">  
**reply**  
  <img src="https://user-images.githubusercontent.com/77423948/105127700-bfd09400-5b24-11eb-9da6-834ed368fc34.PNG">  
**likes**  
  <img src="https://user-images.githubusercontent.com/77423948/105127726-c9f29280-5b24-11eb-8b38-d9755012f99a.PNG">  
**user**  
  <img src="https://user-images.githubusercontent.com/77423948/105127744-d2e36400-5b24-11eb-81bf-fe1f138872bc.PNG">

## 5 기술 상세
- [홈 화면](#홈-화면) 
	- [썸네일](#썸네일)
- [로그인](#로그인)
- [회원가입](#회원가입)  
	- [중복확인](#중복확인)
	- [유효성 검사](#유효성-검사)  
- [아이디,비밀번호 찾기](#아이디-비밀번호-찾기)
- [회원정보수정](#회원-정보-수정)
- [회원탈퇴](#회원-탈퇴)
- [글 작성](#글-작성)
	- [첨부사진](#첨부사진)
- [글 수정](#글-수정)
	- [첨부사진 수정](#첨부사진-수정)
- [글 삭제](#글-삭제)
- [추천](#추천)
- [댓글 목록](#댓글-목록)
- [댓글 작성](#댓글-작성)
- [댓글 수정](#댓글-수정)
- [댓글 삭제](#댓글-삭제)





### 홈 화면

#### MainController.java
```java

@Controller
public class MainController {
	@Autowired
	private BoardService sv;
	
	@RequestMapping(value="/", method=RequestMethod.GET) //홈
	public String main(Model model,Criteria cri) {
		model.addAttribute("list", sv.getlist(cri)); //글 목록
		model.addAttribute("page",new pageDTO(cri,sv.total(cri))); //페이징
		return "main";

```
#### BoardService.java
```java
	//MainController
	public ArrayList<BoardDTO> getlist(Criteria cri); //게시글 목록
	public int total(Criteria cri); //게시글 수
	
```
#### BoardServiceIpml.java
```java
	//MainController
	public ArrayList<BoardDTO> getlist(Criteria cri) { //게시글 목록
		return bm.getlist(cri);
	}
	public int total(Criteria cri) { //게시글 수
		return bm.total(cri);
	}
```

#### BoardMapper.java
```java
	//MainController
	public ArrayList<BoardDTO> getlist(Criteria cri); //게시글 목록
	public int total(Criteria cri); //게시글 수
```
#### BoardMapper.xml
```xml
<!-- MainController -->	
	<!-- 게시글 목록  -->
	<select id="getlist" resultType="org.SGH.DTO.BoardDTO">
 		select * from(
		select @rownum:=@rownum+1 as rownum, b.* from (select @rownum:=0) as tmp,
		<choose>
		<!-- 인기순 검색 -->
		<when test="order=='likes'.toString">
		(select board.*,ci from board left join (select count(id) as ci, bno from likes group by bno) a on board.bno=a.bno) 
		</when>
		<otherwise>
		 board 
		</otherwise>
		</choose>
		 as b order by 
		<choose>
		<!-- 조회수순 검색 -->
		<when test="order=='hits'.toString">
		hits desc,
		</when>
		<!-- 순 검색 -->
		<when test="order=='likes'.toString">
		ci desc,
		</when>
		</choose>
		 bno desc) board
		where
		<!-- 페이징 -->
 	<![CDATA[
		 rownum>((#{pageNum}-1)*#{amount})and rownum<=(#{pageNum}*#{amount})
 	]]>
		<if test="type != null">
			<!-- 카테고리 검색 -->
			<if test="type=='category'.toString">
				and category like CONCAT('%',#{keyword},'%');
			</if>
			<!-- 제목 검색 -->
			<if test="type=='title'.toString">
				and title like CONCAT('%',#{keyword},'%');
			</if>
		</if>
	</select>
	
	<!-- 게시글 수 -->
	<select id="total" resultType="int">
		select count(*) from board
		<if test="type != null">
			<!-- 카테고리 검색 -->
			<if test="type=='category'.toString">
				where category like CONCAT('%',#{keyword},'%');
			</if>
			<!-- 제목 검색 -->
			<if test="type=='title'.toString">
				where title like CONCAT('%',#{keyword},'%');
			</if>
		</if>
	</select>
	
```
#### main.js

```js
$(document).ready(function(){

	img();
	likes();
	
	$("#login_btn").on("click",function(){ /* 로그인 */
		location.href="/member/login";
	})
	
	$("#logout_btn").on("click",function(){ /* 로그아웃 */
		alert("로그아웃")
		location.href="/member/logout"
	})
	$("#write").on("click",function(){ /* 글 작성 */
		location.href="/board/write"
	})
	
	$(".card").on("click",function(){ /* 글 보기 */
		var bno =$(this).data("bno")
		location.href="/board/detail?bno="+bno;
	})
	
	$("#search").on("keydown",function(k){ /* 글 검색 엔터 키*/
		if(k.keyCode==13){
		var search=$("#search").val()		
		location.href="/?type=title&keyword="+search
		}
	})
	
	$("#searchbtn").on("click",function(){ /* 글 검색 검색 버튼 */
		var search=$("#search").val()		
		location.href="/?type=title&keyword="+search
		
	})
	
	$("#mylike").on("click",function(){ /* 나의 추천 글 */
		location.href="/board/likes"
	})
	function img(){ /* 썸네일 */
	$("#contents .card").each(function(){
		var bno=$(this).data("bno")
		var ob=$(this)
		$.getJSON("/br/"+bno+".json",function(data){
			var callpath=encodeURIComponent(data.uploadpath+"/S_"+data.uuid+"_"+data.filename)
			ob.find("img").attr("src","/br/display?filename="+callpath )
			})
		})	
	}
	
	function likes(){ /* 해당 글의 추천 수 */
		$("#contents .card").each(function(){
		var bno=$(this).data("bno")
		var ob=$(this)
		$.getJSON("/br/likenum/"+bno+".json",function(data){
			ob.find(".likes").html(data)
		})
		})
	}	
})
```
### 썸네일
#### main.js
```js
	function img(){ /* 썸네일 */
	$("#contents .card").each(function(){
		var bno=$(this).data("bno")
		var ob=$(this)
		$.getJSON("/br/"+bno+".json",function(data){
			var callpath=encodeURIComponent(data.uploadpath+"/S_"+data.uuid+"_"+data.filename)
			ob.find("img").attr("src","/br/display?filename="+callpath )
			})
		})	
	}
```
#### BoardRestController.java
```java
	@GetMapping("/display") //이미지 보기
	@ResponseBody
	public ResponseEntity<byte[]> getfile(String filename){
		File file=new File("C:\\upload\\"+filename);		
		ResponseEntity<byte[]> result=null;
		try {
			HttpHeaders header=new HttpHeaders();
			header.add("Content-Type",Files.probeContentType(file.toPath())); // Cotent-type=파일의 확장자
			result=new ResponseEntity<>(FileCopyUtils.copyToByteArray(file),header,HttpStatus.OK);
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
```



### 로그인
#### MemberController.java
```java
	@GetMapping("/login") // 로그인 창으로
	public void login() {
		
	}
	@PostMapping("/login") // 로그인 post
	public String login2(MemberDTO dto,HttpSession session,RedirectAttributes rttr) {
		MemberDTO user = sv.login(dto);
		if(user!=null) {
			session.setAttribute("user",user); // 회원정보 session저장
			return "redirect:/";
		}else {
			rttr.addFlashAttribute("msg", "로그인 실패");
			return "redirect:/member/login";
		}
	}
	@GetMapping("/logout") // 로그아웃
	public String logout(HttpSession session) {
		session.invalidate(); //session 
		return "redirect:/";
	}
```
#### MemberService.java
```java
	public MemberDTO login(MemberDTO dto); //로그인 
```
#### MemberServiceIpml.java
```java
	public MemberDTO login(MemberDTO dto) { //로그인
		return mm.login(dto);
	}
```
#### MemberMapper.java
```java
	public MemberDTO login(MemberDTO dto); //로그인
```
#### MemberMapper.xml
```xml
 	<!-- 로그인 -->
 	<select id="login" resultType="org.SGH.DTO.MemberDTO">
 		select * from user where id=#{id} and pw=#{pw} 
 	</select>
```

### 회원가입

#### MemberController.java
```java
 	@GetMapping("/sign_up") //회원가입 창으로
	public void signup() {
		
	}
	@PostMapping("/sign_up") //회원가입
	public String signup2(MemberDTO dto) {
		sv.add(dto);
		return "redirect:/member/login";
	}
```
#### MemberService.java
```java
	public void add(MemberDTO dto); //회원가입
```
#### MemberServiceIpml.java
```java
	public void add(MemberDTO dto) { //회원가입
		mm.add(dto);
	}
```
#### MemberMapper.java
```java
	public void add(MemberDTO dto); //회원가입
```
####  MemberMapper.xml
```xml
 	<!-- 회원가입-->
 	<insert id="add">
 		insert into user (id,pw,name,birth,gender,email) values(#{id},#{pw},#{name},#{birth},#{gender},#{email})
 	</insert>
```
### 중복확인

#### signup.js 
```js
	$("#id").blur(function(){  /* 아이디 확인 */
		idch();
	})
		
	function idch(){
		var id=$("#id").val();
		var tf="";
		var reg=/^[a-z0-9]{4,20}$/; /* 유효성 검사 */
		if(id==""){
			$("#idch").text("필수")
			$("#idch").css("color","red")
			tf=false
		}else{
			try{
				$.ajax({
					url:"/mr/"+encodeURI(id),
					contentType:"application/json; charset=utf-8",
					type:"GET",
					async:false,
					success:function(result){
					if(result=="1"){ /* 해당 아이디가 이미 있을시 */
						$("#idch").text("사용중인 아이디 입니다")				
						$("#idch").css("color","red")
						tf=false
					}else{
						if(reg.test(id)){ /* 유효성 검사 */
							$("#idch").text("사용가능한 아이디 입니다")
							$("#idch").css("color","green")
							tf=true
						}else{ /* 유효성 검사 통과x */
							$("#idch").text("4~20자의 영문 소문자,숫자")				
							$("#idch").css("color","red")
							tf=false
						}
					}
					},error:function(){
					}	
				})
			}catch(e){
			}
		}
		return tf		
	}
```

#### MemberRestController.java
```java
	@RequestMapping(value="/{id}",method = RequestMethod.GET) //아이디 중복 확인 
	public int signcheck(@PathVariable("id")String id){
		int result=sv.idch(id);
		return result;
	}
```

#### MemberService.java
```java
	public int idch(String id); //아이디 중복 확인
```

#### MemberServiceIpml.java
```java
	public int idch(String id) { //아이디 중복 확인
		return mm.idch(id);
	}
```

#### MemberMapper.java
```java
	public int idch(String id); //아이디 중복 확인
```

#### MemberMapper.xml
```xml
 	<!-- 아이디 중복확인 -->
	<select id="idch" resultType="int">
		select count(*) from user where id=#{id}
	</select> 
```

### 유효성 검사
#### signup.js
```js
	function idch(){
		var id=$("#id").val();
		var tf="";
		var reg=/^[a-z0-9]{4,20}$/; /* 유효성 검사 */
		if(id==""){
			$("#idch").text("필수")
			$("#idch").css("color","red")
			tf=false
		}else{
			try{
				$.ajax({
					url:"/mr/"+encodeURI(id),
					contentType:"application/json; charset=utf-8",
					type:"GET",
					async:false,
					success:function(result){
					if(result=="1"){ /* 해당 아이디가 이미 있을시 */
						$("#idch").text("사용중인 아이디 입니다")				
						$("#idch").css("color","red")
						tf=false
					}else{
						if(reg.test(id)){ /* 유효성 검사 */
							$("#idch").text("사용가능한 아이디 입니다")
							$("#idch").css("color","green")
							tf=true
						}else{ /* 유효성 검사 통과x */
							$("#idch").text("4~20자의 영문 소문자,숫자")				
							$("#idch").css("color","red")
							tf=false
						}
					}
					},error:function(){
					}	
				})
			}catch(e){
			}
		}
		return tf		
	}
```

#### signup.js
```js
	function pwch(){
		var pw=$("#pw").val();
		var reg=/^(?=.*[0-9])(?=.*[a-z]).{8,30}$/; /* 유효성 검사 */
		if(reg.test(pw)){ /* 유효성 검사 */
			$("#pwch").text("사용가능")
			$("#pwch").css("color","green")
			return true
		}else if(pw==""){ /* 빈값일시 */
			$("#pwch").text("필수")
			$("#pwch").css("color","red")
			return false
		}else{ /* 유효성 검사 통과x */
			$("#pwch").text("영문 소문자와 숫자를 반드시 조합하여 8~30자")
			$("#pwch").css("color","red")
			return false
		}
	}	
			
```

#### signup.js
```js
	function namech(){
		var name=$("#name").val()
		var reg=/^[가-힣]{2,8}$/ /* 유효성 검사 */
		
		if(name==""){
			$("#namech").text("필수")
			$("#namech").css("color","red")
			return false
		}else if(reg.test(name)){
			$("#namech").text("확인")
			$("#namech").css("color","green")
			return true
		}else{
			$("#namech").text("2~8자 한글")
			$("#namech").css("color","red")
			return false
		}
	}

```

#### signup.js
```js
	function emch(){
		var em=$("#email").val();
		var reg=/([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/ /* 유효성 검사 */
		if(em==""){
			$("#emailch").text("필수")
			$("#emailch").css("color","red")
			return false;
		}else if(reg.test(em)){
			$("#emailch").text("확인")
			$("#emailch").css("color","green")
			return true;
		}else {
			$("#emailch").text("올바른 이메일 주소")
			$("#emailch").css("color","red")
			return false;
		}
	}
```
### 아이디,비밀번호 찾기
#### find_id.js
```js
$(document).ready(function(){
	
	$("#submit").on("click",function(){ /* 아이디 찾기 */
		var email=$("#email").val()
		
		$.ajax({ /* 아이디  */
			url:"/mr/find_id",
			type:"post",
			contentType:"application/json; charset=utf-8",
			data:JSON.stringify({email:email}),
			success:function(data){
				$("#login").empty();
				$("#result").html("찾으시는 아이디:"+data)
				$("#login").append("<a href='/member/login'>로그인</a>&nbsp;&nbsp;<a href='/member/find_pw'>비밀번호 찾기</a>")
			},error:function(){
				$("#result").html("");
				alert("이메일을 다시 입력해주세요")
			}
			
		})
	})
})
```
#### find_pw.js
```js
$("#submit").on("click",function(){ /*비밀번호 이메일전송*/
		var email=$("#email").val()
		
		$.ajax({ /* 비밀번호 찾기 */
			url:"/mr/find_pw",
			type:"post",
			contentType:"application/json; charset=utf-8",
			data:JSON.stringify({email:email}),
			success:function(data){
				$("resultbox").children("p").remove();
				$("#result").html("이메일이 전송 되었습니다")
				$("#resultbox").append("<a href='/member/login'>로그인</a>")
			},error:function(){
				alert("이메일을 다시 입력해주세요")
			}
			
		})
	})
```
#### MemberRestController.java
```java
	@PostMapping("/find_id") //아이디 찾기
	public ResponseEntity<String> findid(@RequestBody MemberDTO dto){
		return new ResponseEntity<>(sv.find_id(dto).getId(),HttpStatus.OK);
	}
	
	@PostMapping("/find_pw") //비밀번호 찾기
	public ResponseEntity<String> findpw(@RequestBody MemberDTO dto){
		MemberDTO mdto=sv.find_id(dto);
		if(mdto!=null) {
			String to=mdto.getEmail(); //받는 사람
			String subject="비밀번호 찾기"; //메일 제목
			String content="비밀번호는 <<"+mdto.getPw()+">>	 입니다"; //메일 내용
			try {
				MimeMessage message = mailSender.createMimeMessage();
				MimeMessageHelper messageHelper =new MimeMessageHelper(message,true,"UTF-8");
				messageHelper.setFrom("보내는 사람");
				messageHelper.setTo(to);
				messageHelper.setSubject(subject);
				messageHelper.setText(content);
				mailSender.send(message); //메세지 보내기
				} catch (Exception e) {
					e.printStackTrace();
			}
		}
		return new ResponseEntity<>("success",HttpStatus.OK);
	}
```
#### MemberService.java
```java
	public MemberDTO find_id(MemberDTO dto); //아이디 찾기
```
#### MemberServiceIpml.java
```java
	public MemberDTO find_id(MemberDTO dto) { //아이디 찾기
		return mm.find_id(dto);
	}
```
#### MemberMapper.java
```java
	public MemberDTO find_id(MemberDTO dto); //아이디찾기
```
#### MemberMapper.xml
```xml
	<!-- 아이디 찾기 -->
	<select id="find_id" resultType="org.SGH.DTO.MemberDTO">
		select * from user where email=#{email}
	</select>
```
### 회원 정보 수정
#### MemberController.java
```java
	@PostMapping("/modify") //비밀번호 변경
	public String modify(MemberDTO dto,HttpSession session) {
		sv.modify(dto);
		session.invalidate(); 
		return"redirect:/member/login";
	}
```
#### MemberService.java
```java
	public void modify(MemberDTO dto); //회원 수정
```
#### MemberServiceIpml.java
```java
	public void modify(MemberDTO dto) { //회원 정보 수정
		mm.modify(dto);
	}
```
#### MemberMapper.java
```java
	public void modify(MemberDTO dto); //회원 수정
```
#### MemberMapper.xml
```xml
	<!-- 회원 수정 -->
	<update id="modify">
		update user set pw=#{pw} where id=#{id}
	</update>
```
### 회원 탈퇴
#### MemberController.java
```java
	@PostMapping("/delete") //회원 탈퇴
	public String delete(MemberDTO dto,HttpSession session) {
		sv.delete(dto);
		session.invalidate();
		return "redirect:/";
	}
```
#### MemberService.java
```java
	public void delete(MemberDTO dto); //회원 탈퇴
```
#### MemberServiceIpml.java
```java
	public void delete(MemberDTO dto) { //회원탈퇴
		mm.delete(dto);
	}
```
#### MemberMapper.java
```java
	public void delete(MemberDTO dto); //회원 탈퇴
```
#### MemberMapper.xml
```xml
	<!-- 회원 탈퇴 -->
	<delete id="delete">
		delete from user where id=#{id}
	</delete>
```
### 글 작성
#### BoardController.java
```java
	@PostMapping("/write") //글 작성 POST
	public String pwrite(BoardDTO dto) {
		sv.write(dto);
		return "redirect:/board/detail?bno="+dto.getBno(); //작성한 게시글 보기
	}
```
#### BoardService.java
```java
	public void write(BoardDTO dto); //게시글 작성
```
#### BoardServiceIpml.java
```java
	//BoardController
	public void write(BoardDTO dto) { //게시글 작성
		bm.write(dto);
		dto.getAttach().setBno(dto.getBno());
		bm.insert(dto.getAttach());		
	}
```
#### BoardMapper.java
```java
	public void write(BoardDTO dto); //게시글 작성
```
#### BoardMapper.xml
```xml
	<!-- BoardController -->
	<!-- 게시글 작성 -->
	<insert id="write" useGeneratedKeys="true" keyProperty="bno">
		insert into board
		(title,content,writer,category,material)values(#{title},#{content},#{writer},#{category},#{material})
	</insert>
```
### 첨부
#### write.js
```js
	$("input[type='submit']").on("click",function(e){  /* 글쓰기 파일등록 */
		var form =$("form") /* form */
		e.preventDefault();
		if($("#title").val()!="" && $("#content").val()!=""&&$("#file").val()!=null&&$("#material").val()!=null){ /* null확인 */
			var formdata=new FormData();
			var file=$("#file")
			var files=file[0].files;
			formdata.append("uploadfile",files[0])
			console.log(formdata);
			$.ajax({ /* 이미지 업로드 */
				url:"/br/action"
				,type:"post",
				datatype:"json",
				processData:false,
				contentType:false,
				data:formdata,
				success:function(e){
					var str="";
					str+="<input type='hidden' name=attach.filename value='"+e.filename+"'>" /* 업로드 파일 정보 저장 */
					str+="<input type='hidden' name=attach.uuid value='"+e.uuid+"'>"
					str+="<input type='hidden' name=attach.uploadpath value='"+e.uploadpath+"'>"
					form.append(str).submit();
				},error:function(){
				}
			})
		}
		e.preventDefault();
	})
```
#### BoardRestController.java
```java

	@Autowired
	private BoardService bs;
	
	private String getFolder() { //오늘날짜
		SimpleDateFormat sdf =new SimpleDateFormat("yyyy-MM-dd");
		Date date= new Date();
		String str=sdf.format(date);
		return str.replace("-",File.separator);
	}
	
	@PostMapping("/action")//파일 업로드
	@ResponseBody
	public ResponseEntity<BoardAttachDTO> upload(MultipartFile uploadfile) {
		String uploadfolder="C:\\upload"; //업로드 될 폴더
		String uploadfolderPath=getFolder(); //업로드될 경로
		File uploadPath =new File(uploadfolder,uploadfolderPath);
		if(uploadPath.exists()==false) {//오늘 날짜의 폴더 확인
			uploadPath.mkdirs(); //오늘 날짜의 폴더 생성
		}
		BoardAttachDTO attach= new BoardAttachDTO();
		String uploadFileName=uploadfile.getOriginalFilename();
		attach.setFilename(uploadFileName);
		UUID uuid=UUID.randomUUID(); //uuid 생성
		uploadFileName=uuid.toString()+"_"+uploadfile.getOriginalFilename(); //업로드될 파일 이름
		try {
			File saveFile= new File(uploadPath,uploadFileName);
			uploadfile.transferTo(saveFile); //파일 저장
			attach.setUploadpath(uploadfolderPath);
			attach.setUuid(uuid.toString());

			Thumbnails.of(saveFile).size(250,250).toFile(uploadPath+"\\S_"+uploadFileName); // 썸네일 이미지 저장
			

		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(attach,HttpStatus.OK);
	}

```

#### BoardServiceIpml.java
```java
	//BoardController
	public void write(BoardDTO dto) { //게시글 작성
		bm.write(dto);
		dto.getAttach().setBno(dto.getBno());
		bm.insert(dto.getAttach());		
	}
```
#### BoardMapper.java
```java
	public void insert(BoardAttachDTO dto); //파일업로드
```
#### BoardMapper.xml
```xml
	<!-- 파일업로드 -->
	<insert id="insert">
		insert into attach (uuid,uploadpath,filename,bno)
		values(#{uuid},#{uploadpath},#{filename},#{bno})
	</insert>
```
### 글 수정
#### BoardController.java
```java
	@PostMapping("/modify") // 글 수정 POST
	public String modify2(BoardDTO dto) {
		sv.modify(dto);
		return "redirect:/board/detail?bno="+dto.getBno(); // 수정한 글 보기
	}
```
#### BoardService.java
```java
	public void modify(BoardDTO dto); //게시글 수정
```
#### BoardServiceIpml.java
```java
	public void modify(BoardDTO dto) { //게시글 수정
		bm.modify(dto);
		if(dto.getAttach()!=null) {
			dto.getAttach().setBno(dto.getBno());
			bm.insert(dto.getAttach());		
		}
	}
```
#### BoardMapper.java
```java
	public void modify(BoardDTO dto); //게시글 수정
```
#### BoardMapper.xml
```xml
	<!-- 게시글 수정 -->
	<update id="modify">
		update board set title=#{title},content=#{content},category=#{category},material=#{material} where bno=#{bno}
	</update>
```
### 첨부사진 수정
#### modify.js
```js
	$("input[type='submit']").on("click",function(e){ /* 글 수정 */
		var form =$("form")
		e.preventDefault();
		
		if($("#title").val()!="" && $("#content").val()!=""&&$("#material").val()!=null){ /* 빈 값 확인 */
			if($("#file").val()!=""){
				$.ajax({ /* 첨부 파일 삭제 */
					url:"/br/delete"
					,type:"delete",
					datatype:"json",
					contentType:"application/json; charset=utf-8",
					async:false,
					data:JSON.stringify({bno:bno}),
					success:function(){
						var formdata=new FormData();
						var file=$("#file")
						var files=file[0].files;
						formdata.append("uploadfile",files[0])
						console.log(formdata);
						$.ajax({ /* 첨부파일 업로드 */
							url:"/br/action"
							,type:"post",
							datatype:"json",
							async:false,
							processData:false,
							contentType:false,
							data:formdata,
							success:function(e){
								var str="";
								str+="<input type='hidden' name=attach.filename value='"+e.filename+"'>"
								str+="<input type='hidden' name=attach.uuid value='"+e.uuid+"'>"
								str+="<input type='hidden' name=attach.uploadpath value='"+e.uploadpath+"'>"
								form.append(str).submit();
							},error:function(){
							}
						})
					},error:function(){
					}
				})
			}
			form.submit();
		}
		e.preventDefault();
	})
```
#### BoardRestController.java
```java
	@DeleteMapping("/delete") //해당 글의 이미지 삭제
	public ResponseEntity<String> delete(@RequestBody BoardAttachDTO dto){
		int result = bs.attdelete(dto);
		return result>=1 ? new ResponseEntity<>("success",HttpStatus.OK)
				: new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR)
				;
	}
```
#### BoardService.java
```java
	public int attdelete(BoardAttachDTO dto); //해당 글의 이미지 삭제
```
#### BoardServiceIpml.java
```java
	public int attdelete(BoardAttachDTO dto) { //해당 글의 이미지 삭제
		return bm.attdelete(dto);
	}
```
#### BoardMapper.java
```java
	public int attdelete(BoardAttachDTO dto); //해당 글의 이미지 삭제
```
#### BoardMapper.xml
```xml
	<!-- 해당 글의 이미지 삭제 -->
	<delete id="attdelete">
		delete from attach where bno=#{bno};
	</delete>
```
### 글 삭제
#### BoardController.java
```java
	@PostMapping("/delete") //글 삭제
	public String delete(BoardDTO dto) {
		sv.delete(dto);
		return "redirect:/";
	}
```
#### BoardService.java
```java
	public void delete(BoardDTO dto); //게시글 삭제
```
#### BoardServiceIpml.java
```java
	public void delete(BoardDTO dto) { //게시글 삭제
		bm.delete(dto);
	}
```
#### BoardMapper.java
```java
	public void delete(BoardDTO dto); //게시글 삭제
```
#### BoardMapper.xml
```xml
	<!-- 게시글 삭제 -->
	<delete id="delete">
		delete from board where bno=#{bno};
	</delete>
```
### 추천
#### detail.js
```js
	$("#likesbox").on("click",function(){ /* 해당 글 추천 */
		if(id!=null&&id!=''){
			$.ajax({ /* 해당 글의 나의 추천 상태 확인 */
				url:"/br/likes",
				type:"post",
				contentType:"application/json; charset=utf-8",
				data:JSON.stringify({bno:bno,id:id}),
				async:false,
				success:function(result){
					if(result==1){ /* 추천 상태 일 경우 */
						$.ajax({ /* 추천 취소 */
							url:"/br/likesdel",
							type:"delete",
							async:false,
							contentType:"application/json; charset=utf-8",
							data:JSON.stringify({bno:bno,id:id}),
							success:function(){
								likes()
							},error:function(){
							}
						})
					}else{ /* 추천 상태가 아닐 경우 */
						$.ajax({ /* 추천 추가 */
							url:"/br/likesadd",
							type:"put",
							async:false,
							contentType:"application/json; charset=utf-8",
							data:JSON.stringify({bno:bno,id:id}),
							success:function(){
								likes()
							},error:function(){
							}
						})
					}
				},error:function(){
				}
			})
		}else{
			alert("로그인 필요")
		}
	})
	
	function likes(){ /* 추천 확인 */
		if(id!=null&&id!=''){
			$.ajax({ /* 해당 글의 나의 추천 상태 확인 */
				url:"/br/likes",
				type:"post",
				contentType:"application/json; charset=utf-8",
				data:JSON.stringify({bno:bno,id:id}),
				success:function(result){
					if(result==1){ /* 추천 상태 일 경우 */
						$("#likesbox").html("추천취소")
					}else{ /* 추천 상태가 아닐 경우 */
						$("#likesbox").html("추천")
					}
				}
			})
		}else{
		}
	}
```
#### BoardRestController.java
```java
	@PostMapping("/likes") //해당글의 나의 추천 상태 확인
	public ResponseEntity<Integer> likes(@RequestBody LikesDTO dto){
		return new ResponseEntity<>(bs.likes(dto),HttpStatus.OK);
	}
	
	@PutMapping("likesadd") //추천 추가
	public ResponseEntity<String> likesadd(@RequestBody LikesDTO dto){
		int result =bs.likesadd(dto);
		return result ==1 ? new ResponseEntity<>("success",HttpStatus.OK)
				: new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR)
				;
	}
	
	@DeleteMapping("/likesdel") //추천 취소
	public ResponseEntity<String> likesdel(@RequestBody LikesDTO dto){
		int result =bs.likedel(dto);
		return result ==1 ? new ResponseEntity<>("success",HttpStatus.OK)
				: new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR)
				;
	}
```
#### BoardService.java
```java
	public int likes(LikesDTO dto); //해당 글의 나의 추천상태 확인
	public int likesadd(LikesDTO dto); //추천 추가
	public int likedel(LikesDTO dto); //추천 취소
```
#### BoardServiceIpml.java
```java
	public int likes(LikesDTO dto) { //해당 글의 나의 추천상태 확인
		return bm.likes(dto);
	}
	public int likesadd(LikesDTO dto) { //추천 추가
		return bm.likesadd(dto);
	}
	public int likedel(LikesDTO dto) { //추천 취소
		return bm.likedel(dto);
	}
```
#### BoardMapper.java
```java
	public int likes(LikesDTO dto); //해당 글의 나의 추천상태 확인
	public int likesadd(LikesDTO dto); //추천 추가
	public int likedel(LikesDTO dto); //추천 취소
```
#### BoardMapper.xml
```xml
	<!-- 해당 글의 나의 추천상태 확인 -->
	<select id="likes" resultType="int">
		select count(*) from likes where id=#{id} and bno=#{bno}
	</select>
	
	<!-- 추천 추가 -->
	<insert id="likesadd">
		insert into likes (id,bno) values(#{id},#{bno});
	</insert>
	
	<!-- 추천   -->
	<delete id="likedel">
		delete from likes where bno=#{bno} and id=#{id}
	</delete>
```
### 댓글 목록
```js
	function replylist(){ /* 댓글 목록 */
		var str="";
		$.getJSON("/reply/"+bno+".json",function(data){ /* 댓글 목록 가져오기 */
			$(data).each(function(){
				str+="<li class='border' data-rno='"+this.rno+"'><p class='re_writer fw-bold'>"+this.reply_writer+"</p><p class='re_content'>"+this.reply_content+"</p>"
				if(id==this.reply_writer){
				str+="<p><button class='remodi btn btn-success'>수정</button>  <button class='redel btn btn-success'>삭제</button></p></li>"
				}
			})
			$("#replies").html(str)
		})
	}
```
```java
	@GetMapping("/{bno}") //해당글의 댓글 목록
	public ResponseEntity<ArrayList<replyDTO>> relist(@PathVariable("bno")int bno){
		return new ResponseEntity<>(sv.list(bno),HttpStatus.OK);
		
	}
```
```java
	public ArrayList<replyDTO> list(int bno); //댓글 목록
```
```java
	public ArrayList<replyDTO> list(int bno) { //댓글 목록
		return bm.list(bno);
	}
```
```java
	public ArrayList<replyDTO> list(int bno); //댓글 목록
```
```xml
	<select id="list" resultType="org.SGH.DTO.replyDTO">
		select * from reply where bno=#{bno} order by rno desc;
	</select>
```
### 댓글 작성
```js
	$("#rebutton").on("click",function(){ /* 댓글 작성 */
		if(id!=""){ /* 로그인 확인 */
		var reply_writer =id;
		var reply_content =$("#replytext").val();
		$.ajax({ /* 댓글 작성 */
			url:"/reply/write",
			type:"post",
			contentType:"application/json; charset=utf-8",
			data:JSON.stringify({bno:bno,reply_writer:reply_writer,reply_content:reply_content}),
			success:function(data){
				$("#replytext").html("")
				replylist();
			},error:function(){
				alert("에러")
			}
		})		
		}else{
			alert("로그인필요")
		}	
	})
```
```java
	@PostMapping("/write") //댓글 작성
	public ResponseEntity<String> rewrite(@RequestBody replyDTO dto){
		int result=sv.rewrite(dto);
		return result ==1 ? new ResponseEntity<>("success",HttpStatus.OK)
				: new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
```
```java
	public int rewrite(replyDTO dto); //댓글 작성
```
```java
	public int rewrite(replyDTO dto) { //댓글 작성
		return bm.rewrite(dto);
	}
```
```java
	public int rewrite(replyDTO dto); //댓글 작성
```
```xml
	<!-- 댓글 작성 -->
	<insert id="rewrite">
		insert into reply (bno,reply_writer,reply_content)values(#{bno},#{reply_writer},#{reply_content})
	</insert>
```
### 댓글 수정
```js
	$("#replies").on("click",".remodi",function(){  /*댓글 수정*/
		var rno=$(this).parents("li").data("rno")
		var text=$(this).parent().prev(".re_content").html();
		$(this).parents("li").replaceWith("<textarea data-rno='"+rno+"' class='modiarea' maxlength='100'>"+text+"</textarea><div><button class='modisub btn btn-success'>확인</button><button class='modican  btn btn-success'>취소</button></div>"); /* textarea로 변환 */
	})
		
	$("#replies").on("click",".modisub",function(){ /* 댓글수정 확인 */
		var rno=$(this).parent().prev("textarea").data("rno")
		var reply_content=$(this).parent().prev("textarea").val();
			$.ajax({  /* 댓글 수정 */
				url:"/reply/modify",
				type:"put",
				contentType:"application/json; charset=utf-8",
				data:JSON.stringify({rno:rno,reply_content:reply_content}),
				success:function(){
					replylist();
				},error:function(){
				}
		})
	})	
	$("#replies").on("click",".modican",function(){ /* 댓글수정 취소 */
		replylist();
	})	
```
```java
	@PutMapping("/modify") //댓글 수정
	public ResponseEntity<String> modify(@RequestBody replyDTO dto){
		int result=sv.remodify(dto);
		return result ==1 ? new ResponseEntity<>("success",HttpStatus.OK)
				: new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
```
```java
	public int remodify(replyDTO dto); //댓글 수정

```
```java
	public int remodify(replyDTO dto) { //댓글 수정
		return bm.remodify(dto);
	}
```
```java
	public int remodify(replyDTO dto); //댓글 수정
```
```xml
	<!-- 댓글 수정 -->
	<update id="remodify">
		update reply set reply_content=#{reply_content} where rno=#{rno}
	</update>
```
### 댓글 삭제
```js
	$("#replies").on("click",".redel",function(){ /* 댓글 삭제 */
		var rno=$(this).parents("li").data("rno")
		$.ajax({ 
				url:"/reply/delete",
				type:"delete",
				contentType:"application/json; charset=utf-8",
				data:JSON.stringify({rno:rno}),
				success:function(){
					replylist();
				},error:function(){
				}
		})
	})
```
```java
	@DeleteMapping("/delete") //댓글 삭제
	public ResponseEntity<String> delete(@RequestBody replyDTO dto){
		int result=sv.redelete(dto);
		return result ==1 ? new ResponseEntity<>("success",HttpStatus.OK)
				: new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
```
```java
	public int redelete(replyDTO dto); //댓글 삭제
```
```java
	public int redelete(replyDTO dto) { //댓글 삭제
		return bm.redelete(dto);
	}
```
```java
	public int redelete(replyDTO dto); //댓글 삭제
```
```xml
	<!-- 댓글 삭제 -->
	<delete id="redelete">
		delete from reply where rno=#{rno}	
	</delete>
```
