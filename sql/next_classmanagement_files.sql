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
-- Table structure for table `next_classmanagement_files`
--

CREATE TABLE `next_classmanagement_files` (
  `id` int NOT NULL,
  `class_id` int NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `next_classmanagement_files`
--

INSERT INTO `next_classmanagement_files` (`id`, `class_id`, `file_name`, `created_at`) VALUES
(1, 1, 'studentsavatar-1758262866821-952766998.png', '2025-09-19 06:21:07'),
(2, 1, 'studentsavatar-1758262867034-511548214.png', '2025-09-19 06:21:07'),
(3, 1, 'studentsavatar-1758262867218-486769206.png', '2025-09-19 06:21:07'),
(4, 1, 'studentsavatar-1758262867293-409475993.png', '2025-09-19 06:21:07'),
(5, 1, 'studentsavatar-1758262867338-854049898.png', '2025-09-19 06:21:07'),
(6, 1, 'studentsavatar-1758262867374-640477785.png', '2025-09-19 06:21:07'),
(7, 1, 'studentsavatar-1758262867388-327503224.jpeg', '2025-09-19 06:21:07'),
(8, 1, 'studentsavatar-1758262867389-998521335.jpeg', '2025-09-19 06:21:07'),
(9, 2, 'studentsavatar-1758263143822-703840625.png', '2025-09-19 06:25:43'),
(10, 2, 'studentsavatar-1758263143823-536287518.png', '2025-09-19 06:25:43'),
(11, 3, 'studentsavatar-1758263525153-157787690.jpg', '2025-09-19 06:32:05'),
(12, 3, 'studentsavatar-1758263525154-640777829.png', '2025-09-19 06:32:05'),
(13, 3, 'studentsavatar-1758263525156-35311165.png', '2025-09-19 06:32:05'),
(14, 3, 'studentsavatar-1758263525182-272514571.png', '2025-09-19 06:32:05'),
(15, 4, 'studentsavatar-1758271163925-103879431.png', '2025-09-19 08:39:24'),
(16, 4, 'studentsavatar-1758271164231-19090804.svg', '2025-09-19 08:39:24'),
(17, 9, 'studentsavatar-1758276631558-616549015.jpeg', '2025-09-19 10:10:54'),
(18, 9, 'studentsavatar-1758276631560-540462524.jpg', '2025-09-19 10:10:54'),
(19, 9, 'studentsavatar-1758276634916-192839641.jpg', '2025-09-19 10:10:54'),
(20, 9, 'studentsavatar-1758276649601-674939047.jpg', '2025-09-19 10:10:54'),
(21, 9, 'studentsavatar-1758276654208-585429553.png', '2025-09-19 10:10:54'),
(22, 9, 'studentsavatar-1758276654229-775412798.svg', '2025-09-19 10:10:54'),
(23, 9, 'studentsavatar-1758276654230-589886638.png', '2025-09-19 10:10:54'),
(24, 9, 'studentsavatar-1758276654230-845937554.png', '2025-09-19 10:10:54'),
(25, 10, 'studentsavatar-1758278897891-799750622.jpg', '2025-09-19 10:48:22'),
(26, 10, 'studentsavatar-1758278902153-976572279.png', '2025-09-19 10:48:22'),
(27, 10, 'studentsavatar-1758278902157-710907044.png', '2025-09-19 10:48:22'),
(28, 11, 'studentsavatar-1758279235163-577126725.svg', '2025-09-19 10:53:55'),
(29, 13, 'studentsavatar-1758280297040-928566161.png', '2025-09-19 11:11:37'),
(30, 13, 'studentsavatar-1758280297040-365817232.png', '2025-09-19 11:11:37'),
(31, 14, 'studentsavatar-1758290980297-115646958.png', '2025-09-19 14:09:40'),
(32, 14, 'studentsavatar-1758290980336-384215852.svg', '2025-09-19 14:09:40'),
(33, 14, 'studentsavatar-1758290980337-664521436.png', '2025-09-19 14:09:40'),
(34, 15, 'studentsavatar-1758292777777-639474947.jpg', '2025-09-19 14:39:38'),
(35, 16, 'studentsavatar-1758518056931-271403717.jpg', '2025-09-22 05:14:17'),
(36, 16, 'studentsavatar-1758518056933-442848484.png', '2025-09-22 05:14:17'),
(37, 17, 'studentsavatar-1758519824329-18504404.jpg', '2025-09-22 05:43:44'),
(38, 17, 'studentsavatar-1758519824330-887477468.png', '2025-09-22 05:43:44'),
(39, 17, 'studentsavatar-1758519824339-979485168.png', '2025-09-22 05:43:44'),
(40, 17, 'studentsavatar-1758519824352-311721007.jpeg', '2025-09-22 05:43:44'),
(41, 18, 'studentsavatar-1758520181038-955254228.jpg', '2025-09-22 05:49:41'),
(42, 19, 'studentsavatar-1758522388675-53808059.png', '2025-09-22 06:26:28'),
(43, 19, 'studentsavatar-1758522388683-816873688.png', '2025-09-22 06:26:28'),
(44, 22, 'studentsavatar-1759562195942-288714951.png', '2025-10-04 07:16:36'),
(45, 22, 'studentsavatar-1759562195942-919331491.png', '2025-10-04 07:16:36');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `next_classmanagement_files`
--
ALTER TABLE `next_classmanagement_files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `class_id` (`class_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `next_classmanagement_files`
--
ALTER TABLE `next_classmanagement_files`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `next_classmanagement_files`
--
ALTER TABLE `next_classmanagement_files`
  ADD CONSTRAINT `next_classmanagement_files_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `next_classmanagement` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
