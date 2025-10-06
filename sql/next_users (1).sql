-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 06, 2025 at 02:53 PM
-- Server version: 8.0.24
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vikasdeep_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `next_users`
--

CREATE TABLE `next_users` (
  `id` int NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `facebook_profile` varchar(255) DEFAULT NULL,
  `linkedin_profile` varchar(255) DEFAULT NULL,
  `x_com_profile` varchar(255) DEFAULT NULL,
  `instagram_profile` varchar(255) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `city_state` varchar(100) DEFAULT NULL,
  `postal_code` varchar(20) DEFAULT NULL,
  `tax_id` varchar(50) DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'owner.jpg',
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `next_users`
--

INSERT INTO `next_users` (`id`, `first_name`, `last_name`, `email`, `password`, `phone`, `bio`, `facebook_profile`, `linkedin_profile`, `x_com_profile`, `instagram_profile`, `country`, `city_state`, `postal_code`, `tax_id`, `avatar`, `role`, `created_at`) VALUES
(1, 'Elmo', 'Suarez', 'lidyfi@mailinator.com', '$2b$10$OhEDCqUoUwJDYaEeqWD8Z.0tt71R5aZeRjK5yN/rYy..DxlUVD0xG', '+1 (562) 892-1854', 'Delectus ut et ab f', 'Nulla minus minus nu', 'Ut et ducimus aut m', 'Consequuntur in inve', 'Eius hic qui id inci', 'DE', 'Soluta est ut corrup', 'Incididunt anim dist', 'Consequatur lorem v', 'avatar-1757584590269-843554322.jpg', 'user', '2025-09-11 09:55:06.040909'),
(2, 'Zorita', 'Pittman', 'qanykepat@mailinator.com', '$2b$10$DTlTWSVGArjXBHAl4mtWoOusw.EBLumy9cC8pYmn81VQybEwha8gq', '+1 (848) 469-4465', 'In non eum placeat ', 'Est maiores placeat', 'Voluptas odit quasi ', 'Velit est et odio h', 'Sunt iure qui dolore', 'US', 'Nobis exercitationem', 'Eu illum voluptate ', 'Non occaecat expedit', 'avatar-1757584649882-829909028.jpg', 'user', '2025-09-11 09:57:02.051954'),
(3, 'Reece', 'Ewing', 'xofyp@mailinator.com', '$2b$10$l.DRuCcxSzKachrD8SaoZ.EHMiu0drHwImbe0jJygR/s90xuCPI7i', '+1 (708) 254-7447', 'Aliqua Deserunt odi', 'Quia sit nemo accusa', 'Quis est nulla delec', 'Nihil consequatur al', 'In velit consectetur', 'CA', 'Sint anim quia eu pr', 'Quod cumque a fugit', 'Consequatur Deserun', 'avatar-1757584786561-675174437.jpg', 'user', '2025-09-11 09:59:16.345287'),
(4, 'vikash', 'deep', 'vuzoxas@mailinator.com', '$2b$10$sYxAtrbIUdUNNImHF1Msr.g9nAO2VT06xlzxlOkAkZgHr3umAqkXa', '565466756', 'Nemo exercitationem ', 'Aut quam velit est a', 'Blanditiis nisi nisi', 'Omnis deleniti adipi', 'Beatae dolor volupta', 'AU', 'Assumenda consequat', 'Vitae iure sunt ten', 'Est exercitationem v', '', 'user', '2025-09-11 10:00:10.125563'),
(5, 'vikash', 'deep', 'deepv@sdg.sd', '$2b$10$SEgbzjcoOO/QWuwk.bcIaue6idvDGkOQ7VC0oe9jO0E1X8GlT46MK', '565466756', 'Dolor incididunt ill', 'Est elit porro exce', 'Sed optio qui vel i', 'Dolores inventore no', 'Magni porro quia por', 'DE', 'Exercitationem exerc', 'Harum quibusdam perf', 'Aliquip ex pariatur', '', 'user', '2025-09-11 10:01:06.086301'),
(6, 'Sylvia', 'Jarvis', 'musifacaq@mailinator.com', '$2b$10$OPpavSu/BZd6fcu1KdZ.fe5b.l4ShfxDKKoAzTaafvliNfCJfHSba', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'owner.jpg', 'user', '2025-09-11 10:02:01.042367'),
(7, 'McKenzie', 'Phillips', 'rada@mailinator.com', '$2b$10$1t9HO1J.wXnRlm.P/xc6YO/U5kM3M.cx9YoP9m2Syo1nYx0Ksi3zK', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'owner.jpg', 'user', '2025-09-11 10:02:07.452433'),
(8, 'Thaddeus', 'Guthrie', 'mavu@mailinator.com', '$2b$10$IMG.z0gpenGXFRS40tpaXeLbwjhseAOFcmH6qCVUui1kIYMCFjcNm', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'owner.jpg', 'user', '2025-09-11 10:02:12.623544'),
(9, 'Herrod', 'Hobbs', 'tipijyh@mailinator.com', '$2b$10$NVObl6OIUvYNet3WesoKE.Ee6kt..SZK3gVLBbTNL0pA2EqxwJvBG', '+1 (753) 314-8533', 'Eum ut iusto est ess', 'Aut deserunt commodo', 'Omnis qui in quis mo', 'Impedit vel nostrum', 'Totam voluptatem eni', 'IN', 'Ratione quis laudant', 'Eiusmod aliqua Aliq', 'Hic sunt mollit irur', 'avatar-1757584968846-970476404.jpg', 'user', '2025-09-11 10:02:19.763304'),
(10, 'Cara', 'Kim', 'rufuqydigi@mailinator.com', '$2b$10$Ox19Q3CBtrnYaEGnRDCfiur6F4rJYkDR89WAX8H/miTeb5PnLU87q', NULL, '', '', '', '', '', 'DE', 'Qui ea itaque cillum', 'Consequuntur dolor a', 'Ea quia nisi blandit', 'avatar-1757585035326-5696740.jpg', 'user', '2025-09-11 10:03:18.172118'),
(11, 'Amaya', 'Barrera', 'sekolobi@mailinator.com', '$2b$10$jStarwztPPATEyVo.BSH8edanl4Ve9RTQEnR8bFpY5CM11Hn.7Fma', '+1 (391) 954-4606', 'Omnis dolores fugiat', 'Provident nulla exe', 'Placeat non et cons', 'Mollitia aliquam ex ', 'Odit ullamco natus i', 'DE', 'Laudantium elit ni', 'Illum cum nemo non ', 'Porro fugiat eos se', 'avatar-1757587119444-739886359.jpg', 'user', '2025-09-11 10:38:20.183364'),
(12, 'Lacey', 'Copeland', 'gucy@mailinator.com', '$2b$10$/5naiaPrOzjsLelOlIpwSOGzoUkVz7h.OJbL.s5GNfHX7rRyvuOIG', '+1 (513) 893-2165', 'Ad et amet eos magn', 'Quia dignissimos nec', 'Eius aspernatur aliq', 'Velit id occaecat c', 'Voluptatum est odit ', 'GB', 'Fuga Quo laboriosam', 'Qui nulla fugiat ni', 'Aute possimus dolor', 'avatar-1757587173301-614183891.jpg', 'user', '2025-09-11 10:39:13.226889'),
(13, 'Kiayada', 'Pollard', 'wycemyrav@mailinator.com', '$2b$10$1tPChLu7v/lVMp/pHv2vmuP7l.JsOM5ssPMNrJEsozbqEa2mRKfkC', '+1 (258) 282-4215', 'Quo velit nisi asper', 'Id vero veritatis qu', 'Eius velit amet au', 'Lorem officiis repud', 'Aspernatur cillum la', 'IN', 'Voluptas qui reicien', 'Est dolores incidid', 'Sit hic nulla tempo', 'avatar-1757587253890-632560910.jpg', 'user', '2025-09-11 10:40:02.048079'),
(14, 'Ria', 'Sawyer', 'xuguritor@mailinator.com', '$2b$10$WrSuKjN9ZYjAj5Jtpg8Llu.3ADqniSLWDpVqZNchjVPNNyZOk9fze', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'owner.jpg', 'user', '2025-09-11 10:41:29.842496'),
(15, 'Blair', 'Wagner', 'fujac@mailinator.com', '$2b$10$utyWxlt/WXUwED7a9cR6AuDaLHrXmo/6nw/0eb/4vPcro8sWdw.t2', '+1 (492) 782-8743', 'Cupidatat quae fugia', 'Ea est eligendi ull', 'Aut ea optio aliqui', 'Veniam commodi arch', 'Neque voluptas est ', 'CA', 'Perspiciatis est re', 'Ratione veritatis qu', 'Consequatur quod min', 'avatar-1757587317781-853436577.jpg', 'user', '2025-09-11 10:41:37.260366'),
(16, 'Clio', 'Noel', 'kalijylo@mailinator.com', '$2b$10$U.RePRdUIpDWU4vvR.TJ5.OEnmRUbaniy071.jSN4LLytjwPRG79G', '+1 (824) 287-8787', 'Aut incididunt eiusm', 'Tempora doloribus ni', 'Non molestias repreh', 'Corrupti quis conse', 'Molestias temporibus', 'DE', 'Laborum commodo numq', 'Dolore cupiditate au', 'Sunt ex aut veritati', 'avatar-1757587381005-868474441.jpg', 'user', '2025-09-11 10:42:34.930513'),
(17, 'Danielle', 'Burgess', 'dyjanec@mailinator.com', '$2b$10$KRvesPeKYVBMEPcipqrFFOAUGxkqe1q24hZa1a/pl.wA3JycFnJeq', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'owner.jpg', 'user', '2025-09-11 10:43:27.006963'),
(18, 'Zia', 'Torres', 'naxapo@mailinator.com', '$2b$10$oNOAn8E48.eGGiQ1EBjUteHhpBP0mXwoxcfUjYwdzy.KJAiHVIkkO', '+1 (568) 391-1353', 'Asperiores quos ea d', 'Qui autem quia venia', 'Fugiat quia aliquam', 'Saepe dolor quisquam', 'Soluta natus facere ', 'IN', 'Voluptas aspernatur ', 'Ipsum consequatur ', 'Nulla ducimus a ven', 'avatar-1757587434993-490348157.jpg', 'user', '2025-09-11 10:43:33.477470'),
(19, 'admin', 'admin', 'admin@nomail.com', '$2b$10$NmEhAJGHqMKPuwVrsTpc2Oq2k6u96abFWe6oEh9lMbioElh8bsBsK', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'owner.jpg', 'user', '2025-09-11 10:53:33.146054'),
(20, 'vikash', 'deep', 'new@gmail.com', '11111111', '565466756', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'owner.jpg', 'user', '2025-09-11 13:48:31.041685'),
(21, 'Graiden', 'Brock', 'zocezofugo@mailinator.com', '$2b$10$vt/qB8Flcs.gfvpc/g3tU.9tAzHm1v82U2zKQaTrN2ogO655vumA2', '+1 (168) 904-4488', 'Repellendus Ex eos', 'Dolorem dolores fugi', 'Tempora qui eu et iu', 'Nisi incididunt mole', 'Unde corporis dolore', 'GB', 'Quia aut rerum offic', 'Quo sit veritatis i', 'Sapiente itaque sed ', 'avatar-1757600269852-307283170.jpg', 'user', '2025-09-11 14:01:05.872347'),
(22, 'vikash new1', 'deep', 'newvikash@gmail.com1', '$2b$10$.MJd7bZUlgcqkcW/KANLS.hOryEuppoOIGJ4uXwHNuZ/sa72YOY66', '565466756', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'owner.jpg', 'user', '2025-09-11 14:05:51.952884'),
(23, 'vikash new1', 'deep', 'qnewvikash@gmail.com', '$2b$10$STpvGhnkWxoSXyi1V/7bXuS/YFx/LcsxuHuaZ1FVL.b1l.yVK.IQm', '565466756', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'owner.jpg', 'user', '2025-09-11 14:15:31.828550'),
(24, 'vikash new1', 'deep', 'qnewvikash@gmail.comd', '$2b$10$.zJwESPOadoxsXUcrIYra.xiPu2lUMUDnmrUeVMODXLd5D2TjrRfS', '565466756', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'avatar-1757600748409-552469468.jpg', 'user', '2025-09-11 14:25:48.848758'),
(25, 'vikash new1', 'deep', 'new userexist@gmail.comd', '$2b$10$fCX7.gcrDQT8mhDfsfu/7erkx9ggOPfJKwWQMhHImrHJQMrIdC1La', '565466756', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'avatar-1757601097484-521763661.jpg', 'admin', '2025-09-11 14:31:37.868039'),
(26, 'April', 'Wiley', 'secezaf@mailinator.com', '$2b$10$4jarEyXR9BwvCK3Ug45YquQVtfKHRpB31m0R4aYXNTLS0q8ocNkn.', '+1 (785) 332-1336', NULL, NULL, NULL, NULL, NULL, 'AU', 'Eos vel est cillum', 'Itaque dicta qui dol', 'Sapiente voluptas et', 'owner.jpg', 'user', '2025-09-11 15:34:32.525401'),
(27, 'Lavinia', 'Hampton', 'putyha@mailinator.com', '$2b$10$yeozPu3iiROxPhPe4GtkpOEwWOBeAW3v1X388lbR.6DNiikrntXtW', '+1 (877) 258-6531', NULL, NULL, NULL, NULL, NULL, 'US', 'Aut architecto volup', 'Labore vel dolores o', 'Dicta ut nulla digni', 'owner.jpg', 'user', '2025-09-11 15:36:04.972059'),
(28, 'Devin', 'Barrett', 'depicyjas@mailinator.com', '$2b$10$uhbnmHei28KLXOeKdbZMD.31UGArWV5dkyhyuZaVy13LwpCa7ZjK2', '+1 (962) 279-6932', NULL, NULL, NULL, NULL, NULL, 'CA', 'Voluptas aut nihil q', 'Ut sit porro molesti', 'Veniam assumenda di', 'owner.jpg', 'user', '2025-09-11 15:36:24.019209'),
(29, 'Forrest', 'Nicholson', 'rafinoha@mailinator.com', '$2b$10$RNvtj9gLBTtedPFbSN4w.eMTJF9ovLm1qjYR8G/TkUpEqyQnQZ76O', '+1 (752) 215-5916', '', '', '', '', '', 'GB', 'Est aliquam sed exce', 'Consequat Aut persp', 'Lorem molestias dolo', 'avatar-1757653980022-368168742.jpg', 'user', '2025-09-12 05:13:00.207277'),
(30, 'dev', 'Brown', 'jjjjjjj@gmail.com', '$2b$10$horRbXlob2ylqY2ubTckeOoTxWSyscOTRaVSJs7gwc8FybMBAx8a6', '', '', '', '', '', '', '', '', '', '', 'avatar-1757654551132-864163752.jpg', 'user', '2025-09-12 05:22:31.309718'),
(31, 'Freya', 'Morse', 'vauzoxas@mailinator.com', '$2b$10$Ic0dGze1k1oyy3iixe1PD.EPZmgzr1/hJTzXn7BRREzI3GwLWFGL6', '+1 (395) 717-9252', '', '', '', '', '', 'US', 'Dicta ea suscipit qu', 'Nisi laboriosam sae', 'Sit reprehenderit ', 'owner.jpg', 'user', '2025-09-12 06:44:47.079868'),
(32, 'Robert', 'Ware', 'wixeri@mailinator.com', '$2b$10$Kov2ltIjht/cIrBfAFxIS.jHUYsAuLp7S2b2Xjr2qiVlp9l1KgEAu', '+1 (465) 693-3038', '', '', '', '', '', 'AU', 'Do quisquam eiusmod ', 'Commodo sed sit dict', 'Iste perspiciatis q', 'owner.jpg', 'user', '2025-09-12 06:46:44.477726'),
(33, 'Rosalyn', 'Bonner', 'birixobovi@mailinator.com', '$2b$10$QLwqJz1ecyq8Xz86aB.uMOabJjBT4xMMXQo3cLcyS6nB9p52VkRpa', '+1 (172) 317-1282', '', '', '', '', '', 'CA', 'Tempore qui et enim', 'Rerum quaerat offici', 'Maxime nihil nihil n', 'owner.jpg', 'user', '2025-09-12 06:50:06.656919'),
(34, 'Larissa', 'Bradshaw', 'azocezofugo@mailinator.com', '$2b$10$VVYnBU/np/kn//yZS2OG0.A2SWXUlbd3RNGV6GA4VqHjc3B2nNfvi', '+1 (793) 909-6501', '', '', '', '', '', 'US', 'Nulla voluptatem na', 'Vel suscipit quas qu', 'Officia quod consequ', 'avatar-1757659870783-575700171.jpg', 'user', '2025-09-12 06:51:10.967405'),
(35, 'Melyssa', 'Benton', 'vulyqotuvy@mailinator.com', '$2b$10$24nmVhmDT95q63eByerlWO9dMQD6Vwjfjjn3VkI4g8yu9w9iENQwq', 'jsfas', '', '', '', '', '', 'GB', 'Obcaecati distinctio', 'Quasi omnis officia ', 'Quidem non non expli', 'owner.jpg', 'user', '2025-09-12 06:52:33.410103'),
(36, 'Gage', 'Donaldson', 'kilu@mailinator.com', '$2b$10$Dk7YSv2g1SscVCfIl2EAj.6DS8/YnDfx0HQj2Gx7OGjQgeci0WiPO', '+1 (742) 429-3227', '', '', '', '', '', 'IN', 'Nesciunt enim tempo', 'Corrupti et tempore', 'Et quia nemo pariatu', 'avatar-1757660061901-580703291.jpg', 'user', '2025-09-12 06:54:22.086029'),
(37, 'Aubrey', 'Golden', 'xunugu@mailinator.com', '$2b$10$U6ydGsWE6lZoFjRp/wSFxuCcgD5eyuWR/5X7OO5PBaj2Evm2hTLhq', '+1 (985) 789-3166', '', '', '', '', '', 'CA', 'Pariatur Vel laudan', 'Sint aut quod tempo', 'Et sunt illum et re', 'avatar-1757660106697-269285949.jpg', 'user', '2025-09-12 06:55:06.859528'),
(38, 'sdfdsfdsfds', 'fdsfdsf', 'admiasdsadsadn@nomail.com', '$2b$10$B53syIFlRvVSm0X95r6LYOQq96OFHtPjx1qBV0lkGx5eKv/ynYhVe', 'admin@nomail.com', '', '', '', '', '', '', '', '', '', 'avatar-1757660425564-766872773.jpg', 'user', '2025-09-12 07:00:25.743305'),
(39, 'Teagan', 'Walsh', 'ripader@mailinator.com', '$2b$10$pycDSia2q5ew30OhgGm1UuU7vxvANOIWJTXh6L3E6sTUTaXCuVF6u', '+1 (322) 965-6131', '', '', '', '', '', 'CA', 'Ipsum quae fugiat n', 'Et in laboriosam od', 'Elit voluptatem qu', 'owner.jpg', 'user', '2025-09-12 07:14:34.536924'),
(40, 'William', 'Hart', 'cagyve@mailinator.com', '$2b$10$Cy.8n2oJaUEHsDEP/d83JOYofKUeUP6.azX8PTicKWEHgB/yEUnFG', '+1 (298) 415-4548', '', '', '', '', '', 'IN', 'Dolores saepe soluta', 'Assumenda ea reprehe', 'Quos perspiciatis u', 'owner.jpg', 'admin', '2025-09-12 07:18:27.091851'),
(41, 'Wade', 'Dunn', 'mijimyma@mailinator.com', '$2b$10$qzPls4GEf6h5EQNIvYpCc.zx5b2W0M5v84SQqd6fcgg6FxZgrB1Tu', '+1 (998) 975-1223', '', '', '', '', '', 'GB', 'Qui aut quisquam vol', 'Qui ipsam sit enim a', 'Optio expedita eu q', 'owner.jpg', 'user', '2025-09-12 09:51:39.683611'),
(42, 'Dorian', 'Blankenship', 'citaky@mailinator.com', '$2b$10$6LcNbEjjse8eCb1dyhc1ye4U78GqQiOf72vNxEV2rZlOumZsmgXiK', '+1 (358) 951-2169', '', '', '', '', '', 'CA', 'Eu qui ratione tempo', 'Voluptas aliqua Acc', 'Non voluptas qui ad ', 'owner.jpg', 'admin', '2025-09-12 09:52:24.827369'),
(43, 'Tara', 'Stanley', 'vavuhotira@mailinator.com', '$2b$10$DpzSwP0NQ8oAauesFBo5VeOE.V.xyjrS.Fw6PUSIaA6zd/BhW4VVi', '+1 (402) 343-1068', '', '', '', '', '', 'US', 'Praesentium anim ani', 'Quibusdam deserunt h', 'Eligendi ipsum volup', 'avatar-1757670792991-460276309.jpg', 'user', '2025-09-12 09:53:13.239320'),
(44, 'Lance', 'Bowen', 'nelevacodo@mailinator.com', '$2b$10$V/Cw4RSDTEJQB2Il.SWIa.cSkOtO2WOuvD1/FPibtbewmfb8FTyJC', '+1 (644) 675-8086', '', '', '', '', '', 'AU', 'Reprehenderit sit f', 'Quia dignissimos fug', 'Cupiditate voluptas ', 'avatar-1757670830394-139898368.jpg', 'admin', '2025-09-12 09:53:50.577348'),
(45, 'Coby', 'Walton', 'gebucy@mailinator.com', '$2b$10$z2pT82vI/P6wQkgNHMzEDupSNYm.IaK0Lyhcy3O1v13ED8tABeylW', '+1 (463) 187-2412', '', '', '', '', '', 'AU', 'Ullamco nihil odio a', 'Quidem laboriosam p', 'Qui maiores et quaer', 'avatar-1757672302145-694386948.jpg', 'user', '2025-09-12 10:18:22.317283'),
(46, 'Boris', 'Odom', 'xilisi@mailinator.com', '$2b$10$dtz33foWpi.mL6gJaIK05OSUl6zvGWTKqCueMwS/rdSqE6FoXp.nO', '+1 (966) 375-5907', '', '', '', '', '', 'US', 'Aut minus maxime tem', 'Ipsa temporibus omn', 'Quam dolorem sit of', 'owner.jpg', 'user', '2025-09-12 10:57:32.212185'),
(47, 'Tyrone', 'Parsons', 'celixen@mailinator.com', '$2b$10$wUBDEpkYlCwlH/x/b/U7ZuLuv0qSK4Ss6/6mFHSsd3k2bFMncR56O', '+1 (263) 921-7489', '', 'aas', '', '', '', 'AU', 'Itaque optio veniam', 'Cupiditate suscipit ', 'Impedit deserunt re', 'avatar-1757934194956-226720851.jpg', 'admin', '2025-09-12 10:58:03.975182'),
(48, 'Imelda', 'Huff', 'lory@mailinator.com', '$2b$10$.gRiPY8HbBy.aqhbOUgqUuNMmm7.ayLXC/f4M0GydQ1YHSLS4dETa', '+1 (418) 972-2097', '', '', '', '', '', 'IN', 'Modi sit non cumque ', 'Est quia cum sed qui', 'Eius hic non dolorem', 'owner.jpg', 'user', '2025-09-12 10:59:42.710999'),
(49, 'Faith', 'Hood', 'buje@mailinator.com', '$2b$10$JOarLNE6d9Wk0.pankvSD.ErIAHA30pUBsHIbOqLC4rp1Dj3K2STC', '+1 (347) 487-7337', '', '', '', '', '', 'US', 'Dolor odio est quis', 'Voluptate iusto null', 'Deserunt architecto ', 'owner.jpg', 'admin', '2025-09-12 11:00:02.278865'),
(50, 'Isabelle', 'Harrell', 'kigipobe@mailinator.com', '$2b$10$YIqP0MWUG1CMGG3qN/SWUepoFQfcmyPBePVM2Om2EKetmFWQ99AAO', '+1 (444) 243-2197', '', '', '', '', '', 'GB', 'Dicta in soluta fuga', 'Exercitationem dolor', 'Eaque minim aut reic', 'owner.jpg', 'admin', '2025-09-12 11:00:17.303949'),
(51, 'Chelsea', 'Carey', 'cibypy@mailinator.com', '$2b$10$jPgb9G1TGFInjOr7c0EmWux2z9oIs2DAFzFqrZcUduHfEgO8ICDKi', '+1 (459) 931-4522', '', '', '', '', '', 'CA', 'Pariatur Consequatu', 'Exercitation nulla c', 'Tempora labore et vo', 'owner.jpg', 'user', '2025-09-12 11:01:46.454865'),
(52, 'Andrew', 'Wilkinson', 'simezerin@mailinator.com', '$2b$10$z3SGlwDgdmtltWEZ2uk7fO5495PYzbKz/BZrIjAluh.siimSu5Nvm', '+1 (608) 744-3167', '', '', '', '', '', 'DE', 'Quo vitae sunt quas', 'Officia voluptate au', 'Autem ut sit et imp', 'owner.jpg', 'admin', '2025-09-12 11:02:17.508182'),
(53, 'Lev', 'Stout', 'cypikit@mailinator.com', '$2b$10$kKMffBoKphAaAV46SzktNOiEtx3stzaPD2N.H8HvL09dMpc9Wur5a', '+1 (157) 291-2821', '', '', '', '', '', 'CA', 'Magna at nostrud des', 'Esse in dolor id nih', 'Distinctio Corrupti', 'owner.jpg', 'user', '2025-09-12 11:04:43.926204'),
(54, 'Yael', 'Olson', 'divo@mailinator.com', '$2b$10$JP8abiUSqTMJBEdUIFzqFetXl3hHRKCsu3YoYuskCx/JktB6tw4Yq', '+1 (183) 943-8673', '', '', '', '', '', 'IN', 'Illo quasi placeat ', 'Porro quibusdam quas', 'Neque vitae incidunt', 'avatar-1758012243646-59608592.jpg', 'admin', '2025-09-12 11:14:30.847050'),
(55, 'Genevieve', 'Yates', 'mubalol@mailinator.com', '$2b$10$AdhFaTot03o8XbPjoksC/u9O8a.Im0U4upb38OGE0UVuzSmLRt5ou', NULL, NULL, NULL, NULL, NULL, NULL, 'DE', '', '', '', 'owner.jpg', 'admin', '2025-09-15 04:38:41.594526'),
(56, 'Gregory', 'Kramer', 'kumixewer@mailinator.com', '$2b$10$0QNBfnWg48s8pfwVCwc7N.tkdb5VSk4cQyIpihsiYG.VPIlI.koMK', '+1 (513) 502-1326', '', '', '', '', '', 'US', 'In eveniet nisi con', 'Laboris magnam offic', 'Rem impedit et aut ', 'owner.jpg', 'user', '2025-09-15 04:49:50.340215'),
(57, 'Cameran', 'Knight', 'hokepo@mailinator.com', '$2b$10$a/7wSNL1rmpTu99AIz3yE.TVj.CYJyRT55Irs/PcjQBCNy1nEV/cK', '+1 (927) 839-5063', '', '', '', '', '', 'AU', 'Placeat magni inven', 'Labore dignissimos e', 'Et et dignissimos si', 'avatar-1757911828333-728999707.jpg', 'admin', '2025-09-15 04:50:28.492657'),
(58, 'Orlando', 'Hogan', 'dozasajiw@mailinator.com', '$2b$10$pIEJ5MsZlBjKhM6dOZkUQ.n59EZ.iTPe96nYT1dYvhJv95izOt6De', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'owner.jpg', 'admin', '2025-09-15 10:24:58.949795'),
(59, 'Octavius', 'Whitley', 'wocosohil@mailinator.com', '$2b$10$087hegYRZi4ndHI1kMblW.HweEL9/AQF61Bh5OCV55gm6VQZSoD8u', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'owner.jpg', 'admin', '2025-09-15 10:49:28.566246'),
(102, 'Tyrone', 'Bowen', 'simezerin@mailinator.come', '$2b$10$9batPi5yTynTOg.eu2QUI.N5wmDBjWktf95EvB6j.qXFa91hkak1.', '+1 (708) 254-7447', '', '', '', '', '', 'GB', 'dhabad', '', '', 'owner.jpg', 'user', '2025-09-16 10:38:22.223759'),
(105, 'Injoy', 'Injoy', 'rakesh@injoyglobal.com', '$2b$10$DLMAQkRVTM6kxJ/bpWo1ju6cOeA4XguwTSaYeOlCTNuOTBrNDkRcC', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'https://lh3.googleusercontent.com/a/ACg8ocIHXu-_CllGSfgrsEOlj6GGFmEX8Xe6bgkSqA9dtlFSoCjtzw=s96-c', 'user', '2025-09-16 11:06:54.555348'),
(106, 'akkkaa', 'pps', 'deepv2576@gmail.com', '$2b$10$8Zydqvc7tZgcdbVhwZKT..OpcEN1IA8krAie1GNc7xezALs0.4xMa', '', 'zsxcsa', '', '', '', '', 'GB', 'Assumenda consequat', 'sdf', '434', 'avatar-1758112861446-589243531.jpg', 'user', '2025-09-16 11:10:07.636407'),
(107, 'Solomon', 'Norris', 'fikiri@mailinator.com', '$2b$10$AEDCXS1u16VJCJSJ4zs0zO9oOWYdwYFntFTq9nPPu7IPdeT2NE7Ea', '+1 (764) 593-2073', 'Non corrupti tempor', '', '', '', '', 'DE', 'Dicta eaque est aut ', 'Voluptatem doloribus', 'Illo earum molestias', 'avatar-1758025106790-298785124.jpg', 'user', '2025-09-16 11:12:50.495127'),
(108, 'Brittanyd', 'xcza', 'cibypy@mailinator.comq', '$2b$10$AmxvLjylc4mlXuu1JXMMme4G3iEL5LQ3tJSVM48daZ3hxByPuxY5S', '+1 (391) 954-4606', 'Lorem Ipsum', '', '', '', '', 'GB', 'Assumenda consequat', '803101', '434', 'avatar-1758107685735-653731265.jpg', 'admin', '2025-09-17 04:43:41.602120'),
(109, 'Brittany', 'xcz', 'ddsjg@kh.sdp', '$2b$10$C3wo2rkJ1i1Er9WNap.QjuUMFS2YjJSj6emJOR/kJJqGO1IvEGXxO', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'owner.jpg', 'user', '2025-09-17 04:51:43.844147'),
(110, 'developer1', 'developer1', 'developer1@logicalquad.com', '$2b$10$KEbfTXYHQ2Xm9FOr5C8KaeAeehUDvuwNFWP03qWlPgLWErtIAccaO', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'https://lh3.googleusercontent.com/a/ACg8ocKyyYnTZoyKIy3WocVPWhOfZGbeILF7t4XQtgZmsHzLqChHdQ=s96-c', 'admin', '2025-09-17 05:13:49.225635'),
(111, 'test', 'Fernandez', 'irueru@jksd.sda', '$2b$10$ViwnA.LKco0SmdOpjsDabONWTS.ZOMZnTlcivgb9es06SXq0LslSi', NULL, '', '', '', '', '', NULL, NULL, NULL, NULL, 'owner.jpg', 'user', '2025-09-17 05:29:44.919256'),
(112, 'sdf', 'sdf', 'sdfsdf@gmail.com', '$2b$10$xCgqS68NOfqWc8OeFT4euOjSVH55sJbsACiO9j73leWE.VQfUt/5K', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'owner.jpg', 'user', '2025-09-17 05:32:36.976040'),
(113, 'asd', 'asd', 'cibypy@mailinator.comw', '$2b$10$PDLTBqvgs8w1w329qWUSSO50E4G6RzlgG3ikxxmLjku9j97EGTOPW', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'owner.jpg', 'user', '2025-09-17 08:45:42.308035'),
(114, 'sdfsf', 'sdfsdf', 'sdfsdfs@jjj.com', '$2b$10$GttBk1TzY/U9U21aVr1./eIiuSS/wz4liC3PH/192v6xX/UjMke7.', NULL, '', '', '', '', '', NULL, NULL, NULL, NULL, 'avatar-1758103439708-941494348.jpg', 'user', '2025-09-17 09:03:21.130736'),
(115, 'Hary', 'Poter', 'haarrypoter187@gmail.com', '$2b$10$tMbSE.UZpxjfSm0w73e4Qe8CfvC9ZtoQP61YmUIhhDVsf3rrSxzwC', NULL, NULL, NULL, NULL, NULL, NULL, 'GB', 'asd', 'asd', '', 'https://lh3.googleusercontent.com/a/ACg8ocLIinwHVqD4U7kwjgevhvNGzwOSIMFqk0ytP_6hE4WTDUuL_w=s96-c', 'admin', '2025-09-17 09:20:39.472632'),
(116, 'new new', 'user', 'newuser@gmail.com', '$2b$10$ihYhTa7cAcus18FrROctu.WL1PEdtzFPgyLCDL0G0sSMCeg3AXU56', NULL, 'jjjj', '', '', '', '', NULL, NULL, NULL, NULL, 'avatar-1758105877805-843115712.jpg', 'user', '2025-09-17 09:27:44.299536'),
(117, 'webnesday', 'lastname', 'webnesday@nomail.com', '$2b$10$UZA0qKkyBIlOrekfEVF1b.Le1YU.H/BN3PdiB3x2M/v1981OwuAcO', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'owner.jpg', 'user', '2025-09-17 09:39:08.338092'),
(118, 'developer3', 'Bowen', 'developer3@gmail.comq', '$2b$10$JpIYUgk4zeiJjUT6y1n4JeqaNTQZznIJ.6Wx893a8TgskfA/xQqoS', '+1 (708) 254-7447', '', '', '', '', '', 'AU', 'Soluta est ut corrup', '2342', '678567', 'avatar-1758114990235-52725222.jpg', 'user', '2025-09-17 13:16:30.823484'),
(119, 'sadsadasdsa', 'asddsfs', 'ssasdsad@ksahgj.com', '$2b$10$MoXk9J3mB/0HqnhD2qScweYSSzSslB8HLWYasJwbEjdGbmA9K5cim', NULL, 'dsadsadsadsadsad', '', '', '', '', NULL, NULL, NULL, NULL, 'avatar-1758116452159-265731923.jpg', 'admin', '2025-09-17 13:40:00.321927'),
(120, 'sadkljlj', 'lkjlkj', 'kljjkl@kjghsjk.com', '$2b$10$uYeNYiULE3a4z5HuQQBUM.bE6F2BT5Wpe2KHBX2PSXOiR12kTCEJ2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'owner.jpg', 'user', '2025-09-18 14:37:09.019906'),
(121, 'Cally', 'Gallagher', 'buja@mailinator.com', '$2b$10$yDGo7j.7TiiNiPZfP.r6muaVk8V.o66WaLCD3eVcs3S1sKNYOwSpq', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'owner.jpg', 'admin', '2025-09-19 11:04:13.152906'),
(122, 'Mercedes', 'Bernard', 'wypinogi@mailinator.com', '$2b$10$sXJlq.EOdbKQG8ltJNbSBejA.LgUVKXnY9IYek50Hl6kHHCQlifg2', '+1 (179) 477-6018', '', '', '', '', '', 'IN', 'Libero omnis ut non ', 'Doloribus ut est ea ', 'Perferendis et solut', 'avatar-1758280230496-923852116.jpg', 'admin', '2025-09-19 11:10:30.731044'),
(123, 'jlkjlj', 'klkjjk', 'kljklj@jklwhkjdh.cpm', '$2b$10$vYFJo6lhpi3IzyBg7tW1/us6SFsKzUJ8vYLEPlr7.in0WWfv2joJ6', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'owner.jpg', 'user', '2025-09-19 11:21:53.581929'),
(124, 'oppp', 'Davis', 'lajiqe@mailinator.com', '$2b$10$CKnIYqLtLS3G9scpPrffluyFKx2L3AVPI6kaBqr9hCfaK0uCuEOlC', NULL, 'popooi', '', '', '', '', 'GB', 'Nam ex est esse lab', 'Dolorum animi iste ', 'Vel consequuntur mol', 'avatar-1759562235686-152609649.jpg', 'admin', '2025-10-04 07:12:31.730079');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `next_users`
--
ALTER TABLE `next_users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `next_users`
--
ALTER TABLE `next_users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=125;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
