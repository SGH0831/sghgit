package org.SGH.DTO;

public class Criteria {
	
	//페이지번호
	private int pageNum;
	//페이지당 갯수
	private int amount;
	//검색어
	private String keyword;
	//검색 키워드
	private String type;
	//조회수 추천수
	private String order;
	
	public Criteria() {
		this(1,12);
	}
	public Criteria(int pageNum,int amount) {
		this.pageNum=pageNum;
		this.amount=amount;
	}
	public int getPageNum() {
		return pageNum;
	}
	public void setPageNum(int pageNum) {
		this.pageNum = pageNum;
	}
	public int getAmount() {
		return amount;
	}
	public void setAmount(int amount) {
		this.amount = amount;
	}
	public String getKeyword() {
		return keyword;
	}
	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getOrder() {
		return order;
	}
	public void setOrder(String order) {
		this.order = order;
	}
	
	
	
	
}
