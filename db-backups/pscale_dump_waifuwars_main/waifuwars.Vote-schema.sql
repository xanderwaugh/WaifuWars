CREATE TABLE `Vote` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `votedForId` int NOT NULL,
  `votedAgainstId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Vote_votedForId_idx` (`votedForId`),
  KEY `Vote_votedAgainstId_idx` (`votedAgainstId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
