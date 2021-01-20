# GP project
<img src="https://user-images.githubusercontent.com/77423948/105048569-113e3c00-5aaf-11eb-80f5-0d7790f43d79.png" width="350" height="350px">

### 목록
1. 기획 의도
2. 개발 환경
3. UI 설계
4. DB 설계
5. 기술 상세
	* 5.1 홈 관련
		* 5.1.1 Controller
	* 5.2 게시판 관련
		* 5.2.1 Controller
		* 5.2.2 Service
		* 5.2.3 Mapper
		* 5.2.4 Js
	* 5.3 사용자 관련
		* 5.3.1 Controller
		* 5.3.2 Service
		* 5.3.3 Mapper
## 1 기획의도

<img src="https://user-images.githubusercontent.com/77423948/105108845-87b65a80-5afe-11eb-8eeb-1e15fc56dec5.jpg" width="400" >  

  

## 2 개발 환경

  OS:window10  
  IDE:Eclipse  
  Server:Apache tomcat 8.5  
  DB:MySQL  
  Language:JAVA,JSP,JavaScropt  
  framework:Spring,bootstrap  
  ORM:MyBatis  
  
  
## 3 UI 설계


## 4 DB 설계

## 5 기술 상세
### 5.1 홈 관련
### 5.1.1 Controller
#### MainController.java
```java
package org.SGH.controller;

import org.SGH.DTO.Criteria;
import org.SGH.DTO.pageDTO;
import org.SGH.Service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class MainController {
	@Autowired
	private BoardService sv;
	
	@RequestMapping(value="/", method=RequestMethod.GET) //홈
	public String main(Model model,Criteria cri) {
		model.addAttribute("list", sv.getlist(cri)); //글 목록
		model.addAttribute("page",new pageDTO(cri,sv.total(cri))); //페이징
		return "main";
	}
}

```
### 5.2 게시판 관련
### 5.2.1 Controller
#### BoardController.java 
```java
package org.SGH.controller;

import javax.servlet.http.HttpSession;

import org.SGH.DTO.BoardDTO;
import org.SGH.DTO.Criteria;
import org.SGH.DTO.MemberDTO;
import org.SGH.DTO.pageDTO;
import org.SGH.Service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/board")
public class BoardController {

	@Autowired
	private BoardService sv;
	
	@GetMapping("/write") //글 작성 GET
	public String gwrite(HttpSession session) {
		if(session.getAttribute("user")==null) { //session의 로그인 확인
			return "redirect:/member/login"; //없을시 로그인 페이지
		}else {
			return "/board/write";
		}
	}
	
	@PostMapping("/write") //글 작성 POST
	public String pwrite(BoardDTO dto) {
		sv.write(dto);
		return "redirect:/board/detail?bno="+dto.getBno(); //작성한 게시글 보기
	}
	
	@GetMapping("/detail") //글 보기
	public void detail(BoardDTO dto,Model model) {
		sv.hits(dto); //조회수 증가
		model.addAttribute("detail",sv.detail(dto));
	}
	
	@PostMapping("/delete") //글 삭제
	public String delete(BoardDTO dto) {
		sv.delete(dto);
		return "redirect:/";
	}
  
	@GetMapping("/modify") // 글 수정 GET
	public void modify(BoardDTO dto,Model model) {
		model.addAttribute("modify",sv.detail(dto)); //글 정보 가져오기
	}
	
	@PostMapping("/modify") // 글 수정 POST
	public String modify2(BoardDTO dto) {
		sv.modify(dto);
		return "redirect:/board/detail?bno="+dto.getBno(); // 수정한 글 보기
	}
	
	@GetMapping("/likes") //내가 추천한 글 보기
	public void likes(HttpSession session,MemberDTO dto,Criteria cri,Model model) {
		dto=(MemberDTO)session.getAttribute("user");
		model.addAttribute("list",sv.mylikes(cri,dto)); //글 목록 불러오기
		model.addAttribute("page",new pageDTO(cri,sv.liketotal(cri, dto))); //페이징
	}
	
}
```

#### BoardRestController.java
```java
package org.SGH.controller;

import java.io.File;
import java.nio.file.Files;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

import org.SGH.DTO.BoardAttachDTO;
import org.SGH.DTO.LikesDTO;
import org.SGH.Service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import net.coobird.thumbnailator.Thumbnails;

@RestController
@RequestMapping("/br")
public class BoardRestController {

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
	
	@GetMapping("/{bno}") //해당 글의 이미지 가져오기
	public ResponseEntity<BoardAttachDTO> getimg(@PathVariable("bno")int bno){
	 return new ResponseEntity<>(bs.getimg(bno),HttpStatus.OK);
	}
	
	@DeleteMapping("/delete") //해당 글의 이미지 삭제
	public ResponseEntity<String> delete(@RequestBody BoardAttachDTO dto){
		int result = bs.attdelete(dto);
		return result>=1 ? new ResponseEntity<>("success",HttpStatus.OK)
				: new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR)
				;
	}
	
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
	
	@GetMapping("/likenum/{bno}") //해당글의 추천수 
	public ResponseEntity<Integer> likenum(@PathVariable("bno")int bno){
		int result=bs.likenum(bno);
		return new ResponseEntity<>(result,HttpStatus.OK);
	}
	
}
```
#### ReplyController.java 
```java
package org.SGH.controller;

import java.util.ArrayList;

import org.SGH.DTO.replyDTO;
import org.SGH.Service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/reply")
public class ReplyController {
	@Autowired
	private BoardService sv;
	
	@PostMapping("/write") //댓글 작성
	public ResponseEntity<String> rewrite(@RequestBody replyDTO dto){
		int result=sv.rewrite(dto);
		return result ==1 ? new ResponseEntity<>("success",HttpStatus.OK)
				: new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@GetMapping("/{bno}") //해당글의 댓글 목록
	public ResponseEntity<ArrayList<replyDTO>> relist(@PathVariable("bno")int bno){
		return new ResponseEntity<>(sv.list(bno),HttpStatus.OK);
		
	}
	
	@PutMapping("/modify") //댓글 수정
	public ResponseEntity<String> modify(@RequestBody replyDTO dto){
		int result=sv.remodify(dto);
		return result ==1 ? new ResponseEntity<>("success",HttpStatus.OK)
				: new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@DeleteMapping("/delete") //댓글 삭제
	public ResponseEntity<String> delete(@RequestBody replyDTO dto){
		int result=sv.redelete(dto);
		return result ==1 ? new ResponseEntity<>("success",HttpStatus.OK)
				: new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
```
### 5.2.2 Service

#### BoardService.java
```java
package org.SGH.Service;

import java.util.ArrayList;

import org.SGH.DTO.BoardAttachDTO;
import org.SGH.DTO.BoardDTO;
import org.SGH.DTO.Criteria;
import org.SGH.DTO.LikesDTO;
import org.SGH.DTO.MemberDTO;
import org.SGH.DTO.replyDTO;

public interface BoardService {
	
	//MainController
	public ArrayList<BoardDTO> getlist(Criteria cri); //게시글 목록
	public int total(Criteria cri); //게시글 수
	
	//BoardController
	public void write(BoardDTO dto); //게시글 작성
	public BoardDTO detail(BoardDTO dto); //게시글 보기
	public void hits(BoardDTO dto); //조회수 증가
	public void modify(BoardDTO dto); //게시글 수정
	public void delete(BoardDTO dto); //게시글 삭제
	public ArrayList<BoardDTO> mylikes(Criteria cri,MemberDTO dto); //내가 추천 한 글 목록
	public int liketotal(Criteria cri,MemberDTO dto); //내가 추천 한 글 수
	
	//replyController
	public ArrayList<replyDTO> list(int bno); //댓글 목록
	public int rewrite(replyDTO dto); //댓글 작성
	public int remodify(replyDTO dto); //댓글 수정
	public int redelete(replyDTO dto); //댓글 삭제
	
	//BoardRestController
	public BoardAttachDTO getimg(int bno);  //해당 글의 이미지 가져오기
	public int attdelete(BoardAttachDTO dto); //해당 글의 이미지 삭제
	public int likes(LikesDTO dto); //해당 글의 나의 추천상태 확인
	public int likesadd(LikesDTO dto); //추천 추가
	public int likedel(LikesDTO dto); //추천 취소
	public int likenum(int bno); //해당 글의 추천수
}
```

#### BoardServiceIpml.java

```java
package org.SGH.Service;

import java.util.ArrayList;

import org.SGH.DTO.BoardAttachDTO;
import org.SGH.DTO.BoardDTO;
import org.SGH.DTO.Criteria;
import org.SGH.DTO.LikesDTO;
import org.SGH.DTO.MemberDTO;
import org.SGH.DTO.replyDTO;
import org.SGH.mapper.BoardMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BoardServiceIpml implements BoardService{
	@Autowired
	private BoardMapper bm;
	
	//MainController
	public ArrayList<BoardDTO> getlist(Criteria cri) { //게시글 목록
		return bm.getlist(cri);
	}
	public int total(Criteria cri) { //게시글 수
		return bm.total(cri);
	}
	
	//BoardController
	public void write(BoardDTO dto) { //게시글 작성
		bm.write(dto);
		dto.getAttach().setBno(dto.getBno());
		bm.insert(dto.getAttach());		
	}
	public BoardDTO detail(BoardDTO dto) { //게시글 보기
		return bm.detail(dto);
	}
	public void hits(BoardDTO dto) { //조회수 증가
		bm.hits(dto);
	}
	public void modify(BoardDTO dto) { //게시글 수정
		bm.modify(dto);
		if(dto.getAttach()!=null) {
			dto.getAttach().setBno(dto.getBno());
			bm.insert(dto.getAttach());		
		}
	}
	public void delete(BoardDTO dto) { //게시글 삭제
		bm.delete(dto);
	}
	public ArrayList<BoardDTO> mylikes(Criteria cri,MemberDTO dto) { //내가 추천 한 글 목록
		return bm.mylikes(cri,dto);
	}
	public int liketotal(Criteria cri, MemberDTO dto) { //내가 추천 한 글 수
		return bm.liketotal(cri, dto);
	}
	
	//replyController
	public ArrayList<replyDTO> list(int bno) { //댓글 목록
		return bm.list(bno);
	}
	public int rewrite(replyDTO dto) { //댓글 작성
		return bm.rewrite(dto);
	}
	public int remodify(replyDTO dto) { //댓글 수정
		return bm.remodify(dto);
	}
	public int redelete(replyDTO dto) { //댓글 삭제
		return bm.redelete(dto);
	}
	
	//BoardRestController
	public BoardAttachDTO getimg(int bno) { //해당 글의 이미지 가져오기
		return bm.getimg(bno);
	}
	public int attdelete(BoardAttachDTO dto) { //해당 글의 이미지 삭제
		return bm.attdelete(dto);
	}
	public int likes(LikesDTO dto) { //해당 글의 나의 추천상태 확인
		return bm.likes(dto);
	}
	public int likesadd(LikesDTO dto) { //추천 추가
		return bm.likesadd(dto);
	}
	public int likedel(LikesDTO dto) { //추천 취소
		return bm.likedel(dto);
	}
	public int likenum(int bno) { //해당 글의 추천수
		return bm.likenum(bno);
	}
}
```

### 5.2.3 Mapper

#### BoardMapper.java
```java
package org.SGH.mapper;

import java.util.ArrayList;

import org.SGH.DTO.BoardAttachDTO;
import org.SGH.DTO.BoardDTO;
import org.SGH.DTO.Criteria;
import org.SGH.DTO.LikesDTO;
import org.SGH.DTO.MemberDTO;
import org.SGH.DTO.replyDTO;
import org.apache.ibatis.annotations.Param;

public interface BoardMapper {
	//MainController
	public ArrayList<BoardDTO> getlist(Criteria cri); //게시글 목록
	public int total(Criteria cri); //게시글 수
	
	//BoardController
	public void write(BoardDTO dto);  //게시글 작성
	public void insert(BoardAttachDTO dto); //파일업로드
	public BoardDTO detail(BoardDTO dto); //게시글 보기
	public void hits(BoardDTO dto); //조회수 증가
	public void modify(BoardDTO dto); //게시글 수정
	public void delete(BoardDTO dto); //게시글 삭제
	public ArrayList<BoardDTO> mylikes(@Param("cri")Criteria cri,@Param("dto")MemberDTO dto);  //내가 추천 한 글 목록
	public int liketotal(@Param("cri") Criteria cri,@Param("dto") MemberDTO dto); //내가 추천 한 글 수
	
	//replyController
	public ArrayList<replyDTO> list(int bno); //댓글 목록
	public int rewrite(replyDTO dto); //댓글 작성
	public int remodify(replyDTO dto); //댓글 수정
	public int redelete(replyDTO dto); //댓글 삭제
	
	//BoardRestController
	public BoardAttachDTO getimg(int bno); //해당 글의 이미지 가져오기
	public int attdelete(BoardAttachDTO dto); //해당 글의 이미지 삭제
	public int likes(LikesDTO dto); //해당 글의 나의 추천상태 확인
	public int likesadd(LikesDTO dto); //추천 추가
	public int likedel(LikesDTO dto); //추천 취소
	public int likenum(int bno); //해당 글의 추천수
}
```
#### BoardMapper.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
  PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="org.SGH.mapper.BoardMapper">
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
	
	<!-- BoardController -->
	<!-- 게시글 작성 -->
	<insert id="write" useGeneratedKeys="true" keyProperty="bno">
		insert into board
		(title,content,writer,category,material)values(#{title},#{content},#{writer},#{category},#{material})
	</insert>

	<!-- 파일업로드 -->
	<insert id="insert">
		insert into attach (uuid,uploadpath,filename,bno)
		values(#{uuid},#{uploadpath},#{filename},#{bno})
	</insert>
	
	<!-- 게시글 보기 -->
	<select id="detail" resultType="org.SGH.DTO.BoardDTO">
		select * from board where bno=#{bno}
	</select>
	
	<!-- 조회수 증가 -->
	<update id="hits">
		update board set hits = hits+1 where bno=#{bno}
	</update>
	
	<!-- 게시글 수정 -->
	<update id="modify">
		update board set title=#{title},content=#{content},category=#{category},material=#{material} where bno=#{bno}
	</update>
	
	<!-- 게시글 삭제 -->
	<delete id="delete">
		delete from board where bno=#{bno};
	</delete>
	
	<!-- 내가 추천 한 글 목록 -->
	<select id="mylikes" resultType="org.SGH.DTO.BoardDTO" parameterType="map">
		select * from
		(
		select @rownum:=@rownum+1 as rownum, b.* from (select @rownum:=0) as tmp, (select * from board where bno=any(select bno from likes where id=#{dto.id})) as b order by bno desc ) as board where
		<!-- 페이징 -->
		<![CDATA[
		 rownum>((#{cri.pageNum}-1)*#{cri.amount})and rownum<=(#{cri.pageNum}*#{cri.amount})
		]]>
	</select>
	
	<!-- 내가 추천 한 글 수 -->
	<select id="liketotal" resultType="int">
		select count(*) from likes where id=#{dto.id}
	</select>
	
	<!-- replyController -->
	<!-- 댓글 목록 -->
	<select id="list" resultType="org.SGH.DTO.replyDTO">
		select * from reply where bno=#{bno} order by rno desc;
	</select>
	
	<!-- 댓글 작성 -->
	<insert id="rewrite">
		insert into reply (bno,reply_writer,reply_content)values(#{bno},#{reply_writer},#{reply_content})
	</insert>
	
	<!-- 댓글 수정 -->
	<update id="remodify">
		update reply set reply_content=#{reply_content} where rno=#{rno}
	</update>
	
	<!-- 댓글 삭제 -->
	<delete id="redelete">
		delete from reply where rno=#{rno}	
	</delete>
	
	<!-- -->
	<!--해당 글의 이미지 가져오기  -->
	<select id="getimg" resultType="org.SGH.DTO.BoardAttachDTO">
		select * from attach where bno=#{bno}
	</select>
	
	<!-- 해당 글의 이미지 삭제 -->
	<delete id="attdelete">
		delete from attach where bno=#{bno};
	</delete>
	
	<!-- 해당 글의 나의 추천상태 확인 -->
	<select id="likes" resultType="int">
		select count(*) from likes where id=#{id} and bno=#{bno}
	</select>
	
	<!-- 추천 추가 -->
	<insert id="likesadd">
		insert into likes (id,bno) values(#{id},#{bno});
	</insert>
	
	<!-- 추천  -->
	<delete id="likedel">
		delete from likes where bno=#{bno} and id=#{id}
	</delete>
	
	<!-- 해당 글의 추천수  -->
	<select id="likenum" resultType="int">
		select count(*) from likes where bno=#{bno}
	</select>
</mapper>
```

### 5.2.4 Js

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
#### write.js 
```js
$(document).ready(function(){
	$("#file").change(function(){ /* 이미지 미리 보기 */
		if($("#file").val()==""){
			$("#img").removeAttr("src");			
		}else{
		var file=$("#file") /* 첨부된 파일 */
		var files=file[0].files;
		var reg=/.(jpg|bmp|png|jpeg|gif)$/; /* 확장자 확인 */
		console.log(files)
		
		if(reg.test(file.val())){ /* 확장자 확인 */
			$("input[type='submit']").attr("disabled",false)
			var reader =new FileReader();
			reader.onload=function(e){
				$("#img").attr("src",e.target.result)
			}
			reader.readAsDataURL(files[0]);
		}else{
			alert("이미지 파일만 가능합니다")
			$("input[type='submit']").attr("disabled",true);
		}
		}
	})
	
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
})
```
#### detail.js 
```js
$(document).ready(function(){
	img();
	likes();	
	replylist();
	
	function img(){ /* 이미지 띄우기 */
		$.getJSON("/br/"+bno+".json",function(data){
			var callpath=encodeURIComponent(data.uploadpath+"/"+data.uuid+"_"+data.filename)
			$("#img").attr("src","/br/display?filename="+callpath )
		})
	}	
	$("#login_btn").on("click",function(){ /* 로그인 */
		location.href="/member/login";
	})
	$("#logout_btn").on("click",function(){ /* 로그아웃 */
		alert("로그아웃")
		location.href="/member/logout"
	})
	$("#write").on("click",function(){ /* 글쓰기 */
		location.href="/board/write"
	})
	$("#mylike").on("click",function(){ /* 추천 */
		location.href="/board/likes"
	})
	$("#menu").on("click",function(){ /* 홈 */
		location.href="/main/"
	})
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
	
	$("#modify").on("click",function(){ /* 글수정 */
		location.href="/board/modify?bno="+bno		
	})	
	
	$("#delete").on("click",function(){ /* 글 삭제 */
		var form = $("#form")
		form.attr("action","/board/delete")
		form.attr("method","post")
		form.submit();
	})	
	
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
	
})
```
####
```js
```
####
```js
```
####
```js
```
