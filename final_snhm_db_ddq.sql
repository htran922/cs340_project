-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: classmysql.engr.oregonstate.edu:3306
-- Generation Time: Aug 15, 2019 at 12:45 PM
-- Server version: 10.3.13-MariaDB-log
-- PHP Version: 7.0.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_tranhel`
--

-- --------------------------------------------------------

--
-- Table structure for table `snhm_artifact`
--

CREATE TABLE `snhm_artifact` (
  `id` int(11) NOT NULL,
  `display` tinyint(1) NOT NULL,
  `acquisition_year` year(4) NOT NULL,
  `material` varchar(255) NOT NULL,
  `damage` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `snhm_artifact`
--

INSERT INTO `snhm_artifact` (`id`, `display`, `acquisition_year`, `material`, `damage`) VALUES
(1, 1, 2015, 'Stone', 0),
(2, 0, 1912, 'Wood', 0),
(3, 1, 1931, 'Bone', 0),
(4, 1, 1904, 'Paper', 1),
(5, 1, 1976, 'Bone', 0);

-- --------------------------------------------------------

--
-- Table structure for table `snhm_artifact_exhibition`
--

CREATE TABLE `snhm_artifact_exhibition` (
  `artifact_id` int(11) NOT NULL,
  `exhibition_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `snhm_artifact_exhibition`
--

INSERT INTO `snhm_artifact_exhibition` (`artifact_id`, `exhibition_id`) VALUES
(1, 3),
(2, 2),
(3, 1),
(4, 4),
(5, 5);

-- --------------------------------------------------------

--
-- Table structure for table `snhm_event`
--

CREATE TABLE `snhm_event` (
  `id` int(11) NOT NULL,
  `exhibition_id` int(11) NOT NULL,
  `staff_id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `snhm_event`
--

INSERT INTO `snhm_event` (`id`, `exhibition_id`, `staff_id`, `type`, `date`) VALUES
(1, 2, 1, 'Live Demonstration', '2019-07-29'),
(2, 1, 1, 'Concert', '2019-08-06'),
(3, 4, 4, 'Gala', '2019-07-30');

-- --------------------------------------------------------

--
-- Table structure for table `snhm_exhibition`
--

CREATE TABLE `snhm_exhibition` (
  `id` int(11) NOT NULL,
  `artifact_id` int(11) NOT NULL,
  `room` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `snhm_exhibition`
--

INSERT INTO `snhm_exhibition` (`id`, `artifact_id`, `room`, `subject`, `start_date`, `end_date`) VALUES
(1, 3, 'Bone Hall', 'Fossils', '2009-07-17', '2030-07-18'),
(2, 2, 'Insect Zoo', 'Biology', '1993-03-10', '2020-09-20'),
(3, 1, 'Objects of Wonder', 'Geology', '2017-03-17', '2021-03-17'),
(4, 4, 'The Birds of America', 'Biology', '2019-03-21', '2021-03-21'),
(5, 5, 'Hall of Mammals', 'Biology', '2003-11-15', '2023-12-10');

-- --------------------------------------------------------

--
-- Table structure for table `snhm_staff`
--

CREATE TABLE `snhm_staff` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `job` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `snhm_staff`
--

INSERT INTO `snhm_staff` (`id`, `first_name`, `last_name`, `job`) VALUES
(1, 'Marie', 'Gaston', 'Public Programs Specialist'),
(2, 'Eileen', 'Young', 'Conservator'),
(3, 'Margaret', 'Castillo', 'Public Programs Specialist'),
(4, 'Bryan', 'Michael', 'Conservator'),
(5, 'Jason', 'Henderson', 'Curator'),
(6, 'Kevin', 'Poulin', 'Archivist'),
(7, 'Theresa', 'Hinrichs', 'Public Programs Specialist');

-- --------------------------------------------------------

--
-- Table structure for table `snhm_staff_event`
--

CREATE TABLE `snhm_staff_event` (
  `staff_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `snhm_staff_event`
--

INSERT INTO `snhm_staff_event` (`staff_id`, `event_id`) VALUES
(1, 1),
(2, 3),
(1, 2),
(2, 3),
(1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `snhm_staff_exhibition`
--

CREATE TABLE `snhm_staff_exhibition` (
  `staff_id` int(11) NOT NULL,
  `exhibition_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `snhm_staff_exhibition`
--

INSERT INTO `snhm_staff_exhibition` (`staff_id`, `exhibition_id`) VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 5),
(5, 5),
(6, 4),
(7, 4),
(6, 5),
(4, 3),
(3, 1),
(2, 1),
(6, 5),
(4, 3),
(3, 1),
(2, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `snhm_artifact`
--
ALTER TABLE `snhm_artifact`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `snhm_artifact_exhibition`
--
ALTER TABLE `snhm_artifact_exhibition`
  ADD KEY `artifact_id` (`artifact_id`),
  ADD KEY `exhibition_id` (`exhibition_id`);

--
-- Indexes for table `snhm_event`
--
ALTER TABLE `snhm_event`
  ADD PRIMARY KEY (`id`),
  ADD KEY `exhibition_id` (`exhibition_id`),
  ADD KEY `staff_id` (`staff_id`);

--
-- Indexes for table `snhm_exhibition`
--
ALTER TABLE `snhm_exhibition`
  ADD PRIMARY KEY (`id`),
  ADD KEY `artifact_id` (`artifact_id`);

--
-- Indexes for table `snhm_staff`
--
ALTER TABLE `snhm_staff`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `snhm_staff_event`
--
ALTER TABLE `snhm_staff_event`
  ADD KEY `staff_id` (`staff_id`),
  ADD KEY `event_id` (`event_id`);

--
-- Indexes for table `snhm_staff_exhibition`
--
ALTER TABLE `snhm_staff_exhibition`
  ADD KEY `staff_id` (`staff_id`),
  ADD KEY `exhibition_id` (`exhibition_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `snhm_artifact`
--
ALTER TABLE `snhm_artifact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `snhm_event`
--
ALTER TABLE `snhm_event`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `snhm_exhibition`
--
ALTER TABLE `snhm_exhibition`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `snhm_staff`
--
ALTER TABLE `snhm_staff`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `snhm_artifact_exhibition`
--
ALTER TABLE `snhm_artifact_exhibition`
  ADD CONSTRAINT `snhm_artifact_exhibition_ibfk_1` FOREIGN KEY (`artifact_id`) REFERENCES `snhm_artifact` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `snhm_artifact_exhibition_ibfk_2` FOREIGN KEY (`exhibition_id`) REFERENCES `snhm_exhibition` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `snhm_event`
--
ALTER TABLE `snhm_event`
  ADD CONSTRAINT `snhm_event_ibfk_1` FOREIGN KEY (`exhibition_id`) REFERENCES `snhm_exhibition` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `snhm_event_ibfk_2` FOREIGN KEY (`staff_id`) REFERENCES `snhm_staff` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `snhm_exhibition`
--
ALTER TABLE `snhm_exhibition`
  ADD CONSTRAINT `snhm_exhibition_ibfk_1` FOREIGN KEY (`artifact_id`) REFERENCES `snhm_artifact` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `snhm_staff_event`
--
ALTER TABLE `snhm_staff_event`
  ADD CONSTRAINT `snhm_staff_event_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `snhm_event` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `snhm_staff_event_ibfk_2` FOREIGN KEY (`staff_id`) REFERENCES `snhm_event` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `snhm_staff_exhibition`
--
ALTER TABLE `snhm_staff_exhibition`
  ADD CONSTRAINT `snhm_staff_exhibition_ibfk_1` FOREIGN KEY (`exhibition_id`) REFERENCES `snhm_exhibition` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `snhm_staff_exhibition_ibfk_2` FOREIGN KEY (`staff_id`) REFERENCES `snhm_staff` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
