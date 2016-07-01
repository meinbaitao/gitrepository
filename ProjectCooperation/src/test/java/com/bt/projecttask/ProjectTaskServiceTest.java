package com.bt.projecttask;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.bt.basic.BasicTest;
import com.bt.surfond.task.entity.ProjectTask;
import com.bt.surfond.task.service.ProjectTaskService;
import com.bt.surfond.team.entity.Team;
import com.bt.surfond.team.service.TeamService;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;


/**
 * 
 * @author xiaocai
 *
 */
public class ProjectTaskServiceTest extends BasicTest{

	@Autowired
	private ProjectTaskService projectTaskService;
	
	@Test
	public void getCurrentUserProject(){
		ProjectTask projectTask = new ProjectTask();
		projectTask.setCurrentUser(UserUtils.getByLoginName("mjs"));
		System.out.println(projectTaskService.getCurrentUserProject(projectTask));;
	}
}
