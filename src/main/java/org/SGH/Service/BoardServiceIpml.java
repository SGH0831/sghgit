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
	
	//main
	//게시글 보기
	public ArrayList<BoardDTO> getlist(Criteria cri) {
		return bm.getlist(cri);
	}
	//게시글 총수
	public int total(Criteria cri) {
		return bm.total(cri);
	}
	
	//board
	//게시글 작성
	public void write(BoardDTO dto) {
		bm.write(dto);
		dto.getAttach().setBno(dto.getBno());
		bm.insert(dto.getAttach());		
	}
	//게시글 보기
	public BoardDTO detail(BoardDTO dto) {
		return bm.detail(dto);
	}
	//조회수 증가
	public void hits(BoardDTO dto) {
		bm.hits(dto);
	}
	//게시글 수정
	public void modify(BoardDTO dto) {
		bm.modify(dto);
		if(dto.getAttach()!=null) {
			dto.getAttach().setBno(dto.getBno());
			bm.insert(dto.getAttach());		
		}
	}
	//게시글 삭제
	public void delete(BoardDTO dto) {
		bm.delete(dto);
	}
	//나의 추천글 보기
	public ArrayList<BoardDTO> mylikes(Criteria cri,MemberDTO dto) {
		return bm.mylikes(cri,dto);
	}
	//나의 추천글 총수
	public int liketotal(Criteria cri, MemberDTO dto) {
		return bm.liketotal(cri, dto);
	}
	
	//Reply
	//댓글 보기
	public ArrayList<replyDTO> list(int bno) {
		return bm.list(bno);
	}
	//댓글 작성
	public int rewrite(replyDTO dto) {
		return bm.rewrite(dto);
	}
	//댓글 수정
	public int remodify(replyDTO dto) {
		return bm.remodify(dto);
	}
	//댓글 삭제
	public int redelete(replyDTO dto) {
		return bm.redelete(dto);
	}
	
	//boardRest
	//첨부사진 이미지 경로 가져오기
	public BoardAttachDTO getimg(int bno) {
		return bm.getimg(bno);
	}
	//첨부사진 삭제
	public int attdelete(BoardAttachDTO dto) {
		return bm.attdelete(dto);
	}
	//추천상태 확인
	public int likes(LikesDTO dto) {
		return bm.likes(dto);
	}
	//추천 추가
	public int likesadd(LikesDTO dto) {
		return bm.likesadd(dto);
	}
	//추천 삭제
	public int likedel(LikesDTO dto) {
		return bm.likedel(dto);
	}
	//추천 수
	public int likenum(int bno) {
		return bm.likenum(bno);
	}
}
