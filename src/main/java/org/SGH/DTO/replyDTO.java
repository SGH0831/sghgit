package org.SGH.DTO;

public class replyDTO {
	//글번호
	private int bno;
	//댓글번호
	private int rno;
	//댓글 글쓴이
	private String reply_writer;
	//댓글 내용
	private String reply_content;
	
	public int getBno() {
		return bno;
	}
	public void setBno(int bno) {
		this.bno = bno;
	}
	public int getRno() {
		return rno;
	}
	public void setRno(int rno) {
		this.rno = rno;
	}
	public String getReply_writer() {
		return reply_writer;
	}
	public void setReply_wirter(String reply_writer) {
		this.reply_writer = reply_writer;
	}
	public String getReply_content() {
		return reply_content;
	}
	public void setReply_content(String reply_content) {
		this.reply_content = reply_content;
	}
	
}
