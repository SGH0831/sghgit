package org.SGH.mapper;

import org.SGH.DTO.MemberDTO;

public interface MemberMapper {
	public int idch(String id);
	public void add(MemberDTO dto);
	public MemberDTO login(MemberDTO dto);
	public MemberDTO find_id(MemberDTO dto);
	public void modify(MemberDTO dto);
	public void delete(MemberDTO dto);
}
