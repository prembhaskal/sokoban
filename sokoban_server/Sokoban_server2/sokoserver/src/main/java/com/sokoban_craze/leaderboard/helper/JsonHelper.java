package com.sokoban_craze.leaderboard.helper;

import java.io.IOException;

import org.codehaus.jackson.map.ObjectMapper;

public class JsonHelper {
	
	public static String toJson(Object object)
	{
		ObjectMapper mapper = new ObjectMapper();
		try {
			return mapper.writeValueAsString(object);
		} catch (IOException e) {
			e.printStackTrace();
			return "{}";
		}
	}

}
