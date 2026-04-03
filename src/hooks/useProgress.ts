import { useState, useCallback, useEffect } from "react";
import { projects } from "@/data/projects";
import { badges, Badge } from "@/data/badges";

const STORAGE_KEY = "stem-robotics-progress";

interface ProgressData {
  completedIds: string[];
  xp: number;
  unlockedBadgeIds: string[];
}

function loadProgress(): ProgressData {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch {}
  return { completedIds: [], xp: 0, unlockedBadgeIds: [] };
}

function saveProgress(data: ProgressData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getXpForDifficulty(difficulty: string): number {
  return difficulty === "hard" ? 30 : difficulty === "medium" ? 20 : 10;
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData>(loadProgress);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const isComplete = useCallback(
    (projectId: string) => progress.completedIds.includes(projectId),
    [progress.completedIds]
  );

  const markComplete = useCallback(
    (projectId: string) => {
      if (progress.completedIds.includes(projectId)) return { xpGained: 0, newBadges: [] };

      const project = projects.find((p) => p.id === projectId);
      if (!project) return { xpGained: 0, newBadges: [] };

      const xpGained = getXpForDifficulty(project.difficulty);
      const newCompletedIds = [...progress.completedIds, projectId];
      const newXp = progress.xp + xpGained;

      // Check for new badges
      const newBadges: Badge[] = [];
      badges.forEach((badge) => {
        if (
          !progress.unlockedBadgeIds.includes(badge.id) &&
          badge.condition(newCompletedIds)
        ) {
          newBadges.push(badge);
        }
      });

      const newUnlockedBadgeIds = [
        ...progress.unlockedBadgeIds,
        ...newBadges.map((b) => b.id),
      ];

      setProgress({
        completedIds: newCompletedIds,
        xp: newXp,
        unlockedBadgeIds: newUnlockedBadgeIds,
      });

      return { xpGained, newBadges };
    },
    [progress]
  );

  const getClassProgress = useCallback(
    (classLevel: string) => {
      const classProjects = projects.filter((p) => p.classLevel === classLevel);
      const completed = classProjects.filter((p) =>
        progress.completedIds.includes(p.id)
      ).length;
      return { completed, total: classProjects.length };
    },
    [progress.completedIds]
  );

  const getUnlockedBadges = useCallback(
    () => badges.filter((b) => progress.unlockedBadgeIds.includes(b.id)),
    [progress.unlockedBadgeIds]
  );

  const getLockedBadges = useCallback(
    () => badges.filter((b) => !progress.unlockedBadgeIds.includes(b.id)),
    [progress.unlockedBadgeIds]
  );

  const resetProgress = useCallback(() => {
    setProgress({ completedIds: [], xp: 0, unlockedBadgeIds: [] });
  }, []);

  return {
    completedIds: progress.completedIds,
    xp: progress.xp,
    totalProjects: projects.length,
    completedCount: progress.completedIds.length,
    isComplete,
    markComplete,
    getClassProgress,
    getUnlockedBadges,
    getLockedBadges,
    resetProgress,
  };
}
