/*
Navicat MySQL Data Transfer

Source Server         : blog
Source Server Version : 50726
Source Host           : localhost:3306
Source Database       : blog

Target Server Type    : MYSQL
Target Server Version : 50726
File Encoding         : 65001

Date: 2020-03-01 19:40:19
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for blog_login
-- ----------------------------
DROP TABLE IF EXISTS `blog_login`;
CREATE TABLE `blog_login` (
  `lg_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `lg_username` varchar(40) NOT NULL,
  `lg_password` varchar(40) NOT NULL,
  `lg_status` int(11) NOT NULL,
  `lg_create_time` date NOT NULL,
  PRIMARY KEY (`lg_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of blog_login
-- ----------------------------
INSERT INTO `blog_login` VALUES ('1', 'cheney', '123456', '1', '2020-03-01');
