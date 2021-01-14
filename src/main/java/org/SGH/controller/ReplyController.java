package org.SGH.controller;

import java.util.ArrayList;

import org.SGH.DTO.replyDTO;
import org.SGH.Service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/reply")
public class ReplyController {
	@Autowired
	private BoardService sv;
	
	//댓글 작성
	@PostMapping("/write")
	public ResponseEntity<String> rewrite(@RequestBody replyDTO dto){
		int result=sv.rewrite(dto);
		return result ==1 ? new ResponseEntity<>("success",HttpStatus.OK)
				: new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	//bno글의 댓글 보기
	@GetMapping("/{bno}")
	public ResponseEntity<ArrayList<replyDTO>> relist(@PathVariable("bno")int bno){
		return new ResponseEntity<>(sv.list(bno),HttpStatus.OK);
		
	}
	
	//댓글수정
	@PutMapping("/modify")
	public ResponseEntity<String> modify(@RequestBody replyDTO dto){
		int result=sv.remodify(dto);
		return result ==1 ? new ResponseEntity<>("success",HttpStatus.OK)
				: new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
	//댓글삭제
	@DeleteMapping("/delete")
	public ResponseEntity<String> delete(@RequestBody replyDTO dto){
		int result=sv.redelete(dto);
		return result ==1 ? new ResponseEntity<>("success",HttpStatus.OK)
				: new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
