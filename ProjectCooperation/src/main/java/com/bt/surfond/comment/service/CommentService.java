package com.bt.surfond.comment.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bt.surfond.attachment.entity.Attachment;
import com.bt.surfond.attachment.service.AttachmentService;
import com.bt.surfond.comment.dao.CommentDao;
import com.bt.surfond.comment.entity.Comment;
import com.bt.surfond.common.Constants;
import com.bt.surfond.message.service.MessageService;
import com.thinkgem.jeesite.common.service.CrudService;
import com.thinkgem.jeesite.common.utils.IdGen;
import com.thinkgem.jeesite.modules.sys.dao.UserDao;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;
/**
 * 评论信息Service
 * @author dyl
 * @version 2015-09-30
 */
@Service
@Transactional
public class CommentService extends CrudService<CommentDao, Comment> {
	
	@Autowired
	private AttachmentService attService;
	@Autowired
	private CommentDao commenDao;
	@Autowired
	private UserDao userDao; 
	@Autowired
	private MessageService messageService;
	
	@Override
	public void save(Comment comment) {
		super.save(comment);
		messageService.addMessageForCreateConversationComment(comment, findByCoversation(comment));
		messageService.addMessageForCreateConversationCommentAite(comment);
	}
	
	/**
	 * 根据评论编号删除评论
	 * @param comment
	 * @return
	 */
	@Transactional(readOnly = false)
	public String deleteComment(Comment comment){
		Comment com = get(comment);
		JSONObject jsonObj = new JSONObject();
		if(null!=com){
			int num = 0;
			if(UserUtils.getUser().getId().equals(com.getCreateBy().getId())){
				num = dao.delete(comment);
			}
			if(num>0){
				jsonObj.put("result", "success");
				jsonObj.put("resourceId", com.getResourceId());
				jsonObj.put("status", Constants.APP_STATUS_SUCCESS);
			}else{
				jsonObj.put("status", Constants.APP_STATUS_FAIL);
			}
		}
		return jsonObj.toString();
	}
	
	/**
	 * 评论的点赞与取消点赞
	 * @param comment
	 * @param type
	 * @return
	 */
	@Transactional(readOnly = false)
	public String doPraiseOrCancelPraise(Comment comment){
		Comment c = get(comment);
		if(c!=null){
			String amount = "";
			JSONObject jsonObj = new JSONObject();
			Map<String,Object> map = findPraiseRecord(comment.getId());
			if(null!=map){
				 int num = deletePraiseInfo(comment.getId());
					if(num>0){
						Integer count = c.getPraiseAmount()-1;
						c.setPraiseAmount(count);
						commenDao.updatePraiseAmountUpById(c);
						amount=count.toString();
					 }
					jsonObj.put("optionType", Constants.CANCEL_PRAISE);
			}else{
				int num = savePraiseInfo(comment.getId(), Constants.COMMENT_DO_PRAISE);
				 if(num>0){
					 Integer count = c.getPraiseAmount()+1;
					 c.setPraiseAmount(count);
					 commenDao.updatePraiseAmountUpById(c);
					 amount=count.toString();
				 }
				 jsonObj.put("optionType", Constants.DO_PRAISE);
			}
			jsonObj.put("message", "");
			jsonObj.put("result", amount);
			jsonObj.put("status", "1");
			return jsonObj.toString();
		}
		return null;
	}
	
	/**
	 * 查找点赞记录是否存在
	 * @param conversation
	 * @return
	 */
	public Map<String,Object> findPraiseRecord(String id){
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("recordId", id);
		map.put("userId", UserUtils.getUser().getId());
		return dao.findPraiseRecode(map);
	}
	
	/**
	 * 根据评论编号查询评论
	 * @param comment
	 * @return
	 */
	public Comment findCommentByCommentId(Comment comment){
		Comment com = dao.findCommentByCommentId(comment);
		if(null!=com){
			Attachment attachment = new Attachment();
			attachment.setTaskId(com.getId());
			List<Attachment> attList = attService.findAttachmentByTaskId(attachment);
			if(null!=attList){
				com.setAttachment(attList);
			}
		}
		return com;
	}
	
	/**
	 * 根据(对话/任务)ID查询对话下的所有评论
	 * @param comment
	 * @return
	 */
	public List<Comment> findByCoversation(Comment comment){
		List<Comment> list = commenDao.findByCoversationId(comment);
		for (Comment c : list) {
			Attachment attachment = new Attachment();
			attachment.setTaskId(c.getId());
			List<Attachment> attList = attService.findAttachmentByTaskId(attachment);
			if(null!=attList){
				c.setAttachment(attList);
			}
		}
		return list;
	}
	
	/**
	 * 根据任务编号查询评论并设置当前登录用户对评论的点赞标记
	 * @param comment
	 * @return
	 */
	public List<Comment> findCommentListByTaskId(Comment comment){
		List<Comment> taskCommentList = dao.findCommentListByTaskId(comment);
		//查询当前用户点赞的任务评论列表
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("userId", comment.getCurrentUser().getId());
		paramMap.put("type", Constants.COMMENT_DO_PRAISE);
		List<Map<String, Object>> memberPraiseList = dao.findMemberPraiseList(paramMap);
		//设置评论点赞标记
		if(taskCommentList != null && memberPraiseList != null){
			for(Comment com : taskCommentList){
				for(Map<String, Object> memberPraise : memberPraiseList){
					if(com.getId().equals(memberPraise.get("recordId"))){//评论被当前用户点赞了
						com.setPraiseFlag(memberPraise.get("type").toString());
					}
				}
			}
		}
		return taskCommentList;
	}
	
	/**
	 * 添加点赞映射记录
	 * @param comment
	 * @return
	 */
	@Transactional(readOnly = false)
	public int savePraiseInfo(String recordId,String type){
		Map<String, String> paramMap = new HashMap<String, String>();
		paramMap.put("id", IdGen.uuid());
		paramMap.put("userId", UserUtils.getUser().getId());
		paramMap.put("recordId", recordId);
		paramMap.put("type", type);
		return dao.savePraise(paramMap);
	}
	
	/**
	 * 删除点赞映射记录
	 * @param comment
	 * @return
	 */
	@Transactional(readOnly = false)
	public int deletePraiseInfo(String recordId){
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("userId", UserUtils.getUser().getId());
		paramMap.put("recordId", recordId);
		return dao.deleteMemberPraise(paramMap);
	}

	/**
	 * 查找评论数
	 * @param comment
	 * @return
	 */
	public Integer findCommentMember(Comment comment) {
		return dao.findCommentMember(comment);
	}
	
}