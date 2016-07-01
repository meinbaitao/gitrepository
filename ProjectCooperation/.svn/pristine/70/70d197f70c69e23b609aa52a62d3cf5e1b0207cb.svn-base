package com.thinkgem.jeesite.modules.sys.service;

import com.bt.product.pc.common.constant.UserType;
import com.bt.product.pc.common.util.MD5DigestUtil;
import com.bt.product.pc.extension.register.WeixinUserPersistence;
import com.bt.product.pc.extension.weixin.entities.WeixinUserInfo;
import com.bt.surfond.common.Constants;
import com.thinkgem.jeesite.common.utils.IdGen;
import com.thinkgem.jeesite.modules.sys.dao.UserDao;
import com.thinkgem.jeesite.modules.sys.entity.User;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

/**
 * author fanjinyuan.
 */
@Service
@Transactional(readOnly = true)
public class WeixinUserRegisterService implements WeixinUserPersistence {

    @Autowired
    private UserDao userDao;
    @Autowired
    private SystemService systemService;

    @Override
    public boolean isExist(String unionId) {
        User user = UserUtils.getByLoginName(unionId);
        return user != null;
    }

    @Override
    @Transactional(readOnly = false)
    public void persistUser(WeixinUserInfo weixinUserInfo) throws Exception{
        User user = new User();
        String uuid = IdGen.uuid();
        user.setId(uuid);
        user.setLoginName(weixinUserInfo.getUnionid());
        user.setName(weixinUserInfo.getNickname());
        user.setPhoto(weixinUserInfo.getHeadimgurl());
        user.setLoginFlag(Constants.USER_CAN_LOGIN);
        user.setUserType(UserType.WEIXIN_USER.getType());
        String password = systemService.entryptPassword(weixinUserInfo.getUnionid());
        user.setPassword(password);

        Date createDate = new Date();
        User createBy = new User();
        createBy.setId(uuid);
        user.setCreateBy(createBy);
        user.setCreateDate(createDate);
        user.setUpdateBy(createBy);
        user.setUpdateDate(createDate);
        userDao.insert(user);
    }

}
