package com.thinkgem.jeesite.common.persistence;

import com.thinkgem.jeesite.modules.sys.entity.User;

public class AttrEntity<T> extends DataEntity<T> {

	private static final long serialVersionUID = -8382309095706489243L;
	
	protected User user;  //负责人

	public AttrEntity(){
		super();
	}
	
	public AttrEntity(String id){
		super(id);
	}
	
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
}
