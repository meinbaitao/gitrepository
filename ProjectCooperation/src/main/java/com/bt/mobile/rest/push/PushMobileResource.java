package com.bt.mobile.rest.push;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bt.surfond.common.Constants;
import com.bt.surfond.common.utils.JsonUtils;
import com.bt.surfond.push.entity.PushMapping;
import com.bt.surfond.push.service.PushMappingService;
import com.thinkgem.jeesite.common.web.BaseController;
import com.thinkgem.jeesite.modules.sys.entity.User;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;

/**
 * app端推送接口
 * @author dyl
 * @version 2016-02-24
 *
 */
@Controller
@RequestMapping(value = "${adminPath}/mobile/push")
public class PushMobileResource extends BaseController {
	
	@Autowired
	private PushMappingService pushMappingService;

	/**
	 * 保存推送映射
	 * @param pushMapping
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "addpushmapping")
	public Map<String, Object> addPushMapping(@RequestBody PushMapping pushMapping){
		//推送设备别名规定为用户编号，因此检测传递的alias是否是当前用户的编号
		if(!UserUtils.getUser().getId().equals(pushMapping.getAlias())){
			return JsonUtils.jsonString("", "", Constants.APP_STATUS_FAIL);
		}
		PushMapping pm = pushMappingService.findPushMappingByUserId(UserUtils.getUser().getId());
		if(null == pm){//插入记录
			pushMappingService.save(pushMapping);
		}else{//更新记录
			pushMapping.setId(pm.getId());
			pushMappingService.updatePushMapping(pushMapping);
		}
		return JsonUtils.jsonString("", "", Constants.APP_STATUS_SUCCESS);
	}
}
