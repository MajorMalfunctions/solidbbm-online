SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for refbrgies
-- ----------------------------
DROP TABLE IF EXISTS `refbrgies`;
CREATE TABLE `refbrgies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `brgyCode` integer UNSIGNED DEFAULT NULL,
  `brgyDesc` text,
  `regCode` integer UNSIGNED DEFAULT NULL,
  `provCode` integer UNSIGNED DEFAULT NULL,
  `citymunCode` integer UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=42030 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of refbrgies
-- ----------------------------
INSERT INTO `refbrgies` VALUES ('1', '012801001', 'Adams (Pob.)', '01', '0128', '012801');
INSERT INTO `refbrgies` VALUES ('2', '012802001', 'Bani', '01', '0128', '012802');
INSERT INTO `refbrgies` VALUES ('3', '012802002', 'Buyon', '01', '0128', '012802');
INSERT INTO `refbrgies` VALUES ('4', '012802003', 'Cabaruan', '01', '0128', '012802');
INSERT INTO `refbrgies` VALUES ('5', '012802004', 'Cabulalaan', '01', '0128', '012802');
INSERT INTO `refbrgies` VALUES ('6', '012802005', 'Cabusligan', '01', '0128', '012802');
INSERT INTO `refbrgies` VALUES ('7', '012802006', 'Cadaratan', '01', '0128', '012802');
INSERT INTO `refbrgies` VALUES ('8', '012802007', 'Calioet-Libong', '01', '0128', '012802');
INSERT INTO `refbrgies` VALUES ('9', '012802008', 'Casilian', '01', '0128', '012802');
INSERT INTO `refbrgies` VALUES ('10', '012802009', 'Corocor', '01', '0128', '012802');
INSERT INTO `refbrgies` VALUES ('11', '012802011', 'Duripes', '01', '0128', '012802');
INSERT INTO `refbrgies` VALUES ('12', '012802012', 'Ganagan', '01', '0128', '012802');
