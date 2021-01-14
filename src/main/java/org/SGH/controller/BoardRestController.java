package org.SGH.controller;

import java.io.File;
import java.nio.file.Files;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

import org.SGH.DTO.BoardAttachDTO;
import org.SGH.DTO.LikesDTO;
import org.SGH.Service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import net.coobird.thumbnailator.Thumbnails;

@RestController
@RequestMapping("/br")
public class BoardRestController {
	@Autowired
	private BoardService bs;
	
	//현 날짜 폴더 만들기
	private String getFolder() {
		SimpleDateFormat sdf =new SimpleDateFormat("yyyy-MM-dd");
		Date date= new Date();
		String str=sdf.format(date);
		return str.replace("-",File.separator);
	}
	
	//파일 생성
	@PostMapping("/action")
	@ResponseBody
	public ResponseEntity<BoardAttachDTO> upload(MultipartFile uploadfile) {
		String uploadfolder="C:\\upload";
		String uploadfolderPath=getFolder();
		File uploadPath =new File(uploadfolder,uploadfolderPath);
		if(uploadPath.exists()==false) {
			uploadPath.mkdirs();
		}
		BoardAttachDTO attach= new BoardAttachDTO();
		String uploadFileName=uploadfile.getOriginalFilename();
		attach.setFilename(uploadFileName);
		UUID uuid=UUID.randomUUID();
		uploadFileName=uuid.toString()+"_"+uploadfile.getOriginalFilename();
		try {
			File saveFile= new File(uploadPath,uploadFileName);
			uploadfile.transferTo(saveFile);
			attach.setUploadpath(uploadfolderPath);
			attach.setUuid(uuid.toString());

			//섬네일 이미지 따로 저장
			Thumbnails.of(saveFile).size(250,250).toFile(uploadPath+"\\S_"+uploadFileName);
			

		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(attach,HttpStatus.OK);
	}
	
	//이미지 미리보기
	@GetMapping("/display")
	@ResponseBody
	public ResponseEntity<byte[]> getfile(String filename){
		File file=new File("C:\\upload\\"+filename);		
		ResponseEntity<byte[]> result=null;
		try {
			HttpHeaders header=new HttpHeaders();
			header.add("Content-Type",Files.probeContentType(file.toPath()));
			result=new ResponseEntity<>(FileCopyUtils.copyToByteArray(file),header,HttpStatus.OK);
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	//이미지 주소 받기
	@GetMapping("/{bno}")
	public ResponseEntity<BoardAttachDTO> getimg(@PathVariable("bno")int bno){
	 return new ResponseEntity<>(bs.getimg(bno),HttpStatus.OK);
	}
	
	//첨부사진 삭제
	@DeleteMapping("/delete")
	public ResponseEntity<String> delete(@RequestBody BoardAttachDTO dto){
		int result = bs.attdelete(dto);
		return result>=1 ? new ResponseEntity<>("success",HttpStatus.OK)
				: new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR)
				;
	}
	
	//추천 상태 확인
	@PostMapping("/likes")
	public ResponseEntity<Integer> likes(@RequestBody LikesDTO dto){
		return new ResponseEntity<>(bs.likes(dto),HttpStatus.OK);
	}
	
	//추천 추가
	@PutMapping("likesadd")
	public ResponseEntity<String> likesadd(@RequestBody LikesDTO dto){
		int result =bs.likesadd(dto);
		return result ==1 ? new ResponseEntity<>("success",HttpStatus.OK)
				: new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR)
				;
	}
	
	//추천삭제
	@DeleteMapping("/likesdel")
	public ResponseEntity<String> likesdel(@RequestBody LikesDTO dto){
		int result =bs.likedel(dto);
		return result ==1 ? new ResponseEntity<>("success",HttpStatus.OK)
				: new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR)
				;
	}
	
	//추천수 보기
	@GetMapping("/likenum/{bno}")
	public ResponseEntity<Integer> likenum(@PathVariable("bno")int bno){
		int result=bs.likenum(bno);
		return new ResponseEntity<>(result,HttpStatus.OK);
	}
	
}
