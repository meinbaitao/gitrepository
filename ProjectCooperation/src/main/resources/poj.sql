use jeesited;
/*空间表*/
CREATE TABLE `poj_space` (
  `id` varchar(64) NOT NULL COMMENT '编号',
  `title` varchar(50) DEFAULT NULL COMMENT '标题',
  `description` varchar(255) DEFAULT NULL COMMENT '描述',
  `space_type` varchar(20) DEFAULT NULL COMMENT '类型-公共/个人',
  `sort` decimal(10,0) NOT NULL COMMENT '排序',
  `create_by` varchar(64) NOT NULL COMMENT '创建者',
  `create_date` datetime NOT NULL COMMENT '创建时间',
  `update_by` varchar(64) NOT NULL COMMENT '更新者',
  `update_date` datetime NOT NULL COMMENT '更新时间',
  `remarks` varchar(255) DEFAULT NULL COMMENT '备注信息',
  `del_flag` char(1) NOT NULL DEFAULT '0' COMMENT '删除标记',
  PRIMARY KEY (`id`),
  KEY `poj_space_del_flag` (`del_flag`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='空间表';
/*空间成员表*/
CREATE TABLE `poj_space_member` (
  `id` varchar(64) NOT NULL COMMENT '编号',
  `space_id` varchar(64) DEFAULT NULL COMMENT '归属空间',
  `user_id` varchar(64) DEFAULT NULL COMMENT '归属用户',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='空间成员表';
/*项目表*/
CREATE TABLE `poj_project` (
  `id` varchar(64) NOT NULL COMMENT '编号',
  `title` varchar(50) DEFAULT NULL COMMENT '标题',
  `description` varchar(255) DEFAULT NULL COMMENT '描述',
  `user_id` varchar(64) DEFAULT NULL COMMENT '负责人',
  `due_date` datetime DEFAULT NULL COMMENT '交付日期',
  `project_type` varchar(20) DEFAULT NULL COMMENT '类型-待定',
  `status` varchar(20) DEFAULT NULL COMMENT '状态-正常/收藏/存档',
  `sort` decimal(10,0) NOT NULL COMMENT '排序',
  `space_id` varchar(64) DEFAULT NULL COMMENT '归属空间',
  `create_by` varchar(64) NOT NULL COMMENT '创建者',
  `create_date` datetime NOT NULL COMMENT '创建时间',
  `update_by` varchar(64) NOT NULL COMMENT '更新者',
  `update_date` datetime NOT NULL COMMENT '更新时间',
  `remarks` varchar(255) DEFAULT NULL COMMENT '备注信息',
  `del_flag` char(1) NOT NULL DEFAULT '0' COMMENT '删除标记',
  PRIMARY KEY (`id`),
  KEY `poj_project_del_flag` (`del_flag`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='项目表';
/*任务表*/
CREATE TABLE `poj_task` (
  `id` varchar(64) NOT NULL COMMENT '编号',
  `parent_id` varchar(64) NOT NULL COMMENT '父级编号',
  `parent_ids` varchar(2000) NOT NULL COMMENT '所有父级编号',
  `task_group` varchar(50) DEFAULT NULL COMMENT '任务组',
  `title` varchar(50) DEFAULT NULL COMMENT '标题',
  `description` varchar(255) DEFAULT NULL COMMENT '描述',
  `user_id` varchar(64) DEFAULT NULL COMMENT '负责人',
  `due_date` datetime DEFAULT NULL COMMENT '交付日期',
  `praise_amount` int(11) DEFAULT NULL COMMENT '被赞数',
  `task_type` varchar(20) DEFAULT NULL COMMENT '类型-待定',
  `status` varchar(20) DEFAULT NULL COMMENT '状态-未完成/完成',
  `sort` decimal(10,0) NOT NULL COMMENT '排序',
  `source` varchar(50) DEFAULT NULL COMMENT '来源',
  `create_by` varchar(64) NOT NULL COMMENT '创建者',
  `create_date` datetime NOT NULL COMMENT '创建时间',
  `update_by` varchar(64) NOT NULL COMMENT '更新者',
  `update_date` datetime NOT NULL COMMENT '更新时间',
  `remarks` varchar(255) DEFAULT NULL COMMENT '备注信息',
  `del_flag` char(1) NOT NULL DEFAULT '0' COMMENT '删除标记',
  PRIMARY KEY (`id`),
  KEY `poj_task_del_flag` (`del_flag`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='任务表';
/*项目任务表*/
CREATE TABLE `poj_project_task` (
  `id` varchar(64) NOT NULL COMMENT '编号',
  `project_id` varchar(64) DEFAULT NULL COMMENT '归属项目',
  `task_id` varchar(64) DEFAULT NULL COMMENT '归属任务',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='项目任务表';
/*话题或评论表*/
CREATE TABLE `poj_cvst_comment` (
  `id` varchar(64) NOT NULL COMMENT '编号',
  `title` varchar(50) DEFAULT NULL COMMENT '标题',
  `description` varchar(255) DEFAULT NULL COMMENT '描述',
  `praise_amount` int(11) DEFAULT NULL COMMENT '被赞数',
  `record_type` varchar(20) DEFAULT NULL COMMENT '类型-话题/任务评论/话题评论',
  `status` varchar(20) DEFAULT NULL COMMENT '状态-待定',
  `sort` decimal(10,0) NOT NULL COMMENT '排序',
  `source` varchar(50) DEFAULT NULL COMMENT '来源',
  `record_id` varchar(64) DEFAULT NULL COMMENT '记录编号',
  `create_by` varchar(64) NOT NULL COMMENT '创建者',
  `create_date` datetime NOT NULL COMMENT '创建时间',
  `update_by` varchar(64) NOT NULL COMMENT '更新者',
  `update_date` datetime NOT NULL COMMENT '更新时间',
  `remarks` varchar(255) DEFAULT NULL COMMENT '备注信息',
  `del_flag` char(1) NOT NULL DEFAULT '0' COMMENT '删除标记',
  PRIMARY KEY (`id`),
  KEY `poj_cvst_comment_del_flag` (`del_flag`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='话题或评论表';
/*成员点赞表*/
CREATE TABLE `poj_member_praise` (
  `id` varchar(64) NOT NULL COMMENT '编号',
  `user_id` varchar(64) DEFAULT NULL COMMENT '归属用户',
  `record_id` varchar(64) DEFAULT NULL COMMENT '归属记录',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='成员点赞表';
/*附件表*/
CREATE TABLE `poj_attachment` (
  `id` varchar(64) NOT NULL COMMENT '编号',
  `name` varchar(80) DEFAULT NULL COMMENT '名称',
  `attachment_type` varchar(20) DEFAULT NULL COMMENT '类型-jpg/xlsx/txt等',
  `absolute_path` varchar(200) DEFAULT NULL COMMENT '绝对路径',
  `access_path` varchar(200) DEFAULT NULL COMMENT '访问路径',
  `task_id` varchar(64) DEFAULT NULL COMMENT '归属任务',
  `project_id` varchar(64) DEFAULT NULL COMMENT '归属项目',
  `create_by` varchar(64) NOT NULL COMMENT '创建者',
  `create_date` datetime NOT NULL COMMENT '创建时间',
  `update_by` varchar(64) NOT NULL COMMENT '更新者',
  `update_date` datetime NOT NULL COMMENT '更新时间',
  `remarks` varchar(255) DEFAULT NULL COMMENT '备注信息',
  `del_flag` char(1) NOT NULL DEFAULT '0' COMMENT '删除标记',
  PRIMARY KEY (`id`),
  KEY `poj_attachment_del_flag` (`del_flag`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='附件表';