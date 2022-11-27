-- -----------------------------------------------------
-- Schema shop_for_home
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `ShopForHome`;

CREATE SCHEMA `ShopForHome`;
USE `ShopForHome` ;

-- -----------------------------------------------------
-- Table  `ShopForHome`.`cart`
-- -----------------------------------------------------
-- DROP TABLE IF EXISTS `ShopForHome`.cart;

 create table hibernate_sequence(next_val BIGINT NOT NULL);
 INSERT INTO hibernate_sequence (next_val) VALUES (4);

CREATE TABLE IF NOT EXISTS `ShopForHome`.`cart`
(
    `user_id` BIGINT(20) NOT NULL,
    CONSTRAINT `cart_pkey1` PRIMARY KEY (`user_id`)
)
ENGINE=InnoDB
AUTO_INCREMENT = 1;
	

-- -----------------------------------------------------
-- Table: `ShopForHome`.`discount`
-- -----------------------------------------------------
-- DROP TABLE IF EXISTS `ShopForHome`.`discount`;

CREATE TABLE IF NOT EXISTS `ShopForHome`.`discount`
(
    `id` VARCHAR(255) NOT NULL,
    `status` BIGINT(20),
    CONSTRAINT `discount_pkey` PRIMARY KEY (`id`)
)
ENGINE=InnoDB
AUTO_INCREMENT = 1;


-- -----------------------------------------------------
-- Table: `ShopForHome`.`order_main`
-- -----------------------------------------------------
-- DROP TABLE IF EXISTS `ShopForHome`.order_main;

CREATE TABLE IF NOT EXISTS `ShopForHome`.`order_main`
(
    `order_id` BIGINT(20) NOT NULL,
    `buyer_address` VARCHAR(255) ,
    `buyer_email` VARCHAR(255) ,
    `buyer_name` VARCHAR(255) ,
    `buyer_phone` VARCHAR(255) ,
    `create_time` DATETIME(6),
    `order_amount` DECIMAL(19,2) NOT NULL,
    `order_status` INT(11) NOT NULL DEFAULT 0,
    `update_time` DATETIME(6),
    CONSTRAINT `order_main_pkey` PRIMARY KEY (`order_id`)
)
ENGINE=InnoDB
AUTO_INCREMENT = 1;


-- -----------------------------------------------------
-- Table: `ShopForHome`.`product_category`
-- -----------------------------------------------------

-- DROP TABLE IF EXISTS `ShopForHome`.`product_category`;

CREATE TABLE IF NOT EXISTS `ShopForHome`.`product_category`
(
    `category_id` INT(11) NOT NULL,
    `category_name` VARCHAR(255) ,
    `category_type` INT(11),
    `create_time` DATETIME(6),
    `update_time` DATETIME(6),
    CONSTRAINT `product_category_pkey` PRIMARY KEY (`category_id`),
    CONSTRAINT `uk_6kq6iveuim6wd90cxo5bksumw` UNIQUE (`category_type`)
)
ENGINE=InnoDB
AUTO_INCREMENT = 1;


-- -----------------------------------------------------	
-- Table: `ShopForHome`.`product_in_order`
-- -----------------------------------------------------
-- DROP TABLE IF EXISTS `ShopForHome`.`product_in_order`;

CREATE TABLE IF NOT EXISTS `ShopForHome`.`product_in_order`
(
    `id` BIGINT(20) NOT NULL,
    `category_type` INT(11) NOT NULL,
    `count` INT(11),
    `product_description` VARCHAR(255)  NOT NULL,
    `product_icon` VARCHAR(255) ,
    `product_id` VARCHAR(255) ,
    `product_name` VARCHAR(255) ,
    `product_price` DECIMAL(19,2) NOT NULL,
    `product_stock` INT(11),
    `cart_user_id` BIGINT(20),
    `order_id` BIGINT(20),
    CONSTRAINT `product_in_order_pkey` PRIMARY KEY (`id`),
    CONSTRAINT `fkt0sfj3ffasrift1c4lv3ra85e` FOREIGN KEY (`order_id`)
        REFERENCES `ShopForHome`.`order_main` (`order_id`) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT `product_cart_fkey` FOREIGN KEY (`cart_user_id`)
        REFERENCES `ShopForHome`.`cart` (`user_id`) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT `product_in_order_count_check` CHECK (count >= 1),
    CONSTRAINT `product_in_order_product_stock_check` CHECK (product_stock >= 0)
)
ENGINE=InnoDB
AUTO_INCREMENT = 1;


-- -----------------------------------------------------
-- Table: `ShopForHome`.`product_info`
-- -----------------------------------------------------
-- DROP TABLE IF EXISTS `ShopForHome`.`product_info`;

CREATE TABLE IF NOT EXISTS `ShopForHome`.`product_info`
(
    `product_id` VARCHAR(255)  NOT NULL,
    `category_type` INT(11) DEFAULT 0,
    `create_time` DATETIME(6),
    `product_description` VARCHAR(255) ,
    `product_icon` VARCHAR(255) ,
    `product_name` VARCHAR(255)  NOT NULL,
    `product_price` DECIMAL(19,2) NOT NULL,
    `product_status` INT(11) DEFAULT 0,
    `product_stock` INT(11) NOT NULL,
    `update_time` DATETIME(6),
    CONSTRAINT `product_info_pkey` PRIMARY KEY (`product_id`),
    CONSTRAINT `product_info_product_stock_check` CHECK (product_stock >= 0)
)
ENGINE=InnoDB
AUTO_INCREMENT = 1;


-- -----------------------------------------------------
-- Table: `ShopForHome`.`users`
-- -----------------------------------------------------

-- DROP TABLE IF EXISTS `ShopForHome`.`users`;

CREATE TABLE IF NOT EXISTS `ShopForHome`.`users`
(
    `id` BIGINT(20) NOT NULL auto_increment,
    `active` boolean NOT NULL,
    `address` VARCHAR(255) ,
    `email` VARCHAR(255) ,
    `name` VARCHAR(255) ,
    `password` VARCHAR(255) ,
    `phone` VARCHAR(255) ,
    `role` VARCHAR(255) ,
    CONSTRAINT `users_pkey` PRIMARY KEY (`id`),
    CONSTRAINT `uk_sx468g52bpetvlad2j9y0lptc` UNIQUE (`email`)
)
ENGINE=InnoDB
AUTO_INCREMENT = 1;

-- -----------------------------------------------------
-- Table: ShopForHome.wishlist
-- -----------------------------------------------------

-- DROP TABLE IF EXISTS `ShopForHome`.`wishlist`;

CREATE TABLE IF NOT EXISTS `ShopForHome`.`wishlist`
(
    `id` BIGINT(20) NOT NULL,
    `created_date` DATETIME(6),
    `user_id` BIGINT(20),
    `product_id` VARCHAR(255) ,
    CONSTRAINT `wishlist_pkey` PRIMARY KEY (`id`),
    CONSTRAINT `product_wish_fkey` FOREIGN KEY (`product_id`)
        REFERENCES `ShopForHome`.`product_info` (`product_id`) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT `user_wish_Fkey` FOREIGN KEY (`user_id`)
        REFERENCES `ShopForHome`.`users` (`id`) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)
ENGINE=InnoDB
AUTO_INCREMENT = 1;


-- -----------------------------------------------------
-- Categories
-- -----------------------------------------------------

INSERT INTO `ShopForHome`.`product_category` VALUES (21, 'Showpiece', 0, '2022-08-07 23:03:26', '2022-08-07 23:03:26');
INSERT INTO `ShopForHome`.`product_category` VALUES (22, 'Mirror', 1, '2022-08-07 23:03:26', '2022-08-07 23:03:26');
INSERT INTO `ShopForHome`.`product_category` VALUES (23, 'Furniture', 2, '2022-08-07 23:03:26', '2022-08-07 23:03:26');
INSERT INTO `ShopForHome`.`product_category` VALUES (24, 'PlantPot', 3, '2022-08-07 23:03:26', '2022-08-07 23:03:26');


-- -----------------------------------------------------
-- showpiece
-- -----------------------------------------------------

INSERT INTO product_info (product_id, product_name, product_description, product_icon, product_status, product_stock, product_price, category_type,create_time) VALUES ('01', 'Krishnahand Showpiece', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi temporibus maxime laudantium quas vel. Aperiam iusto fugit reiciendis quae nostrum.', 'assets/images/products/showpiece/1.jpg', 0, 100, 3000, 0, NOW());

INSERT INTO product_info (product_id, product_name, product_description, product_icon, product_status, product_stock, product_price, category_type,create_time) VALUES ('02', 'Peacock Showpiece', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi temporibus maxime laudantium quas vel. Aperiam iusto fugit reiciendis quae nostrum.', 'assets/images/products/showpiece/2.jpg', 0, 100, 5000, 0, NOW());
INSERT INTO product_info (product_id, product_name, product_description, product_icon, product_status, product_stock, product_price, category_type,create_time) VALUES ('03', 'Budha Showpiece', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi temporibus maxime laudantium quas vel. Aperiam iusto fugit reiciendis quae nostrum.', 'assets/images/products/showpiece/3.jpg', 0, 100, 4000, 0, NOW());
INSERT INTO product_info (product_id, product_name, product_description, product_icon, product_status, product_stock, product_price, category_type,create_time) VALUES ('04', 'Ganeshjii Showpiece', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi temporibus maxime laudantium quas vel. Aperiam iusto fugit reiciendis quae nostrum.', 'assets/images/products/showpiece/4.jpg', 0, 100, 1000, 0, NOW());
INSERT INTO product_info (product_id, product_name, product_description, product_icon, product_status, product_stock, product_price, category_type,create_time) VALUES ('05', 'Ganpati Showpiece', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi temporibus maxime laudantium quas vel. Aperiam iusto fugit reiciendis quae nostrum.', 'assets/images/products/showpiece/5.jpg', 0, 100, 7000, 0, NOW());
INSERT INTO product_info (product_id, product_name, product_description, product_icon, product_status, product_stock, product_price, category_type,create_time) VALUES ('06', 'Peacock with flower Showpiece', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi temporibus maxime laudantium quas vel. Aperiam iusto fugit reiciendis quae nostrum.', 'assets/images/products/showpiece/6.jpg', 0, 100, 8000, 0, NOW());
INSERT INTO product_info (product_id, product_name, product_description, product_icon, product_status, product_stock, product_price, category_type,create_time) VALUES ('07', 'Kitty Showpiece', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi temporibus maxime laudantium quas vel. Aperiam iusto fugit reiciendis quae nostrum.', 'assets/images/products/showpiece/7.jpg', 0, 100, 2000, 0, NOW());
INSERT INTO product_info (product_id, product_name, product_description, product_icon, product_status, product_stock, product_price, category_type,create_time) VALUES ('08', 'Elephant Showpiece', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi temporibus maxime laudantium quas vel. Aperiam iusto fugit reiciendis quae nostrum.', 'assets/images/products/showpiece/8.jpg', 0, 100, 9000, 0, NOW());






-- -----------------------------------------------------
-- Mirrors
-- -----------------------------------------------------
INSERT INTO product_info (product_id, product_name, product_description, product_icon, product_status, product_stock, product_price, category_type,create_time) VALUES ('001', 'Net Mirror', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi temporibus maxime laudantium quas vel. Aperiam iusto fugit reiciendis quae nostrum.', 'assets/images/products/Mirrors/1.jpg', 0, 100, 2000, 1, NOW());

INSERT INTO product_info (product_id, product_name, product_description, product_icon, product_status, product_stock, product_price, category_type,create_time) VALUES ('002', 'circlur Mirror', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi temporibus maxime laudantium quas vel. Aperiam iusto fugit reiciendis quae nostrum.', 'assets/images/products/Mirrors/2.jpg', 0, 100, 3000, 1, NOW());
INSERT INTO product_info (product_id, product_name, product_description, product_icon, product_status, product_stock, product_price, category_type,create_time) VALUES ('003', 'lighting Mirror', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi temporibus maxime laudantium quas vel. Aperiam iusto fugit reiciendis quae nostrum.', 'assets/images/products/Mirrors/3.jpg', 0, 100, 1000, 1, NOW());
INSERT INTO product_info (product_id, product_name, product_description, product_icon, product_status, product_stock, product_price, category_type,create_time) VALUES ('004', 'square Mirror', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi temporibus maxime laudantium quas vel. Aperiam iusto fugit reiciendis quae nostrum.', 'assets/images/products/Mirrors/4.jpg', 0, 100, 6000, 1, NOW());
INSERT INTO product_info (product_id, product_name, product_description, product_icon, product_status, product_stock, product_price, category_type,create_time) VALUES ('005', 'Flower Mirror', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi temporibus maxime laudantium quas vel. Aperiam iusto fugit reiciendis quae nostrum.', 'assets/images/products/Mirrors/5.jpg', 0, 100, 4000, 1, NOW());
INSERT INTO product_info (product_id, product_name, product_description, product_icon, product_status, product_stock, product_price, category_type,create_time) VALUES ('006', 'TreeLighting Mirror', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi temporibus maxime laudantium quas vel. Aperiam iusto fugit reiciendis quae nostrum.', 'assets/images/products/Mirrors/6.jpg', 0, 100, 5000, 1, NOW());
INSERT INTO product_info (product_id, product_name, product_description, product_icon, product_status, product_stock, product_price, category_type,create_time) VALUES ('007', 'SemiCircle Mirror', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi temporibus maxime laudantium quas vel. Aperiam iusto fugit reiciendis quae nostrum.', 'assets/images/products/Mirrors/7.jpg', 0, 100, 7000, 1, NOW());
INSERT INTO product_info (product_id, product_name, product_description, product_icon, product_status, product_stock, product_price, category_type,create_time) VALUES ('008', 'DiamondShaped Mirror', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi temporibus maxime laudantium quas vel. Aperiam iusto fugit reiciendis quae nostrum.', 'assets/images/products/Mirrors/8.jpg', 0, 100, 8000, 1, NOW());

-- -----------------------------------------------------
-- Furniture
-- -----------------------------------------------------
INSERT INTO product_info (product_id, product_name, product_description, product_icon, product_status, product_stock, product_price, category_type,create_time) VALUES ('0001', 'Infinite Table Furniture', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi temporibus maxime laudantium quas vel.', 'assets/images/products/furniture/a.jpg', 0, 100, 3000, 2, NOW());
INSERT INTO product_info (product_id, product_name, product_description, product_icon, product_status, product_stock, product_price, category_type,create_time) VALUES ('0002', 'CircularOpen Table Furniture', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi temporibus maxime laudantium quas vel.', 'assets/images/products/furniture/b.jpg', 0, 100, 4000, 2, NOW());
INSERT INTO product_info (product_id, product_name, product_description, product_icon, product_status, product_stock, product_price, category_type,create_time) VALUES ('0003', 'Hexagon Table Furniture', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi temporibus maxime laudantium quas vel.', 'assets/images/products/furniture/c.jpg', 0, 100, 2000, 2, NOW());
INSERT INTO product_info (product_id, product_name, product_description, product_icon, product_status, product_stock, product_price, category_type,create_time) VALUES ('0004', 'Black Table Furniture', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi temporibus maxime laudantium quas vel.', 'assets/images/products/furniture/d.jpg', 0, 100, 1000, 2, NOW());
INSERT INTO product_info (product_id, product_name, product_description, product_icon, product_status, product_stock, product_price, category_type,create_time) VALUES ('0005', 'RoyalBlue Chair Furniture', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi temporibus maxime laudantium quas vel.', 'assets/images/products/furniture/e.jpg', 0, 100, 5000, 2, NOW());
INSERT INTO product_info (product_id, product_name, product_description, product_icon, product_status, product_stock, product_price, category_type,create_time) VALUES ('0006', 'Simple Chair Furniture', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi temporibus maxime laudantium quas vel.', 'assets/images/products/furniture/f.jpg', 0, 100, 7000, 2, NOW());
INSERT INTO product_info (product_id, product_name, product_description, product_icon, product_status, product_stock, product_price, category_type,create_time) VALUES ('0007', 'Comfy Chair Furniture', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi temporibus maxime laudantium quas vel.', 'assets/images/products/furniture/g.jpg', 0, 100, 8000, 2, NOW());
INSERT INTO product_info (product_id, product_name, product_description, product_icon, product_status, product_stock, product_price, category_type,create_time) VALUES ('0008', 'RedVelvate Chair Furniture', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi temporibus maxime laudantium quas vel.', 'assets/images/products/furniture/h.jpg', 0, 100, 9000, 2, NOW());

-- -----------------------------------------------------
-- Plant Pot
-- -----------------------------------------------------
INSERT INTO product_info (product_id, product_name, product_description, product_icon, product_status, product_stock, product_price, category_type,create_time) VALUES ('00001', 'Table Plant Pot', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi temporibus maxime laudantium quas vel.', 'assets/images/products/Plant Pot/a.jpg', 0, 100, 4000, 3, NOW());
INSERT INTO product_info (product_id, product_name, product_description, product_icon, product_status, product_stock, product_price, category_type,create_time) VALUES ('00002', 'Colourful Plant Pot', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi temporibus maxime laudantium quas vel.', 'assets/images/products/Plant Pot/b.jpg', 0, 100, 1000, 3, NOW());
INSERT INTO product_info (product_id, product_name, product_description, product_icon, product_status, product_stock, product_price, category_type,create_time) VALUES ('00003', 'WhiteFace Plant Pot', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi temporibus maxime laudantium quas vel.', 'assets/images/products/Plant Pot/c.jpg', 0, 100, 3000, 3, NOW());
INSERT INTO product_info (product_id, product_name, product_description, product_icon, product_status, product_stock, product_price, category_type,create_time) VALUES ('00004', 'Simplewhite Plant Pot', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi temporibus maxime laudantium quas vel.', 'assets/images/products/Plant Pot/d.jpg', 0, 100, 2000, 3, NOW());
INSERT INTO product_info (product_id, product_name, product_description, product_icon, product_status, product_stock, product_price, category_type,create_time) VALUES ('00005', 'Royal Black Plant Pot', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi temporibus maxime laudantium quas vel.', 'assets/images/products/Plant Pot/e.jpg', 0, 100, 5000, 3, NOW());
INSERT INTO product_info (product_id, product_name, product_description, product_icon, product_status, product_stock, product_price, category_type,create_time) VALUES ('00006', 'ElephantShaped Plant Pot', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi temporibus maxime laudantium quas vel.', 'assets/images/products/Plant Pot/f.jpg', 0, 100, 9000, 3, NOW());
INSERT INTO product_info (product_id, product_name, product_description, product_icon, product_status, product_stock, product_price, category_type,create_time) VALUES ('00007', 'PurpleHooked Plant Pot', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi temporibus maxime laudantium quas vel.', 'assets/images/products/Plant Pot/g.jpg', 0, 100, 7000, 3, NOW());
INSERT INTO product_info (product_id, product_name, product_description, product_icon, product_status, product_stock, product_price, category_type,create_time) VALUES ('00008', 'VintageTree Plant Pot', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi temporibus maxime laudantium quas vel.', 'assets/images/products/Plant Pot/h.jpg', 0, 100, 8000, 3, NOW());
-- -----------------------------------------------------
-- Users
-- -----------------------------------------------------

INSERT INTO `ShopForHome`.`users` VALUES (2147483645, true, 'XYZ,India', 'G6admin@gmail.com', 'Admin', '$2a$10$LiBwO43TpKU0sZgCxNkWJueq2lqxoUBsX2Wclzk8JQ3Ejb9MWu2Xy', '1234567890', 'ROLE_MANAGER');
