package org.SGH.Service;

import org.SGH.DTO.MemberDTO;
import org.SGH.mapper.MemberMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberServiceIpml implements MemberService{
	@Autowired
	private MemberMapper mm;
	
	//아이디 체크
	public int idch(String id) {
		return mm.idch(id);
	}

	//회원가입
	public void add(MemberDTO dto) {
		mm.add(dto);
	}

	//로그인
	public MemberDTO login(MemberDTO dto) {
		return mm.login(dto);
	}

	//아이디 찾기
	public MemberDTO find_id(MemberDTO dto) {
		return mm.find_id(dto);
	}

	//회원 수정
	public void modify(MemberDTO dto) {
		mm.modify(dto);
	}

	//회원탈퇴
	public void delete(MemberDTO dto) {
		mm.delete(dto);
	}
	
}
