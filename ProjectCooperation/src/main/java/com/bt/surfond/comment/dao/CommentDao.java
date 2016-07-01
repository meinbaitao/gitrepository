package com.bt.surfond.comment.dao;

import java.util.List;
import java.util.Map;

import com.bt.surfond.comment.entity.Comment;
import com.thinkgem.jeesite.common.persistence.CrudDao;
import com.thinkgem.jeesite.common.persistence.annotation.MyBatisDao;

/**
 * 评论信息DAO接口
 * @author dyl
 * @version 2015-09-30
 */
@MyBatisDao
public interface CommentDao extends CrudDao<Comment> {
	
	/**
	 * 根据任务编号查询评论
	 * @param comment
	 * @return
	 */
	public List<Comment> findCommentListByTaskId(Comment comment);
	
	/**
	 * 根据评论编号查询评论
	 * @param comment
	 * @return
	 */
	public Comment findCommentByCommentId(Comment comment);
	
	/**
	 * 根据会话ID查找会话的所有评论
	 * @param conversationId
	 * @return
	 */
	public List<Comment> findByCoversationId(Comment comment);
	
	/**
	 * 点赞中间表插入一条数据
	 * @param paramMap
	 * @return
	 */
	public int savePraise(Map<String, String> paramMap);
	
	/**
	 * 查询任务评论成员点赞映射记录
	 * @param paramMap
	 * @return
	 */
	public List<Map<String, Object>> findMemberPraiseList(Map<String, Object> paramMap);
	
	/**
	 * 删除任务评论成员点赞映射记录
	 * @param paramMap
	 * @return
	 */
	public int deleteMemberPraise(Map<String, Object> paramMap);
	
	/**
	 * 修改点赞数
	 * @param comment
	 * @return
	 */
	public void updatePraiseAmountUpById(Comment comment);
	
	/**
	 * 查找点赞记录
	 * @return
	 */
	public Map<String, Object> findPraiseRecode(Map<String, Object> map);
	
	/**
	 * 查找评论数
	 * @param comment
	 * @return
	 */
	public int findCommentMember(Comment comment);
	
}