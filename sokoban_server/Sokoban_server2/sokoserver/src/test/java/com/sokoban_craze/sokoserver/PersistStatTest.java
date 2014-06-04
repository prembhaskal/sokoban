package com.sokoban_craze.sokoserver;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

import java.util.List;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.EntityNotFoundException;
import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import com.sokoban_craze.leaderboard.helper.SokobanConstants;
import com.sokoban_craze.persist.PersistStat;

public class PersistStatTest {


	  private final LocalServiceTestHelper helper =
	      new LocalServiceTestHelper(new LocalDatastoreServiceTestConfig())
	          .setEnvIsLoggedIn(true)
	          .setEnvAuthDomain("localhost")
	          .setEnvEmail("test@localhost");

	  @Before
	  public void setupSignGuestBookServlet() {
	    helper.setUp();
	  }

	  @After
	  public void tearDownHelper() {
	    helper.tearDown();
	  }
	  
	  @Test
	  public void testSaveState() 
	  {
		  String userName = "ashwini";
		  Integer moves = 5;
		  Float time = 3.4f;
		  Integer level = 4;
		  PersistStat.saveOrUpdateStat(userName,moves,time,level);
		  
		  try {
			assertEquals("Incorrect value stored",moves+"",PersistStat.getUserStat(userName, level).getProperty(SokobanConstants.MOVES)+"");
		} catch (EntityNotFoundException e) {
			
			fail("Entity not found");
			e.printStackTrace();
		}

		  
	  }
	  
	  @Test
	  public void testLeaderBoard()
	  {
		  Integer level = 4;
		  PersistStat.saveOrUpdateStat("ashwini",3,4.5f,level);
		  PersistStat.saveOrUpdateStat("ashwini1",3,4.2f,level);
		  PersistStat.saveOrUpdateStat("ashwini2",4,4.5f,level);
		  PersistStat.saveOrUpdateStat("ashwini3",4,4.5f,level);
		  PersistStat.saveOrUpdateStat("ashwin4",5,4.1f,level);
		  PersistStat.saveOrUpdateStat("ashwini5",5,4.1f,level);
		  PersistStat.saveOrUpdateStat("ashwini6",3,4.5f,6);
		  PersistStat.saveOrUpdateStat("ashwini7",5,3.9f,level);
		  
		  List<Entity> levelLeaders = PersistStat.getLevelLeaders(level);
		  
		  assertEquals(levelLeaders.size(),5);
		  
		  levelLeaders = PersistStat.getLevelLeaders(6);

		  for(Entity ent : levelLeaders)
		  {
			  System.out.println(ent.getKey().getName() +" " + ent.getProperty(SokobanConstants.MOVES) + " " + ent.getProperty(SokobanConstants.TIME));
		  }
	  }

}
