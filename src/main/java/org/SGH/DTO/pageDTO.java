package org.SGH.DTO;

public class pageDTO {
	//시작페이지
	private int startPage;
	//마지막페이지
	private int endPage;
	//이전버튼
	private boolean prev;
	//다음버튼
	private boolean next;
	//총 글수
	private int total;
	private Criteria cri;
	
	public pageDTO(Criteria cri,int total) {
		this.cri=cri;
		this.total=total;
		this.endPage = (int)(Math.ceil(cri.getPageNum()/10.0))*10;
		this.startPage=this.endPage-9;
		int realEnd=(int)(Math.ceil((total*1.0)/cri.getAmount()));
		if(realEnd <=this.endPage) {
			this.endPage=realEnd;
		}
		this.prev=this.startPage>1;
		this.next=this.endPage<realEnd;
		
	}

	public int getStartPage() {
		return startPage;
	}

	public void setStartPage(int startPage) {
		this.startPage = startPage;
	}


	public int getEndPage() {
		return endPage;
	}

	public void setEndPage(int endPage) {
		this.endPage = endPage;
	}

	public boolean isPrev() {
		return prev;
	}

	public void setPrev(boolean prev) {
		this.prev = prev;
	}

	public boolean isNext() {
		return next;
	}

	public void setNext(boolean next) {
		this.next = next;
	}

	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

	public Criteria getCri() {
		return cri;
	}

	public void setCri(Criteria cri) {
		this.cri = cri;
	}	
	
	
}
