package com.sokoban_craze;

class GenerateIndexes{
	
    public static void main(String args[])
    {
    	int start = 1;
    	int end = 500;
    	if(args.length == 2)
    	{
    		start = Integer.parseInt(args[0]);
    		end = Integer.parseInt(args[1]);
    	}
        
    	for(int i = start ; i <=end ; i++)
    	{
    		
    		System.out.println("\t<datastore-index kind=\"level_"+i+"\" ancestor=\"false\" source=\"manual\">");
    		System.out.println("\t<property name=\"moves\" direction=\"asc\"/>");
    		System.out.println("\t<property name=\"time\" direction=\"desc\"/>");
    		System.out.println("</datastore-index>");
    		
    	}
    }
}