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
	
	//글쓰기
	@GetMapping("/write")
	public String gwrite(HttpSession session) {
		//로그인 확인
		if(session.getAttribute("user")==null) {
			return "redirect:/member/login";
		}else {
			return "/board/write";
		}
	}
	
	//글쓰기(post)
	@PostMapping("/write")
	public String pwrite(BoardDTO dto) {
		sv.write(dto);
		return "redirect:/board/detail?bno="+dto.getBno();
	}
	
	//글 보기
	@GetMapping("/detail")
	public void detail(BoardDTO dto,Model model) {
		//조회수 증가
		sv.hits(dto);
		model.addAttribute("detail",sv.detail(dto));
	}
	
	//글삭제
	@PostMapping("/delete")
	public String delete(BoardDTO dto) {
		sv.delete(dto);
		return "redirect:/";
	}
	
	//글수정
	@GetMapping("/modify")
	public void modify(BoardDTO dto,Model model) {
		model.addAttribute("modify",sv.detail(dto));
	}
	
	//글수정(post)
	@PostMapping("/modify")
	public String modify2(BoardDTO dto) {
		sv.modify(dto);
		return "redirect:/board/detail?bno="+dto.getBno();
	}
	
	//추천한 글 리스트
	@GetMapping("/likes")
	public void likes(HttpSession session,MemberDTO dto,Criteria cri,Model model) {
		dto=(MemberDTO)session.getAttribute("user");
		model.addAttribute("list",sv.mylikes(cri,dto));
		model.addAttribute("page",new pageDTO(cri,sv.liketotal(cri, dto)));
	}
	
	
}
