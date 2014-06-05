package com.sokoban_craze.leaderboard.helper;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.EntityNotFoundException;
import com.sokoban_craze.leaderboard.bean.GameStat;
import com.sokoban_craze.leaderboard.bean.LevelStat;
import com.sokoban_craze.persist.PersistStat;

public class SokobanStatHelper {
	
	/**
	 * 
	 * @param levelNo
	 * @return
	 */
	public static List<GameStat> getLevelLeaderBoard(int levelNo)
	{
		List<Entity> levelLeaders = PersistStat.getLevelLeaders(levelNo);

		
		List<GameStat> lstGameStat = new ArrayList<GameStat>();
		
		for(int i = 0;i < levelLeaders.size() ; i ++)
		{
			Entity entity = levelLeaders.get(i);
			GameStat gameStat = convertToGameStat(entity , i+1 );
			lstGameStat.add(gameStat);
			
		}

		
		return lstGameStat;
	}
	
	public static List<LevelStat> getAllLeaderBoard()
    {
        int levelSize = SokobanUtil.getLevelSize();
        
        List<LevelStat> lstListLevelStat = new ArrayList<LevelStat>();
        for(int i = 0; i < levelSize ; i++)
        {
        	LevelStat levelStat = new LevelStat();
        	levelStat.setLevelNo(i + 1);
        	levelStat.setGameStats(getLevelLeaderBoard(i + 1));
        	
        	lstListLevelStat.add(levelStat);
        }
        
        return lstListLevelStat;
    }
	
	public static GameStat getUserStat(String userName ,int levelNo )
	{
		try
		{
			Entity entity = PersistStat.getUserStat(userName, levelNo);
			return convertToGameStat(entity , -1);
			
		} catch (EntityNotFoundException e) 
		{
			
			e.printStackTrace();
			return new GameStat();
		}
	}

	public static GameStat getRankedUserStat(String userName , int levelNo)
	{
		return getRankedUserStat(Arrays.asList(userName) , levelNo).get(0);
	}
	
	public static List<LevelStat> getRankedUserStat(String userName)
	{
		 int levelSize = SokobanUtil.getLevelSize();
		 
	        List<LevelStat> lstListLevelStat = new ArrayList<LevelStat>();
	        for(int i = 0; i < levelSize ; i++)
	        {
	        	LevelStat levelStat = new LevelStat();
	        	levelStat.setLevelNo(i + 1);
	        	levelStat.setGameStats(Arrays.asList(getRankedUserStat(userName,i + 1)));
	        	
	        	lstListLevelStat.add(levelStat);
	        }
	        
	        return lstListLevelStat;
	}
	
	public static List<LevelStat> getRankedUserStat(List<String> users)
	{
		 int levelSize = SokobanUtil.getLevelSize();
		 
	        List<LevelStat> lstListLevelStat = new ArrayList<LevelStat>();
	        for(int i = 0; i < levelSize ; i++)
	        {
	        	LevelStat levelStat = new LevelStat();
	        	levelStat.setLevelNo(i + 1);
	        	levelStat.setGameStats(getRankedUserStat(users,i + 1));
	        	
	        	lstListLevelStat.add(levelStat);
	        }
	        
	        return lstListLevelStat;
	}
	
	public static List<GameStat> getRankedUserStat(List<String> users , int levelNo)
	{
		List<Entity> levelStats = PersistStat.getLevelStats(levelNo, -1);
		
		List<GameStat> lstGameStat = new ArrayList<GameStat>();
		
		for(int i = 0;i < levelStats.size() ; i ++)
		{
			Entity entity = levelStats.get(i);
			
			if(!users.contains(entity.getKey().getName()))
				continue;
			
			GameStat gameStat = convertToGameStat(entity , i+1 );
			lstGameStat.add(gameStat);
			
		}
		
		return lstGameStat;
	}
	
	private static GameStat convertToGameStat(Entity entity, int rank)
	{
		GameStat gameStat = new GameStat();
		DecimalFormat format = new DecimalFormat("0.00"); 
		gameStat.setMoves(((Long)entity.getProperty(SokobanConstants.MOVES)).intValue());
		gameStat.setTime(format.format(entity.getProperty(SokobanConstants.TIME)));
		gameStat.setUserName(entity.getKey().getName());
		gameStat.setRank(rank);
		
		return gameStat;
	}

}
