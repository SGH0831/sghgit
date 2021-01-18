package org.SGH.Service;

import org.SGH.DTO.MemberDTO;

public interface MemberService {
	//아이디 체크
	public int idch(String id);
	//회원가입
	public void add(MemberDTO dto);
	//로그인
	public MemberDTO login(MemberDTO dto);
	//아이디 찾기
	public MemberDTO find_id(MemberDTO dto);
	//회원 수정
	public void modify(MemberDTO dto);
	//회원 탈퇴
	public void delete(MemberDTO dto);
}
