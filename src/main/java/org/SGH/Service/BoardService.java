package org.SGH.Service;

import java.util.ArrayList;

import org.SGH.DTO.BoardAttachDTO;
import org.SGH.DTO.BoardDTO;
import org.SGH.DTO.Criteria;
import org.SGH.DTO.LikesDTO;
import org.SGH.DTO.MemberDTO;
import org.SGH.DTO.replyDTO;

public interface BoardService {
	
	//main
	//게시글 보기
	public ArrayList<BoardDTO> getlist(Criteria cri);
	//게시글 총수
	public int total(Criteria cri);
	
	//board
	//게시글 작성
	public void write(BoardDTO dto);
	//게시글 보기
	public BoardDTO detail(BoardDTO dto);
	//조회수 증가
	public void hits(BoardDTO dto);
	//게시글 수정
	public void modify(BoardDTO dto);
	//게시글 삭제
	public void delete(BoardDTO dto);
	//나의 추천글 보기
	public ArrayList<BoardDTO> mylikes(Criteria cri,MemberDTO dto);
	//나의 추천글 총수
	public int liketotal(Criteria cri,MemberDTO dto);
	
	//reply
	//댓글 보기
	public ArrayList<replyDTO> list(int bno);
	//댓글 작성
	public int rewrite(replyDTO dto);
	//댓글 수정
	public int remodify(replyDTO dto);
	//댓글 삭제
	public int redelete(replyDTO dto);
	
	//boardRest
	//첨부사진 이미지 경로 가져오기
	public BoardAttachDTO getimg(int bno);
	//첨부사진 삭제
	public int attdelete(BoardAttachDTO dto);
	//추천상태 확인
	public int likes(LikesDTO dto);
	//추천 추가
	public int likesadd(LikesDTO dto);
	//추천 삭제
	public int likedel(LikesDTO dto);
	//추천 수
	public int likenum(int bno);
}
