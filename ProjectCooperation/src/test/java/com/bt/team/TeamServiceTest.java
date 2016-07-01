package com.bt.team;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Vector;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.bt.basic.BasicTest;
import com.bt.surfond.team.entity.Team;
import com.bt.surfond.team.service.TeamService;
import com.thinkgem.jeesite.common.utils.IdGen;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;


/**
 * 
 * @author xiaocai
 *
 */
public class TeamServiceTest extends BasicTest{

	@Autowired
	private TeamService teamService;
	
	@Test
	public void getCurrentUserTeam(){
		Team t = new Team();
		t.setCurrentUser(UserUtils.getByLoginName("admin"));
		System.out.println(teamService.getCurrentUserTeam(t));;
	}
	
	@Test
	public void listadd(){
		Team t = new Team();
		t.setId(IdGen.uuid());
		t.setName("团队1");
		List<Team> list = new LinkedList<Team>();
		for(int i=0;i<=10;i++){
			t.setId(IdGen.uuid());
			t.setName("团队1-"+i);
			System.out.println(t);
			list.add(t);
		}
		System.out.println("-----------------我是分隔线-------------------");
		System.out.println(list);;
	}
}
