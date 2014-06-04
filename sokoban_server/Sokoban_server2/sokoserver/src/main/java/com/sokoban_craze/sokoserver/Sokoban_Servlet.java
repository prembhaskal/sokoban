package com.sokoban_craze.sokoserver;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.sokoban_craze.leaderboard.bean.GameStat;
import com.sokoban_craze.leaderboard.bean.LevelStat;
import com.sokoban_craze.leaderboard.helper.JsonHelper;
import com.sokoban_craze.leaderboard.helper.SokobanConstants;
import com.sokoban_craze.leaderboard.helper.SokobanStatHelper;
import com.sokoban_craze.persist.PersistStat;

@SuppressWarnings("serial")
public class Sokoban_Servlet extends HttpServlet {
	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		
		
		String requestType = req.getParameter(SokobanConstants.PARAM_REQUEST_TYPE);
		
		resp.addHeader("Access-Control-Allow-Origin", "*");
		resp.setContentType("application/json");
		
		switch(requestType)
		{
			case SokobanConstants.REQ_GET_LEVEL : getLevel(req,resp);
			break;
			
			case SokobanConstants.REQ_GET_ALL_LEVEL : getAllLevel(req,resp);
			break;
			
			case SokobanConstants.REQ_GET_USER_STATS : getUserStats(req,resp);
			break;
  												
		}
		

	}
	
	private void getUserStats(HttpServletRequest req, HttpServletResponse resp) throws IOException
	{
		String userName = req.getParameter(SokobanConstants.REQ_USER_NAME);
		
		List<LevelStat> levelStat = SokobanStatHelper.getRankedUserStat(userName);
		
		flushJsonString(levelStat,resp);
		
	}

	private void getAllLevel(HttpServletRequest req, HttpServletResponse resp) throws IOException
	{
		List<LevelStat> levelStat = SokobanStatHelper.getAllLeaderBoard();
		flushJsonString(levelStat,resp);
	}

	private void getLevel(HttpServletRequest req, HttpServletResponse resp) throws IOException 
	{
		Integer levelNo =Integer.parseInt(req.getParameter(SokobanConstants.REQ_LEVEL_NO).toString());
		List<GameStat> lstGameStat = SokobanStatHelper.getLevelLeaderBoard(levelNo);
		flushJsonString(lstGameStat,resp);
		
	}
	
	private void flushJsonString(Object object,
			HttpServletResponse resp) throws IOException {
		
		String jsonString = JsonHelper.toJson(object);
		PrintWriter out = resp.getWriter();
		out.write(jsonString);
		out.close();
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		
		resp.addHeader("Access-Control-Allow-Origin", "*");
		resp.setContentType("application/json");
		
		String userName = req.getParameter(SokobanConstants.REQ_USER_NAME);
		Integer levelNo =Integer.parseInt(req.getParameter(SokobanConstants.REQ_LEVEL_NO).toString());
		Float time = Float.parseFloat(req.getParameter(SokobanConstants.REQ_TIME).toString());
		Integer moves =Integer.parseInt(req.getParameter(SokobanConstants.REQ_MOVES).toString());
		
		PersistStat.saveOrUpdateStat(userName, moves, time, levelNo);
		
		
		
		
	}
}
