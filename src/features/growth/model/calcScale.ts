import { GAME } from "@shared/config/constants";
/** test용 scale 검사 */
export const calcScale = (score: number) => 1 + score * GAME.GROWTH_PER_SCORE;
