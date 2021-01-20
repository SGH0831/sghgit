# GP project
<img src="https://user-images.githubusercontent.com/77423948/105048569-113e3c00-5aaf-11eb-80f5-0d7790f43d79.png" width="350" height="350px">

### 목록
- 1 기획 의도
- 2 개발 환경
- 3 UI 설계
- 4 DB 설계
- 5 기술 상세

### 1 기획의도
---

<img src="https://user-images.githubusercontent.com/77423948/105108845-87b65a80-5afe-11eb-8eeb-1e15fc56dec5.jpg" width="400" >  

  

### 2 개발 환경
---

  OS:window10  
  IDE:Eclipse  
  Server:Apache tomcat 8.5  
  DB:MySQL  
  Language:JAVA,JSP,JavaScropt 
  framework:Spring,bootstrap
  ORM:MyBatis  
  
  
### 3 UI 설계
---


### 4 DB 설계
---


### 5 기술 상세
---
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
BoardController.java 
