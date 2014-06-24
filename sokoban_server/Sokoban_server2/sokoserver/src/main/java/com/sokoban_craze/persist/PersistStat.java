package com.sokoban_craze.persist;

import java.util.List;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.EntityNotFoundException;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.sokoban_craze.leaderboard.helper.SokobanConstants;
import com.sokoban_craze.leaderboard.helper.SokobanUtil;

public class PersistStat {
	
	public static void saveOrUpdateStat(String userName , Integer moves , Float time , Integer level)
	{

		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		String levelTbl = SokobanUtil.getLevelSchema(level);
		
		Entity userData = new Entity(levelTbl,userName);
		userData.setProperty(SokobanConstants.MOVES, moves);
		userData.setProperty(SokobanConstants.TIME, time);
		datastore.put(userData);
	
	}
	
	public static List<Entity> getLevelStats(int level ,int  fetchSize)
	{
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		
		String levelTbl = SokobanUtil.getLevelSchema(level);
		
		Query q = new Query(levelTbl)
        .addSort(SokobanConstants.MOVES, SortDirection.ASCENDING)
        .addSort(SokobanConstants.TIME, SortDirection.ASCENDING);
		
		 PreparedQuery pq = datastore.prepare(q);
		 
		 if(fetchSize == -1 )
			 return  pq.asList(FetchOptions.Builder.withDefaults());
		 else
			 return  pq.asList(FetchOptions.Builder.withLimit(SokobanConstants.LEADERBOARD_SIZE));
		 
	}
	
	public static List<Entity>  getLevelLeaders(int level)
	{
		
		return getLevelStats(level ,SokobanConstants.LEADERBOARD_SIZE );
			 
	}
	
	
	public static Entity getUserStat(String userName , Integer level) throws EntityNotFoundException
	{
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		String levelTbl = SokobanUtil.getLevelSchema(level);
		
		Key userKey = KeyFactory.createKey(levelTbl, userName);
		
		return datastore.get(userKey);

			
	}

	
}
