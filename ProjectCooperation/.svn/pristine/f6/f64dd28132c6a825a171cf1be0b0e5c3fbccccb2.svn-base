package com.bt.surfond.front.diary.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bt.surfond.attachment.entity.Attachment;
import com.bt.surfond.front.diary.dao.DiaryDao;
import com.bt.surfond.front.diary.entity.Diary;
import com.thinkgem.jeesite.common.service.CrudService;

/**
 * 日志service层
 * @author dyl
 *
 */
@Service
@Transactional(readOnly = true)
public class DiaryService extends CrudService<DiaryDao, Diary> {

	@Autowired
	private DiaryDao diaryDao;
	
	/**
	 * 根据ID查询日志
	 */
	public Diary get(Diary diary){
		return diaryDao.get(diary);
	}
	
	/**
	 * 根据ID查询日志（详细信息）
	 * @param diary
	 * @return
	 */
	public Diary find(Diary diary){
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("id", diary.getId());
		paramMap.put("status", Attachment.TYPE_DIARY);
		paramMap.put("delFlag", Diary.DEL_FLAG_NORMAL);
		return diaryDao.find(paramMap);
	}
	
	/**
	 * 新增日志
	 * @param diary
	 * @return
	 */
	@Transactional(readOnly = false)
	public int saveDiary(Diary diary){
		diary.preInsert();
		return diaryDao.insert(diary);
	}
	
	/**
	 * 根据ID删除日志
	 * @param diary
	 * @return
	 */
	@Transactional(readOnly = false)
	public int deleteDiary(Diary diary){
		return diaryDao.delete(diary);
	}
	
	/**
	 * 根据传入条件查询日志列表
	 */
	public List<Diary> findList(Diary diary){
		return diaryDao.findList(diary);
	}
	
}
