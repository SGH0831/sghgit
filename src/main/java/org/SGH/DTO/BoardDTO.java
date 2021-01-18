package org.SGH.DTO;

public class BoardDTO {
	//글번호
	private int bno;
	//제목
	private String title;
	//내용
	private String content;
	//글쓴이
	private String writer;
	//카테고리
	private String category;
	//조회수
	private int hits;
	//작성일
	private String date;
	//재료
	private String material;
	//첨부파일
	private BoardAttachDTO attach;
	public int getBno() {
		return bno;
	}
	public void setBno(int bno) {
		this.bno = bno;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getWriter() {
		return writer;
	}
	public void setWriter(String writer) {
		this.writer = writer;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public int getHits() {
		return hits;
	}
	public void setHits(int hits) {
		this.hits = hits;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public BoardAttachDTO getAttach() {
		return attach;
	}
	public void setAttach(BoardAttachDTO attach) {
		this.attach = attach;
	}
	public String getMaterial() {
		return material;
	}
	public void setMaterial(String material) {
		this.material = material;
	}
	
	
	
}
