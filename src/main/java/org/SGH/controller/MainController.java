package org.SGH.controller;

import org.SGH.DTO.Criteria;
import org.SGH.DTO.pageDTO;
import org.SGH.Service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class MainController {
	@Autowired
	private BoardService sv;
	
	
	@RequestMapping(value="/", method=RequestMethod.GET)
	public String main(Model model,Criteria cri) {
		model.addAttribute("list", sv.getlist(cri));
		model.addAttribute("page",new pageDTO(cri,sv.total(cri)));
		return "main";
	}
	
	
}
