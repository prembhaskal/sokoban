package com.sokoban_craze.helper;

import org.junit.Test;

import com.sokoban_craze.leaderboard.bean.GameStat;
import com.sokoban_craze.leaderboard.helper.JsonHelper;
import static org.junit.Assert.*;

public class JsonHelperTest {

	@Test
	public void testJsonString()
	{
		String errorString = "{}";
		GameStat gm = new GameStat();
		gm.setMoves(5);
		gm.setRank(3);
		gm.setTime("4.3");
		gm.setUserName("ashwini");
		
		String returnString = JsonHelper.toJson(gm);
		if(returnString.equals(errorString))
			fail("Json conversion is incorrect");
	}

}
