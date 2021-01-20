# GP project
<img src="https://user-images.githubusercontent.com/77423948/105048569-113e3c00-5aaf-11eb-80f5-0d7790f43d79.png" width="350" height="350px">

### 목록
- 1 기획 의도
- 2 개발 환경
- 3 UI 설계
- 4 DB 설계
- 5 기술 상세

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
