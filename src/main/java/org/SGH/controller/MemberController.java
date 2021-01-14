package org.SGH.controller;


import javax.servlet.http.HttpSession;

import org.SGH.DTO.MemberDTO;
import org.SGH.Service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;


@Controller
@RequestMapping("/member")
public class MemberController {
	
	@Autowired
	private MemberService sv;
	
	@GetMapping("/login")
	public void login() {
		
	}
	@PostMapping("/login")
	public String login2(MemberDTO dto,HttpSession session,RedirectAttributes rttr) {
		MemberDTO user = sv.login(dto);
		if(user!=null) {
			session.setAttribute("user",user);
			return "redirect:/";
		}else {
			rttr.addFlashAttribute("msg", "로그인 실패");
			return "redirect:/member/login";
		}
	}
	@GetMapping("/logout")
	public String logout(HttpSession session) {
		session.invalidate();
		return "redirect:/";
	}
	
	@GetMapping("/sign_up")
	public void signup() {
		
	}
	@PostMapping("/sign_up")
	public String signup2(MemberDTO dto) {
		sv.add(dto);
		return "redirect:/member/login";
	}
	
	@GetMapping("/find_id")
	public void gfind_id() {
	}
	
	@GetMapping("/find_pw")
	public void gfind_pw() {
		
	}
	
	@GetMapping("/detail")
	public void detail() {
		
	}
	@PostMapping("/modify")
	public String modify(MemberDTO dto,HttpSession session) {
		sv.modify(dto);
		session.invalidate();
		return"redirect:/member/login";
	}
	@PostMapping("/delete")
	public String delete(MemberDTO dto,HttpSession session) {
		sv.delete(dto);
		session.invalidate();
		return "redirect:/";
	}

}
