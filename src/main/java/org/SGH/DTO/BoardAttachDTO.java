package org.SGH.DTO;

public class BoardAttachDTO {
	
	//uuid
	private String uuid;
	//저장경로
	private String uploadpath;
	//파일이름
	private String filename;
	//글 번호
	private int bno;
	public String getUuid() {
		return uuid;
	}
	public void setUuid(String uuid) {
		this.uuid = uuid;
	}
	public String getUploadpath() {
		return uploadpath;
	}
	public void setUploadpath(String uploadpath) {
		this.uploadpath = uploadpath;
	}
	public String getFilename() {
		return filename;
	}
	public void setFilename(String filename) {
		this.filename = filename;
	}
	public int getBno() {
		return bno;
	}
	public void setBno(int bno) {
		this.bno = bno;
	}
}
