package org.SGH.Service;

import org.SGH.DTO.MemberDTO;
import org.SGH.mapper.MemberMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberServiceIpml implements MemberService{
	@Autowired
	private MemberMapper mm;
	
	public int idch(String id) {
		return mm.idch(id);
	}

	public void add(MemberDTO dto) {
		mm.add(dto);
	}

	public MemberDTO login(MemberDTO dto) {
		return mm.login(dto);
	}

	public MemberDTO find_id(MemberDTO dto) {
		return mm.find_id(dto);
	}

	public void modify(MemberDTO dto) {
		mm.modify(dto);
	}

	public void delete(MemberDTO dto) {
		mm.delete(dto);
	}
	
}
