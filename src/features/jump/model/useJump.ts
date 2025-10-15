import { useSnowman } from "@entities/snowman/model/useSnowman";

export const useJump = () => {
  const jump = useSnowman((s) => s.jump);
  // TODO: sound 추가
  return { jump };
};
