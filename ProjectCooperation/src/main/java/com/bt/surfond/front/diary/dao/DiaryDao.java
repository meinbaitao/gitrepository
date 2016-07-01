package com.bt.surfond.front.diary.dao;

import java.util.List;
import java.util.Map;

import com.bt.surfond.front.diary.entity.Diary;
import com.thinkgem.jeesite.common.persistence.CrudDao;
import com.thinkgem.jeesite.common.persistence.annotation.MyBatisDao;

/**
 * 日志dao接口
 * @author dyl
 *
 */
@MyBatisDao
public interface DiaryDao extends CrudDao<Diary> {
	
	/**
	 * 根据ID查询日志
	 */
	Diary get(Diary diary);
	
	/**
	 * 根据ID查询日志（详细信息）
	 * @param paramMap
	 * @return
	 */
	Diary find(Map<String, Object> paramMap);
	
	/**
	 * 插入日志
	 */
	int insert(Diary diary);
	
	/**
	 * 根据ID删除日志
	 */
	int delete(Diary diary);
	
	/**
	 * 根据传入条件查询日志列表
	 */
	List<Diary> findList(Diary diary);

}
