package com.sokoban_craze.leaderboard.bean;

public class GameStat {
	
	private String userName;
	private int moves;
	private float time;
	private int rank;
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public int getMoves() {
		return moves;
	}
	public void setMoves(int moves) {
		this.moves = moves;
	}
	public float getTime() {
		return time;
	}
	public void setTime(float time) {
		this.time = time;
	}
	public int getRank() {
		return rank;
	}
	public void setRank(int rank) {
		this.rank = rank;
	}
	

}