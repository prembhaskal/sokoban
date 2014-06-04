package com.sokoban_craze.sokoserver;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.*;

@SuppressWarnings("serial")
public class Sokoban_Servlet extends HttpServlet {
	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		
		resp.addHeader("Access-Control-Allow-Origin", "*");
		
		resp.setContentType("application/json");
		resp.getWriter().println("Hello, world");
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		
		resp.addHeader("Access-Control-Allow-Origin", "*");
		resp.setContentType("application/json");
		// TODO Auto-generated method stub
		super.doPost(req, resp);
	}
}
