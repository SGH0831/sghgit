package org.SGH.controller;

import javax.mail.internet.MimeMessage;

import org.SGH.DTO.MemberDTO;
import org.SGH.Service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/mr")
public class MemberRestController {
	
	@Autowired
	private MemberService sv;
	@Autowired
	private JavaMailSender mailSender;
	
	//아이디 중복확인
	@RequestMapping(value="/{id}",method = RequestMethod.GET)
	public int signcheck(@PathVariable("id")String id){
		int result=sv.idch(id);
		return result;
	}
	
	//아이디 찾기
	@PostMapping("/find_id")
	public ResponseEntity<String> findid(@RequestBody MemberDTO dto){
		return new ResponseEntity<>(sv.find_id(dto).getId(),HttpStatus.OK);
	}
	
	//비밀번호찾기
	@PostMapping("/find_pw")
	public ResponseEntity<String> findpw(@RequestBody MemberDTO dto){
		MemberDTO mdto=sv.find_id(dto);
		if(mdto!=null) {
			String to=mdto.getEmail();
			String subject="비밀번호 찾기";
			String content="비밀번호는 <<"+mdto.getPw()+">>	 입니다";
			try {
				MimeMessage message = mailSender.createMimeMessage();
				MimeMessageHelper messageHelper =new MimeMessageHelper(message,true,"UTF-8");
				messageHelper.setFrom("sgh08311@naver.com");
				messageHelper.setTo(to);
				messageHelper.setSubject(subject);
				messageHelper.setText(content);
				mailSender.send(message);
				} catch (Exception e) {
					e.printStackTrace();
			}
		}
		return new ResponseEntity<>("success",HttpStatus.OK);
	}
}
