import { useWorld } from "@entities/world/model/useWorld";
import {
  spawnObstacle,
  moveObstacles,
  type Obstacle,
} from "@entities/obstacle";
import { GAME } from "@shared/config/constants";

export function updateSpawn(
  list: Obstacle[],
  baseW: number,
  groundY: number,
  dt: number
) {
  const w = useWorld.getState();

  // spawn
  if (w.time - w.lastSpawnAt > GAME.SPAWN_INTERVAL) {
    const o = spawnObstacle(baseW, groundY);
    list = [...list, o];
    useWorld.setState({ lastSpawnAt: w.time });
  }
  // move
  list = moveObstacles(list, dt, w.speed);
  return list;
}
