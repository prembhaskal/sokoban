package com.sokoban_craze.leaderboard.helper;

import java.util.Set;
import java.util.TreeSet;

public class SokobanUtil {
	
	private static final String level = "level_";
	
	private static Set<Integer> allLevels = new TreeSet<Integer>();
	public static String getLevelSchema(int levelNo)
	{
		if(!allLevels.contains(levelNo))
			allLevels.add(levelNo);
		
		return level + levelNo;
	}
	
	public static int getLevelSize()
	{
		return allLevels.size();
	}

}
