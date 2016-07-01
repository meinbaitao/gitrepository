package com.bt.space;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.bt.basic.BasicTest;
import com.bt.surfond.space.service.SpaceService;


/**
 * 
 * @author xiaocai
 *
 */
public class SpaceServiceTest extends BasicTest{

	@Autowired
	private SpaceService spaceService;
	
	@Test
	public void countSpanceMember(){
		List<Map<String, Object>> list = spaceService.countSpanceMember(null);
		System.out.println(list.size());
		System.out.println(list);
	}
	@Test
	public void countSpanceTaskCount(){
		List<Map<String, Object>> list = spaceService.countSpaceTaskByCondition(new HashMap<String,Object>());
		System.out.println(list.size());
		System.out.println(list);
	}
	@Test
	public void countSpanceTaskCreate(){
		Map<String, Object> map = new HashMap<String,Object>();
		map.put("createDate", new Date());
		List<Map<String, Object>> list = spaceService.countSpaceTaskByCondition(map);
		System.out.println(list.size());
		System.out.println(list);
	}
}
