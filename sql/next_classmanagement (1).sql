-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 06, 2025 at 02:54 PM
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
-- Table structure for table `next_classmanagement`
--

CREATE TABLE `next_classmanagement` (
  `id` int NOT NULL,
  `class_name` varchar(100) DEFAULT NULL,
  `noofstudents` mediumtext CHARACTER SET utf8 COLLATE utf8_general_ci,
  `class_description` mediumtext CHARACTER SET utf8 COLLATE utf8_general_ci,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_by` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `next_classmanagement`
--

INSERT INTO `next_classmanagement` (`id`, `class_name`, `noofstudents`, `class_description`, `created_at`, `updated_by`) VALUES
(1, 'third class', '2', '<h1>Users <em>studnts</em></h1><ol><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span>vikash</li><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span>rahul</li><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span>dev</li><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span>singhma</li><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span>motu</li><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span>patlu</li></ol>', '2025-09-19 06:21:07.433985', NULL),
(2, 'Sopoline Fuller', '99', '<p>Est reiciendis dolor.</p>', '2025-09-19 06:25:43.867446', NULL),
(3, 'Giacomo Bean', '71', '<p>Doloremque unde anim.</p>', '2025-09-19 06:32:05.228471', NULL),
(4, 'Kimberly French', '45', '<p>Sint laboriosam, ab .</p>', '2025-09-19 08:39:24.280936', 110),
(5, 'Keegan Cunningham', '25', '<p>Libero sit quasi pra.</p>', '2025-09-19 10:09:48.908845', 110),
(6, 'Halla Manning', '57', '<p>Sed ullamco reprehen.</p>', '2025-09-19 10:09:56.188047', 110),
(7, 'Kendall Hays', '60', '<p>Aliquid voluptate ma.</p>', '2025-09-19 10:10:00.308512', 110),
(8, 'Reese Castillo', '71', '<p>Esse, voluptatum et .</p>', '2025-09-19 10:10:05.465236', 110),
(9, 'Harding Beasley', '51', '<p>Aut est assumenda qu.</p>', '2025-09-19 10:10:54.269420', 110),
(10, 'Penelope Caldwell', '67', '<p>hhhhh</p><p><strong>sjdfhjs</strong></p><h2>vsadasdas</h2>', '2025-09-19 10:48:22.201079', 106),
(11, 'new class', '89', '<p>this is new classes 	</p>', '2025-09-19 10:53:55.207767', 106),
(12, 'Aladdin Barron', '22', '<p>Nisi nisi dolorem of.</p>', '2025-09-19 11:04:59.478294', 121),
(13, 'sad', '23', '<h2>dgwer</h2>', '2025-09-19 11:11:37.092394', 122),
(14, 'Omar York', '75', '<p>Velit eum temporibus.</p>', '2025-09-19 14:09:40.388909', 121),
(15, 'das', '23', '<p>asd</p>', '2025-09-19 14:39:38.383109', 116),
(16, 'Ryan Solis', '23', '<ol><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span>wewe</li><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span>wrw</li><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span>wer</li></ol>', '2025-09-22 05:14:16.971962', 120),
(17, 'as', '32', '<p>sd</p>', '2025-09-22 05:43:44.352899', 119),
(18, 'Aileen Ortiz', '93', '<p><br></p>', '2025-09-22 05:49:41.055228', 119),
(19, 'Lawrence Lynch', '76', '<p>Delectus, ea adipisi.</p>', '2025-09-22 06:26:28.744105', 119),
(20, 'Gray Durham', '50', '<ol><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span>test</li><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span>testing</li><li data-list=\"ordered\"><span class=\"ql-ui\" contenteditable=\"false\"></span>tested</li></ol>', '2025-09-22 09:06:06.936056', 119),
(21, 'Leigh Hester', '3', '<h1>this is testing h1</h1>', '2025-09-22 09:09:02.739534', 119),
(22, 'Tatum Woodard', '1', '<p>Dolores iure quae de.</p>', '2025-10-04 07:16:35.967227', 124);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `next_classmanagement`
--
ALTER TABLE `next_classmanagement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `updated_by` (`updated_by`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `next_classmanagement`
--
ALTER TABLE `next_classmanagement`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `next_classmanagement`
--
ALTER TABLE `next_classmanagement`
  ADD CONSTRAINT `next_classmanagement_ibfk_1` FOREIGN KEY (`updated_by`) REFERENCES `next_users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
