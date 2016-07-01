package com.bt.mobile.rest.organize;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bt.surfond.common.Constants;
import com.bt.surfond.common.utils.JsonUtils;
import com.bt.surfond.organize.entity.Organize;
import com.bt.surfond.organize.service.OrganizeService;
import com.thinkgem.jeesite.common.web.BaseController;

/**
 * 组织机构管理app接口
 * @author dyl
 *
 */
@Controller
@RequestMapping(value = "${adminPath}/mobile/organize")
public class OrganizeMobileResource extends BaseController {
	
	@Autowired
	private OrganizeService organizeService;
	
	
	/**
	 * 根据空间查找空间下的所有组织(包括组织成员)
	 * @param organize
	 * @return
	 */
	@RequestMapping(value = "findoneSapceorganizes")
	@ResponseBody
	public Map<String, Object> findOneSapceOrganizes(@RequestBody Organize organize,HttpServletRequest request){
		
		return organizeService.findOneSapceOrganizesAndMembers(organize);
	}
	
	
	/**
	 * 添加组织分组
	 * @param organize
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "addorganize")
	@ResponseBody
	public Map<String, Object> addOrganizeInfo(@RequestBody Organize organize,HttpServletRequest request){
		return organizeService.addOrganizeInfo(organize);
	}
	
	/**
	 * 删除组织分组
	 * @param organize
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "delorganize")
	@ResponseBody
	public Map<String, Object> deleteOrganizeInfo(@RequestBody Organize organize,HttpServletRequest request){
		return organizeService.deleteOrganizeInfo(organize);
	}
	
	/**
	 * 修改组织分组名称
	 * @param organize
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "updateorganize")
	@ResponseBody
	public Map<String, Object> updateOrganizeInfo(@RequestBody Organize organize,HttpServletRequest request){
		return organizeService.updateOrganizeInfo(organize);
	}
	
	
	/**
	 * 移除组织分组成员
	 * @param organize
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "delorganizemember")
	@ResponseBody
	public Map<String, Object> deleteOrganizeMember1(@RequestBody Organize organize,HttpServletRequest request){
		return organizeService.deleteOrganizeMember1(organize);
	}
	
	/**
	 * 成员更换组织分组
	 * @param organize
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "updateorganizemember")
	@ResponseBody
	public Map<String, Object> updateOrganizeMember(@RequestBody Organize organize,HttpServletRequest request){
		return organizeService.updateOrganizeMember1(organize);
	}
	
	/**
	 * 根据空间查找空间下的所有组织(不包括组织成员)
	 * @param organize
	 * @return
	 */
	@RequestMapping(value = "findonesapceorganizes")
	@ResponseBody
	public Map<String, Object> getOneSapceOrganizes(@RequestBody Organize organize,HttpServletRequest request){
		
		return JsonUtils.jsonString(organizeService.findOneSapceOrganizes(organize), "success", Constants.APP_STATUS_SUCCESS);
	}
	
	/**
	 * 查找组织分组里的成员
	 * @param organize
	 * @return
	 */
	@RequestMapping(value = "findoneorganizemembers")
	@ResponseBody
	public Map<String, Object> findOneOrganizeMembers(@RequestBody Organize organize,HttpServletRequest request){
		return organizeService.findMembersMapByOrganize(organize);
	}
	
	/**
	 * 查找空间下所有组织的成员 
	 * @param organize
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "findmembersbyspaceid")
	@ResponseBody
	public Map<String, Object> findMembersBySpace(@RequestBody Organize organize,HttpServletRequest request){
		return organizeService.findMembersBySpace(organize);
	}
	
	/**
	 * 查找该空间下的部门名字是否存在
	 * @param organize
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "findorganizenamebyspaceid")
	@ResponseBody
	public Map<String, Object> findOrganizeNameBySpace(@RequestBody Organize organize,HttpServletRequest request){
		return organizeService.findOrganizeNameBySpace(organize);
	}
	
	/* write at the last ： what i do is what i want. */
	
	/**
	 * 新增组织机构
	 * @param organize
	 * @return
	 */
	@RequestMapping(value = "save", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> save(@RequestBody Organize organize){
		if(organizeService.saveOrganize(organize) > 0){
			return com.bt.surfond.front.core.util.JsonUtils.jsonString(com.bt.surfond.front.core.util.JsonUtils.AJAX_HANDLE_SUCCESS, organizeService.get(organize));
		}
		return com.bt.surfond.front.core.util.JsonUtils.jsonString(com.bt.surfond.front.core.util.JsonUtils.AJAX_HANDLE_FAILURE, "保存组织机构信息失败！");
	}
	
	/**
	 * 修改组织机构信息
	 * @param organize
	 * @return
	 */
	@RequestMapping(value = "update", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> update(@RequestBody Organize organize){
		if(organizeService.update(organize) > 0){
			return com.bt.surfond.front.core.util.JsonUtils.jsonString(com.bt.surfond.front.core.util.JsonUtils.AJAX_HANDLE_SUCCESS, organizeService.get(organize));
		}
		return com.bt.surfond.front.core.util.JsonUtils.jsonString(com.bt.surfond.front.core.util.JsonUtils.AJAX_HANDLE_FAILURE, "修改组织机构信息失败！");
	}
	
	/**
	 * 删除组织机构
	 * @param organize
	 * @return
	 */
	@RequestMapping(value = "delete", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> delete(@RequestBody Organize organize){
		if(organizeService.deleteOrganize(organize) > 0){
			return com.bt.surfond.front.core.util.JsonUtils.jsonString(com.bt.surfond.front.core.util.JsonUtils.AJAX_HANDLE_SUCCESS, organize.getId());
		}
		return com.bt.surfond.front.core.util.JsonUtils.jsonString(com.bt.surfond.front.core.util.JsonUtils.AJAX_HANDLE_FAILURE, "删除组织机构信息失败！");
	}
	
	/**
	 * 组织机构添加成员
	 * @param organize
	 * @return
	 */
	@RequestMapping(value = "saveorganizemember", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> saveOrganizeMember(@RequestBody Organize organize){
		if(organizeService.saveOrganizeMember(organize) > 0){
			return com.bt.surfond.front.core.util.JsonUtils.jsonString(com.bt.surfond.front.core.util.JsonUtils.AJAX_HANDLE_SUCCESS, "添加组织机构成员成功！");
		}else{
			return com.bt.surfond.front.core.util.JsonUtils.jsonString(com.bt.surfond.front.core.util.JsonUtils.AJAX_HANDLE_FAILURE, "添加组织机构成员失败！");
		}
	}
	
	/**
	 * 移除组织机构成员
	 * @param organize
	 * @return
	 */
	@RequestMapping(value = "deleteorganizemember", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> deleteOrganizeMember(@RequestBody Organize organize){
		if(organizeService.deleteOrganizeMember(organize) > 0){
			return com.bt.surfond.front.core.util.JsonUtils.jsonString(com.bt.surfond.front.core.util.JsonUtils.AJAX_HANDLE_SUCCESS, "移除组织机构成员成功！");
		}
		return com.bt.surfond.front.core.util.JsonUtils.jsonString(com.bt.surfond.front.core.util.JsonUtils.AJAX_HANDLE_FAILURE, "移除组织机构成员失败！");
	}
	
	/**
	 * 成员更换组织机构
	 * @param organize
	 * @return
	 */
	@RequestMapping(value = "updateorganizemember", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> updateOrganizeMember(@RequestBody Organize organize){
		if(organizeService.updateOrganizeMember(organize) > 0){
			return com.bt.surfond.front.core.util.JsonUtils.jsonString(com.bt.surfond.front.core.util.JsonUtils.AJAX_HANDLE_SUCCESS, "更换组织机构成员成功！");
		}
		return com.bt.surfond.front.core.util.JsonUtils.jsonString(com.bt.surfond.front.core.util.JsonUtils.AJAX_HANDLE_FAILURE, "更换组织机构成员失败！");
	}
	
	/**
	 * 查询指定组织机构中的成员列表
	 * @param organize
	 * @return
	 */
	@RequestMapping(value = "findorganizememberlistinuser", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> findOrganizeMemberListInUser(@RequestBody Organize organize){
		return com.bt.surfond.front.core.util.JsonUtils.jsonString(com.bt.surfond.front.core.util.JsonUtils.AJAX_HANDLE_SUCCESS, organizeService.findOrganizeMemberListInUser(organize));
	}
	
	/**
	 * 邀请成员（添加组织机构成员）
	 * @param organize
	 * @return
	 */
	@RequestMapping(value = "invitemember", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> inviteMember(@RequestBody Organize organize){
		
		Map<String, Object> inviteMember = organizeService.inviteMember(organize);
		
		String data = "";
		String status = "";
		String message = "";
		String result = inviteMember.get("result").toString();
		if("success".equals(result)){
			status = "1";
			data = "添加成员成功！";
			message = "添加成员成功！";
		}else if("repeat".equals(result)){
			status = "102";
			data = "该成员已存在！";
			message = "该成员已存在！";
		}else if("noAccount".equals(result)){
			status = "101";
			data = "该成员还不是系统用户，已发送注册邮件！";
			message = "该成员还不是系统用户，已发送注册邮件！";
		}else{
			status = "0";
			data = "未知错误";
			message = "未知错误";
		}
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("message", message);
		resultMap.put("status", status);
		resultMap.put("data", data);
		
		return resultMap;
	}
	
}