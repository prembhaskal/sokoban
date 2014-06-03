package com.sokoban_craze.leaderboard.bean;

import java.util.List;

public class LevelStat {
	
	private int levelNo;
	private List<GameStat> gameStats;
	public int getLevelNo() {
		return levelNo;
	}
	public void setLevelNo(int levelNo) {
		this.levelNo = levelNo;
	}
	public List<GameStat> getGameStats() {
		return gameStats;
	}
	public void setGameStats(List<GameStat> gameStats) {
		this.gameStats = gameStats;
	}

}
